import AccessTimeIcon from '@mui/icons-material/AccessTime';

const HomeComp = () => {
    return (
        <div className="w-[910px] border mt-4">
            <div>
                <div className='flex items-center gap-2'><AccessTimeIcon style={{ color: "#aab5ca" }} /> <h1 className='text-[#aab5ca] text-xl font-medium'>Recently viewed</h1></div>
            </div>
        </div>
    )
}

export default HomeComp