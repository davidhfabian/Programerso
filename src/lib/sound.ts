// Efectos de sonido mínimos con WebAudio (sin archivos). Se respetan los ajustes
// del usuario (getSettings().sound). Tonos cortos y suaves, estilo "feedback".
import { getSettings } from './store';

let ctx: AudioContext | null = null;
function audio(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    return ctx;
  } catch {
    return null;
  }
}

function tone(freq: number, start: number, dur: number, gain = 0.05, type: OscillatorType = 'sine'): void {
  const ac = audio();
  if (!ac) return;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  const t0 = ac.currentTime + start;
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

function enabled(): boolean {
  try {
    return getSettings().sound;
  } catch {
    return false;
  }
}

/** Acierto: dos notas ascendentes suaves. */
export function playCorrect(): void {
  if (!enabled()) return;
  tone(587.33, 0, 0.12); // D5
  tone(880.0, 0.09, 0.16); // A5
}

/** Subida de nivel / logro: arpegio breve. */
export function playLevelUp(): void {
  if (!enabled()) return;
  tone(523.25, 0, 0.14); // C5
  tone(659.25, 0.1, 0.14); // E5
  tone(783.99, 0.2, 0.18); // G5
  tone(1046.5, 0.32, 0.24); // C6
}

/** Error suave: una nota grave corta. */
export function playWrong(): void {
  if (!enabled()) return;
  tone(196.0, 0, 0.18, 0.04, 'triangle');
}
