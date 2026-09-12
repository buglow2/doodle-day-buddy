// MomentPlan — Electron 실행기
const { app, BrowserWindow, shell, ipcMain, desktopCapturer, screen, globalShortcut, clipboard, nativeImage, dialog } = require('electron');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.json': 'application/json' };
const DIST = path.join(__dirname, 'dist');

function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      if (req.method === 'POST' && req.url.split('?')[0] === '/ocr-proxy') {
        let body = '';
        req.on('data', c => { body += c; if (body.length > 30 * 1024 * 1024) req.destroy(); });
        req.on('end', () => {
          let j; try { j = JSON.parse(body); } catch (e) { res.writeHead(400, { 'Content-Type': 'application/json' }); res.end('{"error":"bad request"}'); return; }
          try {
            const u = new URL(j.url);
            const payload = JSON.stringify({ version: 'V2', requestId: 'ddb-' + Date.now(), timestamp: Date.now(), images: [{ format: j.format || 'png', name: 'ocr', data: j.data }] });
            const opts = { hostname: u.hostname, path: u.pathname + (u.search || ''), method: 'POST', port: u.port || 443, headers: { 'Content-Type': 'application/json', 'X-OCR-SECRET': j.secret || '', 'Content-Length': Buffer.byteLength(payload) } };
            const rq = https.request(opts, rr => { let d = ''; rr.on('data', c => d += c); rr.on('end', () => { res.writeHead(rr.statusCode || 200, { 'Content-Type': 'application/json' }); res.end(d); }); });
            rq.on('error', e => { res.writeHead(502, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: String(e && e.message || e) })); });
            rq.write(payload); rq.end();
          } catch (e) { res.writeHead(500, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: String(e && e.message || e) })); }
        });
        return;
      }
      let p = decodeURIComponent(req.url.split('?')[0]);
      if (p === '/') p = '/index.html';
      const file = path.join(DIST, p);
      if (!file.startsWith(DIST) || !fs.existsSync(file)) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      fs.createReadStream(file).pipe(res);
    });
    // 고정 포트 사용 — 매 실행마다 주소가 같아야 localStorage(로그인 세션·자동로그인)가 유지됩니다.
    const FIXED_PORT = 47615;
    let _tries = 0;
    srv.on('listening', () => resolve(srv.address().port));
    srv.on('error', (e) => {
      if (e && e.code === 'EADDRINUSE') {
        _tries++;
        if (_tries <= 8) setTimeout(() => { try { srv.listen(FIXED_PORT, '127.0.0.1'); } catch (_) {} }, 400);
        else { try { srv.listen(0, '127.0.0.1'); } catch (_) {} } // 최후의 수단(랜덤 포트)
      }
    });
    srv.listen(FIXED_PORT, '127.0.0.1');
  });
}

