import { useEffect, useState } from "react";
import GeneralNotifications from "./GeneralNotifications";
import PaymentNotifications from "./PaymentNotifications";
import MarkedAll from "../../../assets/svgs/MarkedAll";
import { FaEllipsisH } from "react-icons/fa"; // Entypo-like horizontal dots
import { AiOutlineDown } from "react-icons/ai"; // AntDesign-style down arrow
import { AiOutlineNotification } from "react-icons/ai"; // Notification icon

import {
  clearAllNotifications,
  deleteNotification,
  getAllNotifications,
  readAllNotification,
  readNotification,
} from "../../../api/services/notificationService";
import { AppModal } from "../../../components";
import UserNotifItem from "./UserNotifItem";
import { useStateContext } from "../../../context";
import { useOutletContext } from "react-router-dom";

const Notifications = () => {
  const { user } = useStateContext();
  const { fetchNotificationCounts } = useOutletContext();

  const [selected, setSelected] = useState("Activity");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const data = await getAllNotifications();
      setNotifications(data.notifications);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deleteNotification(id);
    setNotifications((prev) => prev.filter((n) => n._id !== id));

    fetchNotificationCounts();
  };

  const handleRead = async (id) => {
    await readNotification(id);
    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id && !n.readFor.includes(user._id)
          ? { ...n, readFor: [...n.readFor, user._id] }
          : n
      )
    );

    fetchNotificationCounts();
  };

  const handleClearAll = async () => {
    await clearAllNotifications();
    setModal(null);
    fetchNotifications();

    fetchNotificationCounts();
  };

  const handleReadAll = async () => {
    await readAllNotification();
    setModal(null);
    fetchNotifications();

    fetchNotificationCounts();
  };

  const filteredNotifications = notifications.filter((n) =>
    selected === "Activity"
      ? n.type.toLowerCase() !== "payment"
      : n.type.toLowerCase() === "payment"
  );

  return (
    <>
      <div className={`min-h-screen px-6 py-10 ${"bg-lightSelected"}`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 relative">
          <div>
            <h1 className="font-bold text-2xl">Notifications</h1>
          </div>
          <button className="absolute right-0" onClick={() => setModal("menu")}>
            <FaEllipsisH size={24} color={"black"} />
          </button>
        </div>

        {/* Tabs */}
        <div
          className={`w-[30%] ml-auto flex bg-white rounded-full h-12 overflow-hidden`}
        >
          {["Activity", "Payments"].map((tab) => (
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

        {/* Filters */}
        <div className="mt-6 flex justify-between mx-auto">
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white"
            onClick={() =>
              setModal(
                selected === "Activity" ? "sortActivity" : "sortPayments"
              )
            }
          >
            <span className="text-sm font-medium">All Activity</span>
            <AiOutlineDown size={14} />
          </button>
          <button
            className="px-4 py-2 rounded-full bg-white text-sm font-medium"
            onClick={() => setModal("clear")}
          >
            Clear
          </button>
        </div>

        {/* Notification List */}
        <div className="mt-6">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center text-sm mt-10">
              No notifications found
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <UserNotifItem
                key={item._id}
                item={item}
                onRead={handleRead}
                onDelete={handleDelete}
                userId={user._id}
              />
            ))
          )}
        </div>

        {/* Modals */}
        <AppModal modalopen={modal === "menu"} onClose={() => setModal(null)}>
          <div className="text-lg font-bold mb-4">More Options</div>
          <button
            className="flex items-center gap-4 mb-4"
            onClick={() => toast.info("Coming soon")}
          >
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <AiOutlineNotification />
            </div>
            <span>Send push notifications</span>
          </button>
          <button className="flex items-center gap-4" onClick={handleReadAll}>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <MarkedAll />
            </div>
            <span>Mark all as read</span>
          </button>
        </AppModal>

        <AppModal modalopen={modal === "clear"} onClose={() => setModal(null)}>
          <h2 className="text-lg font-bold mb-2">Clear activity</h2>
          <p className="mb-2">You're about to clear your notifications</p>
          <p className="mb-4">Are you sure?</p>
          <div className="flex justify-between gap-4">
            <button
              className="w-full py-2 rounded-full bg-gray-100"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
            <button
              className="w-full py-2 rounded-full bg-lime-400"
              onClick={handleClearAll}
            >
              Yes, clear
            </button>
          </div>
        </AppModal>
      </div>
    </>
  );
};

export default Notifications;
