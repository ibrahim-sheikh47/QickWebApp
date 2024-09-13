import { useState } from 'react';
import { profileItems } from '../../../constants/profile-index';
import assets from '../../../assets/assets';

const Profile = () => {


    const [selectedItem, setSelectedItem] = useState(profileItems[0]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1">
                        <div className="font-PJSbold text-2xl">Profile</div>
                        <button>
                            <img src={assets.Info} className="w-[20px] h-[20px]" alt="Info" />
                        </button>
                    </div>
                    <div className="font-PJSregular text-[14px] text-secondary">
                        Setup your profile settings
                    </div>
                </div>
            </div>
            <div className="flex items-start w-full mt-3 bg-white rounded-2xl">
                <div className="border-r-2 border-r-secondaryTen  w-[35%] h-full cursor-pointer ">
                    {profileItems.map((item, index) => (
                        <div key={index}>

                            <div
                                className={`flex items-center h-[100px] px-5 gap-5 ${selectedItem.heading === item.heading ? 'bg-secondaryTen' : 'hover:bg-secondaryTen'}
                    ${index === 0 ? 'rounded-tl-2xl' : ''}
                    ${index === profileItems.length - 1 ? 'rounded-bl-2xl' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="bg-secondaryTen p-3 rounded-full">
                                    <img src={item.image} className="w-6" alt="" />
                                </div>
                                <p className='font-PJSmedium'>{item.heading}</p>
                                <img className="ml-auto" src={assets.Next} alt="" />

                            </div>
                            <div className="h-[1px]  bg-secondaryTen"></div>
                        </div>
                    ))}
                </div>
                <div className="w-[65%] h-[700px]  overflow-y-auto no-scrollbar">
                    <div className=" rounded-tr-xl rounded-br-xl p-7">
                        <div>{selectedItem.content}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;