# 이미지 편집기 — PowerPoint급 벡터 편집 설계서

PPT의 도형 동작을 이미지 편집기에 이식하기 위한 **데이터 모델 + 핵심 이벤트 핸들러 + 라이브러리 선택** 정리.
현재 편집기는 **Fabric.js** 기반이므로, 각 기능마다 (A) Fabric에 바로 붙이는 법과 (B) 벡터 레이어를 통째로 Paper.js로 옮겨서 얻는 이점을 같이 표기한다.
코드는 프레임워크 독립적인 "순수 로직"으로 작성했고, 필요한 곳만 Fabric/Paper 어댑터를 붙이면 된다.

---

## 0. 라이브러리 선택 (결론 먼저)

| 기능 | 1순위 추천 | 이유 / 대안 |
|---|---|---|
| 전체 벡터 편집(경로·정점·불리언·변환 올인원) | **Paper.js** | `path.simplify()`(RDP+베지어 피팅), `segment.handleIn/Out`(점편집), `unite/subtract/intersect/exclude`(불리언), 히트테스트, 매트릭스 변환을 **하나의 라이브러리로 전부** 제공. PPT식 편집엔 사실상 최적. |
| 자유선 노이즈 제거(RDP) | **simplify-js** | 15줄짜리 초경량 RDP. Paper.js를 안 쓸 때. |
| 부드러운 곡선화 | 자체 Catmull‑Rom→Bezier 함수 | 아래 §1에 구현. `d3-shape`의 `curveCatmullRom`도 가능. |
| 불리언(다각형 연산) | **polygon-clipping**(순수 JS) 또는 **js-angusj-clipper**(Clipper2 WASM) | 곡선까지 정확히 처리하려면 Paper.js가 낫고, 다각형/폴리라인이면 polygon-clipping이 가장 간단. Clipper는 대량·고정밀에 강함. |
| 스냅 가이드 | 자체 구현(외부 불필요) | §4에 전체 로직. |

> **권장 아키텍처**: 배경 비트맵은 지금처럼 캔버스에, 그 위 "편집 가능한 벡터 오브젝트"는 **Paper.js 레이어**로 분리. Fabric을 유지한다면 불리언/simplify만 `polygon-clipping`+`simplify-js`로 보완.

설치:
```bash
npm i paper                 # 올인원 경로
# 또는 (Fabric 유지 시)
npm i simplify-js polygon-clipping
```

---

## 1. 공통 데이터 모델 (State / JSON)

```ts
type Pt = { x: number; y: number };

// 하나의 편집 가능한 벡터 오브젝트
interface VShape {
  id: string;
  kind: "path" | "rect" | "roundRect" | "ellipse" | "arrow" | "star" | "polygon" | "group";
  // 기하 파라미터(도형종류별). path는 segments 사용, 스마트도형은 params 사용
  segments?: Segment[];        // kind==="path"|"polygon" (편집 정점)
  params?: SmartParams;        // kind==="roundRect"|"arrow"|"star" (노란점 제어)
  closed?: boolean;

  // 변환(모든 오브젝트 공통) — 로컬 좌표 → 화면 좌표
  transform: { tx: number; ty: number; rot: number; sx: number; sy: number };
  bbox?: BBox;                 // 캐시된 월드 바운딩박스 (스냅용)

  style: { stroke: string; strokeWidth: number; fill: string | null; dash: number[] | null };
  z: number;                   // 레이어 순서
  groupId?: string | null;     // 그룹 소속
  locked?: boolean;
}

interface Segment {           // 베지어 경로의 정점 1개 (Paper.js와 동일 개념)
  point: Pt;                  // 정점(anchor)
  handleIn: Pt;               // 정점 기준 상대 좌표(들어오는 제어점). {0,0}이면 코너
  handleOut: Pt;              // 나가는 제어점(상대). {0,0}이면 코너
}

interface SmartParams {
  // 0.0~1.0 정규화 값 → 노란 조절점이 직접 조작
  cornerRadius?: number;      // roundRect: 짧은변 대비 반경 비율
  arrowHead?: number;         // arrow: 머리 길이 비율
  arrowThick?: number;        // arrow: 머리 두께 비율
  starInnerRatio?: number;    // star: 내접/외접 반지름 비율
  points?: number;            // star/polygon: 꼭짓점 수(정수)
}

interface BBox { l: number; t: number; r: number; b: number; cx: number; cy: number }

// 편집기 전역 상태
interface EditorState {
  shapes: Record<string, VShape>;
  order: string[];                       // z-순서(앞=뒤쪽, 끝=맨앞)
  selection: string[];                   // 선택된 id들
  mode: "select" | "draw" | "editPoints"; // 현재 편집 모드
  drag: DragSession | null;              // 진행 중인 포인터 드래그
  guides: GuideLine[];                   // 렌더링할 자홍색 가이드
  marquee: BBox | null;                  // 영역 선택 사각형
}

interface DragSession {
  type: "move" | "resize" | "rotate" | "vertex" | "handle" | "smartCP" | "draw" | "marquee";
  startPtr: Pt;                          // 시작 포인터(월드)
  targetId?: string;
  meta?: any;                            // 핸들 인덱스, 리사이즈 방향, 시작 스냅샷 등
  raw?: Pt[];                            // draw 모드: 원시 포인터 궤적
}

interface GuideLine { axis: "x" | "y"; pos: number; from: number; to: number }
```

