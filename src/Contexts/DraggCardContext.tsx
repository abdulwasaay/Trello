import { createContext, useState, ReactNode } from "react";

export const DraggCardContext = createContext<any>(null);

interface DraggCardContextProviderProps {
    children: ReactNode;
}

const DraggCardContextProvider: React.FC<DraggCardContextProviderProps> = ({ children }) => {
    const [cardDragging , setCardDragging] = useState<number | null>(null);
    const [listCardDragging , setlistCardDragging] =  useState<number | null>(null);

    return (
        <DraggCardContext.Provider value={{ cardDragging, setCardDragging, listCardDragging, setlistCardDragging }}> {/* Provided as an object */}
            {children}
        </DraggCardContext.Provider>
    );
};

export default DraggCardContextProvider;
