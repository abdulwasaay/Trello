import { createContext, useState, ReactNode } from "react";

export const WorkSpaceObjContext = createContext<any>(null);

interface workSpaceObjContextProviderProps {
    children: ReactNode;
}

const WorkSpaceObjContextProvider: React.FC<workSpaceObjContextProviderProps> = ({ children }) => {
    const [workSpaceObjs, setWorkSpaceObj] = useState<any>({});
    const [boardObjs, setBoardObjs] = useState<any>({});

    return (
        <WorkSpaceObjContext.Provider value={{ workSpaceObjs, setWorkSpaceObj, boardObjs, setBoardObjs }}> {/* Provided as an object */}
            {children}
        </WorkSpaceObjContext.Provider>
    );
};

export default WorkSpaceObjContextProvider;
