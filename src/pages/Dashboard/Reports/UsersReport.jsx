import { useEffect, useState } from "react";
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
import {
  getFacilitiesUsersVisits,
  getFacilitiesTeamsVisits,
} from "../../../api/services/facilityService";
import { formatDate } from "../../../constants";
import Toast from "../../../components/Toast/Toast";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Loader from "../../../components/Loader/Loader";

const UsersReport = () => {
  const { currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();
  const navigate = useNavigate();
  const [isFacilityModalOpen, setFacilityModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDwdModalOpen, setIsDwdModalOpen] = useState(false);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Most Cancellations");
  const [selectedExportOption, setSelectedExportOption] = useState(null);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState("Users");
  // Add a state for sorted users
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    if (currentFacility) {
      if (selected === "Users") {
        fetchFacilitiesUsersVisits();
      } else {
        fetchFacilitiesTeamsVisits();
      }
    }
  }, [currentFacility, selected]);

  useEffect(() => {
    setSortedUsers(users); // Initialize with unsorted data
  }, [users]);

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const handleRowClick = (clientName) => {
    console.log(clientName.upcomingBookings);
    setSelectedClient(clientName);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const sorted = sortUsers(users, option);
    setSortedUsers(sorted);
  };

  const fetchFacilitiesUsersVisits = async () => {
    setLoading(true);
    try {
      const data = await getFacilitiesUsersVisits(currentFacility?._id);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFacilitiesTeamsVisits = async () => {
    setLoading(true);
    try {
      const data = await getFacilitiesTeamsVisits(currentFacility?._id);
      console.log(data);
      setUsers(data.data);
    } catch (error) {
      console.log(error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const openFieldModal = () => {
    setIsFieldModalOpen(true);
  };

  const closeFieldModal = () => {
    setIsFieldModalOpen(false);
  };

  const openDownloadModal = () => {
    setIsDwdModalOpen(true);
  };

  const closeModal = () => {
    setIsDwdModalOpen(false);
    setIsFieldModalOpen(false);
  };

  function backNav() {
    window.history.back();
  }

  const sortUsers = (users, field) => {
    if (!users) return [];

    return [...users].sort((a, b) => {
      switch (field) {
        case "Most Cancellations":
          return b.cancellations - a.cancellations;
        case "Most No-Shows":
          // Assuming you'll add noShows property to your user objects
          return (b.noShows || 0) - (a.noShows || 0);
        case "Most Visits":
          return b.totalVisits - a.totalVisits;
        case "Most Revenue Generated":
          return b.revenue - a.revenue;
        case "First Visit":
          return new Date(a.firstVisit) - new Date(b.firstVisit);
        case "Last Visit":
          return new Date(a.lastVisit) - new Date(b.lastVisit);
        default:
          return 0;
      }
    });
  };

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const tableData = users.map((user, index) => [
      index + 1,
      user.name,
      user.firstVisit ? formatDate(user.firstVisit) : "--",
      user.lastVisit ? formatDate(user.lastVisit) : "--",
      user.totalVisits,
      0,
      user.cancellations,
      user.cancellations,
      `$${user.revenue}`,
    ]);

    autoTable(doc, {
      head: [
        [
          "#",
          `${selected === "Users" ? "Client " : "Team "}Name`,
          "First Visit",
          "Last Visit",
          "Visits",
          "No shows",
          "Cancellations",
          "Your Cancellations",
          "Revenue Generated",
        ],
      ],
      body: tableData,
    });

    doc.save("users_report.pdf");
  };

  // Method to export as CSV
  const exportAsCSV = () => {
    if (!bookings || bookings.length === 0) {
      console.error("No bookings data available to export.");
      return;
    }

    try {
      const csvRows = [
        [
          "#",
          `${selected === "Users" ? "Client " : "Team "}Name`,
          "First Visit",
          "Last Visit",
          "Visits",
          "No shows",
          "Cancellations",
          "Your Cancellations",
          "Revenue Generated",
        ],
        ...users.map((user, index) => [
          index + 1,
          user.name,
          user.firstVisit ? formatDate(user.firstVisit) : "--",
          user.lastVisit ? formatDate(user.lastVisit) : "--",
          user.totalVisits,
          0,
          user.cancellations,
          user.cancellations,
          `$${user.revenue}`,
        ]),
      ];

      // Convert rows to CSV content
      const csvContent = csvRows
        .map((row) => row.map((cell) => `"${cell}"`).join(",")) // Quote each cell for safety
        .join("\n");

      // Create a Blob for the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Use FileSaver.js or create a download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "users_report.csv");
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up URL
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  // Method to export as Excel
  const exportAsExcel = () => {
    const name = `${selected === "Users" ? "Client " : "Team "}Name`;
    const worksheet = XLSX.utils.json_to_sheet(
      bookings.map((booking, index) => ({
        "#": index + 1,
        name: user.name,
        "First Visit": user.firstVisit ? formatDate(user.firstVisit) : "--",
        "Last Visit": user.lastVisit ? formatDate(user.lastVisit) : "--",
        Visits: user.totalVisits,
        "No shows": 0,
        Cancellations: user.cancellations,
        "Your Cancellations": user.cancellations,
        "Revenue Generated": `$${user.revenue}`,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings_report.xlsx");
  };

  const handleDownload = () => {
    if (selectedExportOption === "As PDF") {
      exportAsPDF();
    } else if (selectedExportOption === "As CSV") {
      exportAsCSV();
    } else if (selectedExportOption === "As Excel") {
      exportAsExcel();
    }
    closeModal();
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${text} copied to clipboard`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleExportOptionSelect = (option) => {
    setSelectedExportOption(option);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const filteredUsers = sortedUsers.filter((user) => {
    // Case-insensitive search for the name or booking type
    return selected === "Users"
      ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      : user?.admins?.[0]?.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
          user?.admins?.[0]?.email
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          user?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* Facility selection UI */}
      <div className="">
        {/* Facility selection dropdown and modal */}
        <div className="flex">
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
                        <p className="text-sm font-PJSregular">
                          {facility.name}
                        </p>
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

        <div
          className={`w-[30%] ml-auto flex bg-white rounded-full h-12 overflow-hidden`}
        >
          {["Users", "Teams"].map((tab) => (
            <button
              key={tab}
              className={`w-1/2 m-1 rounded-full font-semibold text-sm transition ${
                selected === tab ? "bg-secondaryTen text-primary" : "text-black"
              }`}
              onClick={() => setSelected(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
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
              {selected}
              <span className="text-secondary font-PJSregular text-sm ml-1">
                ({users.length})
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex justify-center items-center">
              <form action="" className="relative mx-auto w-max">
                <input
                  type="search"
                  className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border-2 border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                  onChange={handleSearchChange}
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
                {selectedOption}
                <img src={down} alt="Down" />
              </p>
            </div>
            <div
              className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full cursor-pointer"
              onClick={openDownloadModal}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                <img src={assets.download} className="w-5 h-5" alt="Download" />
                Download
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-8 items-center gap-4 mx-3 text-sm font-PJSmedium text-[#8f9499] mt-5 whitespace-nowrap px-3">
          <p>{selected === "Users" ? "Client Name" : "Team Name"}</p>
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
          {filteredUsers.map((item, index) => (
            <div key={item.user} onClick={() => handleRowClick(item)}>
              <div
                className={`grid grid-cols-8 items-center gap-4 mx-3 text-sm font-PJSmedium mt-4`}
              >
                <p className="flex items-center gap-4 p-2">
                  <span className="p-1 px-[10px] bg-secondaryTwenty rounded-full">
                    {index + 1}
                  </span>
                  <span className="underline">{item?.name}</span>
                </p>
                <p className="p-3">
                  {item.firstVisit ? formatDate(item.firstVisit) : "--"}
                </p>
                <p className="p-3">
                  {item.lastVisit ? formatDate(item.lastVisit) : "--"}
                </p>
                <p className="p-3">{item.totalVisits}</p>
                <p className="p-3">0</p>
                <p className="p-3">{item.cancellations}</p>
                <p className="p-3">{item.cancellations}</p>
                <p className="p-3">${item.revenue}</p>
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
          <p className="text-xl font-PJSbold text-primary">
            {selected === "Users" ? "User" : "Team"} Details
          </p>
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center justify-center gap-3">
              <div>
                <img
                  src={selectedClient?.image}
                  className="w-[56px] h-[56px] rounded-full"
                  alt=""
                />
              </div>
              <div className="font-PJSmedium">
                <p className="text-secondary text-xs">Name</p>
                <p className="text-sm">
                  {selected === "Users"
                    ? selectedClient?.name
                    : selectedClient?.admins?.[0]?.name}
                </p>
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
                <p className="text-sm">
                  {selected === "Users"
                    ? selectedClient?.email
                    : selectedClient?.admins?.[0]?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                handleCopy(
                  selected === "Users"
                    ? selectedClient?.email
                    : selectedClient?.admins?.[0]?.email
                )
              }
              className="bg-secondaryTen   rounded-full w-[80px] h-[40px] flex justify-center items-center"
            >
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
              <p className="text-sm">
                +(
                {selected === "Users"
                  ? selectedClient?.isoCode
                  : selectedClient?.admins?.[0]?.isoCode}
                ){" "}
                {selected === "Users"
                  ? selectedClient?.phone
                  : selectedClient?.admins?.[0]?.phone}
              </p>
            </div>
          </div>
          <div className="h-[1px] bg-secondaryTwenty my-5"></div>

          {selected === "Users" && (
            <>
              <div className="flex items-center gap-3">
                <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center  bg-secondaryTen">
                  <img src={cap} className="w-6 h-6" alt="" />
                </div>
                <div className="font-PJSmedium">
                  <p className="text-secondary text-xs">Teams</p>
                  <p className="text-sm">
                    {selectedClient?.teams?.length > 0
                      ? selectedClient?.teams?.map((t) => t).join(",")
                      : "No Team"}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-secondaryTwenty my-5"></div>
            </>
          )}

          <div className="flex items-center gap-3">
            <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center  bg-secondaryTen">
              <img src={CalendarX} className="w-6 h-6 rounded-full" alt="" />
            </div>
            <div className="font-PJSmedium">
              <p className="text-secondary text-xs">Upcoming Booking</p>
              <p className="text-sm">
                {selectedClient?.upcomingBookings?.length > 0
                  ? selectedClient?.upcomingBookings?.map((booking, index) => (
                      <span
                        key={index}
                        onClick={() =>
                          navigate(`/Dashboard/Calendar/${booking}`)
                        }
                        className="cursor-pointer text-blue-600 hover:underline"
                      >
                        {booking.toString()}
                        {index < selectedClient?.upcomingBookings?.length - 1 &&
                          ","}
                      </span>
                    ))
                  : "No upcoming bookings"}
              </p>
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
        onClose={closeFieldModal}
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
              <p
                className={
                  selectedOption === "Most Cancellations" ? "underline" : ""
                }
              >
                Most Cancellations
              </p>
              {selectedOption === "Most Cancellations" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most No-Shows")}
            >
              <p
                className={
                  selectedOption === "Most No-Shows" ? "underline" : ""
                }
              >
                Most No-Shows
              </p>
              {selectedOption === "Most No-Shows" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most Visits")}
            >
              <p
                className={selectedOption === "Most Visits" ? "underline" : ""}
              >
                Most Visits
              </p>
              {selectedOption === "Most Visits" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Most Revenue Generated")}
            >
              <p
                className={
                  selectedOption === "Most Revenue Generated" ? "underline" : ""
                }
              >
                Most Revenue Generated
              </p>
              {selectedOption === "Most Revenue Generated" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("First Visit")}
            >
              <p
                className={selectedOption === "First Visit" ? "underline" : ""}
              >
                First Visit
              </p>
              {selectedOption === "First Visit" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleOptionSelect("Last Visit")}
            >
              <p className={selectedOption === "Last Visit" ? "underline" : ""}>
                Last Visit
              </p>
              {selectedOption === "Last Visit" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
          </div>
          <button
            onClick={closeFieldModal}
            className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Apply
          </button>
        </div>
      </AppModal>

      <AppModal
        modalopen={isDwdModalOpen}
        onClose={closeModal}
        height="13.375rem"
        width="18.75rem"
        customStyles={{
          overlay: {
            position: "absolute",
            top: 0,
            right: 0,
          },
          modal: {
            position: "absolute",
            top: "35%",
            right: "0",
            transform: "translate(-20%, -20%)",
            margin: "0",
          },
        }}
      >
        <div className="mt-0">
          <div className="flex items-center gap-2">
            <img src={assets.download} className="w-5 h-5" alt="" />
            <p className="font-PJSmedium text-sm">Download</p>
          </div>
          <div className="h-[1px] w-full my-3 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleExportOptionSelect("As PDF")}
            >
              <p>As PDF</p>
              {selectedExportOption === "As PDF" && (
                <img src={assets.CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleExportOptionSelect("As CSV")}
            >
              <p>As CSV</p>
              {selectedExportOption === "As CSV" && (
                <img src={assets.CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleExportOptionSelect("As Excel")}
            >
              <p>As Excel</p>
              {selectedExportOption === "As Excel" && (
                <img src={assets.CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Download
          </button>
        </div>
      </AppModal>

      <Toast open={open} setOpen={setOpen} message={message} type={type} />

      {loading && <Loader />}
    </>
  );
};
export default UsersReport;
