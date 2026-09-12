// MomentPlan — 렌더러에서 외부 링크를 안전하게 여는 브리지
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ddbNative', {
  openExternal: (url) => { try { return ipcRenderer.invoke('ddb-open-external', String(url || '')); } catch (e) { return Promise.resolve(false); } },
  setWvNewWindow: (v) => { try { return ipcRenderer.invoke('ddb-wv-newwindow', !!v); } catch (e) { return Promise.resolve(false); } },
  backupSave: (json) => { try { return ipcRenderer.invoke('ddb-backup-save', String(json || '')); } catch (e) { return Promise.resolve(false); } },
  backupList: () => { try { return ipcRenderer.invoke('ddb-backup-list'); } catch (e) { return Promise.resolve([]); } },
  backupRead: (file) => { try { return ipcRenderer.invoke('ddb-backup-read', String(file || '')); } catch (e) { return Promise.resolve(null); } },
  capture: () => { try { return ipcRenderer.invoke('ddb-capture'); } catch (e) { return Promise.resolve(null); } },
  clipboardImage: (u) => { try { return ipcRenderer.invoke('ddb-clipboard-image', String(u || '')); } catch (e) { return Promise.resolve(false); } },
  saveCapture: (u, dir) => { try { return ipcRenderer.invoke('ddb-save-capture', { u: String(u || ''), dir: String(dir || '') }); } catch (e) { return Promise.resolve(null); } },
  pickCaptureDir: () => { try { return ipcRenderer.invoke('ddb-pick-capture-dir'); } catch (e) { return Promise.resolve(null); } },
  captureRegion: () => { try { return ipcRenderer.invoke('ddb-capture-region'); } catch (e) { return Promise.resolve(false); } },
  setCapturePrefs: (obj) => { try { return ipcRenderer.invoke('ddb-cap-prefs', obj || {}); } catch (e) { return Promise.resolve(false); } },
  setCaptureHotkey: (a, mode) => { try { return ipcRenderer.invoke('ddb-set-capture-hotkey', String(a || ''), String(mode || 'region')); } catch (e) { return Promise.resolve(false); } }
});
try { ipcRenderer.on('ddb-screenshot', (_e, url) => { try { window.dispatchEvent(new CustomEvent('ddb-capture-result', { detail: { url: url } })); } catch (e) {} }); } catch (e) {}
try { ipcRenderer.on('ddb-cap-toggle', (_e, d) => { try { window.dispatchEvent(new CustomEvent('ddb-cap-toggle', { detail: d || {} })); } catch (e) {} }); } catch (e) {}
try { ipcRenderer.on('ddb-open-capset', () => { try { window.dispatchEvent(new CustomEvent('ddb-open-capset-relay')); } catch (e) {} }); } catch (e) {}