**설계 포인트**
- 모든 오브젝트는 `segments`(자유경로) 또는 `params`(스마트도형) 중 하나로 기하를 표현하고, **화면 표시는 항상 `transform` 매트릭스를 통해** 그린다. → 회전/리사이즈는 기하를 안 건드리고 `transform`만 바꿔서 무손실.
- 스마트도형은 렌더 시점에 `params` → SVG `d`로 **매번 재생성**한다(파라메트릭).

---

## 2. 기능 1 — 자유형 스케치 보정 (RDP + Catmull‑Rom → Bezier)

원시 포인터 궤적 → 노이즈 제거(RDP) → 부드러운 베지어 경로.

```ts
/** Ramer–Douglas–Peucker: epsilon(px)보다 벗어남이 작은 점 제거 */
function rdp(pts: Pt[], epsilon: number): Pt[] {
  if (pts.length < 3) return pts.slice();
  const dist2Seg = (p: Pt, a: Pt, b: Pt) => {
    const dx = b.x - a.x, dy = b.y - a.y;
    const len2 = dx * dx + dy * dy || 1e-9;
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const px = a.x + t * dx, py = a.y + t * dy;
    return Math.hypot(p.x - px, p.y - py);
  };
  const stack: [number, number][] = [[0, pts.length - 1]];
  const keep = new Array(pts.length).fill(false);
  keep[0] = keep[pts.length - 1] = true;
  while (stack.length) {
    const [s, e] = stack.pop()!;
    let maxD = 0, idx = -1;
    for (let i = s + 1; i < e; i++) {
      const d = dist2Seg(pts[i], pts[s], pts[e]);
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > epsilon && idx > 0) { keep[idx] = true; stack.push([s, idx], [idx, e]); }
  }
  return pts.filter((_, i) => keep[i]);
}

/** Catmull‑Rom 스플라인 → SVG 3차 베지어 path의 d 속성 */
function catmullRomToBezier(pts: Pt[], closed = false, tension = 0.5): string {
  if (pts.length < 2) return "";
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)} `;
  for (let i = 1; i < p.length - 2; i++) {
    const p0 = p[i - 1], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2];
    const c1x = p1.x + (p2.x - p0.x) * tension / 3;
    const c1y = p1.y + (p2.y - p0.y) * tension / 3;
    const c2x = p2.x - (p3.x - p1.x) * tension / 3;
    const c2y = p2.y - (p3.y - p1.y) * tension / 3;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)} ${c2x.toFixed(2)} ${c2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return closed ? d + "Z" : d;
}

