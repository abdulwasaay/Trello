import notificationsDummy from '../../dummydata';
import Notificationss from '../NotificationsComps/Notifications';

const HomeComp = () => {
    return (
        <div className="w-[800px] h-full flex">
            <div className="  pr-[20px] w-[500px] h-[75vh] overflow-y-auto">
                <h1 className="text-xl text-[#aab5ca] font-medium border-b-[1px] border-b-[#58595a] pb-4">Notifications</h1>
                <div className='h-[40vh]'>
                    {
                        notificationsDummy.map((not: any) => {
                            return (
                                <Notificationss
                                    cardContent={not}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <div>
                sd
            </div>
        </div>
    )
}

export default HomeComp