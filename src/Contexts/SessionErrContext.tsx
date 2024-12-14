import { createContext, useState, ReactNode } from "react";

export const sessionModalContext = createContext<any>(null);

interface sessionModalContextProviderProps {
    children: ReactNode;
}

const SessionModalContextProvider: React.FC<sessionModalContextProviderProps> = ({ children }) => {
    const [sessionIsOpen, setSessionIsOpen] = useState(false); // Corrected state initialization
    const [errText, setErrText] = useState<string>("");

    return (
        <sessionModalContext.Provider value={{ sessionIsOpen, setSessionIsOpen, errText, setErrText }}> {/* Provided as an object */}
            {children}
        </sessionModalContext.Provider>
    );
};

export default SessionModalContextProvider;
