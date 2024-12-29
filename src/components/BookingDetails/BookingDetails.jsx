/* eslint-disable react/prop-types */
// BookingDetails.js

const BookingDetails = ({ court, date, time, price, bookingId }) => {
  return (
    <div className="flex text-start items-center gap-5 mt-5 text-secondary font-PJSregular text-[14px] font-semibold">
      <div className="font-PJSregular">
        <div>Court</div>
        <div className="text-black">{court}</div>
      </div>

      <div className="divider h-[20px] w-[0.3px] bg-[#ccc]"></div>
      <div className="font-PJSregular">
        <div>Date</div>
        <div className="text-black">{date}</div>
      </div>

      <div className="divider h-[20px] w-[0.3px] bg-[#ccc]"></div>
      <div className="font-PJSregular">
        <div>Time</div>
        <div className="text-black">{time}</div>
      </div>

      <div className="divider h-[20px] w-[0.3px] bg-[#ccc]"></div>
      <div className="font-PJSregular">
        <div>Price</div>
        <div className="text-black">{price}</div>
      </div>

      <div className="divider h-[20px] w-[0.3px] bg-[#ccc]"></div>
      <div className="font-PJSregular">
        <div>Booking ID</div>
        <div className="text-black">{bookingId}</div>
      </div>
    </div>
  );
};

export default BookingDetails;
