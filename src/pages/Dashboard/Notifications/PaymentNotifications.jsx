import React, { useState } from "react";
import { paymentNotifications } from "../../../constants/notification-index";
import { AdminCancelationModal, AllocatedCreditsModal, PaymentReceivedModal, UserCancelationModal } from "./Modals";
import assets from "../../../assets/assets";

const GeneralNotifications = () => {
    const [isPaymentReceived, setIsPaymentReceived] = useState(false);
    const [isUserCancelation, setIsUserCancelation] = useState(false);
    const [isAdminCancelation, setIsAdminCancelation] = useState(false);
    const [isAllocatedCredits, setIsAllocatedCredits] = useState(false);

    const handleModel = (type) => {

        const modalStates = {
            "payment-received": setIsPaymentReceived,
            "payment-received-usercancelation": setIsUserCancelation,
            "payment-received-admincancelation": setIsAdminCancelation,
            "payment-received-allocatecredits": setIsAllocatedCredits,
        };

        const setStateFunction = modalStates[type];
        if (setStateFunction) {
            setStateFunction(true);
        }
    };




    return (
        <div className="bg-white rounded-2xl p-5 mt-10">
            <div className="flex justify-between p-4 mt-4 rounded-xl">
                <div className="font-PJSbold text-[22px] flex gap-2 items-center">
                    Payment <p className="font-PJSbold text-[16px]">(3)</p>
                </div>
                <div className="flex items-center gap-3 font-PJSregular text-sm">
                    <div className="border-2 px-3 py-2 rounded-full">
                        <select className="px-2" name="" id="">
                            <option value="">South Field</option>
                        </select>
                    </div>
                    <div className="border-2 px-5 py-2 rounded-full">
                        Mark All as Read
                    </div>
                    <div className="border-2 px-5 py-2 rounded-full">
                        Clear
                    </div>
                </div>
            </div>
            {paymentNotifications.map((notification) => (
                <React.Fragment key={notification.id}>
                    <div className="flex items-center cursor-pointer p-4 rounded-xl hover:bg-blueSecondary gap-5 h-[100px]" onClick={() => handleModel(notification.type)}>
                        <div className="p-3 rounded-full bg-[#e8faf3]">
                            <img className="w-7" src={assets.dollar} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-PJSbold text-[18px]">{notification.title}</p>
                            <p className="flex items-center gap-3 text-[14px] text-secondary">
                                <span>{notification.name}</span>
                                <img className="w-2" src={assets.circle} alt="" />
                                <span>{notification.date}</span>
                                <img className="w-2" src={assets.circle} alt="" />
                                <span>{notification.time}</span>
                            </p>
                        </div>
                        <div className="ml-auto mb-auto mt-7">
                            <p className="font-PJSregular text-sm text-secondary">{notification.update}</p>
                        </div>
                    </div>
                    <div className="h-[1px] w-full my-2 bg-secondaryTwenty"></div>
                </React.Fragment>
            ))}

            <PaymentReceivedModal isOpen={isPaymentReceived} onClose={() => setIsPaymentReceived(false)} />
            <UserCancelationModal isOpen={isUserCancelation} onClose={() => setIsUserCancelation(false)} />
            <AdminCancelationModal isOpen={isAdminCancelation} onClose={() => setIsAdminCancelation(false)} />
            <AllocatedCreditsModal isOpen={isAllocatedCredits} onClose={() => setIsAllocatedCredits(false)} />
        </div>
    );
};

export default GeneralNotifications;
