// Estado del alumno en el cliente (localStorage). Sin backend: todo vive en el
// navegador. Cubre progreso por lección, XP/niveles, racha diaria, logros,
// actividad por día (para el mapa de calor) y repaso espaciado (SRS).
//
// Pensado para importarse desde los <script> de Astro (corre sólo en el browser).
// Toda lectura/escritura está protegida con try/catch para entornos sin storage.

// ── Claves de almacenamiento ─────────────────────────────────────
// El PROGRESO se namespacea por cuenta activa: `u:{scope}:{key}` (scope = id de
// cuenta, o 'guest' sin sesión). Las claves de AUTENTICACIÓN (pg:auth:*) son
// globales al dispositivo y NO se namespacean.
const K = {
  lesson: (course: string, lesson: string) => `ct:lesson:${course}:${lesson}`,
  done: (course: string) => `ct:done:${course}`,
  xp: 'pg:xp',
  streak: 'pg:streak',
  achievements: 'pg:achievements',
  activity: 'pg:activity',
  srs: 'pg:srs',
  settings: 'pg:settings',
  profile: 'pg:profile',
};

const SESSION_KEY = 'pg:auth:session';

// ── Acceso crudo (sin namespace) ─────────────────────────────────
function rawGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function rawSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* sin storage */
  }
}
function rawRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    /* noop */
  }
}

// ── Sesión / scope ───────────────────────────────────────────────
/** Id de la cuenta activa, o 'guest' si no hay sesión. */
export function activeScope(): string {
  return rawGet(SESSION_KEY) || 'guest';
}
export function getSessionId(): string | null {
  return rawGet(SESSION_KEY);
}
export function setSessionId(id: string | null): void {
  if (id) rawSet(SESSION_KEY, id);
  else rawRemove(SESSION_KEY);
  emit({ kind: 'session', id });
}
function nsKey(key: string): string {
  ensureMigrated();
  return `u:${activeScope()}:${key}`;
}

// Migración única: copia el progreso "viejo" (claves sin namespace) al scope
// 'guest', para no perder el avance de quienes ya usaban la app.
let migrated = false;
function ensureMigrated(): void {
  if (migrated) return;
  migrated = true;
  try {
    if (localStorage.getItem('pg:__migrated_v1')) return;
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) keys.push(k);
    }
    for (const k of keys) {
      if (k.startsWith('u:') || k.startsWith('pg:auth') || k === 'pg:__migrated_v1') continue;
      if (k.startsWith('pg:') || k.startsWith('ct:')) {
        const v = localStorage.getItem(k);
        if (v != null) localStorage.setItem(`u:guest:${k}`, v);
      }
    }
    localStorage.setItem('pg:__migrated_v1', '1');
  } catch {
    /* noop */
  }
}

/** Copia todo el progreso de un scope a otro (al registrarse desde invitado). */
export function copyProgress(from: string, to: string): void {
  try {
    const prefix = `u:${from}:`;
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix)) keys.push(k);
    }
    for (const k of keys) {
      const v = localStorage.getItem(k);
      if (v != null) localStorage.setItem(`u:${to}:` + k.slice(prefix.length), v);
    }
  } catch {
    /* noop */
  }
}

