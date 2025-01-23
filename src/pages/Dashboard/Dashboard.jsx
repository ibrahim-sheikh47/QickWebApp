import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";

// Components
import { AppModal } from "../../components";
import assets from "../../assets/assets";
import { useStateContext } from "../../context";
import { getFacilities } from "../../api/services/facilityService";
import Loader from "../../components/Loader/Loader";
import Toast from "../../components/Toast/Toast";
import PopupMenu from "../../components/PopupMenu/PopupMenu";

// Utility Function
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard = () => {
  const { user, currentFacility, setCurrentFacility, setMyFacilities } =
    useStateContext();
  const navigate = useNavigate();

  // Set "Reports" as the default tab
  const [selectedTab, setSelectedTab] = useState("Reports");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount] = useState(3); // notification count set as 3 initially
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  useEffect(() => {
    fetchMyFacilities();
  }, []);

  const handleNav = () => {
    navigate("/Dashboard/Profile");
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();

    navigate("/SignIn");
    setIsModalOpen(false);
  };

  const adminNavigation = [
    { name: "Reports", link: "/Dashboard/Reports", icon: assets.piesvg },
    { name: "Calendar", link: "/Dashboard/Calendar", icon: assets.calendarsvg },
    { name: "Events", link: "/Dashboard/Events", icon: assets.league },
    { name: "Chats", link: "/Dashboard/Chats", icon: assets.chatsvg },
  ];

  const fetchMyFacilities = async () => {
    setLoading(true);
    try {
      const response = await getFacilities(user._id);
      if (response.length > 0 && !currentFacility)
        setCurrentFacility(response[0]);
      setMyFacilities(response);
    } catch (err) {
      if (err.response && err.response.data) {
        showToast(err.response.data.message, "error");
      } else console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const handleItemClick = (item) => {
    alert(`You clicked: ${item.label}`);
  };

  return (
    <div>
      {/* Sidebar for mobile */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                  </button>
                </div>
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-5 w-auto"
                    src={assets.logo}
                    alt="Your Company"
                  />
                </div>
                <nav className="mt-5 h-0 flex-1 overflow-y-auto space-y-1 px-2">
                  {adminNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.link}
                      className={classNames(
                        item.name === selectedTab
                          ? "bg-gray-900 text-white"
                          : "text-gray-300",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                      )}
                      onClick={() => {
                        setSelectedTab(item.name);
                        setSidebarOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col bg-primary">
        <div className="flex h-16 items-center bg-primary px-6">
          <img className="h-8 w-auto" src={assets.logo} alt="Your Company" />
        </div>
        <nav className="flex-1 overflow-y-auto space-y-2 px-2 py-4">
          {adminNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className={classNames(
                item.name === selectedTab
                  ? "bg-selectedTab text-white "
                  : "text-gray-300 hover:bg-selectedTab hover:text-white",
                "group flex items-center rounded-[100px] px-4 py-3 text-sm font-PJSmedium cursor-pointer"
              )}
              onClick={() => setSelectedTab(item.name)}
            >
              <img src={item.icon} className="w-auto h-6 mr-2" />
              {item.name}
              {item.name === "Events" && (
                <span className="ml-5 mt-1/2 px-3 py-1/2 text-xs text-white bg-blue rounded-full">
                  Beta
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:pl-64">
        <div className="sticky top-0 z-10 flex h-16 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <HiBars3BottomLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Navbar Items i.e search bar, profile dropdown, and notifications */}
          <div className="w-full flex justify-end items-center ">
            <div className="flex w-1/2 justify-center items-center ">
              <div className="w-[60%] flex items-center border border-secondaryThirty rounded-[100px] h-[40px] px-4 gap-4">
                <img src={assets.search} className="w-6 h-6" alt="Search" />
                <input
                  placeholder="Search keyword"
                  className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full"
                />
              </div>
              <button
                className="flex justify-center items-center rounded-[100px] border border-secondaryThirty w-[40px] h-[40px] mx-5 relative bg-secondaryThirty hover:scale-110 transition duration-300 ease-in-out"
                onClick={() => navigate("/Dashboard/Notifications")}
              >
                <img
                  src={assets.bell}
                  className="w-5 h-5"
                  alt="Notifications"
                />
                {notificationCount > 0 && (
                  <span className="absolute font-PJSbold top-2 right-[10px] -mt-1 -mr-1 bg-lime text-black font-semibold px-1 rounded-full text-[10px]">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* <PopupMenu
                trigger={
                  
                }
                menuItems={[
                  { label: "Option 1", value: "1" },
                  { label: "Option 2", value: "2" },
                  { label: "Option 3", value: "3" },
                ]}
                onItemClick={handleItemClick}
                position={{ top: "50px", left: "20px" }}
                customStyles={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ddd",
                }}
              /> */}

              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "25px",
                    border: "1px solid #ddd",
                  }}
                  src={
                    currentFacility &&
                    currentFacility.icon &&
                    currentFacility.icon !== null &&
                    currentFacility.icon.trim() !== ""
                      ? currentFacility.icon
                      : assets.placeholder
                  }
                  alt="Facility"
                />
                <div className="font-PJSmedium">
                  {currentFacility ? currentFacility.name : ""}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 bg-background">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Optional Heading or Content */}
            </div>
            <div className="mx-auto max-w-[84rem] px-4 sm:px-6 lg:px-8 w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {/* Profile/Logout Modal */}
      <AppModal
        modalopen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        height="auto"
        width="150px"
        customStyles={{
          overlay: {
            justifyContent: "flex-start",
            alignItems: "flex-end",
            padding: "2rem",
          },
          modal: {
            position: "absolute",
            top: "5%",
            right: "0",
            margin: "1rem",
          },
        }}
      >
        <div className="flex flex-col space-y-2 font-PJSmedium">
          <button className="flex items-center gap-2" onClick={handleNav}>
            <img src={assets.profileicon} className="w-5 h-5" alt="Profile" />
            Profile
          </button>
          <button
            className="text-redbutton flex items-center gap-2"
            onClick={handleLogout}
          >
            <img src={assets.logout} className="w-5 h-5" alt="Logout" />
            Logout
          </button>
        </div>
      </AppModal>

      <Toast open={open} setOpen={setOpen} message={message} type={type} />

      {loading && <Loader />}
    </div>
  );
};

export default Dashboard;
