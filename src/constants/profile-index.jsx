import assets from "../assets/assets";
import BankAccount from "../pages/Dashboard/Profile/BankAccount";
import Discount from "../pages/Dashboard/Profile/Discount";
import FacilityManagers from "../pages/Dashboard/Profile/FacilityManagers";
import FacilityRules from "../pages/Dashboard/Profile/FacilityRules";
import FieldPrice from "../pages/Dashboard/Profile/FieldPrice";
import HrsOperation from "../pages/Dashboard/Profile/HrsOperation";
import MyFacility from "../pages/Dashboard/Profile/MyFacility";

export const profileItems = [
  { image: assets.Facility, heading: "My Facility", content: <MyFacility /> },
  {
    image: assets.OperationHrs,
    heading: "Hours of Operation",
    content: <HrsOperation />,
  },
  {
    image: assets.FieldPrice,
    heading: "Fields and Prices",
    content: <FieldPrice />,
  },
  {
    image: assets.FacilityRules,
    heading: "Facility Rules",
    content: <FacilityRules />,
  },
  {
    image: assets.FacilityManagers,
    heading: "Facility Managers",
    content: <FacilityManagers />,
  },
  { image: assets.Discounts, heading: "Discounts", content: <Discount /> },
  {
    image: assets.bankAccount,
    heading: "Finix Payments",
    content: <BankAccount />,
  },
];
export const amenitiesData = [
  "Showers",
  "Drinks",
  "Food",
  "Referee",
  "Lockers",
  "Ball rental",
  "Free parking",
  "A/C",
  "Spectator seating",
];
export const initialDays = [
  {
    day: "Monday",
    key: "monday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
  {
    day: "Tuesday",
    key: "tuesday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
  {
    day: "Wednesday",
    key: "wednesday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
  {
    day: "Thursday",
    key: "thursday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
  {
    day: "Friday",
    key: "friday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
  {
    day: "Saturday",
    key: "saturday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
  {
    day: "Sunday",
    key: "sunday",
    open: "9:00 AM",
    close: "6:00 PM",
    checked: true,
  },
];
