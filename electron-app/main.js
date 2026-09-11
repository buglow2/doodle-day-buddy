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
    + "<div id='hint' style='position:fixed;top:12px;left:50%;transform:translateX(-50%);color:#fff;background:rgba(0,0,0,0.65);padding:6px 14px;border-radius:8px;font:13px sans-serif;pointer-events:none'>드래그해서 영역 선택 · Esc 취소 · 클릭만 하면 전체화면</div>"
    + "<div id='bar' style='position:fixed;top:12px;right:16px;display:flex;gap:2px;background:rgba(20,24,34,0.95);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:4px;box-shadow:0 6px 24px rgba(0,0,0,0.5)'>"
    + "<button id='b-region' style='" + OVERLAY_BTN + "' onclick='setMode(\"region\")'><span style='font-size:18px'>▭</span>영역</button>"
    + "<button id='b-fixed' style='" + OVERLAY_BTN + "' onclick='setMode(\"fixed\")'><span style='font-size:18px'>⬚</span>크기지정</button>"
    + "<button id='b-full' style='" + OVERLAY_BTN + "' onclick='setMode(\"full\")'><span style='font-size:18px'>⛶</span>전체화면</button>"
    + "<button id='b-redo' style='" + OVERLAY_BTN + "' onclick='setMode(\"region\")'><span style='font-size:18px'>⟳</span>새 캡처</button>"
    + "<button id='b-cancel' style='" + OVERLAY_BTN + ";color:#fca5a5' onclick='doCancel()'><span style='font-size:18px'>✕</span>취소</button>"
    + "</div>"
    + "<script>const{ipcRenderer}=require('electron');let shot=null,sx=0,sy=0,drag=false,mode='region',fw=400,fh=300;const img=document.getElementById('bg'),sel=document.getElementById('sel'),dim=document.getElementById('dim'),hint=document.getElementById('hint');ipcRenderer.on('shot',(e,u)=>{shot=u;img.src=u;});"
    + "function inBar(t){return t&&t.closest&&t.closest('#bar');}function doCancel(){ipcRenderer.send('ddb-region-cancel');}"
    + "function hl(){['region','fixed','full','redo','cancel'].forEach(function(k){var b=document.getElementById('b-'+k);if(b)b.style.background='transparent';});var a=document.getElementById('b-'+(mode==='fixed'?'fixed':'region'));if(a)a.style.background='rgba(59,130,246,0.5)';}"
    + "function setMode(m){drag=false;if(m==='full'){crop(0,0,innerWidth,innerHeight);return;}mode=m;sel.style.display='none';dim.style.display='block';if(m==='fixed'){showFixed();hint.textContent='마우스로 위치 지정 · 휠로 크기 조절 · 클릭하면 확정 · Esc 취소';}else{hint.textContent='드래그해서 영역 선택 · Esc 취소';}hl();}"
    + "function showFixed(){sel.style.display='block';sel.style.width=fw+'px';sel.style.height=fh+'px';}"
    + "function rc(e){return{x:Math.min(sx,e.clientX),y:Math.min(sy,e.clientY),w:Math.abs(e.clientX-sx),h:Math.abs(e.clientY-sy)};}function up(e){const r=rc(e);sel.style.left=r.x+'px';sel.style.top=r.y+'px';sel.style.width=r.w+'px';sel.style.height=r.h+'px';}"
    + "window.addEventListener('mousedown',e=>{if(inBar(e.target))return;if(mode==='fixed'){const x=parseFloat(sel.style.left)||0,y=parseFloat(sel.style.top)||0;crop(x,y,fw,fh);return;}drag=true;sx=e.clientX;sy=e.clientY;dim.style.display='none';sel.style.display='block';up(e);});"
    + "window.addEventListener('mousemove',e=>{if(mode==='fixed'){sel.style.left=(e.clientX-fw/2)+'px';sel.style.top=(e.clientY-fh/2)+'px';return;}if(drag)up(e);});"
    + "window.addEventListener('mouseup',e=>{if(mode!=='region'||!drag)return;drag=false;const r=rc(e);if(r.w<5||r.h<5)crop(0,0,innerWidth,innerHeight);else crop(r.x,r.y,r.w,r.h);});"
    + "window.addEventListener('wheel',e=>{if(mode!=='fixed')return;const d=e.deltaY<0?20:-20;fw=Math.max(40,Math.min(innerWidth,fw+d));fh=Math.max(40,Math.min(innerHeight,fh+Math.round(d*0.75)));sel.style.left=(e.clientX-fw/2)+'px';sel.style.top=(e.clientY-fh/2)+'px';showFixed();},{passive:true});"
    + "window.addEventListener('keydown',e=>{if(e.key==='Escape')doCancel();});"
    + "function crop(x,y,w,h){const im=new Image();im.onload=()=>{const sf=im.naturalWidth/window.innerWidth;const cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(w*sf));cv.height=Math.max(1,Math.round(h*sf));cv.getContext('2d').drawImage(im,x*sf,y*sf,w*sf,h*sf,0,0,cv.width,cv.height);ipcRenderer.send('ddb-region-result',cv.toDataURL('image/png'));};im.src=shot;}hl();<\/script></body></html>";
  let overlayWin = null;
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
      overlayWin.webContents.on('did-finish-load', () => { try { overlayWin.webContents.send('shot', url); overlayWin.focus(); } catch (e) {} });
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