/** Catmull‑Rom 제어점을 그대로 Segment(정점+핸들)로 만들어 §3 점편집에 재사용 */
function pointsToSegments(pts: Pt[], tension = 0.5): Segment[] {
  return pts.map((pt, i) => {
    const prev = pts[i - 1] ?? pt, next = pts[i + 1] ?? pt;
    return {
      point: { ...pt },
      handleIn:  { x: -(next.x - prev.x) * tension / 3, y: -(next.y - prev.y) * tension / 3 },
      handleOut: {  x: (next.x - prev.x) * tension / 3, y:  (next.y - prev.y) * tension / 3 },
    };
  });
}
```

**포인터 핸들러 (draw 모드)**
```ts
function onPointerDown_draw(st: EditorState, ptr: Pt) {
  st.drag = { type: "draw", startPtr: ptr, raw: [ptr] };
}
function onPointerMove_draw(st: EditorState, ptr: Pt) {
  if (st.drag?.type !== "draw") return;
  const raw = st.drag.raw!;
  // 미세 이동은 버려서 원시 노이즈를 1차로 줄임
  const last = raw[raw.length - 1];
  if (Math.hypot(ptr.x - last.x, ptr.y - last.y) >= 2) raw.push(ptr);
  // 실시간 미리보기: 원시선 그대로 stroke (확정 전)
}
function onPointerUp_draw(st: EditorState) {
  if (st.drag?.type !== "draw") return;
  const simplified = rdp(st.drag.raw!, /* epsilon */ 2.5);
  const shape: VShape = {
    id: uid(), kind: "path",
    segments: pointsToSegments(simplified),   // 점편집 가능 상태로 저장
    closed: false,
    transform: { tx: 0, ty: 0, rot: 0, sx: 1, sy: 1 },
    style: { stroke: "#111", strokeWidth: 3, fill: null, dash: null },
    z: nextZ(st),
  };
  addShape(st, shape);
  st.drag = null;
}

/** Segment[] → 렌더용 SVG d (점편집 결과를 다시 그릴 때) */
function segmentsToPath(segs: Segment[], closed = false): string {
  if (!segs.length) return "";
  let d = `M ${segs[0].point.x} ${segs[0].point.y} `;
  for (let i = 0; i < segs.length - (closed ? 0 : 1); i++) {
    const a = segs[i], b = segs[(i + 1) % segs.length];
    const c1 = { x: a.point.x + a.handleOut.x, y: a.point.y + a.handleOut.y };
    const c2 = { x: b.point.x + b.handleIn.x,  y: b.point.y + b.handleIn.y };
    d += `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${b.point.x} ${b.point.y} `;
  }
  return closed ? d + "Z" : d;
}
```

- **Paper.js 사용 시**: 위 전부가 `path.add(pt)`로 그린 뒤 `path.simplify(2.5)` 한 줄로 대체된다(내부적으로 RDP+베지어 피팅). `path.segments`가 곧 §3의 편집 정점.

---

## 3. 기능 2 — 점 편집 (정점 + 베지어 제어점)

`mode="editPoints"`일 때 선택 오브젝트의 `segments`를 순회하며 **정점(사각 핸들)**과 **제어점(원형 핸들 + 연결선)**을 렌더링, 드래그로 실시간 수정.

```ts
interface HitHandle { segIndex: number; part: "point" | "in" | "out" }

/** 화면에 렌더할 핸들 목록 생성 (정점 + 제어점) */
function buildEditHandles(shape: VShape) {
  const out: { pos: Pt; hit: HitHandle; type: "vertex" | "control" }[] = [];
  shape.segments!.forEach((s, i) => {
    out.push({ pos: s.point, hit: { segIndex: i, part: "point" }, type: "vertex" });
    if (s.handleIn.x || s.handleIn.y)
      out.push({ pos: add(s.point, s.handleIn), hit: { segIndex: i, part: "in" }, type: "control" });
    if (s.handleOut.x || s.handleOut.y)
      out.push({ pos: add(s.point, s.handleOut), hit: { segIndex: i, part: "out" }, type: "control" });
  });
  return out;
}

function hitTestHandle(shape: VShape, ptr: Pt, r = 6): HitHandle | null {
  for (const h of buildEditHandles(shape))
    if (Math.hypot(h.pos.x - ptr.x, h.pos.y - ptr.y) <= r) return h.hit;
  return null;
}

