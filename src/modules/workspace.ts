
export class FlowTimerEngine {
  private remainingSecs = 45 * 60;
  private totalSecs = 45 * 60;
  private interval: any = null;
  private isRunning = false;

  public setMinutes(m: number, onTick: (mins: number, secs: number, pct: number) => void): void {
    this.stop();
    this.remainingSecs = m * 60;
    this.totalSecs = m * 60;
    onTick(Math.floor(this.remainingSecs / 60), this.remainingSecs % 60, 100);
  }

  public toggle(onTick: (mins: number, secs: number, pct: number) => void, onComplete: () => void): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.isRunning = true;
      this.interval = setInterval(() => {
        if (this.remainingSecs > 0) {
          this.remainingSecs--;
          const pct = (this.remainingSecs / this.totalSecs) * 100;
          onTick(Math.floor(this.remainingSecs / 60), this.remainingSecs % 60, pct);
        } else {
          this.stop();
          onComplete();
        }
      }, 1000);
      return true;
    }
  }

  public stop(): void {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
    this.isRunning = false;
  }
}

export class BrownNoiseSynthesizer {
  private audioCtx: AudioContext | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private isPlaying = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.noiseNode?.stop();
      this.isPlaying = false;
      return false;
    } else {
      try {
        if (!this.audioCtx) {
          this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        if (this.audioCtx.state === 'suspended') {
          this.audioCtx.resume();
        }

        const bufferSize = this.audioCtx.sampleRate * 2;
        const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          data[i] *= 3.5;
        }

        this.noiseNode = this.audioCtx.createBufferSource();
        this.noiseNode.buffer = buffer;
        this.noiseNode.loop = true;

        const gain = this.audioCtx.createGain();
        gain.gain.value = 0.12;

        this.noiseNode.connect(gain);
        gain.connect(this.audioCtx.destination);
        this.noiseNode.start();

        this.isPlaying = true;
        return true;
      } catch {
        return false;
      }
    }
  }
}

export class ContinuousSpeechService {
  private recognition: any = null;
  private isListening = false;

  constructor() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      this.recognition = new SR();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'ar-SA';
    }
  }

  public toggle(onResult: (text: string) => void): boolean {
    if (!this.recognition) return false;

    if (this.isListening) {
      this.recognition.stop();
      this.isListening = false;
      return false;
    } else {
      this.recognition.onresult = (e: any) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        onResult(transcript);
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          try { this.recognition.start(); } catch {}
        }
      };

      this.recognition.start();
      this.isListening = true;
      return true;
    }
  }
}