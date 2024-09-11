import { Component, ReactNode, ErrorInfo } from "react";
import SomethingWrong from "@/components/somethingWrong/SomethingWrong";

interface ErrorBoundaryState {
  error: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error in ErrorBoundary:", error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <SomethingWrong />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