function onPointerDown_edit(st: EditorState, ptr: Pt) {
  const shape = st.shapes[st.selection[0]]; if (!shape?.segments) return;
  const h = hitTestHandle(shape, toLocal(shape, ptr));
  if (h) st.drag = { type: h.part === "point" ? "vertex" : "handle",
                     startPtr: ptr, targetId: shape.id, meta: h };
}

function onPointerMove_edit(st: EditorState, ptr: Pt, shiftKey: boolean) {
  if (st.drag?.type !== "vertex" && st.drag?.type !== "handle") return;
  const shape = st.shapes[st.drag.targetId!];
  const seg = shape.segments![st.drag.meta.segIndex];
  const p = toLocal(shape, ptr);
  if (st.drag.meta.part === "point") {
    // 정점 이동: 핸들은 상대 좌표라 자동으로 함께 이동됨
    seg.point = p;
  } else {
    const rel = { x: p.x - seg.point.x, y: p.y - seg.point.y };
    if (st.drag.meta.part === "in") {
      seg.handleIn = rel;
      if (!shiftKey) seg.handleOut = { x: -rel.x, y: -rel.y }; // 대칭(부드럽게), Shift=코너로 분리
    } else {
      seg.handleOut = rel;
      if (!shiftKey) seg.handleIn = { x: -rel.x, y: -rel.y };
    }
  }
  shape.bbox = undefined;           // 캐시 무효화 → 다음 렌더에서 d 재계산
}
```

- 우클릭 컨텍스트 메뉴에 **"점 편집"** 항목 추가 → `st.mode="editPoints"`. **더블클릭**으로 진입/이탈시키는 게 PPT와 동일한 감각.
- **Paper.js**: `segment.point`, `segment.handleIn/Out`가 정확히 같은 구조라 위 로직을 거의 그대로 사용.

---

## 4. 기능 3 — 노란색 스마트 조절점 (파라메트릭 도형)

스마트도형은 `params`(0~1 정규화)에서 SVG `d`를 매번 생성. 노란 핸들 드래그가 그 값을 갱신.

```ts
// ── (a) 파라미터 → SVG d ───────────────────────────────
function roundRectPath(w: number, h: number, p: SmartParams): string {
  const r = Math.min(w, h) / 2 * clamp01(p.cornerRadius ?? 0.2);
  return `M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w} ${r} V ${h - r}
          A ${r} ${r} 0 0 1 ${w - r} ${h} H ${r} A ${r} ${r} 0 0 1 0 ${h - r}
          V ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`.replace(/\s+/g, " ");
}

function arrowPath(w: number, h: number, p: SmartParams): string {
  const head = w * clamp01(p.arrowHead ?? 0.4);      // 머리 길이
  const thick = h * clamp01(p.arrowThick ?? 0.5);    // 몸통 두께 비율
  const yTop = (h - thick) / 2, yBot = (h + thick) / 2, xBody = w - head;
  return `M 0 ${yTop} H ${xBody} V 0 L ${w} ${h / 2} L ${xBody} ${h} V ${yBot} H 0 Z`;
}

function starPath(w: number, h: number, p: SmartParams): string {
  const n = Math.max(3, Math.round(p.points ?? 5));
  const inner = clamp01(p.starInnerRatio ?? 0.5);
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) / 2;
  let d = "";
  for (let i = 0; i < n * 2; i++) {
    const ang = -Math.PI / 2 + (i * Math.PI) / n;
    const rad = i % 2 ? R * inner : R;
    d += `${i ? "L" : "M"} ${(cx + rad * Math.cos(ang)).toFixed(2)} ${(cy + rad * Math.sin(ang)).toFixed(2)} `;
  }
  return d + "Z";
}

// ── (b) 노란 조절점 정의: 위치(로컬) + 드래그→파라미터 매핑 ──
interface SmartHandle { pos: Pt; set: (local: Pt) => void }

