/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AppModal } from "../../../components";

import { useState } from "react";
import BookingDetails from "./BookingDetails";
import assets from "../../../assets/assets";

////////////MODALS FOR GENERAL NOTIFICATION/////////////
const NewBookingModal = ({ isOpen, onClose }) => {
    const [isCancelConfirmationModalOpen, setIsCancelConfirmationModalOpen] = useState(false);
    const [isBookingCanceledAdminOpen, setIsBookingCanceledAdminOpen] = useState(false);

    const handleCancelBooking = () => {
        setIsCancelConfirmationModalOpen(true);
        onClose();

    };
    const handleCancelPenalty = () => {
        setIsBookingCanceledAdminOpen(true);
        setIsCancelConfirmationModalOpen(false);
    }


    const handleDone = () => {
        onClose();
    }

    return (
        <>
            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.PlusIcon} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">New Booking</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You received a new booking
                    </p>

                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />

                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleCancelBooking}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Cancel Booking
                    </button>
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>

            <AppModal modalopen={isCancelConfirmationModalOpen} onClose={() => setIsCancelConfirmationModalOpen(false)} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Info} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Cancel Booking</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You are about to cancel this booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleCancelPenalty}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Cancel W/O Penalty
                    </button>
                    <button onClick={handleCancelPenalty}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Cancel & Allocate Credits
                    </button>

                </div>
            </AppModal>
            <BookingCanceledAdminModal isOpen={isBookingCanceledAdminOpen} onClose={() => setIsBookingCanceledAdminOpen(false)} />
        </>
    );
};
const NewBookingRequestModal = ({ isOpen, onClose }) => {
    const [isBookingRequestModalOpen, setIsBookingRequestModalOpen] = useState(false);

    const handleBookingAccept = () => {
        setIsBookingRequestModalOpen(true);
        onClose();
    }
    const handleDeny = () => {
        onClose();
    }
    const handleDone = () => {
        setIsBookingRequestModalOpen(false);
    }

    return (
        <>

            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Calendar} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">New Booking Request</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You have received a new booking request
                    </p>

                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />

                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Requested by Mike Towers (ID31)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDeny}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Deny
                    </button>
                    <button onClick={handleBookingAccept}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Accept
                    </button>

                </div>
            </AppModal>

            <AppModal modalopen={isBookingRequestModalOpen} onClose={() => setIsBookingRequestModalOpen(false)} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Booking Request Accepted</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You have accepted this booking request
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        New Booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>
        </>
    );
};
const BookingRequestAcceptedModal = ({ isOpen, onClose }) => {

    const handleDone = () => {
        onClose();
    }

    return (
        <>
            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#e8faf3]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Booking Request Accepted</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You have accepted this booking request
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        New Booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>

        </>
    );
};
const BookingCanceledUsersModal = ({ isOpen, onClose }) => (
    <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
        <div className="modal-content p-10">
            <h2>Booking Canceled by Users Modal</h2>
            {/* Add your modal content here */}
        </div>
    </AppModal>
);
const BookingConfirmedModal = ({ isOpen, onClose }) => (
    <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
        <div className="modal-content p-10">
            <h2>Booking Confirmed Modal</h2>
            {/* Add your modal content here */}
        </div>
    </AppModal>
);
const BookingCanceledAdminModal = ({ isOpen, onClose }) => {
    const [isOpenMatchModalOpen, setIsOpenMatchModalOpen] = useState(false);
    const [isOpenGameModalOpen, setIsOpenGameModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    const discounts = ['No Discount', '10% off', '25% off', '50% off'];

    const handleOpenMatch = () => {
        setIsOpenMatchModalOpen(true);
        onClose();
    };
    const handlDone = () => {
        setIsOpenGameModalOpen(false);
    }
    const handleOpenGame = () => {
        setIsOpenGameModalOpen(true);
        setIsOpenMatchModalOpen(false);
        onClose();
    };
    const handleClose = () => {
        onClose();
    }
    const handleBackBtn = () => {
        setIsOpenMatchModalOpen(false);
    };



    return (
        <>
            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#fdeeee]">
                        <img className="w-8" src={assets.Cross} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Booking Canceled: Admin</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You have canceled the booking and opted not to apply any
                        charges to the users
                    </p>

                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />

                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">Recurring Booking</p>
                    <p className="mt-2 w-[420px] mx-auto text-secondary font-PJSregular text-[14px]">We can still find players to fill this spot. Simply tap the 'Open Match' button to give it a boost within the app. Our system will then send out mass push notifications to users who've tagged your facility as a favorite.  </p>

                    <p className="font-PJSbold mt-5">What's your next move?</p>


                </div>



                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleClose}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Close
                    </button>
                    <button onClick={handleOpenMatch}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Open Match
                    </button>

                </div>
            </AppModal>

            <AppModal modalopen={isOpenMatchModalOpen} onClose={() => setIsOpenMatchModalOpen(false)} height="auto" width={500}>
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Discount} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Discount</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        Would you like to offer a discount to increase the likelihood of
                        booking this spot?
                    </p>

                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">Recurring Booking</p>

                    <div className="grid grid-rows grid-cols-2 gap-4 font-PJSregular mt-10 cursor-pointer">
                        {discounts.map((discount, index) => (
                            <div
                                key={index}
                                className={`border-2 rounded-lg py-5 ${activeIndex === index ? 'border-[#33C0DB]' : ''}`}
                                onClick={() => setActiveIndex(index)}
                            >
                                {discount}
                            </div>
                        ))}
                    </div>

                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleBackBtn}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Back
                    </button>
                    <button onClick={handleOpenGame}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Open Game
                    </button>

                </div>
            </AppModal>
            <AppModal modalopen={isOpenGameModalOpen} onClose={() => setIsOpenGameModalOpen(false)} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#e8faf3]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Success</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        The following spot will now be promoted inside user app
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handlDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>
        </>
    );
};

