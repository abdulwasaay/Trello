import React, { useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface notificationProps {
    cardContent: any;
}

const Notificationss: React.FC<notificationProps> = ({ cardContent }) => {
    const [prevCardAct, setPrevCardAct] = useState<boolean>(false);

    return (
        <div className=" shadow-md border-[1px] bg-[#494c4e29] border-[#A6C5E229] rounded-md mt-10 p-3 " >
            <div className="flex items-start gap-3">
                <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-slate-700">
                    {cardContent.cardComments[0]?.shortNamebyUser}
                </div>
                <div className="pr-3 ">
                    <p className="text-[#cad1df] font-semibold text-sm">{cardContent.cardComments[0]?.byUser}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-[#aab5ca] font-normal text-[15px] break-words max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{cardContent.cardComments[0]?.commentName}</p>
                        <p className="text-[#80858f] font-medium text-[13px]">{cardContent.cardComments[0]?.commentTime}</p>
                    </div>
                </div>
            </div>
            {/* <div>
                {cardContent.cardComments[0]?.byUser}
            </div> */}
            <p onClick={() => setPrevCardAct(!prevCardAct)} className=" cursor-pointer text-[#959699] font-medium text-[13px] mt-4">{!prevCardAct ? <span className="flex items-center"><ArrowDropDownIcon />Show previous card activity</span> : <span className="flex items-center"><ArrowDropUpIcon />Hide previous card activity</span>}</p>
            {
                prevCardAct && cardContent.cardComments?.slice(1).map((com: any) => {
                    return (
                        <div className="flex items-start gap-3 mt-5">
                            <div className=" w-10 h-10 rounded-full flex justify-center items-center bg-slate-700">
                                {com?.shortNamebyUser}
                            </div>
                            <div>
                                <p className="text-[#cad1df] font-semibold text-sm">{com?.byUser}</p>
                                <div className="flex items-center gap-2">
                                    <p className="text-[#aab5ca] font-normal text-[15px] break-words max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{com?.commentName}</p>
                                    <p className="text-[#80858f] font-medium text-[13px]">{com?.commentTime}</p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Notificationss