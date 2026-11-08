// Zero-dependency Web Audio API Temple Bell & Sitar Harmonic Synthesizer

class SoundChimeEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Warm brass temple ghanti chime when a single Diya is lit
  public playDiyaIgnite(pitchIndex = 0) {
    const ctx = this.getContext();
    if (!ctx) return;

    // Yaman Raga ascending notes (Sa, Re, Ga, Ma#, Pa, Dha, Ni, Sa')
    const scaleFreqs = [523.25, 587.33, 659.25, 739.99, 783.99, 880.0, 987.77, 1046.5];
    const baseFreq = scaleFreqs[pitchIndex % scaleFreqs.length];

    const now = ctx.currentTime;

    // Fundamental + harmonic partials for brass bell resonance
    const partials = [1, 2.0, 3.01, 4.18];
    const gains = [0.11, 0.055, 0.025, 0.012];
    const decays = [1.8, 1.2, 0.8, 0.45];

    partials.forEach((ratio, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = idx === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(baseFreq * ratio, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(gains[idx], now + 0.018);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decays[idx] + 0.05);
    });
  }

  // Grand Maha-Aarti chord arpeggio when all 7 Diyas are lit
  public playGrandIllumination() {
    const ctx = this.getContext();
    if (!ctx) return;

    const notes = [0, 1, 2, 4, 5, 6, 7];
    notes.forEach((noteIdx, i) => {
      setTimeout(() => {
        this.playDiyaIgnite(noteIdx);
      }, i * 95);
    });
  }

  // Delicate sparkle chime for copy / card export
  public playSparkleTick() {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const freqs = [1046.5, 1318.5, 1567.98];

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + idx * 0.055);

      gain.gain.setValueAtTime(0.0001, now + idx * 0.055);
      gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.055 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.055 + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.055);
      osc.stop(now + idx * 0.055 + 0.5);
    });
  }
}

export const soundEngine = new SoundChimeEngine();
