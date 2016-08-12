import React from "react";

export default function fnComp(Comp, fn) {
  return class FnComp extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        shouldHide: true,
      };
    }

    componentWillMount() {
      this.setState({ shouldHide: !!fn(this.props) });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ shouldHide: !!fn(nextProps) });
    }

    render() {
      return !this.state.shouldHide && <Comp {...this.props} />;
    }
  };
}
