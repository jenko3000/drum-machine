import * as React from "react";
import Controls from "./../ui/Controls";
interface TState {
  beatNumber: number;
  beatInterval: number;
  bpm: number;
}
interface TProps {}
export default class DrumMachine extends React.Component<TProps, TState> {
  initialBpm: number = 140;
  beatStartTime: number;
  timer: any;
  numBars = 4;
  beatsPerBar = 4;
  totalBeats = this.numBars * this.beatsPerBar;
  constructor(props: any) {
    super(props);
    this.state = {
      beatNumber: 0,
      bpm: this.initialBpm,
      beatInterval: this.beatIntervalFromBpm(this.initialBpm)
    };
  }
  beatIntervalFromBpm = (bpm: number) => {
    return 60000 / (bpm * this.beatsPerBar);
  };
  onBpmChange = (bpm: number) => {
    const beatInterval = this.beatIntervalFromBpm(bpm);
    this.setState({ beatInterval: beatInterval, bpm: bpm });
  };
  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  start = () => {
    //this.stopClock();
    this.setState({ beatNumber: -1 });
    this.beatStartTime = Date.now();
    this.timer = setInterval(this.tick);
    (window as any).timerRef = this.timer;
  };
  stop = () => {
    const timer = this.timer || (window as any).timerRef;
    clearInterval(timer);
    this.setState({ beatNumber: 0 });
  };
  tick = () => {
    const elapsedTime = Date.now() - this.beatStartTime;
    const { beatInterval } = this.state;
    if (elapsedTime > beatInterval) {
      this.beatStartTime = Date.now();
      let { beatNumber } = this.state;
      beatNumber = beatNumber + 1;
      this.setState({ beatNumber: beatNumber % 16 });
    }
  };

  render() {
    const { beatNumber, bpm } = this.state;
    return (
      <div id="drum-machine">
        <Controls
          beatNumber={beatNumber}
          numBars={this.numBars}
          numBeats={this.totalBeats}
          bpmChangeHandler={this.onBpmChange}
          bpm={bpm}
        />
        <div>
          <button onClick={this.start}>start</button>
          <button onClick={this.stop}>stop</button>
        </div>
      </div>
    );
  }
}
