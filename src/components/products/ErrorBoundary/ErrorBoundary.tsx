import React from "react";
import { withRouter } from "react-router";

interface Props {
  history: any;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    console.log(typeof this.props.history);
    this.props.history.push("/");
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      window.alert("Ops, something went wrong!");
      return null;
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
