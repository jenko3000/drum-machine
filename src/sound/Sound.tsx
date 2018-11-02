export default class Sound {
  audioContext: AudioContextBase;
  gainNode: GainNode;
  audioBuffer: AudioBuffer;
  isLoaded: boolean = false;
  constructor(context: AudioContextBase, audioData: any) {
    this.audioContext = context;
    this.audioContext.decodeAudioData(audioData).then(audioBuffer => {
      this.audioBuffer = audioBuffer;
      this.isLoaded = true;
    });
  }
  createBufferSourceNode = () => {
    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.audioContext.destination);
    return source;
  };
  unload = () => {
    this.isLoaded = false;
  };
  play() {
    if (!this.isLoaded) {
      return;
    }
    const source = this.createBufferSourceNode();
    source.start(0);
  }
}
