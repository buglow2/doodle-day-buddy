// MomentPlan — 렌더러에서 외부 링크를 안전하게 여는 브리지
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ddbNative', {
  openExternal: (url) => { try { return ipcRenderer.invoke('ddb-open-external', String(url || '')); } catch (e) { return Promise.resolve(false); } },
  backupSave: (json) => { try { return ipcRenderer.invoke('ddb-backup-save', String(json || '')); } catch (e) { return Promise.resolve(false); } },
  backupList: () => { try { return ipcRenderer.invoke('ddb-backup-list'); } catch (e) { return Promise.resolve([]); } },
  backupRead: (file) => { try { return ipcRenderer.invoke('ddb-backup-read', String(file || '')); } catch (e) { return Promise.resolve(null); } }
});
