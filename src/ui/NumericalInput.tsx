import * as React from "react";
interface TProps {
  value: number;
  onChange: (value: number) => void;
}
interface TState {}
export default class NumericalInput extends React.Component<TProps, TState> {
  constructor(props: any) {
    super(props);
  }
  handleValuechange = (ev: React.FormEvent<HTMLInputElement>) => {
    const val: any = +ev.currentTarget.value;
    if (isNaN(val)) return;
    const numberValue: number = +val;
    const { onChange } = this.props;
    onChange(numberValue);
  };
  render() {
    const { value } = this.props;
    return (
      <input
        className="numerical-input"
        value={value}
        onChange={this.handleValuechange}
      />
    );
  }
}
