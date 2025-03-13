import { useState } from "react";
import Back from "../../../assets/svgs/back.svg";
import search from "../../../assets/svgs/Search.svg";
import down from "../../../assets/svgs/Down.svg";
import download from "../../../assets/svgs/Export.svg";
import mail from "../../../assets/svgs/EnvelopeSimple.svg";
import phone from "../../../assets/svgs/Phone.svg";
import cap from "../../../assets/svgs/BaseballCap.svg";
import CalendarX from "../../../assets/svgs/CalendarX.svg";
import user from "../../../assets/user.png";
import CheckCircle from "../../../assets/svgs/CheckCircleBlue.svg";
import { AppModal } from "../../../components";
import { usersDetails } from "../../../constants/reportsIndex";
import { useStateContext } from "../../../context";
import assets from "../../../assets/assets";

const UsersReport = () => {
  const { currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();
  const [isFacilityModalOpen, setFacilityModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  function backNav() {
    window.history.back();
  }

  const handleRowClick = (clientName) => {
    setSelectedClient(clientName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsFieldModalOpen(false);
    setSelectedClient(null);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const openFieldModal = () => {
    setIsFieldModalOpen(true);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      {/* Facility selection UI */}
      <div className="">
        {/* Facility selection dropdown and modal */}
        <div className="relative">
          <p
            onClick={() => setFacilityModalOpen(true)}
            className="font-PJSextra text-3xl text-primary inline-flex items-center gap-3 cursor-pointer"
          >
            {currentFacility ? currentFacility.name : ""}
            <img
              src={assets.down}
              className="w-6"
              alt="Expand facility options"
            />
          </p>
          <AppModal
            modalopen={isFacilityModalOpen}
            onClose={() => setFacilityModalOpen(false)}
            width="25rem"
            customStyles={{
              overlay: { position: "fixed", top: 0, left: 0, right: 0 },
              modal: {
                position: "absolute",
                top: "30%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                margin: "0",
              },
            }}
          >
            <div>
              <p
                className="text-lg font-PJSbold mt-3"
                style={{ overflowY: "auto" }}
              >
                Select a facility
              </p>
              {myFacilities.map((facility) => {
                return (
                  <div
                    className="flex items-center justify-between mt-6 cursor-pointer"
                    onClick={() => {
                      setCurrentFacility(facility);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          facility &&
                          facility.icon &&
                          facility.icon !== null &&
                          facility.icon !== ""
                            ? facility.icon
                            : assets.placeholder
                        }
                        alt="Club"
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-sm font-PJSregular">{facility.name}</p>
                    </div>
                    {currentFacility &&
                      currentFacility._id === facility._id && (
                        <img
                          src={assets.CheckCircle}
                          className="w-6"
                          alt="Selected"
                        />
                      )}
                  </div>
                );
              })}
            </div>
          </AppModal>
        </div>
        <p className="font-PJSregular text-sm text-secondary mt-2">
          Elevate your soccer experience
        </p>
      </div>

      <div className="bg-white rounded-lg mt-5 p-2">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <img
              src={Back}
              alt="Back"
              onClick={backNav}
              className="cursor-pointer"
            />
            <p className="text-2xl font-PJSbold text-primary">
              Users
              <span className="text-secondary font-PJSregular text-sm ml-1">
                (7)
              </span>
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
            <div
              className="border-2 border-secondaryThirty bg-transparent w-[185px] text-center justify-center flex h-[42px] rounded-full cursor-pointer"
              onClick={openFieldModal}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                {" "}
                Most Cancellations
                <img src={down} alt="Down" />
              </p>
            </div>
            <div className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full">
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                <img src={download} className="w-5 h-5" alt="Download" />
                Download
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 items-center gap-4 mx-3 text-sm font-PJSmedium text-[#8f9499] mt-5 whitespace-nowrap px-3">
          <p>Client Name</p>
          <p>First Visit</p>
          <p>Last Visit</p>
          <p>Visits</p>
          <p>No Shows</p>
          <p>Cancellations</p>
          <p>Your Cancellations</p>
          <p>Revenue Generated</p>
        </div>

        <div className="h-[1px] bg-secondaryThirty mt-1"></div>
        <div className="cursor-pointer my-10">
          {usersDetails.map((item, index) => (
            <div key={item.id} onClick={() => handleRowClick(item.client)}>
              <div
                className={`grid grid-cols-8 items-center gap-4 mx-3 text-sm font-PJSmedium mt-4`}
              >
                <p className="flex items-center gap-4 p-2">
                  <span className="p-1 px-[10px] bg-secondaryTwenty rounded-full">
                    {index + 1}
                  </span>
                  <span className="underline">{item.client}</span>
                </p>
                <p className="p-3">{item.firstvisit}</p>
                <p className="p-3">{item.lastvisit}</p>
                <p className="p-3">{item.visits}</p>
                <p className="p-3">{item.noshows}</p>
                <p className="p-3">{item.cancel}</p>
                <p className="p-3">{item.yourcancel}</p>
                <p className="p-3">{item.revenue}</p>
              </div>
              <div className="h-[1px] bg-secondaryTwenty mt-1"></div>
            </div>
          ))}
        </div>
      </div>

      <AppModal
        onClose={closeModal}
        modalopen={modalOpen}
        height="620px"
        width="495px"
      >
        <div>
          <p className="text-xl font-PJSbold text-primary">User Details</p>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center justify-center gap-3">
              <div>
                <img
                  src={user}
                  className="w-[56px] h-[56px] rounded-full"
                  alt=""
                />
              </div>
              <div className="font-PJSmedium">
                <p className="text-secondary text-xs">Name</p>
                <p className="text-sm">{selectedClient}</p>
              </div>
            </div>
            <button className="bg-lime rounded-full w-[80px] h-[40px] flex justify-center items-center">
              Chat
            </button>
          </div>

          <div className="h-[1px] bg-secondaryTwenty my-5"></div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center justify-center gap-3">
              <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center  bg-secondaryTen">
                <img src={mail} className="w-6 h-6" alt="" />
              </div>
              <div className="font-PJSmedium">
                <p className="text-secondary text-xs">Email Address</p>
                <p className="text-sm">angelina_marcus018@gmail.com</p>
              </div>
            </div>
            <button className="bg-secondaryTen   rounded-full w-[80px] h-[40px] flex justify-center items-center">
              Copy
            </button>
          </div>

          <div className="h-[1px] bg-secondaryTwenty my-5"></div>

          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center  bg-secondaryTen">
              <img src={phone} className="w-5 h-5" alt="" />
            </div>
            <div className="font-PJSmedium">
              <p className="text-secondary text-xs">Mobile Number</p>
              <p className="text-sm">+1(985) 8690-2225</p>
            </div>
          </div>
          <div className="h-[1px] bg-secondaryTwenty my-5"></div>

          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center  bg-secondaryTen">
              <img src={cap} className="w-6 h-6" alt="" />
            </div>
            <div className="font-PJSmedium">
              <p className="text-secondary text-xs">Teams</p>
              <p className="text-sm">The Tigers T37, FC Barcelona T41</p>
              <p className="text-sm">The Giants T67, Red Rockets T22</p>
            </div>
          </div>

          <div className="h-[1px] bg-secondaryTwenty my-5"></div>

          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center  bg-secondaryTen">
              <img src={CalendarX} className="w-6 h-6 rounded-full" alt="" />
            </div>
            <div className="font-PJSmedium">
              <p className="text-secondary text-xs">Upcoming Booking</p>
              <p className="text-sm">No upcoming bookings</p>
            </div>
          </div>
          <div className="flex mt-10 gap-4 w-full justify-center font-PJSMedium items-center">
            <button
              onClick={handleClose}
              className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
            >
              Close
            </button>
            <button className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-redbutton text-white font-PJSmedium justify-center items-center ">
              Block User
            </button>
          </div>
        </div>
      </AppModal>

      <AppModal
        modalopen={isFieldModalOpen}
        onClose={closeModal}
        height="316px"
        width="300px"
        customStyles={{
          overlay: {
            position: "absolute",
            top: 0,
            right: 0,
          },
          modal: {
            position: "absolute",
            top: "45%",
            right: "0",
            transform: "translate(-50%, -50%)",
            margin: "0",
          },
        }}
      >
        <div className="mt-0">
          <p className="font-PJSmedium text-sm">Filter</p>
          <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most Cancellations")}
            >
              <p className="underline">Most Cancellations</p>
              {selectedOption === "Most Cancellations" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most No-Shows")}
            >
              <p>Most No-Shows</p>
              {selectedOption === "Most No-Shows" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most Visits")}
            >
              <p>Most Visits</p>
              {selectedOption === "Most Visits" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most Revenue Generated")}
            >
              <p>Most Revenue Generated</p>
              {selectedOption === "Most Revenue Generated" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("First Visit")}
            >
              <p>First Visit</p>
              {selectedOption === "First Visit" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Last Visit")}
            >
              <p>Last Visit</p>
              {selectedOption === "Last Visit" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
          </div>
          <button className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center">
            Apply
          </button>
        </div>
      </AppModal>
    </>
  );
};
export default UsersReport;
