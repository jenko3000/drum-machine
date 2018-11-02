import * as React from "react";
import Trigger from "./Trigger";
import SoundPicker from "./SoundPicker";
type playHandle = () => void;
interface TProps {
  beatNumber: number;
  numBeats: number;
  index: number;
}
interface TState {
  isPlaying: boolean;
  playHandle: () => void;
  mouseIsDown: boolean;
}
export default class Channel extends React.Component<TProps, TState> {
  constructor(props: any) {
    super(props);
    this.state = { isPlaying: false, playHandle: () => {}, mouseIsDown: false };
  }
  onSoundLoaded = (playHandle: playHandle) => {
    this.setState({ playHandle: playHandle });
  };
  onMouseDown = () => {
    this.setState({ mouseIsDown: true });
  };
  onMouseUp = () => {
    this.setState({ mouseIsDown: false });
  };
  render() {
    const { beatNumber, numBeats, index } = this.props;
    const { playHandle, mouseIsDown } = this.state;
    const triggers = Array.from({ length: numBeats }, (v, k) => k);
    return (
      <div className="channel-outer">
        <SoundPicker onSoundLoaded={this.onSoundLoaded} index={index} />
        <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
          {triggers.map(t => (
            <Trigger
              key={t}
              mouseIsDown={mouseIsDown}
              isLive={t == beatNumber}
              playHandle={playHandle}
            />
          ))}
        </div>
      </div>
    );
  }
}
