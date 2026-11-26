// 휴대폰 앱 업데이트 (설치형 앱 전용, 웹은 아무것도 안 함)
// B) 화면 자동 갱신: 새 릴리스의 화면 묶음(mobile-web-버전.zip)을 몰래 받아 두었다가 다음에 열 때 적용 → 재설치 없음
// A) 앱 자체 업데이트: 폰 기능(플러그인)이 바뀐 버전이면 APK를 앱이 직접 받아 설치 화면을 띄움 → "설치" 한 번
import { Capacitor } from '@capacitor/core';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const REPO = 'buglow2/doodle-day-buddy';
export const WEB_VERSION = typeof __MP_WEB_VER__ !== 'undefined' ? __MP_WEB_VER__ : 'dev';
export const isNative = () => { try { return Capacitor.isNativePlatform(); } catch { return false; } };

// "1.0.98" 같은 버전 비교 (a<b → 음수)
export function cmpVer(a, b) { const p = s => String(s || '0').replace(/^v/, '').split('.').map(n => parseInt(n, 10) || 0); const x = p(a), y = p(b); for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (x[i] || 0) - (y[i] || 0); if (d) return d; } return 0; }

// 앱 켜자마자 "정상 실행됨" 알림 (안 하면 10초 뒤 이전 화면으로 자동 되돌림 = 고장 난 화면 방지)
export async function markReady() { if (!isNative()) return; try { await CapacitorUpdater.notifyAppReady(); } catch {} }

async function getJson(url) { const r = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } }); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); }

// 최신 릴리스 정보: { version, nativeSince, zipUrl, zipHash, apkUrl }
export async function fetchLatest() {
  const rel = await getJson('https://api.github.com/repos/' + REPO + '/releases/latest');
  const as = rel.assets || [];
  const find = re => as.find(a => re.test(a.name));
  const meta = find(/^mobile-web\.json$/);
  if (!meta) return null;
  const m = await getJson(meta.browser_download_url);
  const zip = find(/^mobile-web-.*\.zip$/), apk = find(/^MomentPlan-Android-.*\.apk$/);
  return { version: m.version, nativeSince: m.nativeSince, zipHash: m.zipHash, zipUrl: zip && zip.browser_download_url, apkUrl: apk && apk.browser_download_url };
}

// 상태 확인 → { kind: 'none' | 'web-ready' | 'apk', latest, apkVer }
export async function checkUpdate(onProgress) {
  if (!isNative()) return { kind: 'none' };
  const latest = await fetchLatest(); if (!latest) return { kind: 'none' };
  let builtin = '0'; try { builtin = (await CapacitorUpdater.getBuiltinVersion()).version; } catch {}
  // A) 지금 설치된 앱(폰 기능)이 새 화면을 돌리기엔 오래됨 → APK 업데이트 필요
  if (latest.nativeSince && cmpVer(builtin, latest.nativeSince) < 0) return latest.apkUrl ? { kind: 'apk', latest, apkVer: latest.version } : { kind: 'none' };
  // B) 화면만 바뀜 → 몰래 받아 두기 (같은 내용이면 건너뜀)
  const have = localStorage.getItem('mp_web_hash');
  if (!latest.zipUrl || (latest.zipHash && have === latest.zipHash) || cmpVer(WEB_VERSION, latest.version) >= 0) return { kind: 'none', latest };
  const pend = JSON.parse(localStorage.getItem('mp_web_pending') || 'null');
  if (pend && pend.version === latest.version) return { kind: 'web-ready', latest, id: pend.id };
  let sub = null; try { if (onProgress) sub = await CapacitorUpdater.addListener('download', e => onProgress(e.percent)); } catch {}
  try {
    const b = await CapacitorUpdater.download({ url: latest.zipUrl, version: latest.version });
    await CapacitorUpdater.next({ id: b.id });           // 다음에 앱을 열 때(또는 배경으로 갔다 오면) 적용
    localStorage.setItem('mp_web_pending', JSON.stringify({ id: b.id, version: latest.version, hash: latest.zipHash || '' }));
    return { kind: 'web-ready', latest, id: b.id };
  } finally { try { sub && sub.remove(); } catch {} }
}

// 받아 둔 새 화면 지금 바로 적용 (앱이 새로 고쳐짐)
export async function applyWebNow(id) {
  const p = JSON.parse(localStorage.getItem('mp_web_pending') || 'null');
  if (p) { localStorage.setItem('mp_web_hash', p.hash || ''); localStorage.removeItem('mp_web_pending'); }
  await CapacitorUpdater.set({ id });
}
// 새 화면이 실제로 켜졌으면 '적용 완료' 기록
export function noteApplied() { try { const p = JSON.parse(localStorage.getItem('mp_web_pending') || 'null'); if (p && p.version === WEB_VERSION) { localStorage.setItem('mp_web_hash', p.hash || ''); localStorage.removeItem('mp_web_pending'); } } catch {} }

// A) APK 직접 받아서 안드로이드 설치 화면 열기
export async function installApk(url, onProgress) {
  const { Filesystem, Directory } = await import('@capacitor/filesystem');
  const { FileTransfer } = await import('@capacitor/file-transfer');
  const { FileOpener } = await import('@capacitor-community/file-opener');
  const { uri } = await Filesystem.getUri({ directory: Directory.Cache, path: 'MomentPlan-update.apk' });
  let sub = null; try { if (onProgress) sub = await FileTransfer.addListener('progress', p => { if (p.contentLength) onProgress(Math.round(p.bytes / p.contentLength * 100)); }); } catch {}
  try { await FileTransfer.downloadFile({ url, path: uri, progress: !!onProgress }); } finally { try { sub && sub.remove(); } catch {} }
  await FileOpener.open({ filePath: uri, contentType: 'application/vnd.android.package-archive', openWithDefault: true });
}
