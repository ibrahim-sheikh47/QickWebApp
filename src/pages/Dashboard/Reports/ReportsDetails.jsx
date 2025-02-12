/* eslint-disable react/prop-types */

import { AppModal } from "../../../components";
import hash from "../../../assets/svgs/Hash.svg";
import info from "../../../assets/svgs/Info.svg";
import dollar from "../../../assets/svgs/dollar.svg";
import Clock from "../../../assets/svgs/Clock.svg";
import calendar from "../../../assets/svgs/CalendarBlack.svg";
import React, { useState } from "react";
import {
  paymentDetails,
  paymentRecurDetails,
} from "../../../constants/reportsIndex";
import { formattedDate, formattedTime } from "../../../constants";

/////////////////////////////////BOOKING///////////////////////////

const NewBookingModal = ({ isOpen, onClose, booking }) => (
  <AppModal modalopen={isOpen} onClose={onClose} height="400px" width="495px">
    <div>
      <p className="text-xl font-PJSbold text-primary">Booking Details</p>
      {booking && (
        <div className="text-sm text-primary font-PJSbold mt-5">
          <p>
            <span>{booking.day} , </span>
            <span>{booking.date}</span>
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="mt-2 font-PJSbold text-primary text-sm w-[256px]">
          Recurring booking linked with Tigers T56(Admin: Angelina Marcus ID45)
        </p>
        <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
          <p>Chat</p>
        </div>
      </div>

      <div className="h-[1px]  bg-secondaryThirty my-4"></div>
      <div className="flex mt-2 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-secondaryTen p-4">
            <img className="w-6 h-6" alt="" src={hash} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-PJSmedium text-secondary text-xs">Booking ID</p>
            <p className="font-PJSmedium text-sm">B4555</p>
          </div>
        </div>
        <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
          <p>Copy</p>
        </div>
      </div>

      <div className="h-[1px]  bg-secondaryThirty my-4"></div>
      <p className="font-PJSregular text-sm text-secondary italic">
        Activity Log: This booking was added by Ali Lal Din on May 4th, 2023 at
        2:56 pm.
      </p>

      <button
        onClick={onClose}
        className="w-full mt-5 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
      >
        Close
      </button>
    </div>
  </AppModal>
);

const RecurringBookingModal = ({ isOpen, onClose, booking }) => (
  <AppModal modalopen={isOpen} onClose={onClose} height="440px" width="495px">
    <div>
      <p className="text-xl font-PJSbold text-primary">Booking Details</p>
      {booking && (
        <div className="text-sm text-primary font-PJSbold mt-5">
          <p>
            <span>{booking.day} , </span>
            <span>{booking.date}</span>
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className="mt-2 font-PJSbold text-primary text-sm w-[256px]">
          Recurring booking linked with Ashton Brown (ID99)
        </p>
        <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
          <p>Chat</p>
        </div>
      </div>

      <div className="h-[1px]  bg-secondaryThirty my-4"></div>
      <div className="flex mt-2 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-secondaryTen p-4">
            <img className="w-6 h-6" alt="" src={hash} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-PJSmedium text-secondary text-xs">Booking ID</p>
            <p className="font-PJSmedium text-sm">B4555</p>
          </div>
        </div>
        <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
          <p>Copy</p>
        </div>
      </div>

      <div className="h-[1px]  bg-secondaryThirty my-4"></div>
      <p className="font-PJSregular text-sm text-secondary italic">
        Activity Log: This booking was added by Ali Lal Din on May 4th, 2023 at
        2:56 pm.
      </p>

      <p className="font-PJSregular text-sm text-secondary italic mt-3">
        Activity Log: This booking was canceled by Ali Lal Din on Jan 1st, 2024
        at 2:09 pm.
      </p>
      <button
        onClick={onClose}
        className="w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
      >
        Close
      </button>
    </div>
  </AppModal>
);

const LeagueSemiFinalsModal = ({ isOpen, onClose, booking }) => (
  <AppModal modalopen={isOpen} onClose={onClose} height="400px" width="495px">
    <div>
      <p className="text-xl font-PJSbold text-primary">Booking Details</p>
      {booking && (
        <div className="text-sm text-primary font-PJSbold mt-5">
          <p>
            <span>{booking.day} , </span>
            <span>{booking.date}</span>
          </p>
        </div>
      )}
      <p className="mt-2 font-PJSbold text-primary text-sm ">
        League: Semi-Finals: Rockets vs Orlandians
      </p>

      <div className="h-[1px]  bg-secondaryThirty my-5"></div>
      <div className="flex mt-2 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-secondaryTen p-4">
            <img className="w-6 h-6" alt="" src={hash} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-PJSmedium text-secondary text-xs">Booking ID</p>
            <p className="font-PJSmedium text-sm">
              NA-3344{" "}
              <span className="text-xs text-secondary">(not app related)</span>
            </p>
          </div>
        </div>
        <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
          <p>Copy</p>
        </div>
      </div>

      <div className="h-[1px]  bg-secondaryThirty my-5"></div>
      <p className="font-PJSregular text-sm text-secondary italic">
        Activity Log: This booking was added by Ali Lal Din on May 4th, 2023 at
        2:56 pm.
      </p>

      <button
        onClick={onClose}
        className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
      >
        Close
      </button>
    </div>
  </AppModal>
);
const PickupFreePlayModal = ({ isOpen, onClose }) => (
  <AppModal
    modalopen={isOpen}
    onClose={onClose}
    height="auto"
    width="auto"
  ></AppModal>
);
const AcademyModal = ({ isOpen, onClose }) => (
  <AppModal
    modalopen={isOpen}
    onClose={onClose}
    height="auto"
    width="auto"
  ></AppModal>
);

///////////////////////////////////SALES////////////////////////////////

const NewBookingSalesModal = ({ isOpen, onClose, booking }) => {
  if (!booking) return;

  return (
    <AppModal
      modalopen={isOpen}
      onClose={onClose}
      height="100vh"
      width="auto"
      customStyles={{ modal: { overflowY: "auto" } }}
    >
      <div className="flex">
        <div className="mr-10">
          <p className="text-xl font-PJSbold text-primary">Details</p>
          <div className="text-sm text-primary font-PJSbold mt-5">
            <p>
              <span>{formattedDate(booking.startDateTime)}</span>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="mt-2 font-PJSbold text-primary text-sm w-[256px]">
              {`New Booking: ${booking.user.name}`}
            </p>
            <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
              <p>Chat</p>
            </div>
          </div>

          <div className="h-[1px]  bg-secondaryThirty my-4"></div>
          <div className="flex mt-2 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-secondaryTen p-4">
                <img className="w-6 h-6" alt="" src={hash} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-PJSmedium text-secondary text-xs">
                  Booking ID
                </p>
                <p className="font-PJSmedium text-sm">
                  {booking.bookingNumber}
                </p>
              </div>
            </div>
            <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
              <p>Copy</p>
            </div>
          </div>
          <div className="h-[1px]  bg-secondaryThirty my-4"></div>
          <div className="flex items-center gap-3 mt-3">
            <div className="rounded-full bg-secondaryTen p-4">
              <img className="w-6 h-6" alt="" src={calendar} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-PJSmedium text-secondary text-xs">
                Booking Date
              </p>
              <p className="font-PJSmedium text-sm">
                <span>{formattedDate(booking.startDateTime)}</span>
              </p>
            </div>
          </div>

          <div className="h-[1px]  bg-secondaryThirty my-4"></div>
          <div className="flex items-center gap-3 mt-3">
            <div className="rounded-full bg-secondaryTen p-4">
              <img className="w-6 h-6" alt="" src={dollar} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-PJSmedium text-secondary text-xs">
                Payment Date
              </p>
              <p className="font-PJSmedium text-sm">
                Mon, Jan 31st, 2024, 8:15pm{" "}
                <span className="text-secondary"> (Mastercard ****7789)</span>
              </p>
            </div>
          </div>

          <div className="h-[1px]  bg-secondaryThirty my-4"></div>
          <div className="flex items-center gap-3 mt-3">
            <div className="rounded-full bg-secondaryTen p-4">
              <img className="w-6 h-6" alt="" src={calendar} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-PJSmedium text-secondary text-xs">
                Field, Time
              </p>
              <p className="font-PJSmedium text-sm">
                <span>{booking.field.name} , </span>
                <span>{formattedTime(booking.startDateTime)}</span>
              </p>
            </div>
          </div>

          <div className="h-[1px]  bg-secondaryThirty my-4"></div>
        </div>

        <div>
          <p className="text-xl font-PJSbold text-primary">
            Payment Details
            <span className="text-xs text-secondary font-PJSmedium ml-1">
              (Coupon Applied: VRX56H 20% off)
            </span>
          </p>
          <div className="grid grid-cols-4 font-PJSregular text-sm text-secondary border rounded-xl mt-5">
            <p className="text-left border-r border-b p-1 px-2 ">User</p>
            <p className="text-left border-r border-b p-1 px-2">
              Transaction ID
            </p>
            <p className="text-left border-r border-b p-1 px-2">Sales Tax</p>
            <p className="text-left border-b p-1 px-3">Player Total</p>

            {booking.participants.map((detail, index) => (
              <React.Fragment key={index}>
                <p className="text-left text-primary border-r border-b p-2 text-sm whitespace-nowrap">
                  {detail.name}
                </p>
                <p className="text-left text-primary border-r border-b p-2 text-sm ">
                  {detail.transactionId}
                </p>
                <p className="text-left text-primary border-r border-b p-2  text-sm">
                  0
                </p>
                <p className="text-left text-primary border-b p-2 text-sm">
                  {booking.totalAmount /
                    (booking.participants.length +
                      booking.rivalParticipants.length)}
                  <span className="text-secondary text-[10px]">
                    {detail.credit}
                  </span>
                </p>
              </React.Fragment>
            ))}
            <p className="p-4 text-primary font-PJSbold">Total</p>
            <p></p>
            <p className="p-4 text-primary font-PJSbold">$0</p>
            <p className="p-4 text-primary font-PJSbold">
              ${booking.totalAmount}
            </p>
          </div>
          <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
            <button className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center ">
              Allocate Credits
            </button>
            <button
              onClick={onClose}
              className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
};

const RecurringBookingSalesModal = ({ isOpen, onClose, booking }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showMarkAsUnpaid, setShowMarkAsUnpaid] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(true);

  const handleMarkAsPaid = () => {
    setPaymentSuccess(true);
    setShowMarkAsUnpaid(true);
    setPaymentFailed(false);
  };

  const handleMarkAsUnpaid = () => {
    setPaymentSuccess(false);
    setShowMarkAsUnpaid(false);
    setPaymentFailed(true);
  };
  return (
    <AppModal
      modalopen={isOpen}
      onClose={onClose}
      height="100vh"
      width="560px"
      customStyles={{ modal: { overflowY: "auto" } }}
    >
      <div>
        <p className="text-xl font-PJSbold text-primary">Details</p>
        {booking && (
          <div className="text-sm text-primary font-PJSbold mt-5">
            <p>
              <span>{booking.day} , </span>
              <span>{booking.date}</span>
            </p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="mt-2 font-PJSbold text-primary text-sm w-[256px]">
            Recurring Booking: Ryan Pineda ID25
          </p>
          <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
            <p>Chat</p>
          </div>
        </div>

        <div className="h-[1px]  bg-secondaryThirty my-4"></div>
        <div className="flex mt-2 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-secondaryTen p-4">
              <img className="w-6 h-6" alt="" src={hash} />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-PJSmedium text-secondary text-xs">
                Booking ID
              </p>
              <p className="font-PJSmedium text-sm">B4555</p>
            </div>
          </div>
          <div className="bg-secondaryTen p-2 px-6 rounded-full font-PJSmedium text-sm">
            <p>Copy</p>
          </div>
        </div>
        <div className="h-[1px]  bg-secondaryThirty my-4"></div>
        <div className="flex items-center gap-3 mt-3">
          <div className="rounded-full bg-secondaryTen p-4">
            <img className="w-6 h-6" alt="" src={calendar} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-PJSmedium text-secondary text-xs">
              Booking Date
            </p>
            {booking && (
              <p className="font-PJSmedium text-sm">
                <span>{booking.day} , </span>
                <span>{booking.date}</span>
              </p>
            )}
          </div>
        </div>

        <div className="h-[1px]  bg-secondaryThirty my-4"></div>
        <div className="flex items-center gap-3 mt-3">
          <div className="rounded-full bg-secondaryTen p-4">
            <img className="w-6 h-6" alt="" src={dollar} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-PJSmedium text-secondary text-xs">
              Payment Date
            </p>
            <p className="font-PJSmedium text-sm">
              Mon, Jan 31st, 2024, 8:15pm{" "}
              <span className="text-secondary"> (Mastercard ****7789)</span>
            </p>
          </div>
        </div>

        <div className="h-[1px]  bg-secondaryThirty my-4"></div>
        <div className="flex items-center gap-3 mt-3">
          <div className="rounded-full bg-secondaryTen p-4">
            <img className="w-6 h-6" alt="" src={Clock} />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-PJSmedium text-secondary text-xs">Field, Time</p>
            {booking && (
              <p className="font-PJSmedium text-sm">
                <span>{booking.field} , </span>
                <span>{booking.time}</span>
              </p>
            )}
          </div>
        </div>

        <div className="h-[1px]  bg-secondaryThirty my-4"></div>

        <div>
          <div className="flex items-center">
            <p className="text-xl font-PJSbold text-primary">Payment Details</p>
            {paymentFailed && (
              <span className="text-xs text-redbutton font-PJSbold ml-1">
                <span>(</span>Payment Failed <span>)</span>
              </span>
            )}
          </div>
          <div className="grid grid-cols-4 font-PJSregular text-sm text-secondary border rounded-xl mt-5">
            <p className="text-left border-r border-b p-1 px-2 ">User</p>
            <p className="text-left border-r border-b p-1 px-2">
              Transaction ID
            </p>
            <p className="text-left border-r border-b p-1 px-2">Sales Tax</p>
            <p className="text-left border-b p-1 px-3">Player Total</p>
            {paymentRecurDetails.map((detail, index) => (
              <React.Fragment key={index}>
                <p className="text-left text-primary border-r border-b p-2 text-sm whitespace-nowrap">
                  {detail.user}
                </p>
                <p className="text-left text-primary border-r border-b p-2 text-sm ">
                  {detail.transactionId}
                </p>
                <p className="text-left text-primary border-r border-b p-2  text-sm">
                  {detail.salesTax}
                </p>
                <p className="text-left text-primary border-b p-2 text-sm">
                  {detail.playerTotal}
                  <span className="text-secondary text-[10px]">
                    {detail.credit}
                  </span>
                </p>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <p className="p-4 text-primary font-PJSbold">Total</p>
            {paymentSuccess ? (
              <p className="p-4 text-green-400 font-PJSbold">PAID</p>
            ) : (
              <p className="p-4 text-redbutton font-PJSbold flex items-center gap-1">
                Payment Error
                <img src={info} className="w-4" alt="" />
              </p>
            )}
          </div>
          <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
            <div>
              {paymentSuccess ? (
                <button
                  onClick={handleMarkAsUnpaid}
                  className="w-[250px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                >
                  Mark As Unpaid
                </button>
              ) : (
                <button
                  className="w-[250px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                  onClick={handleMarkAsPaid}
                >
                  {showMarkAsUnpaid ? "Mark As Unpaid" : "Mark As Paid"}
                </button>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center "
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
};

const LeagueModal = ({ isOpen, onClose }) => {};

export {
  NewBookingModal,
  LeagueSemiFinalsModal,
  RecurringBookingModal,
  PickupFreePlayModal,
  AcademyModal,
  NewBookingSalesModal,
  RecurringBookingSalesModal,
  LeagueModal,
};
