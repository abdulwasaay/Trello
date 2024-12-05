import { createContext, useState, ReactNode } from "react";

export const ModalContext = createContext<any>(null);

interface ModalContextProviderProps {
    children: ReactNode;
}

const ModalContextProvider: React.FC<ModalContextProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false); // Corrected state initialization

    return (
        <ModalContext.Provider value={{ isOpen, setIsOpen }}> {/* Provided as an object */}
            {children}
        </ModalContext.Provider>
    );
};

export default ModalContextProvider;
