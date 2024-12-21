import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { ws_color } from "../../Constants/allConstants";

interface BoardImProps {
    elements: any;
}

const BoardImagesComp: React.FC<BoardImProps> = ({ elements }) => {
    return (
        <Tooltip title={elements?.name}>
            <div className="rounded-md ">
                <div className="w-[230px] h-32 relative cursor-pointer group hover:opacity-70 rounded-md">
                    <div className=" w-full h-full opacity-80 rounded-md" style={{ backgroundColor: ws_color }}></div>
                    {/* <img src={elements?.url} alt="url" className="opacity-60 rounded-md" /> */}
                    <div className="absolute top-0 w-full h-full rounded-md">
                        <h3
                            className="text-white ml-3 mt-2 font-bold pr-8 break-words truncate-ellipsis"
                            style={{
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {elements?.name}
                        </h3>
                    </div>
                </div>
            </div>
        </Tooltip>
    );
};

export default BoardImagesComp;
