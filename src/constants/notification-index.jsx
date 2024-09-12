
import PlusIcon from "../../src/assets/svgs/Plus-notify.svg";
import Calendar from "../../src/assets/svgs/Calendarblue.svg";
import Check from "../../src/assets/svgs/CheckGreen.svg"
import Cross from "../../src/assets/svgs/CrossRed.svg"
import Repeat from "../../src/assets/svgs/Repeat.svg"
import RepeatRed from "../../src/assets/svgs/RepeatRed.svg"

export const notificationsData = [
    {
        id: 1,
        title: "New Booking",
        name: "Cacha Jr",
        date: "Tomorrow",
        time: "4-6pm",
        icon: PlusIcon,
        bgColor: "#ebf9fb",
        update: "2h ago",
        type:"new-booking"
    },
    {
        id: 2,
        title: "New Booking Request",
        name: "Cacha Jr",
        date: "Tomorrow",
        time: "4-6pm",
        icon: Calendar,
        bgColor: "#ebf9fb",
        update: "2h ago",
        type:"booking-request"
    },
    {
        id: 3,
        title: "Booking Request Accepted",
        name: "Cacha Jr",
        date: "Tomorrow",
        time: "7-9pm",
        icon: Check,
        bgColor: "#e8faf3",
        update: "2h ago",
        type:"booking-request-accepted"
    },
    {
        id: 4,
        title: "Booking Canceled: Users",
        name: "Cacha Jr",
        date: "Tomorrow",
        time: "11-12pm",
        icon: Cross,
        bgColor: "#fdeeee",
        update: "2h ago",
        type:"booking-canceled-users"
    },
    {
        id: 5,
        title: "Booking Confirmed",
        name: "Cacha Jr",
        date: "Tomorrow",
        time: "7-9pm",
        icon: Repeat,
        bgColor: "#e8faf3",
        update: "2h ago",
        type:"booking-confirmed"
    },
    {
        id: 6,
        title: "Booking Canceled: Admin",
        name: "Cacha Jr",
        date: "Tomorrow",
        time: "4-6pm",
        icon: RepeatRed,
        bgColor: "#fdeeee",
        update: "2h ago",
        type:"booking-canceled-admin"
    },

];




export const paymentNotifications = [
    {
        id: 1,
        title: "Payment Received",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received",
    },
    {
        id: 2,
        title: "Payment Received: User Cancelation",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received-usercancelation",
    },
    {
        id: 3,
        title: "Payment Received: Admin Cancelation",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received-admincancelation",
    },
    {
        id: 4,
        title: "Payment Received",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received",
    },
    {
        id: 5,
        title: "Payment Received",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received",
    },
    {
        id: 6,
        title: "Payment Received: Allocated credits",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received-allocatecredits",
    },
    {
        id: 7,
        title: "Payment Received",
        name: "South Field",
        date: "Yesterday",
        time: "11pm-12am",
        update: "10h ago",
        type:"payment-received",
    },

];