// ── Utilidades de almacenamiento (con namespace de cuenta) ───────
function read<T>(key: string, fallback: T): T {
  const raw = rawGet(nsKey(key));
  try {
    return raw == null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown): void {
  rawSet(nsKey(key), JSON.stringify(value));
}
function readNum(key: string, fallback = 0): number {
  const raw = rawGet(nsKey(key));
  const n = raw == null ? fallback : Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/** Fecha local en formato YYYY-MM-DD (no UTC, para que la racha respete la zona del alumno). */
export function today(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00');
  const db = new Date(b + 'T00:00:00');
  return Math.round((db.getTime() - da.getTime()) / 86_400_000);
}

// ── Eventos ──────────────────────────────────────────────────────
/** Dispara un evento global para que la UI (badge del header, etc.) se actualice. */
function emit(detail: Record<string, unknown> = {}): void {
  try {
    window.dispatchEvent(new CustomEvent('pg:update', { detail }));
  } catch {
    /* noop */
  }
}

// ── XP y niveles ─────────────────────────────────────────────────
export function getXp(): number {
  return readNum(K.xp, 0);
}

/** Rangos por nivel. El índice + 1 es el número de nivel. */
export const RANKS = [
  'Curioso',
  'Aprendiz',
  'Iniciado',
  'Practicante',
  'Constructor',
  'Artesano',
  'Ingeniero',
  'Arquitecto',
  'Mentor',
  'Maestro',
] as const;

/** XP acumulada necesaria para alcanzar un nivel (curva suave, creciente). */
export function xpForLevel(level: number): number {
  // Nivel 1 = 0, luego ~ 60·(n-1)^1.6 acumulado.
  if (level <= 1) return 0;
  return Math.round(60 * Math.pow(level - 1, 1.6));
}

export interface LevelInfo {
  level: number;
  rank: string;
  xp: number;
  current: number; // XP dentro del nivel actual
  needed: number; // XP que abarca el nivel actual
  pct: number; // progreso 0-100 hacia el siguiente nivel
}

export function getLevelInfo(xp = getXp()): LevelInfo {
  let level = 1;
  while (xp >= xpForLevel(level + 1) && level < 99) level++;
  const base = xpForLevel(level);
  const next = xpForLevel(level + 1);
  const needed = Math.max(1, next - base);
  const current = xp - base;
  return {
    level,
    rank: RANKS[Math.min(level - 1, RANKS.length - 1)],
    xp,
    current,
    needed,
    pct: Math.min(100, Math.round((current / needed) * 100)),
  };
}

/**
 * Suma XP, registra actividad del día y avanza la racha.
 * Devuelve info útil para animaciones (XP nueva, si subió de nivel).
 */
export function addXp(amount: number, _reason = ''): { xp: number; leveledUp: boolean; level: number } {
  if (!Number.isFinite(amount) || amount <= 0) {
    const li = getLevelInfo();
    return { xp: li.xp, leveledUp: false, level: li.level };
  }
  const before = getLevelInfo();
  const xp = getXp() + Math.round(amount);
  write(K.xp, xp);
  recordActivity(Math.round(amount));
  const after = getLevelInfo(xp);
  const leveledUp = after.level > before.level;
  emit({ kind: 'xp', xp, leveledUp, level: after.level, amount: Math.round(amount) });
  return { xp, leveledUp, level: after.level };
}

// ── Actividad diaria + racha ─────────────────────────────────────
export type Activity = Record<string, number>;

export function getActivity(): Activity {
  return read<Activity>(K.activity, {});
}

function recordActivity(xp: number): void {
  const act = getActivity();
  const t = today();
  act[t] = (act[t] || 0) + xp;
  write(K.activity, act);
  bumpStreak();
}

export interface Streak {
  count: number;
  best: number;
  last: string;
}

export function getStreak(): Streak {
  const s = read<Partial<Streak>>(K.streak, {});
  return { count: s.count || 0, best: s.best || 0, last: s.last || '' };
}

/** Actualiza la racha al registrar actividad hoy. Idempotente dentro del mismo día. */
function bumpStreak(): void {
  const s = getStreak();
  const t = today();
  if (s.last === t) return; // ya contó hoy
  const gap = s.last ? daysBetween(s.last, t) : 1;
  const count = gap === 1 ? s.count + 1 : 1; // 1 día de diferencia continúa; más, reinicia
  const best = Math.max(s.best, count);
  write(K.streak, { count, best, last: t });
  emit({ kind: 'streak', count, best });
}

/** Devuelve la racha "vigente" (0 si se cortó por inactividad). */
export function liveStreak(): Streak {
  const s = getStreak();
  if (!s.last) return s;
  const gap = daysBetween(s.last, today());
  if (gap > 1) return { ...s, count: 0 };
  return s;
}

// ── Progreso por lección ─────────────────────────────────────────
export function getStepIndex(course: string, lesson: string): number {
  return readNum(K.lesson(course, lesson), 0);
}
export function setStepIndex(course: string, lesson: string, idx: number): void {
  rawSet(nsKey(K.lesson(course, lesson)), String(idx));
}
export function clearLesson(course: string, lesson: string): void {
  rawRemove(nsKey(K.lesson(course, lesson)));
}
export function getDone(course: string): Set<string> {
  return new Set<string>(read<string[]>(K.done(course), []));
}
export function isLessonDone(course: string, lesson: string): boolean {
  return getDone(course).has(lesson);
}
export function markLessonDone(course: string, lesson: string, tags: string[] = []): boolean {
  const set = getDone(course);
  const isNew = !set.has(lesson);
  set.add(lesson);
  write(K.done(course), [...set]);
  if (isNew) {
    scheduleReview(`${course}/${lesson}`, tags);
    emit({ kind: 'lesson-done', course, lesson });
  }
  return isNew;
}

// ── Logros ───────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string; // nombre de icono tabler
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-step', title: 'Primer paso', desc: 'Completaste tu primer paso.', icon: 'tabler:flag' },
  { id: 'first-lesson', title: 'Hola, mundo', desc: 'Terminaste tu primera lección.', icon: 'tabler:confetti' },
  { id: 'streak-3', title: 'En racha', desc: '3 días seguidos aprendiendo.', icon: 'tabler:flame' },
  { id: 'streak-7', title: 'Imparable', desc: '7 días seguidos.', icon: 'tabler:flame' },
  { id: 'level-5', title: 'Constructor', desc: 'Alcanzaste el nivel 5.', icon: 'tabler:trending-up' },
  { id: 'course-complete', title: 'Curso completo', desc: 'Terminaste un curso entero.', icon: 'tabler:certificate' },
  { id: 'ai-aware', title: 'Pensamiento crítico', desc: 'Completaste el módulo de programar con IA.', icon: 'tabler:robot' },
  { id: 'bug-hunter', title: 'Cazador de bugs', desc: 'Arreglaste 5 programas rotos.', icon: 'tabler:bug' },
  { id: 'challenger', title: 'Retador', desc: 'Resolviste 5 desafíos abiertos.', icon: 'tabler:sword' },
  { id: 'night-owl', title: 'Búho nocturno', desc: 'Programaste pasada la medianoche.', icon: 'tabler:moon' },
];

export function getAchievements(): Set<string> {
  return new Set<string>(read<string[]>(K.achievements, []));
}
export function hasAchievement(id: string): boolean {
  return getAchievements().has(id);
}
/** Desbloquea un logro. Devuelve la definición si es nuevo (para festejarlo), o null. */
export function unlock(id: string): Achievement | null {
  const set = getAchievements();
  if (set.has(id)) return null;
  const def = ACHIEVEMENTS.find((a) => a.id === id);
  if (!def) return null;
  set.add(id);
  write(K.achievements, [...set]);
  emit({ kind: 'achievement', id });
  return def;
}

/** Contadores genéricos (bugs arreglados, retos resueltos, etc.). */
export function bumpCounter(name: string): number {
  const key = `pg:count:${name}`;
  const n = readNum(key, 0) + 1;
  rawSet(nsKey(key), String(n));
  return n;
}

// ── Repaso espaciado (SRS, estilo Leitner simplificado) ──────────
export interface ReviewItem {
  id: string; // "course/lesson"
  tags: string[];
  box: number; // 0..5 (cuanto más alto, intervalo más largo)
  due: string; // YYYY-MM-DD
  reps: number;
}
const BOX_DAYS = [1, 2, 4, 8, 16, 32];

export function getReviews(): Record<string, ReviewItem> {
  return read<Record<string, ReviewItem>>(K.srs, {});
}
function addDays(date: string, days: number): string {
  const d = new Date(date + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function scheduleReview(id: string, tags: string[]): void {
  const all = getReviews();
  const existing = all[id];
  const box = 0;
  all[id] = {
    id,
    tags: tags.length ? tags : existing?.tags || [],
    box,
    due: addDays(today(), BOX_DAYS[box]),
    reps: existing?.reps || 0,
  };
  write(K.srs, all);
}
/** Repasos vencidos (due ≤ hoy). */
export function getDueReviews(): ReviewItem[] {
  const all = getReviews();
  const t = today();
  return Object.values(all).filter((r) => daysBetween(r.due, t) >= 0);
}
/** Califica un repaso: ok ⇒ sube de caja; mal ⇒ vuelve a la primera. */
export function gradeReview(id: string, ok: boolean): void {
  const all = getReviews();
  const r = all[id];
  if (!r) return;
  r.reps += 1;
  r.box = ok ? Math.min(r.box + 1, BOX_DAYS.length - 1) : 0;
  r.due = addDays(today(), BOX_DAYS[r.box]);
  write(K.srs, all);
}

// ── Preferencias ─────────────────────────────────────────────────
export interface Settings {
  sound: boolean;
  reducedConfetti: boolean;
  fontScale: number;
}
export function getSettings(): Settings {
  const s = read<Partial<Settings>>(K.settings, {});
  return { sound: s.sound ?? true, reducedConfetti: s.reducedConfetti ?? false, fontScale: s.fontScale ?? 1 };
}
export function setSettings(patch: Partial<Settings>): Settings {
  const next = { ...getSettings(), ...patch };
  write(K.settings, next);
  emit({ kind: 'settings', settings: next });
  return next;
}

// ── Perfil ───────────────────────────────────────────────────────
export interface Profile {
  name: string;
  createdAt: string;
}
export function getProfile(): Profile {
  const p = read<Partial<Profile>>(K.profile, {});
  return { name: p.name || '', createdAt: p.createdAt || today() };
}
export function setProfile(patch: Partial<Profile>): Profile {
  const cur = getProfile();
  if (rawGet(nsKey(K.profile)) == null) write(K.profile, { ...cur }); // fija createdAt
  const next = { ...cur, ...patch };
  write(K.profile, next);
  return next;
}

// ── Avatar (por cuenta) ──────────────────────────────────────────
export function getAvatar(): string {
  return rawGet(nsKey('pg:avatar')) || '🦊';
}
export function setAvatar(a: string): void {
  rawSet(nsKey('pg:avatar'), a);
}

// ── Meta diaria ──────────────────────────────────────────────────
export function getDailyGoal(): number {
  return Math.max(10, readNum('pg:goal', 40));
}
export function setDailyGoal(n: number): void {
  rawSet(nsKey('pg:goal'), String(Math.max(10, Math.round(n))));
  emit({ kind: 'goal', goal: n });
}
/** XP ganada hoy. */
export function todayXp(): number {
  return getActivity()[today()] || 0;
}

// ── Exportar / importar / reiniciar (sólo el scope de la cuenta activa) ──
function scopeKeys(): string[] {
  const prefix = `u:${activeScope()}:`;
  const keys: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) keys.push(key);
    }
  } catch {
    /* noop */
  }
  return keys;
}
export function exportProgress(): string {
  const prefix = `u:${activeScope()}:`;
  const data: Record<string, string> = {};
  for (const key of scopeKeys()) {
    data[key.slice(prefix.length)] = rawGet(key) ?? '';
  }
  return JSON.stringify({ app: 'programerso', version: 2, exportedAt: today(), data }, null, 2);
}
export function importProgress(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    if (!parsed || parsed.app !== 'programerso' || typeof parsed.data !== 'object') return false;
    for (const [k, v] of Object.entries(parsed.data)) {
      // soporta exports v1 (claves con prefijo ct:/pg:) y v2 (claves internas)
      const inner = k.startsWith('u:') ? k.replace(/^u:[^:]+:/, '') : k;
      if (inner.startsWith('ct:') || inner.startsWith('pg:')) rawSet(nsKey(inner), String(v));
    }
    emit({ kind: 'import' });
    return true;
  } catch {
    return false;
  }
}
/** Borra el progreso de la cuenta activa (no las otras cuentas). */
export function resetAll(): void {
  scopeKeys().forEach((k) => rawRemove(k));
  emit({ kind: 'reset' });
}

// ── XP por tipo de paso ──────────────────────────────────────────
export const XP = {
  type: 4,
  quiz: 10,
  predict: 10,
  fix: 14,
  challenge: 22,
  info: 2,
  lessonBonus: 25,
} as const;
