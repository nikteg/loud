import React from "react";

export default function fnComp(Comp, fn) {
  return class FnComp extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        shouldRender: true,
      };
    }

    componentWillMount() {
      this.setState({ shouldRender: fn(this.props) || true });
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ shouldRender: fn(nextProps) || true });
    }

    render() {
      return this.state.shouldRender && <Comp {...this.props} />;
    }
  };
}
