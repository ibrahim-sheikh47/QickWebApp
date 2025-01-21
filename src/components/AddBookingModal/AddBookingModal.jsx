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
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AddUserOrTeamModal from "../AddUserOrTeamModal/AddUserOrTeamModal"; // Ensure the path is correct
import moment from "moment";
import {
  createBooking,
  updateBooking,
} from "../../api/services/bookingService";
import Loader from "../Loader/Loader";
import AppModal from "../AppModal/AppModal";

const { RangePicker } = TimePicker;
const { Option } = Select;

const AddBookingModal = ({
  fields,
  isVisible,
  onClose,
  onNext,
  onCancel,
  mode = "add",
  initialValues = {},
}) => {
  const [form] = Form.useForm();
  const [bookingType, setBookingType] = useState("Add Users"); // Default to "Add Users"
  const [recurringType, setRecurringType] = useState("Never");
  const [recurring, setRecurring] = useState(false);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [repeatedDays, setRepeatedDays] = useState([]);
  const [loading, setLoading] = useState(false);

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
      // selectedUsers.push(initialValues.rivals[0]);
      setSelectedUsers([initialValues.team, ...initialValues.rivals]);

      form.setFieldsValue({
        ...initialValues,
        field: initialValues.field._id,
        startDateTime: initialValues.startDateTime
          ? moment(initialValues.startDateTime)
          : null,
        endDateTime: initialValues.endDateTime
          ? moment(initialValues.endDateTime)
          : null,
      });

      if (initialValues.recurring) {
        handleRecurringChange(initialValues.recurring);
      }
      if (initialValues.repeatedDays) {
        setRepeatedDays(initialValues.repeatedDays);
      }
    } else if (
      mode == "add" &&
      initialValues.startDateTime &&
      initialValues.endDateTime
    ) {
      form.setFieldsValue({
        startDateTime: initialValues.startDateTime
          ? moment(initialValues.startDateTime)
          : null,
        endDateTime: initialValues.endDateTime
          ? moment(initialValues.endDateTime)
          : null,
      });
    }
  }, [initialValues, form, mode]);

  const handleBookingTypeChange = (e) => {
    setBookingType(e.target.value);
  };

  const handleRecurringChange = (value) => {
    setRecurring(value === "Recurring Booking");
  };

  const handleRecurringTypeChange = (value) => {
    setRecurringType(value);
  };

  const handleUserModalClose = () => {
    setUserModalVisible(false);
  };

  const handleUserModalNext = (data) => {
    console.log(data.selectedUsers);
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
        const data = {
          bookingType: values.bookingType,
          field: values.field,
          facility: fields.find((f) => f._id === values.field).fieldOwner._id,
          startDateTime: moment(values.startDateTime.toString()).toISOString(
            true
          ),
          endDateTime: moment(values.endDateTime.toString()).toISOString(true),
          notes: values.notes,
          recurring: values.recurring,
          size: 4,
          totalAmount: 0,
          type: values.type,
          team: selectedUsers[0]._id,
          rivals: selectedUsers.slice(1).map((sU) => {
            return sU._id;
          }),
          repeatedDays: repeatedDays,
          recurringType: values.recurringType,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppModal
        modalopen={isVisible}
        onClose={onClose}
        height={"auto"}
        width={"35rem"}
        customStyles={{
          overlay: { position: "fixed" },
          modal: { position: "absolute" },
        }}
      >
        {/* title={mode === "add" ? "Add Booking" : "Edit Booking"}
        visible={isVisible}
        onCancel={onClose}
        footer={
          <div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                key="cancel"
                style={{ flex: 1, borderRadius: "25rem", padding: "1rem" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              ,
              <Button
                key="add"
                type="primary"
                style={{
                  backgroundColor: "#9CFC38",
                  flex: 1,
                  borderRadius: "25rem",
                  color: "#000",
                  padding: "1rem",
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
                  padding: "1rem",
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
        }
        bodyStyle={{
          // height: "calc(80vh - 50px)", // Adjust height based on viewport
          maxHeight: "calc(80vh - 50px)",
          overflowY: "auto", // Enable vertical scrolling
        }}
        style={{
          top: 20, // Adjust the modal's position
        }}
      > */}
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
            <Radio.Group onChange={handleBookingTypeChange} value={bookingType}>
              <Radio value="Add Users">Add Users</Radio>
              <Radio value="Add Guests">Add Guests</Radio>
            </Radio.Group>
          </Form.Item>

          <div style={{ display: "flex", gap: "1rem" }}>
            {/* Select Field */}
            <Form.Item
              style={{ flex: 0.5 }}
              name="field"
              rules={[{ required: true, message: "Please select a field!" }]}
            >
              <Select placeholder="Select field">
                {fields.map((field) => {
                  return <Option value={`${field._id}`}>{field.name}</Option>;
                })}
              </Select>
            </Form.Item>

            {/* Select Booking Type */}
            <Form.Item
              style={{ flex: 0.5 }}
              name="bookingType"
              rules={[
                { required: true, message: "Please select a booking type!" },
              ]}
            >
              <Select placeholder="Select booking type">
                <Option value="callin">Call In</Option>
                <Option value="recurring">Recurring</Option>
                <Option value="pickup">Pickup</Option>
                <Option value="league">League</Option>
                <Option value="tournament">Tournament</Option>
                <Option value="academy">Academy</Option>
                <Option value="event">Event</Option>
                <Option value="closure">Closure</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Guest Name or Find Users */}
          {bookingType === "Add Guests" ? (
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
            <Form.Item
              name="findUser"
              // label="Find Users"
              rules={[{ required: false }]}
            >
              <Input
                placeholder="Find users"
                suffix={<SearchOutlined />}
                onClick={() => setUserModalVisible(true)} // Open the modal on click
                readOnly
              />
              {selectedUsers.length > 0 && (
                <div style={{ marginTop: "0.5rem" }}>
                  Selected Users:{" "}
                  {selectedUsers.map((user) => (
                    <span
                      key={user ? user._id : ""}
                      style={{
                        display: "inline-block",
                        margin: "0.25rem",
                        padding: "0.5rem",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "5px",
                      }}
                    >
                      {user ? user.name : ""}
                    </span>
                  ))}
                </div>
              )}
            </Form.Item>
          )}

          {/* Notes */}
          <Form.Item name="notes" rules={[{ required: false }]}>
            <Input.TextArea placeholder="Add notes (optional)" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span style={{ flex: 1, alignSelf: "center" }}>Starts:</span>

            {/* Starts */}
            <Form.Item
              name="startDateTime"
              rules={[
                {
                  required: true,
                  message: "Please select a start date and time!",
                },
              ]}
            >
              <DatePicker
                showTime={{ minuteStep: 5 }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value) => {
                  // Store start date-time in the form state
                  form.setFieldsValue({ startDateTime: value });
                }}
                disabledDate={(current) => {
                  return current && current < moment().startOf("day");
                }}
              />
            </Form.Item>

            {/* <Form.Item
              name="startTime"
              style={{ marginBottom: "0px" }}
              rules={[
                { required: true, message: "Please select a start time!" },
              ]}
            >
              <TimePicker
                format="HH:mm"
                minuteStep={5}
                onChange={(value) => {
                  // Store start time in the form state to use for end time validation
                  form.setFieldsValue({ startTime: value });
                }}
              />
            </Form.Item> */}
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
            <span style={{ flex: 1, alignSelf: "center" }}>Ends:</span>

            {/* Starts */}
            <Form.Item
              name="endDateTime"
              rules={[
                {
                  required: true,
                  message: "Please select an end date and time!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    const startDateTime = getFieldValue("startDateTime");
                    if (!value || !startDateTime) {
                      return Promise.resolve();
                    }
                    if (value.isAfter(startDateTime.add(1, "hour"))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "End date must be at least 1 hour later than the start date."
                      )
                    );
                  },
                }),
              ]}
            >
              <DatePicker
                showTime={{ minuteStep: 5 }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value) => {
                  // Store end date-time in the form state
                  form.setFieldsValue({ endDateTime: value });
                }}
                disabledDate={(current) => {
                  const startDateTime = form.getFieldValue("startDateTime");
                  return (
                    current &&
                    startDateTime &&
                    moment.isMoment(startDateTime) &&
                    current.isBefore(startDateTime, "day")
                  );
                }}
              />
            </Form.Item>
            {/* <Form.Item
              name="endDateTime"
              rules={[
                {
                  required: true,
                  message: "Please select an end date and time!",
                },
              ]}
            >
              <DatePicker
                showTime={{ minuteStep: 5 }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value) => {
                  // Store end date-time in the form state
                  form.setFieldsValue({ endDateTime: value });
                }}
                disabledDate={(current) => {
                  const startDateTime = form.getFieldValue("startDateTime");
                  return (
                    current &&
                    startDateTime &&
                    moment.isMoment(startDateTime) &&
                    current.isBefore(startDateTime, "day")
                  );
                }}
              />
            </Form.Item> */}

            {/* <Form.Item
              name="endTime"
              style={{ marginBottom: "0px" }}
              rules={[
                {
                  required: true,
                  message: "Please select an end time!",
                },
              ]}
            >
              <TimePicker format="HH:mm" minuteStep={5} />
            </Form.Item> */}
          </div>

          {/* Recurrence */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Form.Item style={{ flex: 1 }} label="Repeats" />

            <Form.Item name="recurring" rules={[{ required: false }]}>
              <Select
                placeholder="Select recurrence"
                onChange={handleRecurringChange}
              >
                <Option value="Never">Never</Option>
                <Option value="Recurring Booking">Recurring Booking</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Repeat Days */}
          {recurring && (
            <>
              <Form.Item label="Repeat Days">
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
              </Form.Item>

              {/* End Date */}
              <Form.Item
                name="recurringType"
                label="Ends"
                rules={[{ required: false }]}
              >
                <Radio.Group
                  onChange={handleRecurringTypeChange}
                  value={recurringType}
                >
                  <Radio value="Never">Never</Radio>
                  <Radio value="On">On</Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}

          <div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button
                key="cancel"
                style={{ flex: 1, borderRadius: "25rem", padding: "1rem" }}
                onClick={onClose}
              >
                Cancel
              </Button>
              ,
              <Button
                key="add"
                type="primary"
                style={{
                  backgroundColor: "#9CFC38",
                  flex: 1,
                  borderRadius: "25rem",
                  color: "#000",
                  padding: "1rem",
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
                  padding: "1rem",
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
      <AddUserOrTeamModal
        isVisible={userModalVisible}
        onClose={handleUserModalClose}
        onNext={handleUserModalNext}
        setLoading={() => {}} // Pass a loading function if needed
      />

      {loading && <Loader />}
    </>
  );
};

export default AddBookingModal;
