import React from "react";
import { Card, Typography } from "@mui/material";
import assets from "../../assets/assets";

const BookingCard = ({ event }) => {
  const bookingType = event.bookingType;

  const getBookingIconFromType = () => {
    if (bookingType === "pickup") {
      return <img src={assets.pickup} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "callin") {
      return <img src={assets.callIn} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "league") {
      return <img src={assets.league} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "tournament") {
      return <img src={assets.tournament} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "other") {
      return <img src={assets.other} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "event") {
      return <img src={assets.event} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "closure") {
      return <img src={assets.closure} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "academy") {
      return <img src={assets.academy} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "recurring") {
      return <img src={assets.recurring} className="w-5 h-5" alt="Icon" />;
    } else if (bookingType === "new_booking") {
      return <img src={assets.newBooking} className="w-5 h-5" alt="Icon" />;
    }
  };

  const formattedBookingType = (type) => {
    let formattedType = type.replace("_", " ");
    return formattedType[0].toUpperCase() + formattedType.substring(1);
  };

  return (
    <div
      style={{
        backgroundColor: "#FFF",
        padding: "12px",
        borderRadius: "10px",
        margin: "0px",
        boxShadow: "1px 1px grey",
        height: "100%", // Makes the card take full height of the calendar slot
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <div
        style={{
          borderRadius: "50px",
          backgroundColor: "#e2e2e2",
          padding: "10px",
        }}
      >
        {getBookingIconFromType()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="font-PJSbold">{formattedBookingType(bookingType)}</div>
        <div className="font-PJSregular" style={{fontSize: "12px", marginTop: "6px"}}>{event.user.name}</div>
      </div>
    </div>
  );
};

export default BookingCard;
