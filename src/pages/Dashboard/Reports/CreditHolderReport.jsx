import { useEffect, useState } from "react";
import Back from "../../../assets/svgs/back.svg";
import search from "../../../assets/svgs/Search.svg";
import down from "../../../assets/svgs/Down.svg";
import download from "../../../assets/svgs/Export.svg";
import mail from "../../../assets/svgs/EnvelopeSimple.svg";
import phone from "../../../assets/svgs/Phone.svg";
import dollar from "../../../assets/svgs/dollar.svg";
import CheckCircle from "../../../assets/svgs/CheckCircleBlue.svg";
import user from "../../../assets/user.png";
import { AppModal } from "../../../components";
import { holderDetails } from "../../../constants/reportsIndex";
import { useStateContext } from "../../../context";
import assets from "../../../assets/assets";
import Toast from "../../../components/Toast/Toast";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const CreditHolderReport = () => {
  const { currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();

  const [loading, setLoading] = useState(false);
  const [isFacilityModalOpen, setFacilityModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDwdModalOpen, setIsDwdModalOpen] = useState(false);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Highest Credits");
  const [selectedExportOption, setSelectedExportOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedUsers, setSortedUsers] = useState(holderDetails);

  useEffect(() => {
    if (currentFacility) {
      // Facility-specific logic can go here
    }
  }, [currentFacility]);

  function backNav() {
    window.history.back();
  }

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    const sorted = sortUsers(sortedUsers, option);
    setSortedUsers(sorted);
  };

  const sortUsers = (users, field) => {
    return [...users].sort((a, b) => {
      const amountA = parseFloat(a.balance.replace("$", "").replace(",", ""));
      const amountB = parseFloat(b.balance.replace("$", "").replace(",", ""));

      switch (field) {
        case "Highest Credits":
          return amountB - amountA;
        case "Lowest Credits":
          return amountA - amountB;
        default:
          return 0;
      }
    });
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

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const tableData = sortedUsers.map((user, index) => [
      index + 1,
      user.client,
      user.balance,
    ]);

    autoTable(doc, {
      head: [["#", "Client Name", "Credit Balance"]],
      body: tableData,
    });

    doc.save("credit_holders_report.pdf");
  };

  const exportAsCSV = () => {
    const csvRows = [
      ["#", "Client Name", "Credit Balance"],
      ...sortedUsers.map((user, index) => [
        index + 1,
        `"${user.client}"`,
        `"${user.balance}"`,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "credit_holders_report.csv");
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      sortedUsers.map((user, index) => ({
        "#": index + 1,
        "Client Name": user.client,
        "Credit Balance": user.balance,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Credit Holders");
    XLSX.writeFile(workbook, "credit_holders_report.xlsx");
  };

  const handleDownload = () => {
    try {
      if (selectedExportOption === "As PDF") {
        exportAsPDF();
      } else if (selectedExportOption === "As CSV") {
        exportAsCSV();
      } else if (selectedExportOption === "As Excel") {
        exportAsExcel();
      }
      setMessage("Export successful!");
      setType("success");
      setOpen(true);
    } catch (error) {
      setMessage("Export failed: " + error.message);
      setType("error");
      setOpen(true);
    }
    closeModal();
  };

  const handleExportOptionSelect = (option) => {
    setSelectedExportOption(option);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = sortedUsers.filter((user) => {
    return user.client.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* Facility selection UI */}
      <div className="">
        <div className="relative">
          <p
            onClick={() => setFacilityModalOpen(true)}
            className="font-PJSextra text-3xl text-primary inline-flex items-center gap-3 cursor-pointer"
          >
            {currentFacility ? currentFacility.name : "Select Facility"}
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
              <p className="text-lg font-PJSbold mt-3">Select a facility</p>
              {myFacilities.map((facility) => (
                <div
                  key={facility._id}
                  className="flex items-center justify-between mt-6 cursor-pointer"
                  onClick={() => {
                    setCurrentFacility(facility);
                    setFacilityModalOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={facility?.icon || assets.placeholder}
                      alt="Club"
                      className="w-8 h-8 rounded-full"
                    />
                    <p className="text-sm font-PJSregular">{facility.name}</p>
                  </div>
                  {currentFacility?._id === facility._id && (
                    <img
                      src={assets.CheckCircle}
                      className="w-6"
                      alt="Selected"
                    />
                  )}
                </div>
              ))}
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
            <p className="text-2xl font-PJSbold text-primary">Credit Holders</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="search"
                className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border-2 border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                onChange={handleSearchChange}
                placeholder=""
              />
              <img
                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                src={search}
                alt="Search"
              />
            </div>
            <div
              className="border-2 border-secondaryThirty bg-transparent w-[165px] text-center justify-center flex h-[42px] rounded-full cursor-pointer"
              onClick={openFieldModal}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                {selectedOption}
                <img src={down} alt="Down" />
              </p>
            </div>
            <div
              onClick={openDownloadModal}
              className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full cursor-pointer"
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                <img src={download} className="w-5 h-5" alt="Download" />
                Download
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-4 mx-3 text-sm font-PJSmedium text-[#8f9499] mt-5 whitespace-nowrap px-3">
          <p>Client Name</p>
          <p>Credit Balance</p>
        </div>

        <div className="h-[1px] bg-secondaryThirty mt-1"></div>

        <div className="cursor-pointer my-10">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((item, index) => (
              <div key={item.id} onClick={() => handleRowClick(item)}>
                <div className="grid grid-cols-2 items-center gap-4 mx-3 text-sm font-PJSmedium mt-4">
                  <p className="flex items-center gap-4 p-2">
                    <span className="p-1 px-[10px] bg-secondaryTwenty rounded-full">
                      {index + 1}
                    </span>
                    <span className="underline">{item.client}</span>
                  </p>
                  <p className="p-3">{item.balance}</p>
                </div>
                <div className="h-[1px] bg-secondaryTwenty mt-1"></div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-secondary">
              {searchQuery
                ? "No credit holders match your search."
                : "No credit holders found."}
            </div>
          )}
        </div>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <AppModal
          onClose={handleClose}
          modalopen={modalOpen}
          height="570px"
          width="495px"
        >
          <div className="p-4">
            <p className="text-xl font-PJSbold text-primary">User Details</p>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center justify-center gap-3">
                <div>
                  <img
                    src={user}
                    className="w-[56px] h-[56px] rounded-full"
                    alt="User"
                  />
                </div>
                <div className="font-PJSmedium">
                  <p className="text-secondary text-xs">Name</p>
                  <p className="text-sm">{selectedClient.client}</p>
                </div>
              </div>
              <button className="bg-lime rounded-full w-[80px] h-[40px] flex justify-center items-center text-sm">
                Chat
              </button>
            </div>

            <div className="h-[1px] bg-secondaryTwenty my-5"></div>

            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center justify-center gap-3">
                <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center bg-secondaryTen">
                  <img src={mail} className="w-6 h-6" alt="Email" />
                </div>
                <div className="font-PJSmedium">
                  <p className="text-secondary text-xs">Email Address</p>
                  <p className="text-sm">{selectedClient.email}</p>
                </div>
              </div>
              <button className="bg-secondaryTen rounded-full w-[80px] h-[40px] flex justify-center items-center text-sm">
                Copy
              </button>
            </div>

            <div className="h-[1px] bg-secondaryTwenty my-5"></div>

            <div className="flex items-center gap-3">
              <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center bg-secondaryTen">
                <img src={phone} className="w-5 h-5" alt="Phone" />
              </div>
              <div className="font-PJSmedium">
                <p className="text-secondary text-xs">Mobile Number</p>
                <p className="text-sm">{selectedClient.phone}</p>
              </div>
            </div>
            <div className="h-[1px] bg-secondaryTwenty my-5"></div>

            <div className="flex items-start gap-3">
              <div className="min-w-[48px] min-h-[48px] rounded-full justify-center flex items-center bg-secondaryTen">
                <img src={dollar} className="w-6 h-6" alt="Balance" />
              </div>
              <div className="font-PJSmedium">
                <p className="text-secondary text-xs mb-1">Credit Balance</p>
                <p className="text-sm font-bold">{selectedClient.balance}</p>
                <p className="text-xs mt-2">------------- </p>
                <p className="text-xs">
                  $7.89 from booking B4434 (May/05/2024){" "}
                </p>
                <p className="text-xs">
                  $10.00 from booking B2134 (Feb/01/2024){" "}
                </p>
              </div>
            </div>

            <div className="h-[1px] bg-secondaryTwenty my-5"></div>
            <div className="flex mt-10 gap-4 w-full justify-center font-PJSMedium items-center">
              <button
                onClick={handleClose}
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
              >
                Close
              </button>
            </div>
          </div>
        </AppModal>
      )}

      {/* Filter Modal */}
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
        <div className="mt-0 p-4">
          <p className="font-PJSmedium text-sm">Filter</p>
          <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            <div
              className="flex items-center justify-between cursor-pointer p-2"
              onClick={() => handleOptionSelect("Highest Credits")}
            >
              <p
                className={
                  selectedOption === "Highest Credits"
                    ? "text-primary font-bold"
                    : ""
                }
              >
                Highest Credits
              </p>
              {selectedOption === "Highest Credits" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer p-2"
              onClick={() => handleOptionSelect("Lowest Credits")}
            >
              <p
                className={
                  selectedOption === "Lowest Credits"
                    ? "text-primary font-bold"
                    : ""
                }
              >
                Lowest Credits
              </p>
              {selectedOption === "Lowest Credits" && (
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

      {/* Download Options Modal */}
      <AppModal
        modalopen={isDwdModalOpen}
        onClose={closeModal}
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
        <div className="mt-0 p-4">
          <div className="flex items-center gap-2">
            <img src={download} className="w-5 h-5" alt="Download" />
            <p className="font-PJSmedium text-sm">Download</p>
          </div>
          <div className="h-[1px] w-full my-3 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            <div
              className="flex items-center justify-between cursor-pointer p-2"
              onClick={() => handleExportOptionSelect("As PDF")}
            >
              <p>As PDF</p>
              {selectedExportOption === "As PDF" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer p-2"
              onClick={() => handleExportOptionSelect("As CSV")}
            >
              <p>As CSV</p>
              {selectedExportOption === "As CSV" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer p-2"
              onClick={() => handleExportOptionSelect("As Excel")}
            >
              <p>As Excel</p>
              {selectedExportOption === "As Excel" && (
                <img src={CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
          </div>
          <button
            onClick={handleDownload}
            disabled={!selectedExportOption}
            className={`w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full font-PJSmedium justify-center items-center ${
              selectedExportOption
                ? "bg-lime"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Download
          </button>
        </div>
      </AppModal>

      <Toast open={open} setOpen={setOpen} message={message} type={type} />
    </>
  );
};

export default CreditHolderReport;
