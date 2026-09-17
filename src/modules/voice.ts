export class VoiceRecognitionService {
  private recognition: any = null;

  constructor() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      this.recognition = new SR();
      this.recognition.lang = 'ar-SA';
      this.recognition.continuous = true;
    }
  }

  public start(onResult: (text: string) => void): void {
    if (!this.recognition) return;
    this.recognition.onresult = (e: any) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      onResult(transcript);
    };
    this.recognition.start();
  }

  public stop(): void {
    this.recognition?.stop();
  }
}

export const Voice = new VoiceRecognitionService();
