import * as React from "react";
import Channel from "./Channel";
import NumericalInput from "./NumericalInput";
interface TProps {
  beatNumber: number;
  numBeats: number;
  numBars: number;
  bpm: number;
  bpmChangeHandler: (value: number) => void;
}
interface TState {}
export default class Controls extends React.Component<TProps, TState> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className="controls">
        <Channel {...this.props} index="0" />
        <Channel {...this.props} index="1" />
        <Channel {...this.props} index="2" />
        <Channel {...this.props} index="3" />
        <div id="tempo-control">
          <span>Tempo:</span>
          <NumericalInput
            onChange={this.props.bpmChangeHandler}
            value={this.props.bpm}
          />
          <span>BPM</span>
        </div>
      </div>
    );
  }
}
