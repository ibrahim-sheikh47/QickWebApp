import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Radio,
  Checkbox,
  notification,
  Avatar,
} from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import AddUserOrTeamModal from "../AddUserOrTeamModal/AddUserOrTeamModal"; // Ensure the path is correct
import moment from "moment";
import {
  createBooking,
  updateBooking,
} from "../../api/services/bookingService";
import Loader from "../Loader/Loader";
import AppModal from "../AppModal/AppModal";
import { bookingHours, hours } from "../../constants";
import DatePickerModal from "../DatePickerModal/DatePickerModal";
import assets from "../../assets/assets";

const { RangePicker } = TimePicker;
const { Option } = Select;

const AddBookingModal = ({
  fields,
  isVisible,
  onClose,
  onNext,
  onCancel,
  mode = "add",
  setLoading,
  initialValues = {},
}) => {
  const [form] = Form.useForm();
  const [bookingOption, setBookingOption] = useState("Add Users"); // Default to "Add Users"
  const [recurringType, setRecurringType] = useState("never");
  const [field, setField] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [notes, setNotes] = useState("");
  const [recurrence, setRecurrence] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [repeatedDays, setRepeatedDays] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endsOn, setEndsOn] = useState(null);
  const [dateSelection, setDateSelection] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const days = [
    { label: "Mon", value: "Monday" },
    { label: "Tue", value: "Tuesday" },
    { label: "Wed", value: "Wednesday" },
    { label: "Thu", value: "Thursday" },
    { label: "Fri", value: "Friday" },
    { label: "Sat", value: "Saturday" },
    { label: "Sun", value: "Sunday" },
  ];

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      setField(initialValues.field._id);
      setBookingType(initialValues.bookingType);

      setSelectedTeam(initialValues.team);
      setSelectedUsers(initialValues.participantsInvited);

      setStartDate(moment(initialValues.startDateTime));
      setStartTime(moment(initialValues.startDateTime).format("hh:mm A"));

      setEndDate(moment(initialValues.endDateTime));
      setEndTime(moment(initialValues.endDateTime).format("hh:mm A"));
      setNotes(initialValues.notes);

      if (initialValues.recurring) {
        handleRecurringChange(initialValues.recurring);
      }
      if (initialValues.repeatedDays) {
        setRepeatedDays(initialValues.repeatedDays);
      }
      if (initialValues.recurringEnds) {
        setRecurringType(initialValues.recurringEnds);
      }
      if (initialValues.recurringEndsOn) {
        setEndsOn(moment(initialValues.recurringEndsOn));
      }
    } else if (
      mode == "add" &&
      initialValues.startDateTime &&
      initialValues.endDateTime
    ) {
      setField(initialValues.field);
      setBookingType(initialValues.bookingType);

      setStartDate(moment(initialValues.startDateTime));
      setStartTime(moment(initialValues.startDateTime).format("hh:mm A"));

      setEndDate(moment(initialValues.endDateTime));
      setEndTime(moment(initialValues.endDateTime).format("hh:mm A"));
    }
  }, [initialValues, form, mode]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setEndDate(null); // Reset end date when start date changes
    setEndTime(null); // Reset end time as well
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
    setEndTime(null); // Reset end time when start time changes
  };

  const handleEndDateChange = (date) => {
    if (startDate && date.isBefore(startDate, "day")) {
      notification.error({
        message: "Validation Error",
        description: "The end date should not be previous then the start date",
        duration: 3, // Auto-close after 3 seconds
      });
      return;
    }
    setEndDate(date);
  };

  const handleEndTimeChange = (e) => {
    const endTimeValue = e.target.value;
    const startDateTime = moment(startDate)
      .hour(moment(startTime, "h:mm A").hour())
      .minute(moment(startTime, "h:mm A").minute());
    const endDateTime = moment(endDate)
      .hour(moment(endTimeValue, "h:mm A").hour())
      .minute(moment(endTimeValue, "h:mm A").minute());

    if (endDateTime.diff(startDateTime, "minutes") < 60) {
      notification.error({
        message: "Validation Error",
        description:
          "End time must be at least 60 minutes after the start time.",
        duration: 3, // Auto-close after 3 seconds
      });
      return;
    }
    setEndTime(endTimeValue);
  };

  const handleBookingTypeChange = (e) => {
    setBookingOption(e.target.value);
  };

  const handleRecurringChange = (e) => {
    if (typeof e === "string") {
      setRecurring(e !== "monthly" && e !== "");
      setRecurrence(e);
    } else {
      setRecurring(e.target.value !== "monthly" && e.target.value !== "");
      setRecurrence(e.target.value);
    }
  };

  const handleRecurringTypeChange = (value) => {
    if (value.target.value !== "on") {
      setEndsOn(null);
    }

    setRecurringType(value.target.value);
  };

  const handleUserModalClose = () => {
    setUserModalVisible(false);
  };

  const handleUserModalNext = (data) => {
    setSelectedTeam(data.selectedTeam);
    setSelectedUsers(data.selectedUsers); // Update selected users/teams
    setUserModalVisible(false);
  };

  const getMomentDate = (date) => {
    return moment.isMoment(date) ? date : moment(date);
  };

  const handleSubmit = () => {
    setLoading(true);
    try {
      form.validateFields().then(async (values) => {
        const startDateTime = moment(startDate)
          .hour(moment(startTime, "h:mm A").hour())
          .minute(moment(startTime, "h:mm A").minute());
        const endDateTime = moment(endDate)
          .hour(moment(endTime, "h:mm A").hour())
          .minute(moment(endTime, "h:mm A").minute());

        const data = {
          bookingType: bookingType,
          field: field,
          facility: fields.find((f) => f._id === field).fieldOwner._id,
          startDateTime: startDateTime.toISOString(),
          endDateTime: endDateTime.toISOString(),
          notes: notes,
          recurring: recurrence,
          size:
            parseInt(
              fields.find((f) => f._id === field).fieldSize.split("v")[0]
            ) * 2,
          totalAmount: 0,
          type: bookingOption,
          team: selectedTeam?._id,
          participantsInvited: selectedUsers.map((u) => u._id),
          repeatedDays: repeatedDays,
          recurringEnds: recurringType,
          recurringEndsOn: recurringType === "on" ? endsOn.toISOString() : "",
        };

        let response;
        if (mode === "add") {
          response = await createBooking(data);
        } else if (mode === "edit") {
          response = await updateBooking(data, initialValues._id);
        }
        onNext(response);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppModal
        modalopen={isVisible}
        onClose={onClose}
        height={"auto"}
        width={"30rem"}
        customStyles={{
          overlay: { position: "fixed" },
          modal: { position: "absolute", borderRadius: "30px" },
        }}
      >
        <Form form={form} layout="vertical">
          <h1 style={{ fontWeight: "600", marginBottom: "1rem" }}>
            {mode === "add" ? "Add Booking" : "Edit Booking"}
          </h1>

          {/* Booking Type */}
          <Form.Item
            name="type"
            initialValue="Add Users" // Default value
            rules={[
              { required: true, message: "Please select a booking type!" },
            ]}
          >
            <Radio.Group
              onChange={handleBookingTypeChange}
              value={bookingOption}
            >
              <Radio value="Add Users">Add Users</Radio>
              <Radio value="Add Guests">Add Guests</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 0.5 }}>
              <select
                value={field}
                onChange={(e) => setField(e.target.value)}
                className={`block mb-3 px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[2.5rem]`}
              >
                <option value="">Select field</option>
                {fields.map((field) => {
                  return <option value={`${field._id}`}>{field.name}</option>;
                })}
              </select>
            </div>

            <div style={{ flex: 0.5 }}>
              <select
                value={bookingType}
                onChange={(e) => setBookingType(e.target.value)}
                className={`block mb-3 px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[2.5rem]`}
              >
                <option value="">Select booking type</option>
                <option value="callin">Call In</option>
                <option value="recurring">Recurring</option>
                <option value="pickup">Pickup</option>
                <option value="league">League</option>
                <option value="tournament">Tournament</option>
                <option value="academy">Academy</option>
                <option value="event">Event</option>
                <option value="closure">Closure</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Guest Name or Find Users */}
          {bookingOption === "Add Guests" ? (
            <Form.Item
              name="guestName"
              // label="Guest Name"
              rules={[
                { required: false, message: "Please enter the guest name!" },
              ]}
            >
              <Input placeholder="Type guest name" />
            </Form.Item>
          ) : (
            <div className="p-2 border rounded-lg shadow-sm focus:outline-none font-PJSregular text-sm bg-white border-secondaryThirty w-full min-h-[4rem]">
              <input
                className="h-[2.5rem] w-full"
                placeholder="Find team & users"
                onClick={() => setUserModalVisible(true)} // Open the modal on click
                readOnly
              />

              <div>
                {selectedTeam !== null && (
                  <div
                    key={selectedTeam._id}
                    style={{
                      display: "inline-flex",
                      width: "fit-content",
                      alignItems: "center",
                      padding: "0.2rem 0.35rem",
                      backgroundColor: "#f4f4f4",
                      borderRadius: "25px",
                      borderWidth: "1px",
                    }}
                  >
                    <Avatar src={selectedTeam.cover} size="small" />
                    <span className="font-PJSbold text-[10px]">
                      <i>{`${selectedTeam.name} (T-${selectedTeam._id.substring(
                        selectedTeam._id.length - 2
                      )})${
                        selectedTeam.admins.length > 0
                          ? ` (Admin: ${
                              selectedTeam.admins[0].name
                            } ID-${selectedTeam.admins[0]._id.substring(
                              selectedTeam.admins[0]._id.length - 2
                            )})`
                          : ""
                      }`}</i>
                    </span>

                    <div className="flex justify-center items-center bg-lime w-[18px] h-[18px] rounded-full">
                      <img
                        src={assets.checkblack}
                        className="w-[12px] h-[12px]"
                      />
                    </div>

                    {/* <div onClick={() => setSelectedTeam(null)}>
                      <CloseOutlined />
                    </div> */}  
                  </div>
                )}
                <div className="flex flex-wrap gap-1 mt-1 max-h-[4.5rem] overflow-x-auto">
                  {selectedUsers.length > 0 &&
                    selectedUsers.map((user) => (
                      <div
                        key={user._id}
                        className="gap-1"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "0.2rem 0.35rem",
                          backgroundColor: "#f4f4f4",
                          borderRadius: "25px",
                          borderWidth: "1px",
                        }}
                      >
                        <Avatar
                          src={user.avatar}
                          style={{ marginRight: "0.2rem" }}
                          size="small"
                        />
                        <span className="font-PJSbold text-[10px]">
                          <i>{`${user.name} (ID-${user._id.substring(
                            user._id.length - 5
                          )})`}</i>
                        </span>

                        <div className="flex justify-center items-center bg-lime w-[18px] h-[18px] rounded-full">
                          <img
                            src={assets.checkblack}
                            className="w-[12px] h-[12px]"
                          />
                        </div>

                        <div
                          onClick={() =>
                            setSelectedUsers(
                              selectedUsers.filter((u) => u._id !== user._id)
                            )
                          }
                        >
                          <CloseOutlined />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes (optional)"
            className={`block mt-2 p-2 border rounded-lg shadow-sm focus:outline-none font-PJSregular text-sm bg-white border-secondaryThirty w-full min-h-[4rem]`}
          />

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "12px",
              marginTop: "12px",
            }}
          >
            <span
              style={{ flex: 1, alignSelf: "center" }}
              className="font-PJSbold"
            >
              Starts:
            </span>

            <label
              name="startDate"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                setDateSelection("start");
                setShowDatePicker(true);
              }}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[8.5rem] h-[2.5rem]`}
            >
              {startDate
                ? moment(startDate).format("MMM Do, yyyy")
                : "Select Date"}
            </label>

            <select
              name="startTime"
              onChange={handleStartTimeChange}
              value={startTime}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[8.5rem] h-[2.5rem]`}
            >
              {[{ label: "", value: "Select Time" }, ...bookingHours()].map(
                (h) => {
                  return <option value={h.label}>{h.value}</option>;
                }
              )}
            </select>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span
              style={{ flex: 1, alignSelf: "center" }}
              className="font-PJSbold"
            >
              Ends:
            </span>

            <label
              name="endDate"
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                setDateSelection("end");
                setShowDatePicker(true);
              }}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[8.5rem] h-[2.5rem]`}
            >
              {endDate ? moment(endDate).format("MMM Do, yyyy") : "Select Date"}
            </label>

            <select
              name="endTime"
              onChange={handleEndTimeChange}
              value={endTime}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[8.5rem] h-[2.5rem]`}
            >
              {[{ label: "", value: "Select Time" }, ...bookingHours()].map(
                (h) => {
                  return <option value={h.label}>{h.value}</option>;
                }
              )}
            </select>
          </div>

          {/* Recurrence */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mb-3"
          >
            <label className="font-PJSbold" style={{ flex: 1 }}>
              Repeats:
            </label>
            <select
              value={recurrence}
              onChange={handleRecurringChange}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[17.5rem] h-[2.5rem]`}
            >
              <option value="">Select recurrence</option>
              <option value="weekly">Weekly</option>
              <option value="bi_weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Repeat Days */}
          {recurring && (
            <>
              <div>
                <label className="font-PJSbold" style={{ flex: 1 }}>
                  Repeat Days:
                </label>
              </div>
              <div className="row row-gap-3">
                {days.map((d) => {
                  let doesExist = repeatedDays.find(
                    (rd) => rd.label === d.label
                  );

                  return (
                    <button
                      type="button"
                      onClick={() => {
                        if (doesExist) {
                          setRepeatedDays(
                            repeatedDays.filter((rd) => rd.label !== d.label)
                          );
                        } else {
                          setRepeatedDays([...repeatedDays, d]);
                        }
                      }}
                      className="text-large font-PJSmedium"
                      style={{
                        minWidth: "4rem",
                        color: doesExist ? "#fff" : "#000",
                        borderRadius: "25rem",
                        padding: "0.5rem",
                        margin: "0.3rem",
                        border: `1px solid ${
                          doesExist ? "#33C0DB" : "#849AB84D"
                        }`,
                        ...(doesExist && { backgroundColor: "#33C0DB" }),
                      }}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center">
                <div style={{ flex: 1 }}>
                  <label className="font-PJSbold" style={{ flex: 1 }}>
                    Ends:
                  </label>
                  <Form.Item rules={[{ required: false }]}>
                    <Radio.Group
                      onChange={handleRecurringTypeChange}
                      value={recurringType}
                    >
                      <Radio value="never">Never</Radio>
                      <Radio value="on">On</Radio>
                      <Radio value="after">After</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>

                {recurringType === "on" && (
                  <label
                    name="endsOn"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => {
                      setDateSelection("endsOn");
                      setShowDatePicker(true);
                    }}
                    className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[8.5rem] h-[2.5rem]`}
                  >
                    {endsOn
                      ? moment(endsOn).format("MMM Do, yyyy")
                      : "Select Date"}
                  </label>
                )}
              </div>
            </>
          )}

          <div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                key="cancel"
                style={{ flex: 1, borderRadius: "25rem", padding: "1.5rem" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                key="add"
                type="primary"
                style={{
                  backgroundColor: "#9CFC38",
                  flex: 1,
                  borderRadius: "25rem",
                  color: "#000",
                  padding: "1.5rem",
                }}
                onClick={handleSubmit}
              >
                {mode === "add" ? "Add" : "Update"}
              </Button>
            </div>
            {mode !== "add" && (
              <Button
                key="cancel_booking"
                style={{
                  width: "100%",
                  borderRadius: "25rem",
                  padding: "1.5rem",
                  borderColor: "red",
                  color: "red",
                  marginTop: "12px",
                }}
                onClick={() => onCancel(initialValues._id)}
              >
                Cancel Booking
              </Button>
            )}
          </div>
        </Form>
      </AppModal>

      {/* AddUserOrTeamModal */}
      {userModalVisible && (
        <AddUserOrTeamModal
          isVisible={userModalVisible}
          onClose={handleUserModalClose}
          onNext={handleUserModalNext}
          selectedTeamData={selectedTeam}
          selectedUsersData={selectedUsers}
          setLoading={() => {}} // Pass a loading function if needed
        />
      )}

      <DatePickerModal
        isOpen={showDatePicker}
        onClose={() => {
          setShowDatePicker(false);
        }}
        selectedDate={null}
        handleDataChange={(date) => {
          if (dateSelection === "start") {
            handleStartDateChange(moment(date));
          } else if (dateSelection === "end") {
            handleEndDateChange(moment(date));
          } else if (dateSelection === "endsOn") {
            setEndsOn(moment(date));
          }
          setShowDatePicker(false);
          setDateSelection(null);
        }}
        showButtons={false}
      />
    </>
  );
};

export default AddBookingModal;
