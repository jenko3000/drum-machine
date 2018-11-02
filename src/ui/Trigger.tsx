import * as React from "react";
interface TProps {
  isLive: boolean;
  playHandle: () => void;
  mouseIsDown: boolean;
}
interface TState {
  isOn: boolean;
}
export default class Trigger extends React.Component<TProps, TState> {
  constructor(props: any) {
    super(props);
    this.state = { isOn: false };
  }

  toggleButtonState = () => {
    this.setState(prev => ({ isOn: !prev.isOn }));
  };
  handleMouseEnter = () => {
    const { mouseIsDown } = this.props;
    if (mouseIsDown) {
      this.toggleButtonState();
    }
  };
  render() {
    const { isLive } = this.props;
    const { isOn } = this.state;
    if (isLive && isOn) {
      this.props.playHandle();
    }
    const triggerClasses = `trigger ${isLive ? "live" : ""} ${
      isOn ? "isOn" : ""
    }`;
    return (
      <button
        className={triggerClasses}
        onMouseDown={this.toggleButtonState}
        onMouseEnter={this.handleMouseEnter}
      />
    );
  }
}
