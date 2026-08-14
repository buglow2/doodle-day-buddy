// MomentPlan — Electron 실행기
const { app, BrowserWindow, shell, ipcMain } = require('electron');
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
async function createWindow() {
  const port = await serve();
  win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 900, minHeight: 600,
    autoHideMenuBar: true, title: 'MomentPlan',
    icon: path.join(__dirname, process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: { contextIsolation: true, preload: path.join(__dirname, 'preload.js') }
  });
  win.loadURL(`http://127.0.0.1:${port}/`);
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  // 렌더러가 직접 요청하는 외부 링크 열기 (window.open 우회 — 주소 유실 방지)
  ipcMain.handle('ddb-open-external', (_e, url) => { try { if (url && /^(https?:|mailto:)/i.test(url)) { shell.openExternal(url); return true; } } catch (e) {} return false; });

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
}
