import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaEllipsisH, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { BsPersonPlus, BsPersonDash } from "react-icons/bs";
import { useStateContext } from "../../../context";

// SVG components would need to be converted to React components or replaced with icons
// For now, I'll use placeholder icons from react-icons

const UserNotifItem = ({
  item,
  onRead,
  onDelete,
  onAcceptMemberInvite,
  onRejectMemberInvite,
  onAcceptRivalInvite,
  onRejectRivalInvite,
  onRetryPayment,
}) => {
  const { user } = useStateContext();
  const navigate = useNavigate();
  const isRead = item.readFor.some((u) => u.toString() === user._id);

  // Modals state
  const [
    confirmationRequiredModalVisible,
    setConfirmationRequiredModalVisible,
  ] = useState(false);
  const [newFriendModalVisible, setNewFriendModalVisible] = useState(false);
  const [creditsModalVisible, setCreditsModalVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  const provideNotificationIcon = (type, subType) => {
    if (type === "booking") {
      if (subType === "invitation_accepted") {
        return <AiOutlineCheck className="text-green-500" size={24} />;
      } else if (subType === "booking_left") {
        return <IoMdClose className="text-red-500" size={24} />;
      } else if (
        subType === "invitation_received" ||
        subType === "challenge_received"
      ) {
        return <AiOutlineCheck className="text-blue-500" size={24} />;
      } else if (subType === "booking_cancelled") {
        return <IoMdClose className="text-red-500" size={24} />;
      } else if (subType === "booking_reminder") {
        return <AiOutlineCheck className="text-yellow-500" size={24} />;
      } else if (subType === "confirmation_required") {
        return <AiOutlineCheck className="text-blue-500" size={24} />;
      }
    } else if (type === "user") {
      if (subType === "user_blocked") {
        return <IoMdClose className="text-red-500" size={24} />;
      } else if (subType === "follow") {
        return <BsPersonPlus className="text-green-500" size={24} />;
      } else if (subType === "unfollow") {
        return <BsPersonDash className="text-red-500" size={24} />;
      }
    } else if (type === "team") {
      if (subType === "new_team") {
        return <BsPersonPlus className="text-blue-500" size={24} />;
      }
    } else if (type === "payment") {
      if (subType === "credits") {
        return <MdOutlinePayment className="text-blue-500" size={24} />;
      } else if (subType === "payment_transfered") {
        return <MdOutlinePayment className="text-green-500" size={24} />;
      } else if (subType === "penalty") {
        return <MdOutlinePayment className="text-red-500" size={24} />;
      } else if (subType === "no_default_card") {
        return <IoMdClose className="text-red-500" size={24} />;
      } else if (subType === "payment_failure") {
        return <IoMdClose className="text-red-500" size={24} />;
      } else if (subType === "payment_success") {
        return <AiOutlineCheck className="text-green-500" size={24} />;
      } else if (subType === "payout_success") {
        return <AiOutlineCheck className="text-green-500" size={24} />;
      } else if (subType === "payout_failure") {
        return <IoMdClose className="text-red-500" size={24} />;
      }
    }
    return <AiOutlineCheck className="text-gray-500" size={24} />;
  };

  const handleModal = (type, subType, reference) => {
    if (!isRead) onRead(item._id);

    if (type === "booking") {
      if (subType === "booking_left") {
        navigate("/Dashboard/Calendar", {
          state: { _id: reference, hideBookingBtn: true },
        });
      } else if (subType === "booking_cancelled") {
        navigate("/Dashboard/Calendar", {
          state: { _id: reference, hideBookingBtn: true },
        });
      } else if (subType === "confirmation_required") {
        setConfirmationRequiredModalVisible(true);
      }
    } else if (type === "team") {
      if (subType === "new_team") {
        // Do nothing
      }
    } else if (type === "payment") {
      if (subType === "credits") {
        setCreditsModalVisible(true);
      } else if (subType === "payment_transfered" || subType === "penalty") {
        setPaymentModalVisible(true);
      } else if (
        subType === "payment_success" ||
        subType === "payment_failure"
      ) {
        navigate("/Dashboard/Reports/SalesReport");
      } else if (subType === "payout_success" || subType === "payout_failure") {
        navigate("/Dashboard/Reports/SalesReport");
      }
    }
  };

  function formatTimeAgo(timestamp) {
    const now = new Date();
    const givenTime = new Date(timestamp);

    const diffMs = now - givenTime;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 3) {
      return `${diffDays}d`;
    } else {
      const day = String(givenTime.getDate()).padStart(2, "0");
      const month = String(givenTime.getMonth() + 1).padStart(2, "0");
      const year = givenTime.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }

  return (
    <>
      <div
        className="relative group"
        onClick={() => {
          navigate(`/Dashboard/Reports/SalesReport/${item.reference}`);
        }}
      >
        <div
          className={`flex items-center p-4 mb-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer ${
            isRead ? "opacity-70" : ""
          }`}
          onClick={() => handleModal(item.type, item.subType, item.reference)}
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            {provideNotificationIcon(item.type, item.subType)}
          </div>

          <div className="flex-grow">
            <div
              className={`font-medium ${
                isRead ? "text-gray-500" : "text-black"
              }`}
            >
              {item.title}
            </div>
            <div
              className={`text-sm ${
                isRead ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {item.message}
            </div>
            {(item.subType === "member_invitation_received" ||
              item.subType === "rival_invitation_received") && (
              <div className="flex gap-3 mt-3">
                <button
                  className="flex-1 py-2 bg-red-500 text-white rounded-full text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.subType === "member_invitation_received") {
                      onRejectMemberInvite(item._id, item.reference);
                    } else if (item.subType === "rival_invitation_received") {
                      const references = item.reference.split(",");
                      const teamId = references[0];
                      const rivalIds = JSON.parse(references[1]);
                      let rivalTeamId;
                      for (let ids of rivalIds) {
                        const rivalAdminIds = ids.split("-");
                        if (
                          rivalAdminIds[1].toString() === user._id.toString()
                        ) {
                          rivalTeamId = rivalAdminIds[0];
                          break;
                        }
                      }
                      onRejectRivalInvite(item._id, teamId, rivalTeamId);
                    }
                  }}
                >
                  Reject
                </button>
                <button
                  className="flex-1 py-2 bg-lime-400 text-primary rounded-full text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.subType === "member_invitation_received") {
                      onAcceptMemberInvite(item._id, item.reference);
                    } else if (item.subType === "rival_invitation_received") {
                      try {
                        const references = item.reference.split(",");
                        const teamId = references[0];
                        const rivalIds = JSON.parse(references[1]);
                        let rivalTeamId;
                        for (let ids of rivalIds) {
                          const rivalAdminIds = ids.split("-");
                          if (
                            rivalAdminIds[1].toString() === user._id.toString()
                          ) {
                            rivalTeamId = rivalAdminIds[0];
                            break;
                          }
                        }
                        onAcceptRivalInvite(item._id, teamId, rivalTeamId);
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }}
                >
                  Accept
                </button>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-400 ml-2">
            {formatTimeAgo(item.createdAt)}
          </div>

          <button
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item._id);
            }}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>

      {/* Confirmation Required Modal */}
      {confirmationRequiredModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Confirmation Required</h3>
            <p className="mb-4">Confirmation due in 1 hour for this booking:</p>
            <p className="mb-4 font-medium">
              Stadio Soccer 7-8pm, March 15th 2024 7v7, South Field
            </p>
            <p className="mb-6">
              If no confirmation is received, this booking will be automatically
              canceled.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 bg-gray-100 rounded-full font-medium"
                onClick={() => setConfirmationRequiredModalVisible(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 py-3 bg-lime-400 text-primary rounded-full font-medium"
                onClick={() => setConfirmationRequiredModalVisible(false)}
              >
                See booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Friend Modal */}
      {newFriendModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">New Friend</h3>
            <p className="mb-6">Johnny Vice has added you as a friend.</p>
            <div className="flex gap-3">
              <button
                className="flex-1 py-3 bg-gray-100 rounded-full font-medium"
                onClick={() => setNewFriendModalVisible(false)}
              >
                Close
              </button>
              <button
                className="flex-1 py-3 bg-lime-400 text-primary rounded-full font-medium"
                onClick={() => setNewFriendModalVisible(false)}
              >
                Follow Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Credits Modal */}
      {creditsModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Credits: Cancellation</h3>
            <p className="mb-2">You received credits for canceling on time:</p>
            <p className="mb-4 font-medium">
              $12.34 have been allocated to your qick account.
            </p>
            <p className="mb-6 font-medium">
              Stadio Soccer 7-8pm, March 15th 2024 7v7, South Field
            </p>
            <button
              className="w-full py-3 bg-lime-400 text-primary rounded-full font-medium"
              onClick={() => setCreditsModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {paymentModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="font-bold text-lg mb-4">Payment</h3>
            <p className="mb-4">You paid $7.56. Here are the details:</p>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <span>Booking price</span>
              <span className="font-medium">$6.67</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <span>Stripe Fee</span>
              <span className="font-medium">$0.30</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <span>Tech Fee</span>
              <span className="font-medium">$0.59</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4 font-bold">
              <span>Total paid</span>
              <span>$7.56</span>
            </div>

            <p className="mb-2 font-medium">
              Stadio Soccer 7-8pm, March 15th 2024 7v7, South Field
            </p>
            <p className="mb-6 text-gray-500">Booking ID: B4455</p>

            <button
              className="w-full py-3 bg-lime-400 text-primary rounded-full font-medium"
              onClick={() => setPaymentModalVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserNotifItem;