function smartHandles(shape: VShape, w: number, h: number): SmartHandle[] {
  const p = shape.params!;
  switch (shape.kind) {
    case "roundRect": {
      const r = Math.min(w, h) / 2 * clamp01(p.cornerRadius ?? 0.2);
      return [{ pos: { x: r, y: 0 },                    // 상단변 위 노란점
                set: (l) => p.cornerRadius = clamp01(l.x / (Math.min(w, h) / 2)) }];
    }
    case "arrow": {
      const head = w * clamp01(p.arrowHead ?? 0.4);
      const thick = h * clamp01(p.arrowThick ?? 0.5);
      return [
        { pos: { x: w - head, y: (h - thick) / 2 },     // 머리 크기
          set: (l) => p.arrowHead = clamp01((w - l.x) / w) },
        { pos: { x: w - head, y: 0 },                   // 머리 두께
          set: (l) => p.arrowThick = clamp01((h - 2 * l.y) / h) },
      ];
    }
    case "star":
      return [{ pos: starInnerVertex(w, h, p),          // 내각(오목) 정점
                set: (l) => p.starInnerRatio = clamp01(Math.hypot(l.x - w/2, l.y - h/2) / (Math.min(w,h)/2)) }];
    default: return [];
  }
}

function onPointerDown_smart(st: EditorState, ptr: Pt) {
  const shape = st.shapes[st.selection[0]]; if (!shape?.params) return;
  const { w, h } = localSize(shape);
  const hs = smartHandles(shape, w, h);
  const i = hs.findIndex(h => Math.hypot(h.pos.x - toLocal(shape, ptr).x,
                                         h.pos.y - toLocal(shape, ptr).y) <= 7);
  if (i >= 0) st.drag = { type: "smartCP", startPtr: ptr, targetId: shape.id, meta: { i } };
}
function onPointerMove_smart(st: EditorState, ptr: Pt) {
  if (st.drag?.type !== "smartCP") return;
  const shape = st.shapes[st.drag.targetId!];
  const { w, h } = localSize(shape);
  smartHandles(shape, w, h)[st.drag.meta.i].set(toLocal(shape, ptr)); // 파라미터 실시간 갱신
  shape.bbox = undefined;
}
```

노란 핸들은 렌더 레이어에서 `#FFD400` 다이아몬드로 그리면 PPT와 동일한 룩.

---

## 5. 기능 4 — 스마트 가이드 & 자석 스냅

이동/리사이즈 중 다른 도형들의 6개 기준선(좌·우·중앙X / 상·하·중앙Y)과 비교, 임계값 내면 스냅 + 자홍색 가이드.

```ts
const SNAP = 5; // px

function candidateLines(shapes: VShape[], excludeId: string) {
  const xs: { pos: number; from: number; to: number }[] = [];
  const ys: { pos: number; from: number; to: number }[] = [];
  for (const s of shapes) {
    if (s.id === excludeId || s.locked) continue;
    const b = worldBBox(s);
    xs.push({ pos: b.l, from: b.t, to: b.b }, { pos: b.cx, from: b.t, to: b.b }, { pos: b.r, from: b.t, to: b.b });
    ys.push({ pos: b.t, from: b.l, to: b.r }, { pos: b.cy, from: b.l, to: b.r }, { pos: b.b, from: b.l, to: b.r });
  }
  return { xs, ys };
}

/** 이동 중인 bbox를 스냅. dx,dy 보정치와 그릴 가이드를 반환 */
function computeSnap(moving: BBox, lines: ReturnType<typeof candidateLines>) {
  let dx = 0, dy = 0, bestX = SNAP, bestY = SNAP;
  const guides: GuideLine[] = [];
  const selfXs = [moving.l, moving.cx, moving.r];
  const selfYs = [moving.t, moving.cy, moving.b];
  for (const sx of selfXs) for (const c of lines.xs) {
    const d = c.pos - sx;
    if (Math.abs(d) < bestX) { bestX = Math.abs(d); dx = d;
      guides.length && guides.pop(); // 최선 하나만
      guides.push({ axis: "x", pos: c.pos, from: Math.min(c.from, moving.t), to: Math.max(c.to, moving.b) }); }
  }
  for (const sy of selfYs) for (const c of lines.ys) {
    const d = c.pos - sy;
    if (Math.abs(d) < bestY) { bestY = Math.abs(d); dy = d;
      guides.push({ axis: "y", pos: c.pos, from: Math.min(c.from, moving.l), to: Math.max(c.to, moving.r) }); }
  }
  return { dx, dy, guides };
}

function onPointerMove_move(st: EditorState, ptr: Pt) {
  if (st.drag?.type !== "move") return;
  let dx = ptr.x - st.drag.startPtr.x, dy = ptr.y - st.drag.startPtr.y;
  const ids = st.selection;
  const union = unionBBox(ids.map(id => worldBBox(shiftBBox(st.shapes[id].bbox!, dx, dy))));
  const snap = computeSnap(union, candidateLines(Object.values(st.shapes), ids[0]));
  dx += snap.dx; dy += snap.dy;                     // 자석 보정
  st.guides = snap.guides;                          // 자홍색(#FF00FF)으로 렌더
  for (const id of ids) applyDelta(st.shapes[id], dx, dy);
  st.drag.startPtr = { x: ptr.x, y: ptr.y };        // 델타 방식이면 매 프레임 기준 갱신 주의
}
function onPointerUp_move(st: EditorState) { st.guides = []; st.drag = null; }
```

