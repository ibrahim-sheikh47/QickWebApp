import { useState } from 'react';

// Import SVG images
import Info from "../../../assets/svgs/Info.svg";
import Facility from "../../../assets/svgs/TennisBall.svg";
import Next from "../../../assets/svgs/Chevron_Left.svg";
import OperationHrs from "../../../assets/svgs/DoorOpen.svg";
import bankAccount from "../../../assets/svgs/bankAccount.svg";
import FieldPrice from "../../../assets/svgs/FlagBanner.svg";
import FacilityRules from "../../../assets/svgs/BookOpen.svg";
import FacilityManagers from "../../../assets/svgs/User-black.svg";
import Discounts from "../../../assets/svgs/Percent.svg";
import { BankAccountContent, DiscountContent, FacilityManagersContent, FacilityRulesContent, FieldPriceContent, HrsOperationContent, MyFacilityContent } from './ProfileContent';

const Profile = () => {
    const items = [
        { image: Facility, heading: "My Facility", content: <MyFacilityContent /> },
        { image: OperationHrs, heading: "Hours of Operation", content: <HrsOperationContent /> },
        { image: FieldPrice, heading: "Fields and Prices", content: <FieldPriceContent /> },
        { image: FacilityRules, heading: "Facility Rules", content: <FacilityRulesContent /> },
        { image: FacilityManagers, heading: "Facility Managers", content: <FacilityManagersContent /> },
        { image: Discounts, heading: "Discounts", content: <DiscountContent /> },
        { image: bankAccount, heading: "Bank Account", content: <BankAccountContent /> },
    ];

    const [selectedItem, setSelectedItem] = useState(items[0]);

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
                            <img src={Info} className="w-[20px] h-[20px]" alt="Info" />
                        </button>
                    </div>
                    <div className="font-PJSregular text-[14px] text-secondary">
                        Setup your profile settings
                    </div>
                </div>
            </div>
            <div className="flex items-start w-full mt-3 bg-white rounded-2xl">
                <div className="border-r-2 border-r-secondaryTen  w-[35%] h-full cursor-pointer ">
                    {items.map((item, index) => (
                        <div key={index}>

                            <div
                                className={`flex items-center h-[100px] px-5 gap-5 ${selectedItem.heading === item.heading ? 'bg-secondaryTen' : 'hover:bg-secondaryTen'}
                    ${index === 0 ? 'rounded-tl-2xl' : ''}
                    ${index === items.length - 1 ? 'rounded-bl-2xl' : ''}`}
                                onClick={() => handleItemClick(item)}
                            >
                                <div className="bg-secondaryTen p-3 rounded-full">
                                    <img src={item.image} className="w-6" alt="" />
                                </div>
                                <p className='font-PJSmedium'>{item.heading}</p>
                                <img className="ml-auto" src={Next} alt="" />

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