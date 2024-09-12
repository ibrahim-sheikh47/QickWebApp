import Back from "../../../assets/svgs/back.svg";
import search from "../../../assets/svgs/Search.svg";
import down from "../../../assets/svgs/Down.svg";
import download from "../../../assets/svgs/Export.svg";
import { useState } from "react";
import {
    NewBookingSalesModal,
    RecurringBookingSalesModal,
} from "./ReportsDetails";
import { sales } from "../../../constants/reportsIndex";

const SalesReport = () => {

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [newBookingSalesModal, setNewBookingSalesModal] = useState(false);
    const [recurringBookingSalesModal, setRecurringBookingSalesModal] = useState(false);

    const handleBookingClick = (booking) => {
        setSelectedBooking(booking);
        const modalStateMap = {
            "New Booking": setNewBookingSalesModal,
            "Recurring Booking": setRecurringBookingSalesModal,
        };

        const modalSetter = modalStateMap[booking.type];
        if (modalSetter) {
            modalSetter(true);
        }
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
                        <p className="text-2xl font-PJSbold text-primary">Sales
                            <span className="text-secondary font-PJSregular text-sm ml-1">($5,432.77 from 42 results)</span>
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
                        <div className="border-2 border-secondaryThirty bg-transparent w-[115px] text-center justify-center flex h-[42px] rounded-full">
                            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">All Fields
                                <img src={down} alt="Down" /></p>
                        </div>
                        <div className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full">
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
                    {sales.map((booking, index) => (
                        <>
                            <div key={booking.id} className={`grid grid-cols-6 items-center gap-20 mx-7 text-sm font-PJSmedium mt-4`} onClick={() => handleBookingClick(booking)}>
                                <p className="flex items-center gap-4 p-2 ">
                                    <span className="p-1 px-[10px] bg-secondaryTwenty rounded-full">{index + 1}
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
                                <p className={`${booking.payment === 'Error' ? 'text-redbutton' : 'text-primary'}`}>{booking.payment}</p>
                            </div>
                            <div className="h-[1px] bg-secondaryTwenty my-5"></div></>
                    ))}

                </div>

                <NewBookingSalesModal isOpen={newBookingSalesModal} onClose={() => setNewBookingSalesModal(false)} booking={selectedBooking} />
                <RecurringBookingSalesModal isOpen={recurringBookingSalesModal} onClose={() => setRecurringBookingSalesModal(false)} booking={selectedBooking} />

            </div>
        </>
    );
}

export default SalesReport;