////////////MODALS FOR PAYMENT NOTIFICATION/////////////
const PaymentReceivedModal = ({ isOpen, onClose }) => {
    const [isPaymentReceivedModalOpen, setIsPaymentReceivedModalOpen] = useState(false);
    const [isCreditAllocateModalOpen, setIsCreditAllocateModalOpen] = useState(false);

    const handleAllocatedCredits = () => {
        setIsPaymentReceivedModalOpen(true);
        onClose();
    }
    const handleDone = () => {
        setIsPaymentReceivedModalOpen(false);
        setIsCreditAllocateModalOpen(false);
        onClose();
    }

    const handleCreditDone = () => {
        setIsCreditAllocateModalOpen(true);
        setIsPaymentReceivedModalOpen(false);
    }

    return (
        <>

            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Payment Received</h2>
                    <p className="mt-2 w-84 mx-auto text-secondary font-PJSregular text-[14px]">
                        Payment was received in full for the following booking
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        New Booking
                    </p>

                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />

                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Requested by Mike Towers (ID31)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleAllocatedCredits}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Allocate Credits
                    </button>
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>

            <AppModal modalopen={isPaymentReceivedModalOpen} onClose={() => setIsPaymentReceivedModalOpen(false)} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Info} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Allocate Credits</h2>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSregular text-[14px]">
                        You’re about to allocate credits for this booking
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        New Booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                    >
                        Back
                    </button>
                    <button onClick={handleCreditDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Allocate Credits
                    </button>

                </div>
            </AppModal>
            <AppModal modalopen={isCreditAllocateModalOpen} onClose={() => setIsCreditAllocateModalOpen(false)} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#ebf9fb]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5"> Credits Allocated</h2>
                    <p className="mt-2 w-96 mx-auto text-secondary font-PJSregular text-[14px]">
                        You canceled the booking and allocated credits in favor of the clients.
                        You have received payment for the following booking
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        New Booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>
        </>
    );
};
const UserCancelationModal = ({ isOpen, onClose }) => {

    const handleDone = () => {
        onClose();
    }

    return (
        <>
            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#e8faf3]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Payment Received: User Cancelation</h2>
                    <p className="mt-2 w-96 mx-auto text-secondary font-PJSregular text-[14px]">
                        The client canceled on time and was allocated credits. You have
                        received payment for the following booking
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        Recurring Booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime  font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>

        </>
    );
};
const AdminCancelationModal = ({ isOpen, onClose }) => {

    const handleDone = () => {
        onClose();
    }

    return (
        <>
            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="text-center mt-12 flex flex-col">
                    <div className="mx-auto p-3 rounded-full w-[max-content] bg-[#e8faf3]">
                        <img className="w-8" src={assets.Check} alt="" />
                    </div>
                    <h2 className="font-PJSbold text-lg mt-5">Payment Received: Admin Cancelation</h2>
                    <p className="mt-2 w-96 mx-auto text-secondary font-PJSregular text-[14px]">
                        You have canceled the booking and credited the users accordingly. Payment has been received for the following booking
                    </p>
                    <p className="mt-2 w-80 mx-auto text-secondary font-PJSbold text-[14px]">
                        Recurring Booking
                    </p>
                    <BookingDetails
                        court="Main Court"
                        date="May 15, 2024"
                        time="6-7PM"
                        price="$20.00"
                        bookingId="B4557"
                    />
                    <div className="mt-5 text-sm flex justify-center gap-3 items-center">
                        <p className=" font-PJSbold">Booked by Angelina Marcus (ID37)</p>
                        <Link to="/Dashboard/Chats">
                            <span className="bg-[#ebf9fb] text-[12px] font-PJSregular  px-1 rounded">Chat</span></Link>
                    </div>
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button onClick={handleDone}
                        className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime  font-PJSmedium justify-center items-center "
                    >
                        Done
                    </button>

                </div>
            </AppModal>

        </>
    );
};
const AllocatedCreditsModal = ({ isOpen, onClose }) => {
    return (
        <>
            <AppModal modalopen={isOpen} onClose={onClose} height="auto" width="auto">
                <div className="modal-content p-10">
                    <h2>Payment Received Allocated Credits Modal</h2>
                    {/* Add your modal content here */}
                </div>
            </AppModal>

        </>
    );
}
export { BookingCanceledAdminModal, BookingCanceledUsersModal, BookingRequestAcceptedModal, BookingConfirmedModal, NewBookingModal, NewBookingRequestModal, PaymentReceivedModal, UserCancelationModal, AdminCancelationModal, AllocatedCreditsModal }
