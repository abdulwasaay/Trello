import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Tooltip from "@mui/material/Tooltip";

interface BoardImProps {
    elements: any;
}

const BoardImagesComp: React.FC<BoardImProps> = ({ elements }) => {
    return (
        <Tooltip title={elements?.name}>
            <div className="rounded-md ">
                <div className="w-48 relative cursor-pointer group hover:opacity-70 rounded-md">
                    <img src={elements?.url} alt="url" className="opacity-60 rounded-md" />
                    <div className="absolute top-0 w-48 h-full rounded-md">
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
                        <button className="absolute bottom-1 right-1 hidden group-hover:block" >
                            <StarBorderIcon
                                style={{
                                    fontSize: "18px",
                                    color: "white",
                                    fontWeight: "700",
                                }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </Tooltip>
    );
};

export default BoardImagesComp;
