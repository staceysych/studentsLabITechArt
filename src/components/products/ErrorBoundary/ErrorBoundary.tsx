import React from "react";

interface AppProps {}

interface AppState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(error);
    console.log(info);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) alert("Opps, error is here");
    return this.props.children;
  }
}

export default ErrorBoundary;
