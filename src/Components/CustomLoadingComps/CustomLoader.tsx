import { CircularProgress } from "@mui/material"

const CustomLoader = () => {
    return (
        <div className="w-[910px] mt-4 ml-[270px] pl-40 flex items-center h-[60vh]">
            <CircularProgress />
        </div>
    )
}

export default CustomLoader