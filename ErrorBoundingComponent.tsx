import React from "react";
interface ErroBoundingProps {
  children: any;
}
class ErrorBoudary extends React.Component<ErroBoundingProps> {
  state = { hasError: false, errorMessageToRequest: "" };
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log("Error Boundary :", error.name + ":" + error.message);

    this.setState({
      errorMessageToRequest: error.name + ":" + error.message,
    });
    fetch("", { method: "POST", body: error.name + ":" + error.message });
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          {this.state.errorMessageToRequest && (
            <span>{this.state.errorMessageToRequest}</span>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoudary;