가이드 렌더는 `stroke:#FF00FF; stroke-width:1; shape-rendering:crispEdges` 로 얇게.

---

## 6. 기능 5 — 불리언 연산 (병합/교차/빼기/조각)

곡선 포함이면 **Paper.js**가 정확하고 간단. 다각형/폴리라인이면 **polygon-clipping**.

**(A) Paper.js — 곡선까지 정확**
```ts
import paper from "paper";
// itemA, itemB: paper.Path
const union     = itemA.unite(itemB);       // 병합(Union)
const subtract  = itemA.subtract(itemB);    // 빼기(Subtract)
const intersect = itemA.intersect(itemB);   // 교차(Intersect)
const exclude   = itemA.exclude(itemB);     // 조각/대칭차(Fragment 유사)
// [원본 제거 후 결과 삽입] → z-순서는 상위 도형 기준으로 유지
```

**(B) polygon-clipping — 순수 JS, 곡선은 폴리라인으로 평탄화 후**
```ts
import * as pc from "polygon-clipping";
// 각 도형을 [[[x,y],...]] 링 배열로 평탄화(베지어를 N등분 샘플링)
const A = shapeToRings(shapeA), B = shapeToRings(shapeB);
const union     = pc.union(A, B);
const subtract  = pc.difference(A, B);
const intersect = pc.intersection(A, B);
const xor       = pc.xor(A, B);   // 조각
// 결과(MultiPolygon) → 다시 VShape("polygon")로 변환
```

**연산 인터페이스**
```ts
type BoolOp = "union" | "combine" | "fragment" | "intersect" | "subtract";
function applyBoolean(st: EditorState, op: BoolOp) {
  if (st.selection.length < 2) return;                       // 2개 이상 필요
  const items = st.selection.map(id => toPaperPath(st.shapes[id]));
  let result = items[0];
  for (let i = 1; i < items.length; i++) {
    result = op === "union" || op === "combine" ? result.unite(items[i])
           : op === "subtract"  ? result.subtract(items[i])
           : op === "intersect" ? result.intersect(items[i])
           : /* fragment */       result.exclude(items[i]);
  }
  st.selection.forEach(id => removeShape(st, id));
  addShape(st, fromPaperPath(result, /* z */ maxZ(st, st.selection) + 1));
}
```
- **combine**(결합): union과 달리 겹친 부분을 구멍으로 남김 → Paper.js에선 `new Path()`에 두 경로를 자식으로 넣고 `path.reorient(false, true)`로 홀 처리.

---

## 7. 기능 6 — 그룹 / 회전·비율고정 리사이즈 / z-순서

