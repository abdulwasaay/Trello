import React, { ReactNode } from "react";
import { basename } from "../../config/env";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        // You can log the error to an external error reporting service here.
        console.error("Error caught by Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render your custom fallback UI.
            return (
                <div className="w-full h-screen flex items-center justify-center">
                    <div className="w-[700px] text-center">
                        <img src={`${basename}assets/images/errorImg.png`} alt="errorImg" className="mx-auto" />
                        <h1 className="text-5xl font-medium mt-6 text-[#c9cfda]">
                            Oops! Something went wrong
                        </h1>
                        <p className="mt-4 text-2xl font-normal text-[#aab5ca]">Brace yourself till we get the error fixed.</p>
                        <p className="text-2xl font-normal text-[#aab5ca]">You may also refresh the page or try again later.</p>
                    </div>
                </div>

            )
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
