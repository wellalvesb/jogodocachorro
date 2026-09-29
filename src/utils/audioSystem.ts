// Procedural Web Audio API sound synthesizer for browser Advergame

class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private bgmInterval: number | null = null;
  private isBgmPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled && this.isBgmPlaying) {
      this.stopBGM();
    }
    return this.enabled;
  }

  public playCollect(comboMultiplier: number = 1) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Pitch scales with combo
      const baseFreq = 587.33; // D5
      const freqMultiplier = 1 + (comboMultiplier - 1) * 0.15;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(baseFreq * freqMultiplier, t);
      osc.frequency.exponentialRampToValueAtTime(880 * freqMultiplier, t + 0.12);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.2);
    } catch {
      // Audio fallback silent
    }
  }

  public playJump() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(660, t + 0.15);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.18);
    } catch {
      // silent
    }
  }

  public playHit() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;

      // Low saw wave crunch
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.25);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.3);
    } catch {
      // silent
    }
  }

  public playPowerup() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = now + idx * 0.05;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.14, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch {
      // silent
    }
  }

  public playGameOver() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [330, 293.66, 261.63, 196];
      const now = this.ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = now + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.25);
      });
    } catch {
      // silent
    }
  }

  public playVictory() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const chordNotes = [523.25, 659.25, 783.99, 1046.5];
      const now = this.ctx.currentTime;
      chordNotes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const startTime = now + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // silent
    }
  }

  public startBGM() {
    if (!this.enabled || this.isBgmPlaying) return;
    this.initContext();
    if (!this.ctx) return;
    this.isBgmPlaying = true;

    const bassNotes = [110, 110, 130.81, 146.83, 110, 164.81, 146.83, 130.81];
    let noteIdx = 0;

    this.bgmInterval = window.setInterval(() => {
      if (!this.enabled || !this.isBgmPlaying || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(bassNotes[noteIdx % bassNotes.length], t);

        gain.gain.setValueAtTime(0.04, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.2);

        noteIdx++;
      } catch {
        // silent
      }
    }, 220);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const sound = new SoundSystem();
