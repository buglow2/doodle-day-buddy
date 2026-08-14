// MomentPlan — 렌더러에서 외부 링크를 안전하게 여는 브리지
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ddbNative', {
  openExternal: (url) => { try { return ipcRenderer.invoke('ddb-open-external', String(url || '')); } catch (e) { return Promise.resolve(false); } }
});
