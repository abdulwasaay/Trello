import Skeleton from '@mui/material/Skeleton';

const LoadingNavBar = () => {
    return (
        <nav className="border-b-[1px] border-b-[#58595a] bg-[#1D2125] pt-1 pb-1 pl-6 pr- flex justify-between items-center fixed top-0 w-full" style={{ zIndex: "3" }}>
            <div className="flex items-center gap-10">
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "80px", height: "50px", background: "#7c7d7c" }}>

                    </Skeleton>
                </div>
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "120px", height: "50px", background: "#7c7d7c" }}>

                    </Skeleton>
                </div>
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "80px", height: "50px", background: "#7c7d7c", marginLeft: "40px" }}>

                    </Skeleton>
                </div>
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "80px", height: "50px", background: "#7c7d7c", marginLeft: "40px" }}>

                    </Skeleton>
                </div>
            </div >
            <div className="flex items-center justify-end gap-3 w-full ">
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "120px", height: "50px", background: "#7c7d7c" }}>

                    </Skeleton>
                </div>
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "40px", height: "50px", background: "#7c7d7c", marginLeft: "56px" }}>

                    </Skeleton>
                </div>
                <div className="w-[80px]">
                    <Skeleton sx={{ color: "#7c7d7c", width: "31px", height: "50px", background: "#7c7d7c", borderRadius: "50%", marginLeft: "30px" }}>

                    </Skeleton>
                </div>
            </div>
        </nav >
    )
}

export default LoadingNavBar