### 7-1. 다중 선택(Marquee) + 그룹/해제
```ts
function onPointerDown_marquee(st: EditorState, ptr: Pt) {
  st.drag = { type: "marquee", startPtr: ptr };
  st.marquee = { l: ptr.x, t: ptr.y, r: ptr.x, b: ptr.y, cx: ptr.x, cy: ptr.y };
}
function onPointerUp_marquee(st: EditorState) {
  if (!st.marquee) return;
  st.selection = Object.values(st.shapes)
    .filter(s => bboxIntersect(worldBBox(s), st.marquee!)).map(s => s.id);
  st.marquee = null; st.drag = null;
}
function group(st: EditorState) {
  const gid = uid();
  const members = st.selection.map(id => st.shapes[id]);
  const gb = unionBBox(members.map(worldBBox));
  // 그룹은 자식들의 상대좌표를 보존: 부모 transform 기준으로 자식 변환을 재계산
  const g: VShape = { id: gid, kind: "group",
    transform: { tx: gb.l, ty: gb.t, rot: 0, sx: 1, sy: 1 },
    style: {} as any, z: maxZ(st, st.selection) };
  members.forEach(m => { m.groupId = gid; toRelative(m, g.transform); });
  st.shapes[gid] = g; st.selection = [gid];
}
function ungroup(st: EditorState, gid: string) {
  Object.values(st.shapes).filter(s => s.groupId === gid)
    .forEach(m => { toAbsolute(m, st.shapes[gid].transform); m.groupId = null; });
  removeShape(st, gid);
}
```

### 7-2. 회전 + Shift 비율고정 리사이즈 (피벗 기준)
```ts
function onPointerMove_resize(st: EditorState, ptr: Pt, shiftKey: boolean) {
  if (st.drag?.type !== "resize") return;
  const sh = st.shapes[st.drag.targetId!];
  const { dir, start } = st.drag.meta;                 // dir: "nw"|"n"|"ne"|... , start=시작 스냅샷
  const pivot = oppositeCorner(start.bbox, dir);       // 반대 모서리가 피벗
  // 회전을 고려해 포인터를 도형 로컬 축으로 역회전
  const local = rotatePoint(ptr, pivot, -sh.transform.rot);
  let sx = (local.x - pivot.x) / (start.bbox.r - pivot.x || 1);
  let sy = (local.y - pivot.y) / (start.bbox.b - pivot.y || 1);
  if (shiftKey) { const s = Math.max(Math.abs(sx), Math.abs(sy)); sx = Math.sign(sx) * s; sy = Math.sign(sy) * s; } // 비율고정
  sh.transform.sx = start.sx * sx;
  sh.transform.sy = start.sy * sy;
  reanchorTo(sh, pivot);                                // 피벗 고정되도록 tx,ty 보정
  sh.bbox = undefined;
}

function onPointerMove_rotate(st: EditorState, ptr: Pt, shiftKey: boolean) {
  if (st.drag?.type !== "rotate") return;
  const sh = st.shapes[st.drag.targetId!];
  const c = worldBBox(sh); const center = { x: c.cx, y: c.cy };
  let ang = Math.atan2(ptr.y - center.y, ptr.x - center.x) - st.drag.meta.startAngle;
  if (shiftKey) ang = Math.round(ang / (Math.PI / 12)) * (Math.PI / 12); // 15° 스냅
  sh.transform.rot = st.drag.meta.startRot + ang;
}
```

### 7-3. z-순서 (상태 관리)
```ts
const zBringToFront = (st: EditorState, id: string) => { arrMove(st.order, id, st.order.length - 1); reindexZ(st); };
const zSendToBack   = (st: EditorState, id: string) => { arrMove(st.order, id, 0); reindexZ(st); };
const zForward      = (st: EditorState, id: string) => { const i = st.order.indexOf(id); arrMove(st.order, id, i + 1); reindexZ(st); };
const zBackward     = (st: EditorState, id: string) => { const i = st.order.indexOf(id); arrMove(st.order, id, i - 1); reindexZ(st); };
function reindexZ(st: EditorState) { st.order.forEach((id, i) => st.shapes[id].z = i); }
```

---

## 8. 통합 — 포인터 이벤트 라우터

