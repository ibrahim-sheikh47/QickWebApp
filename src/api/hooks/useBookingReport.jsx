import { useState } from "react";
import { getAllBookings } from "../services/bookingService";
import { formatDate, formattedTime } from "../../constants";
import { useStateContext } from "../../context";
import { getFacilityFields } from "../services/facilityService";

export const useBookingReport = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [fields, setFields] = useState([]);
  const [dateRangeBookings, setDateRangeBookings] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [modals, setModals] = useState({
    download: false,
    field: false,
    date: false,
  });
  const [selectedFieldOption, setSelectedFieldOption] = useState({
    label: "all",
    title: "All",
  });
  const [selectedExportOption, setSelectedExportOption] = useState(null);

  const { currentFacility } = useStateContext();

  const fetchAllFacilityFields = async () => {
    try {
      const fields = await getFacilityFields(currentFacility._id);
      setFields([{ label: "all", title: "All" }, ...fields]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      const query = `startDate=${formatDate(
        dateRangeBookings[0].startDate
      )}&endDate=${formatDate(dateRangeBookings[0].endDate)}&facilityId=${
        currentFacility._id
      }&fieldId=${selectedFieldOption.label}`;
      const data = await getAllBookings(query);
      setBookings(data.bookings);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (type) => {
    setModals((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleDateChangeBookings = (ranges) => {
    setDateRangeBookings([ranges.selection]);
  };

  const handleApplyDateRange = () => {
    toggleModal("date");
    fetchAllBookings();
  };

  return {
    currentFacility,
    bookings,
    dateRangeBookings,
    fields,
    loading,
    modals,
    handlers: {
      fetchAllFacilityFields,
      fetchAllBookings,
      toggleModal,
      handleDateChangeBookings,
      handleApplyDateRange,
      setSelectedFieldOption,
      setSelectedExportOption,
      selectedFieldOption,
      selectedExportOption,
    },
  };
};
