// Autenticación local-first. Sin backend: las cuentas viven en este dispositivo,
// con la contraseña derivada con PBKDF2 (Web Crypto) — nunca se guarda en claro.
// Soporta múltiples cuentas y sesión. El progreso se namespacea por cuenta en
// store.ts (cada cuenta tiene su propio avance). Pensado para poder enchufar un
// backend real más adelante sin tocar la UI.
import { setSessionId, getSessionId, copyProgress } from './store';

export interface Account {
  id: string;
  name: string;
  email: string;
  salt: string; // hex
  hash: string; // hex (PBKDF2-SHA256)
  createdAt: string;
}

export type AuthResult = { ok: true; user: PublicUser } | { ok: false; error: string };
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

const ACCOUNTS_KEY = 'pg:auth:accounts';
const PBKDF2_ITER = 100_000;

// ── Persistencia de cuentas (global al dispositivo) ──────────────
function loadAccounts(): Record<string, Account> {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
  } catch {
    return {};
  }
}
function saveAccounts(accounts: Record<string, Account>): void {
  try {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch {
    /* noop */
  }
}
const emailKey = (email: string) => email.trim().toLowerCase();

// ── Cripto ───────────────────────────────────────────────────────
function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
function fromHex(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}
function randomHex(bytes: number): string {
  const a = new Uint8Array(bytes);
  crypto.getRandomValues(a);
  return toHex(a.buffer);
}
async function derive(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: fromHex(saltHex) as BufferSource, iterations: PBKDF2_ITER, hash: 'SHA-256' },
    keyMaterial,
    256
  );
  return toHex(bits);
}

// Comparación en tiempo ~constante (evita filtrar info por timing).
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

const toPublic = (a: Account): PublicUser => ({ id: a.id, name: a.name, email: a.email, createdAt: a.createdAt });

// ── Validación ───────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export function validate(name: string, email: string, password: string): string | null {
  if (name.trim().length < 2) return 'Decinos tu nombre (al menos 2 letras).';
  if (!EMAIL_RE.test(email.trim())) return 'Ese email no parece válido.';
  if (password.length < 6) return 'La contraseña necesita al menos 6 caracteres.';
  return null;
}

// ── API ──────────────────────────────────────────────────────────
export function isLoggedIn(): boolean {
  return !!currentUser();
}

export function currentUser(): PublicUser | null {
  const id = getSessionId();
  if (!id || id === 'guest') return null;
  const acc = loadAccounts()[id];
  return acc ? toPublic(acc) : null;
}

export function listAccounts(): PublicUser[] {
  return Object.values(loadAccounts())
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .map(toPublic);
}

/** Crea una cuenta y, si venías de invitado, te lleva tu progreso. */
export async function register(
  name: string,
  email: string,
  password: string,
  opts: { migrateGuest?: boolean } = {}
): Promise<AuthResult> {
  const err = validate(name, email, password);
  if (err) return { ok: false, error: err };
  const accounts = loadAccounts();
  const ek = emailKey(email);
  if (Object.values(accounts).some((a) => emailKey(a.email) === ek)) {
    return { ok: false, error: 'Ya existe una cuenta con ese email. Iniciá sesión.' };
  }
  const id = 'acc_' + randomHex(8);
  const salt = randomHex(16);
  let hash: string;
  try {
    hash = await derive(password, salt);
  } catch {
    return { ok: false, error: 'No se pudo crear la cuenta en este navegador.' };
  }
  const createdAt = new Date().toISOString().slice(0, 10);
  const account: Account = { id, name: name.trim(), email: email.trim(), salt, hash, createdAt };
  accounts[id] = account;
  saveAccounts(accounts);
  if (opts.migrateGuest) copyProgress('guest', id);
  setSessionId(id);
  return { ok: true, user: toPublic(account) };
}

export async function login(email: string, password: string): Promise<AuthResult> {
  const accounts = loadAccounts();
  const ek = emailKey(email);
  const acc = Object.values(accounts).find((a) => emailKey(a.email) === ek);
  if (!acc) return { ok: false, error: 'No hay ninguna cuenta con ese email.' };
  let hash: string;
  try {
    hash = await derive(password, acc.salt);
  } catch {
    return { ok: false, error: 'No se pudo verificar en este navegador.' };
  }
  if (!timingSafeEqual(hash, acc.hash)) return { ok: false, error: 'Contraseña incorrecta.' };
  setSessionId(acc.id);
  return { ok: true, user: toPublic(acc) };
}

export function logout(): void {
  setSessionId(null);
}

/** Cambia el nombre de la cuenta activa. */
export function updateName(name: string): void {
  const id = getSessionId();
  if (!id || id === 'guest') return;
  const accounts = loadAccounts();
  if (accounts[id]) {
    accounts[id].name = name.trim();
    saveAccounts(accounts);
  }
}
