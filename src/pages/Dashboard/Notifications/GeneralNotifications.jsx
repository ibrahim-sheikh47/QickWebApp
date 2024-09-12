import React, { useState } from "react";
import circle from "../../../assets/circle.png";
import { notificationsData } from "../../../constants/notification-index";
import { BookingCanceledAdminModal, BookingCanceledUsersModal, BookingConfirmedModal, BookingRequestAcceptedModal, NewBookingModal, NewBookingRequestModal } from "./Modals";

const GeneralNotifications = () => {
    const [isNewBooking, setIsNewBooking] = useState(false);
    const [isNewBookingRequest, setIsNewBookingRequest] = useState(false);
    const [isBookingRequestAccepted, setIsBookingRequestAccepted] = useState(false);
    const [isBookingCanceledUsers, setIsBookingCanceledUsers] = useState(false);
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
    const [isBookingCanceledAdmin, setIsBookingCanceledAdmin] = useState(false);

    const handleModel = (type) => {

        const modalStates = {
            "new-booking": setIsNewBooking,
            "booking-request": setIsNewBookingRequest,
            "booking-request-accepted": setIsBookingRequestAccepted,
            "booking-canceled-users": setIsBookingCanceledUsers,
            "booking-confirmed": setIsBookingConfirmed,
            "booking-canceled-admin": setIsBookingCanceledAdmin,
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
                    General <p className="font-PJSbold text-[16px]">(3)</p>
                </div>
                <div className="flex items-center gap-3 font-PJSregular text-sm">
                    <div className="border-2 px-3 py-2 rounded-full">
                        <select className="px-2" name="" id="">
                            <option value="">All Activity</option>
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
            {
                notificationsData.map((notification) => (
                    <React.Fragment key={notification.id}>
                        <div className="flex items-center cursor-pointer p-4 rounded-xl hover:bg-blueSecondary gap-5 h-[100px]" onClick={() => handleModel(notification.type)}>
                            <div style={{ backgroundColor: notification.bgColor }} className="p-3 rounded-full">
                                <img className="w-[24px]" src={notification.icon} alt="" />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-PJSbold text-[18px]">{notification.title}</p>
                                <p className="flex items-center gap-3 text-[14px] text-secondary">
                                    <span>{notification.name}</span>
                                    <img className="w-2" src={circle} alt="" />
                                    <span>{notification.date}</span>
                                    <img className="w-2" src={circle} alt="" />
                                    <span>{notification.time}</span>
                                </p>
                            </div>
                            <div className="ml-auto mb-auto mt-7">
                                <p className="font-PJSregular text-sm text-secondary">{notification.update}</p>
                            </div>
                        </div>
                        <div className="h-[1px] w-full my-2 bg-secondaryTwenty"></div>
                    </React.Fragment>
                ))
            }

            <NewBookingModal isOpen={isNewBooking} onClose={() => setIsNewBooking(false)} />
            <NewBookingRequestModal isOpen={isNewBookingRequest} onClose={() => setIsNewBookingRequest(false)} />
            <BookingRequestAcceptedModal isOpen={isBookingRequestAccepted} onClose={() => setIsBookingRequestAccepted(false)} />
            <BookingCanceledUsersModal isOpen={isBookingCanceledUsers} onClose={() => setIsBookingCanceledUsers(false)} />
            <BookingConfirmedModal isOpen={isBookingConfirmed} onClose={() => setIsBookingConfirmed(false)} />
            <BookingCanceledAdminModal isOpen={isBookingCanceledAdmin} onClose={() => setIsBookingCanceledAdmin(false)} />
        </div >
    );
};

export default GeneralNotifications;
