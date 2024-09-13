/* eslint-disable react/prop-types */
import { useState } from "react";
import AppModal from "../../../components/AppModal/AppModal";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { BookingBar, CreditHolderChart, SalesBar, UsersChart } from "./Charts";
import assets from "../../../assets/assets";

const Section = ({ title, children, date, onDateClick }) => (
  <div className="md:w-1/2 w-full h-[400px] rounded-xl bg-white shadow-sm drop-shadow-sm p-4">
    <div className="flex items-center justify-between">
      <p className="text-2xl text-primary font-PJSextra">{title}</p>
      <p onClick={onDateClick} className="text-sm text-primary font-PJSbold flex items-center gap-2 cursor-pointer">
        {date}
        <img className="w-5" src={assets.down} alt="Expand date options" />
      </p>
    </div>
    {children}
  </div>
);

const Reports = () => {
  const [isModalOpen, setIsModalOpen] = useState({
    bookings: false,
    sales: false,
    users: false,
    creditHolders: false,
  });

  const [selectedFacility, setSelectedFacility] = useState(null);

  // Separate state variables for each section's date range
  const [dateRangeBookings, setDateRangeBookings] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [dateRangeSales, setDateRangeSales] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [dateRangeUsers, setDateRangeUsers] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [dateRangeCreditHolders, setDateRangeCreditHolders] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  // Handler functions to update date ranges
  const handleDateChangeBookings = (ranges) => {
    setDateRangeBookings([ranges.selection]);
  };

  const handleDateChangeSales = (ranges) => {
    setDateRangeSales([ranges.selection]);
  };

  const handleDateChangeUsers = (ranges) => {
    setDateRangeUsers([ranges.selection]);
  };

  const handleDateChangeCreditHolders = (ranges) => {
    setDateRangeCreditHolders([ranges.selection]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`;
  };

  const openModal = (section) => {
    setIsModalOpen((prevState) => ({ ...prevState, [section]: true }));
  };

  const closeModal = (section) => {
    setIsModalOpen((prevState) => ({ ...prevState, [section]: false }));
  };

  const handleFacilitySelect = (facility) => {
    setSelectedFacility(facility);
  };

  const handleApply = (section) => {
    closeModal(section);
  }
  return (
    <>
      {/* Facility selection UI */}
      <div className="">
        {/* Facility selection dropdown and modal */}
        <div className="relative cursor-pointer">
          <p onClick={() => openModal('facility')} className="font-PJSextra text-3xl text-primary flex items-center gap-3">
            Futeca
            <img src={assets.down} className="w-6" alt="Expand facility options" />
          </p>
          <AppModal
            modalopen={isModalOpen.facility}
            onClose={() => closeModal('facility')}
            height="290px"
            width="418px"
            customStyles={{
              overlay: { position: 'absolute', top: 0, left: 0, right: 0 },
              modal: { position: 'absolute', top: '200%', left: '20%', transform: 'translate(-50%, -50%)', margin: '0' },
            }}
          >
            <div>
              <p className="text-lg font-PJSbold mt-3">Select a facility</p>
              <div className="flex items-center justify-between mt-6 cursor-pointer" onClick={() => handleFacilitySelect('Miami One Soccer')}>
                <div className="flex items-center gap-3">
                  <img src={assets.club} alt="Club" className="w-8 h-8 rounded-full" />
                  <p className="text-sm font-PJSregular">Miami One Soccer</p>
                </div>
                {selectedFacility === 'Miami One Soccer' && <img src={assets.CheckCircle} className="w-6" alt="Selected" />}
              </div>
              <div className="flex items-center justify-between mt-6 cursor-pointer" onClick={() => handleFacilitySelect('Orlando One Soccer')}>
                <div className="flex items-center gap-3">
                  <img src={assets.club} alt="Club" className="w-8 h-8 rounded-full" />
                  <p className="text-sm font-PJSregular">Orlando One Soccer</p>
                </div>
                {selectedFacility === 'Orlando One Soccer' && <img src={assets.CheckCircle} className="w-6" alt="Selected" />}
              </div>
              <button
                className="w-full mt-12 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
              >
                Add New
              </button>
            </div>
          </AppModal>
        </div>
        <p className="font-PJSregular text-sm text-secondary mt-2">Elevate your soccer experience</p>
      </div>

      {/* Sections for different reports */}
      <div className="my-10">
        <div className="md:flex items-center gap-4 w-full relative">
          {/* Bookings section */}
          <Section
            title="Bookings"
            date={`${formatDate(dateRangeBookings[0].startDate)} - ${formatDate(dateRangeBookings[0].endDate)}`}
            onDateClick={() => openModal('bookings')}
          >
            <BookingBar />
          </Section>
          <AppModal
            modalopen={isModalOpen.bookings}
            onClose={() => closeModal('bookings')}
            height="420px"
            width="380px"
            customStyles={{
              overlay: { position: 'absolute', top: 0, right: 0, left: 0 },
              modal: { position: 'absolute', top: '0', right: '50%', margin: '0' },
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeBookings}
              moveRangeOnFirstSelection={false}
              ranges={dateRangeBookings}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
              rangeColors={['#33C0DB']}
            />
            <div className="flex gap-4 w-full justify-center font-PJSMedium items-center ">
              <button
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                onClick={() => closeModal('bookings')}
              >
                Cancel
              </button>
              <button
                className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                onClick={() => handleApply('bookings')}
              >
                Apply
              </button>
            </div>
          </AppModal>

          {/* Sales section */}
          <Section
            title="Sales"
            date={`${formatDate(dateRangeSales[0].startDate)} - ${formatDate(dateRangeSales[0].endDate)}`}
            onDateClick={() => openModal('sales')}
          >
            <SalesBar />
          </Section>
          <AppModal
            modalopen={isModalOpen.sales}
            onClose={() => closeModal('sales')}
            height="420px"
            width="380px"
            customStyles={{
              overlay: { position: 'absolute', top: 0, right: 0 },
              modal: { position: 'absolute', top: '0', right: '0', margin: '0' },
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeSales}
              moveRangeOnFirstSelection={false}
              ranges={dateRangeSales}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
              rangeColors={['#33C0DB']}
            />
            <div className="flex gap-4 w-full justify-center font-PJSMedium items-center ">
              <button
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                onClick={() => closeModal('sales')}
              >
                Cancel
              </button>
              <button
                className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                onClick={() => handleApply('sales')}
              >
                Apply
              </button>
            </div>
          </AppModal>
        </div>
        <div className="md:flex items-center gap-4 w-full relative mt-5">
          {/* Users section */}
          <Section
            title="Users"
            date={`${formatDate(dateRangeUsers[0].startDate)} - ${formatDate(dateRangeUsers[0].endDate)}`}
            onDateClick={() => openModal('users')}
          >
            <UsersChart />
          </Section>
          <AppModal
            modalopen={isModalOpen.users}
            onClose={() => closeModal('users')}
            height="420px"
            width="380px"
            customStyles={{
              overlay: { position: 'absolute', top: 0, right: 0 },
              modal: { position: 'absolute', top: '0', right: '50%', margin: '0' },
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeUsers}
              moveRangeOnFirstSelection={false}
              ranges={dateRangeUsers}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
              rangeColors={['#33C0DB']}
            />
            <div className="flex gap-4 w-full justify-center font-PJSMedium items-center">
              <button
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                onClick={() => closeModal('users')}
              >
                Cancel
              </button>
              <button
                className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                onClick={() => handleApply('users')}
              >
                Apply
              </button>
            </div>
          </AppModal>

          {/* Credit Holders section */}
          <Section
            title="Credit Holders"
            date={`${formatDate(dateRangeCreditHolders[0].startDate)} - ${formatDate(dateRangeCreditHolders[0].endDate)}`}
            onDateClick={() => openModal('creditHolders')}
          >
            <CreditHolderChart />
          </Section>
          <AppModal
            modalopen={isModalOpen.creditHolders}
            onClose={() => closeModal('creditHolders')}
            height="420px"
            width="380px"
            customStyles={{
              overlay: { position: 'absolute', top: 0, left: 0, right: 0 },
              modal: { position: 'absolute', top: '0', right: '0', margin: '0' },
            }}
          >
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeCreditHolders}
              moveRangeOnFirstSelection={false}
              ranges={dateRangeCreditHolders}
              showMonthAndYearPickers={false}
              showDateDisplay={false}
              rangeColors={['#33C0DB']}
            />
            <div className="flex gap-4 w-full justify-center font-PJSMedium items-center">
              <button
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                onClick={() => closeModal('creditHolders')}
              >
                Cancel
              </button>
              <button
                className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                onClick={() => handleApply('creditHolders')}
              >
                Apply
              </button>
            </div>
          </AppModal>
        </div>
      </div>
    </>
  );
};

export default Reports;