한 곳에서 모드/히트에 따라 위 핸들러로 분기.
```ts
function onPointerDown(st: EditorState, ev: PointerEvent) {
  const ptr = toWorld(ev);
  if (st.mode === "draw")        return onPointerDown_draw(st, ptr);
  if (st.mode === "editPoints")  return onPointerDown_edit(st, ptr);
  // select 모드: 핸들 → 도형 → 빈 공간 순으로 히트
  const hit = hitTestAll(st, ptr); // {kind:"rotate"|"resize"|"smartCP"|"body"|"none", id, meta}
  switch (hit.kind) {
    case "rotate":  st.drag = { type: "rotate", startPtr: ptr, targetId: hit.id, meta: hit.meta }; break;
    case "resize":  st.drag = { type: "resize", startPtr: ptr, targetId: hit.id, meta: hit.meta }; break;
    case "smartCP": return onPointerDown_smart(st, ptr);
    case "body":    if (!st.selection.includes(hit.id)) st.selection = [hit.id];
                    st.drag = { type: "move", startPtr: ptr, targetId: hit.id }; break;
    case "none":    st.selection = []; onPointerDown_marquee(st, ptr); break;
  }
}
function onPointerMove(st: EditorState, ev: PointerEvent) {
  const ptr = toWorld(ev), shift = ev.shiftKey;
  switch (st.drag?.type) {
    case "draw":   return onPointerMove_draw(st, ptr);
    case "vertex":
    case "handle": return onPointerMove_edit(st, ptr, shift);
    case "smartCP":return onPointerMove_smart(st, ptr);
    case "move":   return onPointerMove_move(st, ptr);
    case "resize": return onPointerMove_resize(st, ptr, shift);
    case "rotate": return onPointerMove_rotate(st, ptr, shift);
    case "marquee":return updateMarquee(st, ptr);
  }
}
function onPointerUp(st: EditorState) {
  switch (st.drag?.type) {
    case "draw":    return onPointerUp_draw(st);
    case "move":    return onPointerUp_move(st);
    case "marquee": return onPointerUp_marquee(st);
    default:        st.guides = []; st.drag = null;
  }
}
```

---

## 9. 현재 편집기(Fabric.js) 기준 — 무엇이 이미 있고 무엇을 새로 붙일지

| 기능 | 현재 상태 | 권장 |
|---|---|---|
| 도형·선·화살표·텍스트, z-순서, 그룹(activeSelection), 정렬/균등배치, 회전/반전, Shift/Alt/Ctrl | **구현됨(Fabric)** | 유지 |
| 자유선 스무딩(RDP+베지어) | 미구현 | §2 `simplify-js`(or 자체 rdp) + `catmullRomToBezier` → `fabric.Path` |
| 점 편집(정점/제어점) | 미구현 | Fabric엔 없음 → **선택 오브젝트만 Paper.js로 위임**하거나 §3 핸들 오버레이 자체 구현 |
| 노란 스마트 조절점 | 미구현 | §4. Fabric 커스텀 컨트롤(`fabric.Object.prototype.controls`)로 노란 핸들 추가 가능 |
| 스마트 가이드 스냅 | 미구현 | §5 자체 구현(외부 불필요). `object:moving`에서 계산 |
| 불리언 연산 | 미구현 | §6 `polygon-clipping`(간단) 또는 Paper.js(정확) |

> **가장 실용적 로드맵**: (1) 스냅 가이드 → (2) 자유선 스무딩 → (3) 불리언(polygon-clipping) → (4) 노란 스마트 조절점 → (5) 점 편집(여기서부터는 Paper.js 도입 고려). 점 편집·불리언을 제대로 하려면 **벡터 레이어를 Paper.js로 옮기는 것**이 장기적으로 가장 깔끔하다.

---

### 유틸(참조)
```ts
const clamp01 = (v: number) => Math.max(0, Math.min(1, v || 0));
const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y });
function rotatePoint(p: Pt, c: Pt, rad: number): Pt {
  const cos = Math.cos(rad), sin = Math.sin(rad), dx = p.x - c.x, dy = p.y - c.y;
  return { x: c.x + dx * cos - dy * sin, y: c.y + dx * sin + dy * cos };
}
// toLocal/toWorld: shape.transform(tx,ty,rot,sx,sy) 역행렬/행렬 적용
// worldBBox: 로컬 경로를 transform 적용 후 min/max로 계산 (스냅·리사이즈 공용)
```