let win;
let wvNewWindow = false;
async function createWindow() {
  const port = await serve();
  win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 900, minHeight: 600,
    autoHideMenuBar: true, title: 'MomentPlan',
    icon: path.join(__dirname, process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: { contextIsolation: true, webviewTag: true, preload: path.join(__dirname, 'preload.js') }
  });
  win.loadURL(`http://127.0.0.1:${port}/`);
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  // 렌더러가 직접 요청하는 외부 링크 열기 (window.open 우회 — 주소 유실 방지)
  ipcMain.handle('ddb-open-external', (_e, url) => { try { if (url && /^(https?:|mailto:)/i.test(url)) { shell.openExternal(url); return true; } } catch (e) {} return false; });
  // ── 검색/AI 웹뷰 팝업 처리: 같은 탭 이동(기본) 또는 새 창(외부 브라우저) 선택 ──
  ipcMain.handle('ddb-wv-newwindow', (_e, v) => { wvNewWindow = !!v; return true; });
  win.webContents.on('did-attach-webview', (_e, wc) => {
    try {
      wc.setWindowOpenHandler(({ url }) => {
        if (!/^https?:/i.test(url)) return { action: 'deny' };
        if (wvNewWindow) { try { shell.openExternal(url); } catch (e) {} }
        else { try { wc.loadURL(url); } catch (e) {} }
        return { action: 'deny' };
      });
    } catch (e) {}
  });

  // ── 화면 캡처 (알캡처식) ──────────────────────
  async function captureScreenDataUrl() {
    try {
      const d = screen.getPrimaryDisplay();
      const sf = d.scaleFactor || 1;
      const w = Math.round(d.size.width * sf), h = Math.round(d.size.height * sf);
      const sources = await desktopCapturer.getSources({ types: ['screen'], thumbnailSize: { width: w, height: h } });
      const src = (sources || [])[0];
      if (!src || !src.thumbnail) return null;
      return src.thumbnail.toDataURL();
    } catch (e) { return null; }
  }
  ipcMain.handle('ddb-capture', async () => await captureScreenDataUrl());
  ipcMain.handle('ddb-clipboard-image', (_e, dataUrl) => { try { const img = nativeImage.createFromDataURL(String(dataUrl || '')); if (!img.isEmpty()) clipboard.writeImage(img); return true; } catch (e) { return false; } });
  ipcMain.handle('ddb-save-capture', (_e, arg) => { try { const dataUrl = (arg && arg.u) || arg || ''; let dir = (arg && arg.dir) || ''; if (!dir) dir = path.join(app.getPath('pictures'), 'MomentPlan'); try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {} const b = Buffer.from(String(dataUrl).split(',')[1] || '', 'base64'); const fn = 'capture-' + new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) + '.png'; const fp = path.join(dir, fn); fs.writeFileSync(fp, b); return fp; } catch (e) { return null; } });
  ipcMain.handle('ddb-pick-capture-dir', async () => { try { const r = await dialog.showOpenDialog(win, { title: '캡처 저장 폴더 선택', properties: ['openDirectory', 'createDirectory'] }); return (r.canceled || !r.filePaths || !r.filePaths[0]) ? null : r.filePaths[0]; } catch (e) { return null; } });
  // 영역 드래그 캡처 오버레이
  const OVERLAY_BTN = "display:flex;flex-direction:column;align-items:center;gap:2px;min-width:56px;padding:8px 6px;background:transparent;border:none;color:#e5e7eb;font:12px sans-serif;cursor:pointer;border-radius:8px";
  const OVERLAY_HTML = "<!doctype html><html><head><meta charset='utf-8'></head><body style='margin:0;overflow:hidden;cursor:crosshair;background:transparent'>"
    + "<img id='bg' style='position:fixed;inset:0;width:100vw;height:100vh;-webkit-user-drag:none;user-select:none'>"
    + "<div id='dim' style='position:fixed;inset:0;background:rgba(0,0,0,0.35)'></div>"
    + "<div id='sel' style='position:fixed;border:2px solid #22c55e;box-shadow:0 0 0 9999px rgba(0,0,0,0.35);display:none'></div>"
    + "<div id='fbox' style='position:fixed;display:none;border:2px solid #22c55e;box-shadow:0 0 0 9999px rgba(0,0,0,0.35);box-sizing:border-box'>"
    + "<div id='fctrl' style='position:absolute;left:0;top:-42px;display:flex;gap:4px;align-items:center;background:rgba(20,24,34,0.96);border:1px solid rgba(255,255,255,0.18);border-radius:8px;padding:4px 6px;font:12px sans-serif;color:#e5e7eb;white-space:nowrap'>"
    + "<input id='fwv' type='number' value='1000' style='width:60px;background:#0b0e16;color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:2px 4px'> × "
    + "<input id='fhv' type='number' value='1000' style='width:60px;background:#0b0e16;color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:2px 4px'>"
    + "<button onclick='applySize()' style='background:rgba(255,255,255,0.12);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:3px 8px;cursor:pointer'>적용</button>"
    + "<button onclick='confirmFixed()' style='background:#22c55e;color:#06240f;border:none;border-radius:4px;padding:3px 10px;cursor:pointer;font-weight:700'>✔ 캡처</button>"
    + "</div></div>"
    + "<div id='hint' style='position:fixed;top:12px;left:50%;transform:translateX(-50%);color:#fff;background:rgba(0,0,0,0.65);padding:6px 14px;border-radius:8px;font:13px sans-serif;pointer-events:none'>드래그해서 영역 선택 · Esc 취소 · 클릭만 하면 전체화면</div>"
    + "<div id='bar' style='position:fixed;top:12px;right:16px;display:flex;gap:2px;background:rgba(20,24,34,0.95);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:4px;box-shadow:0 6px 24px rgba(0,0,0,0.5)'>"
    + "<button id='b-region' style='" + OVERLAY_BTN + "' onclick='setMode(\"region\")'><span style='font-size:18px'>▭</span>영역</button>"
    + "<button id='b-fixed' style='" + OVERLAY_BTN + "' onclick='setMode(\"fixed\")'><span style='font-size:18px'>⬚</span>크기지정</button>"
    + "<button id='b-full' style='" + OVERLAY_BTN + "' onclick='setMode(\"full\")'><span style='font-size:18px'>⛶</span>전체화면</button>"
    + "<button id='b-redo' style='" + OVERLAY_BTN + "' onclick='setMode(\"region\")'><span style='font-size:18px'>⟳</span>새 캡처</button>"
    + "<button id='b-menu' style='" + OVERLAY_BTN + "' onclick='toggleMenu(event)'><span style='font-size:18px'>≡</span>메뉴</button>"
    + "<button id='b-cancel' style='" + OVERLAY_BTN + ";color:#fca5a5' onclick='doCancel()'><span style='font-size:18px'>✕</span>취소</button>"
    + "</div>"
    + "<div id='menu' style='display:none;position:fixed;top:88px;right:16px;min-width:170px;background:rgba(20,24,34,0.98);border:1px solid rgba(255,255,255,0.18);border-radius:10px;padding:4px;box-shadow:0 8px 28px rgba(0,0,0,0.55);font:13px sans-serif;color:#e5e7eb;z-index:10'>"
    + "<button id='m-ac' onclick='togMenu(\"autoCopy\")' style='display:flex;justify-content:space-between;align-items:center;width:100%;gap:8px;padding:8px 10px;background:transparent;border:none;color:#e5e7eb;font:13px sans-serif;cursor:pointer;border-radius:6px;text-align:left'><span>자동 복사</span><span class='ck'>□</span></button>"
    + "<button id='m-as' onclick='togMenu(\"autoSave\")' style='display:flex;justify-content:space-between;align-items:center;width:100%;gap:8px;padding:8px 10px;background:transparent;border:none;color:#e5e7eb;font:13px sans-serif;cursor:pointer;border-radius:6px;text-align:left'><span>자동 저장</span><span class='ck'>□</span></button>"
    + "<div style='height:1px;background:rgba(255,255,255,0.12);margin:3px 6px'></div>"
    + "<button onclick='openSet()' style='display:flex;align-items:center;width:100%;gap:8px;padding:8px 10px;background:transparent;border:none;color:#e5e7eb;font:13px sans-serif;cursor:pointer;border-radius:6px;text-align:left'>⚙ 환경설정</button>"
    + "<button onclick='showHelp()' style='display:flex;align-items:center;width:100%;gap:8px;padding:8px 10px;background:transparent;border:none;color:#e5e7eb;font:13px sans-serif;cursor:pointer;border-radius:6px;text-align:left'>❔ 도움말</button>"
    + "</div>"
    + "<script>const{ipcRenderer}=require('electron');let shot=null,sx=0,sy=0,drag=false,mode='region',fw=1000,fh=1000,bx=0,by=0,bw=1000,bh=1000,ds=null;const img=document.getElementById('bg'),sel=document.getElementById('sel'),dim=document.getElementById('dim'),hint=document.getElementById('hint'),fbox=document.getElementById('fbox'),fwv=document.getElementById('fwv'),fhv=document.getElementById('fhv');"
    + "ipcRenderer.on('shot',(e,p)=>{shot=(p&&p.url)||p;img.src=shot;if(p&&p.fw){fw=p.fw;fh=p.fh;bw=p.fw;bh=p.fh;if(fwv)fwv.value=fw;if(fhv)fhv.value=fh;}if(p){if(p.guide){try{sel.style.borderColor=p.guide;fbox.style.borderColor=p.guide;var hs=fbox.querySelectorAll('[data-d]');for(var i=0;i<hs.length;i++)hs[i].style.background=p.guide;}catch(er){}}if(p.bar===false){var bar=document.getElementById('bar');if(bar)bar.style.display='none';}if(p.presets&&p.presets.length)buildPresets(p.presets);mAc=!!p.ac;mAs=!!p.as;refreshMenu();}});"
    + "function buildPresets(ps){var ctr=document.getElementById('fctrl');if(!ctr)return;var wrap=document.createElement('div');wrap.style.cssText='display:flex;gap:3px;margin-left:6px';ps.forEach(function(p){var b=document.createElement('button');b.textContent=p.w+'×'+p.h;b.style.cssText='background:rgba(255,255,255,0.1);color:#fff;border:1px solid rgba(255,255,255,0.2);border-radius:4px;padding:3px 6px;cursor:pointer;font-size:11px';b.onclick=function(){bw=Math.min(p.w,innerWidth);bh=Math.min(p.h,innerHeight);bx=Math.round((innerWidth-bw)/2);by=Math.round((innerHeight-bh)/2);layout();};wrap.appendChild(b);});ctr.appendChild(wrap);}"
    + "var DIRS=[['nw','0','0','nwse'],['n','50%','0','ns'],['ne','100%','0','nesw'],['e','100%','50%','ew'],['se','100%','100%','nwse'],['s','50%','100%','ns'],['sw','0','100%','nesw'],['w','0','50%','ew']];DIRS.forEach(function(d){var h=document.createElement('div');h.setAttribute('data-d',d[0]);h.style.cssText='position:absolute;width:14px;height:14px;background:#22c55e;border:1px solid #fff;border-radius:2px;transform:translate(-50%,-50%);left:'+d[1]+';top:'+d[2]+';cursor:'+d[3]+'-resize;pointer-events:auto';fbox.appendChild(h);});"
    + "function inBar(t){return t&&t.closest&&(t.closest('#bar')||t.closest('#menu'));}function inCtrl(t){return t&&t.closest&&t.closest('#fctrl');}function doCancel(){ipcRenderer.send('ddb-region-cancel');}"
    + "var mAc=false,mAs=false;function refreshMenu(){var a=document.querySelector('#m-ac .ck');if(a)a.textContent=mAc?'☑':'□';var b=document.querySelector('#m-as .ck');if(b)b.textContent=mAs?'☑':'□';}"
    + "function toggleMenu(e){if(e)e.stopPropagation();var m=document.getElementById('menu');m.style.display=(m.style.display==='none'||!m.style.display)?'block':'none';}"
    + "function togMenu(k){if(k==='autoCopy'){mAc=!mAc;ipcRenderer.send('ddb-cap-toggle',{key:'autoCopy',val:mAc});}else{mAs=!mAs;ipcRenderer.send('ddb-cap-toggle',{key:'autoSave',val:mAs});}refreshMenu();}"
    + "function openSet(){ipcRenderer.send('ddb-open-capset');}function showHelp(){var h=document.getElementById('hint');if(h)h.textContent='영역:드래그 · 크기지정:모서리 드래그로 크기·안쪽 잡고 이동·W×H 입력 · 전체화면:즉시 · 새캡처:다시 · Esc:취소';var m=document.getElementById('menu');if(m)m.style.display='none';}"
    + "function hl(){['region','fixed','full','redo','cancel'].forEach(function(k){var b=document.getElementById('b-'+k);if(b)b.style.background='transparent';});var a=document.getElementById('b-'+(mode==='fixed'?'fixed':'region'));if(a)a.style.background='rgba(59,130,246,0.5)';}"
    + "function layout(){bw=Math.max(40,bw);bh=Math.max(40,bh);bx=Math.max(0,Math.min(bx,innerWidth-bw));by=Math.max(0,Math.min(by,innerHeight-bh));fbox.style.left=bx+'px';fbox.style.top=by+'px';fbox.style.width=bw+'px';fbox.style.height=bh+'px';if(fwv)fwv.value=Math.round(bw);if(fhv)fhv.value=Math.round(bh);}"
    + "function setMode(m){drag=false;ds=null;if(m==='full'){crop(0,0,innerWidth,innerHeight);return;}mode=m;sel.style.display='none';if(m==='fixed'){dim.style.display='none';fbox.style.display='block';bw=Math.min(fw,innerWidth);bh=Math.min(fh,innerHeight);bx=Math.round((innerWidth-bw)/2);by=Math.round((innerHeight-bh)/2);layout();hint.textContent='모서리를 끌어 크기조절 · 안쪽을 끌어 이동 · W×H 입력 후 적용 · [✔캡처] 또는 Enter로 확정';}else{fbox.style.display='none';dim.style.display='block';hint.textContent='드래그해서 영역 선택 · Esc 취소';}hl();}"
    + "function applySize(){var w=parseInt(fwv.value,10),h=parseInt(fhv.value,10);if(w>=10)bw=Math.min(w,innerWidth);if(h>=10)bh=Math.min(h,innerHeight);bx=Math.round((innerWidth-bw)/2);by=Math.round((innerHeight-bh)/2);layout();}"
    + "function confirmFixed(){fw=Math.round(bw);fh=Math.round(bh);ipcRenderer.send('ddb-cap-fixed',{w:fw,h:fh});crop(bx,by,bw,bh);}"
    + "function rc(e){return{x:Math.min(sx,e.clientX),y:Math.min(sy,e.clientY),w:Math.abs(e.clientX-sx),h:Math.abs(e.clientY-sy)};}function up(e){var r=rc(e);sel.style.left=r.x+'px';sel.style.top=r.y+'px';sel.style.width=r.w+'px';sel.style.height=r.h+'px';}"
    + "document.addEventListener('mousedown',e=>{var mn=document.getElementById('menu');if(mn&&mn.style.display==='block'&&!(e.target.closest&&(e.target.closest('#menu')||e.target.closest('#b-menu')))){mn.style.display='none';}if(inBar(e.target))return;if(mode==='fixed'){if(inCtrl(e.target))return;var hd=e.target.closest&&e.target.closest('[data-d]');if(hd){ds={t:'rz',d:hd.getAttribute('data-d'),mx:e.clientX,my:e.clientY,bx:bx,by:by,bw:bw,bh:bh};e.preventDefault();return;}if(e.target.closest&&e.target.closest('#fbox')){ds={t:'mv',mx:e.clientX,my:e.clientY,bx:bx,by:by};e.preventDefault();return;}return;}drag=true;sx=e.clientX;sy=e.clientY;dim.style.display='none';sel.style.display='block';up(e);});"
    + "document.addEventListener('mousemove',e=>{if(mode==='fixed'){if(!ds)return;var dx=e.clientX-ds.mx,dy=e.clientY-ds.my;if(ds.t==='mv'){bx=ds.bx+dx;by=ds.by+dy;}else{var x=ds.bx,y=ds.by,w=ds.bw,h=ds.bh,d=ds.d;if(d.indexOf('e')>=0)w=ds.bw+dx;if(d.indexOf('s')>=0)h=ds.bh+dy;if(d.indexOf('w')>=0){w=ds.bw-dx;x=ds.bx+dx;}if(d.indexOf('n')>=0){h=ds.bh-dy;y=ds.by+dy;}if(w<40){if(d.indexOf('w')>=0)x=ds.bx+ds.bw-40;w=40;}if(h<40){if(d.indexOf('n')>=0)y=ds.by+ds.bh-40;h=40;}bx=x;by=y;bw=w;bh=h;}layout();return;}if(drag)up(e);});"
    + "document.addEventListener('mouseup',e=>{if(mode==='fixed'){ds=null;return;}if(!drag)return;drag=false;var r=rc(e);if(r.w<5||r.h<5)crop(0,0,innerWidth,innerHeight);else crop(r.x,r.y,r.w,r.h);});"
    + "window.addEventListener('keydown',e=>{if(e.key==='Escape')doCancel();else if(e.key==='Enter'&&mode==='fixed')confirmFixed();});"
    + "function crop(x,y,w,h){var im=new Image();im.onload=function(){var sf=im.naturalWidth/window.innerWidth;var cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(w*sf));cv.height=Math.max(1,Math.round(h*sf));cv.getContext('2d').drawImage(im,x*sf,y*sf,w*sf,h*sf,0,0,cv.width,cv.height);ipcRenderer.send('ddb-region-result',cv.toDataURL('image/png'));};im.src=shot;}hl();<\/script></body></html>";
  let overlayWin = null;
  let capFixed = { w: 1000, h: 1000 };
  const capCfgPath = path.join(app.getPath('userData'), 'ddb-capture.json');
  try { const j = JSON.parse(fs.readFileSync(capCfgPath, 'utf8')); if (j && j.w > 0 && j.h > 0) capFixed = { w: Math.round(j.w), h: Math.round(j.h) }; } catch (e) {}
  ipcMain.on('ddb-cap-fixed', (_e, sz) => { try { if (sz && sz.w > 0 && sz.h > 0) { capFixed = { w: Math.round(sz.w), h: Math.round(sz.h) }; fs.writeFileSync(capCfgPath, JSON.stringify(capFixed)); } } catch (e) {} });
  let capPrefs = { guideColor: '#22c55e', overlayBar: true, presets: [], autoCopy: false, autoSave: false };
  ipcMain.handle('ddb-cap-prefs', (_e, obj) => { try { if (obj && typeof obj === 'object') { capPrefs = { guideColor: obj.guideColor || '#22c55e', overlayBar: obj.overlayBar !== false, presets: Array.isArray(obj.presets) ? obj.presets.slice(0, 6) : [], autoCopy: !!obj.autoCopy, autoSave: !!obj.autoSave }; } } catch (e) {} return true; });
  ipcMain.on('ddb-cap-toggle', (_e, d) => { try { if (d && d.key) { capPrefs[d.key] = !!d.val; if (win) win.webContents.send('ddb-cap-toggle', d); } } catch (e) {} });
  ipcMain.on('ddb-open-capset', () => { try { if (overlayWin) { overlayWin.close(); overlayWin = null; } } catch (e) {} try { if (win) { if (win.isMinimized()) win.restore(); win.show(); win.focus(); win.webContents.send('ddb-open-capset'); } } catch (e) {} });
  async function startRegionCapture() {
    try {
      if (overlayWin) { try { overlayWin.close(); } catch (e) {} overlayWin = null; }
      const url = await captureScreenDataUrl();
      if (!url) return;
      const d = screen.getPrimaryDisplay();
      const b = d.bounds;
      overlayWin = new BrowserWindow({ x: b.x, y: b.y, width: b.width, height: b.height, frame: false, transparent: true, alwaysOnTop: true, skipTaskbar: true, resizable: false, movable: false, minimizable: false, hasShadow: false, fullscreenable: false, webPreferences: { nodeIntegration: true, contextIsolation: false } });
      try { overlayWin.setAlwaysOnTop(true, 'screen-saver'); } catch (e) {}
      overlayWin.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(OVERLAY_HTML));
      overlayWin.webContents.on('did-finish-load', () => { try { overlayWin.webContents.send('shot', { url: url, fw: capFixed.w, fh: capFixed.h, guide: capPrefs.guideColor, bar: capPrefs.overlayBar, presets: capPrefs.presets, ac: capPrefs.autoCopy, as: capPrefs.autoSave }); overlayWin.focus(); } catch (e) {} });
      overlayWin.on('closed', () => { overlayWin = null; });
    } catch (e) {}
  }
  ipcMain.on('ddb-region-cancel', () => { try { if (overlayWin) { overlayWin.close(); overlayWin = null; } } catch (e) {} });
  ipcMain.on('ddb-region-result', (_e, croppedUrl) => { try { if (overlayWin) { overlayWin.close(); overlayWin = null; } } catch (e) {} try { if (croppedUrl && win) { win.webContents.send('ddb-screenshot', croppedUrl); if (win.isMinimized()) win.restore(); win.show(); win.focus(); } } catch (e) {} });
  ipcMain.handle('ddb-capture-region', async () => { await startRegionCapture(); return true; });
  let capHotkey = '', capMode = 'region';
  ipcMain.handle('ddb-set-capture-hotkey', (_e, accel, mode) => {
    try {
      capMode = mode === 'full' ? 'full' : 'region';
      if (capHotkey) { try { globalShortcut.unregister(capHotkey); } catch (e) {} capHotkey = ''; }
      accel = String(accel || '').trim();
      if (!accel) return true;
      const ok = globalShortcut.register(accel, async () => {
        if (capMode === 'region') { startRegionCapture(); return; }
        const url = await captureScreenDataUrl();
        try { win && win.webContents.send('ddb-screenshot', url); } catch (e) {}
        try { if (win) { if (win.isMinimized()) win.restore(); win.show(); win.focus(); } } catch (e) {}
      });
      if (ok) capHotkey = accel;
      return ok;
    } catch (e) { return false; }
  });

  // ── 자동 로컬 백업 (데이터 유실 방지) ──────────────────────
  const BKDIR = path.join(app.getPath('userData'), 'ddb-backups');
  ipcMain.handle('ddb-backup-save', (_e, json) => {
    try {
      if (!json || json.length < 20) return false;
      if (!fs.existsSync(BKDIR)) fs.mkdirSync(BKDIR, { recursive: true });
      const files = fs.readdirSync(BKDIR).filter(f => f.startsWith('bk-') && f.endsWith('.json')).sort();
      // 직전 백업과 내용 같으면 저장 안 함(중복 방지)
      if (files.length) { try { const last = fs.readFileSync(path.join(BKDIR, files[files.length - 1]), 'utf8'); if (last === json) return true; } catch (e) {} }
      const name = 'bk-' + new Date().toISOString().replace(/[:.]/g, '-') + '.json';
      fs.writeFileSync(path.join(BKDIR, name), json, 'utf8');
      // 최근 10개만 유지
      const all = fs.readdirSync(BKDIR).filter(f => f.startsWith('bk-') && f.endsWith('.json')).sort();
      while (all.length > 10) { try { fs.unlinkSync(path.join(BKDIR, all.shift())); } catch (e) {} }
      return true;
    } catch (e) { return false; }
  });
  ipcMain.handle('ddb-backup-list', () => {
    try { if (!fs.existsSync(BKDIR)) return []; return fs.readdirSync(BKDIR).filter(f => f.startsWith('bk-') && f.endsWith('.json')).sort().reverse().map(f => { let sz = 0; try { sz = fs.statSync(path.join(BKDIR, f)).size; } catch (e) {} return { file: f, size: sz }; }); } catch (e) { return []; }
  });
  ipcMain.handle('ddb-backup-read', (_e, file) => {
    try { if (!/^bk-[\w.\-]+\.json$/.test(String(file))) return null; const p = path.join(BKDIR, file); if (!p.startsWith(BKDIR) || !fs.existsSync(p)) return null; return fs.readFileSync(p, 'utf8'); } catch (e) { return null; }
  });

  // 창을 닫기 전에 클라우드 동기화를 한 번 실행하고 종료 (최대 5초 대기)
  let _closing = false;
  win.on('close', (e) => {
    if (_closing) return;
    e.preventDefault();
    _closing = true;
    const finish = () => { try { win.destroy(); } catch (_) { try { app.quit(); } catch (__) {} } };
    const timer = setTimeout(finish, 5000);
    Promise.resolve(
      win.webContents.executeJavaScript(
        'Promise.resolve(window.__ddbFinalSync ? window.__ddbFinalSync() : null).then(function(){return true}).catch(function(){return true})'
      )
    ).then(() => { clearTimeout(timer); finish(); })
     .catch(() => { clearTimeout(timer); finish(); });
  });
}

const lock = app.requestSingleInstanceLock();
if (!lock) app.quit();
else {
  app.on('second-instance', () => { if (win) { win.isMinimized() && win.restore(); win.focus(); } });
  app.whenReady().then(createWindow);
  app.on('window-all-closed', () => app.quit());
  app.on('will-quit', () => { try { globalShortcut.unregisterAll(); } catch (e) {} });
}
