import React from "react";

export const BookingList = ({ bookings, onBookingClick }) => (
  <div>
    <div className="grid grid-cols-6 text-sm text-gray-500">
      <p>Booking Holder</p>
      <p>Date</p>
      <p>Booking Type</p>
      <p>Field Booked</p>
      <p>Time</p>
      <p>Status</p>
    </div>

    {bookings.map((booking, index) => (
      <div
        key={booking._id}
        className={`grid grid-cols-6 text-sm mt-2 ${
          booking.status === "Client Cancellation"
            ? "text-red-500"
            : "text-black"
        }`}
        onClick={() => onBookingClick(booking)}
      >
        <p>{booking.user.name}</p>
        <p>{formatDate(booking.startDateTime)}</p>
        <p>{booking.bookingType}</p>
        <p>{booking.field.name}</p>
        <p>
          {formattedTime(booking.startDateTime)} -{" "}
          {formattedTime(booking.endDateTime)}
        </p>
        <p>{booking.status}</p>
      </div>
    ))}
  </div>
);
