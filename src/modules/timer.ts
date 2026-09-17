export class FlowTimer {
  private remaining = 45 * 60;
  private interval: any = null;

  public start(onTick: (mins: number, secs: number) => void): void {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.remaining > 0) {
        this.remaining--;
        const m = Math.floor(this.remaining / 60);
        const s = this.remaining % 60;
        onTick(m, s);
      } else {
        this.stop();
      }
    }, 1000);
  }

  public stop(): void {
    if (this.interval) clearInterval(this.interval);
    this.interval = null;
  }
}

export const Timer = new FlowTimer();
