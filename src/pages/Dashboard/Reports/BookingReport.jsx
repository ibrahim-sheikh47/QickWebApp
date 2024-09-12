import Back from "../../../assets/svgs/back.svg";
import search from "../../../assets/svgs/Search.svg";
import down from "../../../assets/svgs/Down.svg";
import download from "../../../assets/svgs/Export.svg";
import { useState } from "react";
import CheckCircle from "../../../assets/svgs/CheckCircleBlue.svg";
import {
    NewBookingModal,
    RecurringBookingModal,
    LeagueSemiFinalsModal,
    PickupFreePlayModal,
    AcademyModal
} from "./ReportsDetails";
import { bookings } from "../../../constants/reportsIndex";
import { AppModal } from "../../../components";

const BookingReport = () => {

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newBookingModal, setNewBookingModal] = useState(false);
    const [recurringBookingModal, setRecurringBookingModal] = useState(false);
    const [leagueSemiFinalsModal, setLeagueSemiFinalsModal] = useState(false);
    const [pickupFreePlayModal, setPickupFreePlayModal] = useState(false);
    const [academyModal, setAcademyModal] = useState(false);

    const [isDwdModalOpen, setIsDwdModalOpen] = useState(false);
    const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const openDownloadModal = () => {
        setIsDwdModalOpen(true);
    };

    const closeModal = () => {
        setIsDwdModalOpen(false);
        setIsFieldModalOpen(false);
    };
    const openFieldModal = () => {
        setIsFieldModalOpen(true);
    };


    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        const modalStateMap = {
            "New Booking": setNewBookingModal,
            "Recurring Booking": setRecurringBookingModal,
            "League: Semi-Finals": setLeagueSemiFinalsModal,
            "Pickup: Free Play": setPickupFreePlayModal,
            "Academy": setAcademyModal
        };

        const modalSetter = modalStateMap[booking.type];
        if (modalSetter) {
            modalSetter(true);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    function backNav() {
        window.history.back();
    }
    return (
        <>
            <div className="">
                <p className="font-PJSextra text-3xl text-primary">Futeca</p>
                <p className="font-PJSregular text-sm text-secondary mt-2">Elevate your soccer experience</p>
            </div>

            <div className="bg-white rounded-lg mt-5 p-4">
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4"  >
                        <img src={Back} alt="Back" onClick={backNav} className="cursor-pointer" />
                        <p className="text-2xl font-PJSbold text-primary">Bookings
                            <span className="text-secondary font-PJSregular text-sm ml-1">(271 Results)</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex justify-center items-center">
                            <form action="" className="relative mx-auto w-max">
                                <input
                                    type="search"
                                    className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border-2 border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                                />
                                <img
                                    className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                                    src={search}
                                    alt="Search"
                                />
                            </form>
                        </button>
                        <div className="border-2 border-secondaryThirty bg-transparent w-[170px] text-center justify-center flex h-[42px] rounded-full">
                            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">1 Jan - 31 Jan 2021
                                <img src={down} alt="Down" /></p>
                        </div>
                        <div className="border-2 border-secondaryThirty bg-transparent w-[115px] text-center justify-center flex h-[42px] rounded-full relative cursor-pointer" onClick={openFieldModal}>
                            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">All Fields
                                <img src={down} alt="Down" /></p>
                        </div>
                        <div className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full cursor-pointer" onClick={openDownloadModal}>
                            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                                <img src={download} className="w-5 h-5" alt="Download" />
                                Download
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-6 items-center gap-20 mx-7 text-sm font-PJSmedium text-[#8f9499] mt-5 ">
                    <p>Booking Holder</p>
                    <p className="ml-5">Date</p>
                    <p>Booking Type</p>
                    <p>Field Booked</p>
                    <p>Time</p>
                    <p>Status</p>
                </div>

                <div className="h-[1px]  bg-secondaryThirty mt-1"></div>
                <div className="cursor-pointer">
                    {bookings.map((booking, index) => (
                        <>
                            <div key={booking.id} className={`grid grid-cols-6 items-center gap-20 mx-7 text-sm font-PJSmedium mt-4 ${booking.status === 'Client Cancellation' || booking.status === 'Removed' || booking.status === 'Admin Cancellation' ? 'text-secondary' : 'text-primary'}`} onClick={() => handleBookingClick(booking)}>
                                <p className="flex items-center gap-4 p-2 ">
                                    <span className="p-1 px-2 bg-secondaryTwenty rounded-full">{index + 1}
                                    </span>
                                    <span>{booking.holder}</span>
                                </p>
                                <p className="flex flex-col ml-5">
                                    <span>{booking.day}</span>
                                    <span className="whitespace-nowrap">{booking.date}</span>
                                </p>
                                <p className="underline whitespace-nowrap">{booking.type}</p>
                                <p>{booking.field}</p>
                                <p>{booking.time}</p>
                                <p>{booking.status}</p>
                            </div>
                            <div className="h-[1px] bg-secondaryTwenty my-5"></div>
                        </>
                    ))}

                </div>

                <NewBookingModal isOpen={newBookingModal} onClose={() => setNewBookingModal(false)} booking={selectedBooking} />
                <RecurringBookingModal isOpen={recurringBookingModal} onClose={() => setRecurringBookingModal(false)} booking={selectedBooking} />
                <LeagueSemiFinalsModal isOpen={leagueSemiFinalsModal} onClose={() => setLeagueSemiFinalsModal(false)} booking={selectedBooking} />
                <PickupFreePlayModal isOpen={pickupFreePlayModal} onClose={() => setPickupFreePlayModal(false)} booking={selectedBooking} />
                <AcademyModal isOpen={academyModal} onClose={() => setAcademyModal(false)} booking={selectedBooking} />

            </div>

            <AppModal
                modalopen={isDwdModalOpen}
                onClose={closeModal}
                height="214px"
                width="300px"
                customStyles={{
                    overlay: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    },
                    modal: {
                        position: 'absolute',
                        top: '35%',
                        right: '0',
                        transform: 'translate(-20%, -20%)',
                        margin: '0',
                    },
                }}>
                <div className="mt-0">
                    <div className="flex items-center gap-2">
                        <img src={download} className="w-5 h-5" alt="" />
                        <p className="font-PJSmedium text-sm">Download</p>
                    </div>
                    <div className="h-[1px] w-full my-3 bg-secondaryThirty"></div>

                    <div className="font-PJSmedium text-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('As PDF')}>
                            <p>As PDF</p>
                            {selectedOption === 'As PDF' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('As CSV')}>
                            <p>As CSV</p>
                            {selectedOption === 'As CSV' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('As Excel')}>
                            <p>As Excel</p>
                            {selectedOption === 'As Excel' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                    </div>
                    <button
                        className="w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                    >
                        Download
                    </button>
                </div>

            </AppModal>

            <AppModal
                modalopen={isFieldModalOpen}
                onClose={closeModal}
                height="280px"
                width="300px"
                customStyles={{
                    overlay: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    },
                    modal: {
                        position: 'absolute',
                        top: '45%',
                        right: '0',
                        transform: 'translate(-50%, -50%)',
                        margin: '0',
                    },
                }}>
                <div className="mt-0">
                    <p className="font-PJSmedium text-sm">Filter</p>
                    <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

                    <div className="font-PJSmedium text-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('All Fields')}>
                            <p className="underline">All Fields</p>
                            {selectedOption === 'All Fields' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('East Field')}>
                            <p>East Field</p>
                            {selectedOption === 'East Field' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('Jr Field')}>
                            <p>Jr Field</p>
                            {selectedOption === 'Jr Field' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('North Field')}>
                            <p>North Field</p>
                            {selectedOption === 'North Field' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('South Field')}>
                            <p>South Field</p>
                            {selectedOption === 'South Field' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                    </div>
                    <button
                        className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                    >
                        Apply
                    </button>
                </div>

            </AppModal>
        </>
    );
}

export default BookingReport;
