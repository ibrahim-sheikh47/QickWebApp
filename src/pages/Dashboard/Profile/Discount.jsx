import { useEffect, useRef, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import assets from "../../../assets/assets";
import { Checkbox } from "@mui/material";
import { useStateContext } from "../../../context";
import { getFacilityFields } from "../../../api/services/facilityService";
import Loader from "../../../components/Loader/Loader";
import { Calendar } from "react-date-range";
import AppModal from "../../../components/AppModal/AppModal";
import {
  createVoucher,
  deleteVoucher,
  getAllVouchers,
  updateVoucherById,
} from "../../../api/services/voucherService";
import moment from "moment";
import DatePickerModal from "../../../components/DatePickerModal/DatePickerModal";
import Toast from "../../../components/Toast/Toast";

const Discount = () => {
  const { currentFacility } = useStateContext();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [discountedDaysModal, setDiscountedDaysModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isFormVisible, setFormVisible] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [currentDiscount, setCurrentDiscount] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const [showAdditionalInput, setShowAdditionalInput] = useState(false);
  const [manualError, setManualError] = useState("");
  const [multipleRedemptions, setMultipleRedemptions] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const [selectedDates, setSelectedDates] = useState(
    currentDiscount && currentDiscount.discountedDays
      ? currentDiscount.discountedDays.split(",")
      : []
  );
  const [discountedDays, setDiscountedDays] = useState("");

  useEffect(() => {
    if (selectedDates.length > 0) {
      setDiscountedDays(
        selectedDates
          .map((date) => {
            return moment(date).format("MMM Do yyyy");
          })
          .join(", ")
      );
    } else {
      setDiscountedDays("");
    }
  }, [selectedDates]);

  const textareaRef = useRef(null);

  // Adjust the textarea height dynamically based on its content
  const handleHolidayChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to fit content
    }
  };

  useEffect(() => {
    handleHolidayChange(); // Adjust height when the component mounts
  }, [discountedDays]);

  useEffect(() => {
    fetchFieldsAndDiscounts();
  }, []);

  const fetchFieldsAndDiscounts = async () => {
    setLoading(true);
    try {
      const facilityFields = await getFacilityFields(currentFacility._id);
      const facilityVouchers = await getAllVouchers(currentFacility._id);
      setFields(facilityFields);
      setDiscounts(facilityVouchers.voucher);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentDiscount) {
      reset({
        discountType: currentDiscount.discountType || "",
        description: currentDiscount.description || "",
        code: currentDiscount.code || "",
        discountAmount: currentDiscount.discountAmount || "",
        discountedFields: currentDiscount.discountedFields || "",
        numberOfUses: currentDiscount.numberOfUses || "",
        expiryDate: currentDiscount.expiryDate
          ? moment(currentDiscount.expiryDate).format("yyyy-MM-DD")
          : "",
      });

      if (!currentDiscount.singleUse) {
        setShowAdditionalInput(true);
        setMultipleRedemptions(currentDiscount.maxRedemption);
      }
    } else {
      reset({
        discountType: "",
        description: "",
        code: "",
        discountAmount: "",
        discountedFields: "",
        numberOfUses: "",
        expiryDate: moment(selectedDate).format("yyyy-MM-DD"),
      });
    }
  }, [currentDiscount]);

  const handleSingleDateChange = (date) => {
    setSelectedDate(date);
  };

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  const hideForm = () => {
    setFormVisible(false);
    setCurrentDiscount(null);
    setEditingIndex(null);
  };

  const schema = yup.object().shape({
    discountType: yup.string().required("Please select Discount Type"),
    description: yup.string().required("Please enter Description"),
    code: yup.string().required("Please enter Discount Name"),
    discountAmount: yup.string().required("Please enter Discount Amount"),
    discountedFields: yup.string().required("Please select Discounted Fields"),
    numberOfUses: yup.string().required("Please select Number of Uses"),
    // DiscountDays: yup.string().required("Please enter Discount days"),
    expiryDate: yup.string().required("Please select a valid date"),
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = methods;

  const performSubmit = (body) => {
    setManualError("");

    if (showAdditionalInput) {
      if (
        multipleRedemptions.trim() !== "" &&
        parseInt(multipleRedemptions) <= 0
      ) {
        setManualError(
          "Multiple Redemptions is required and must be greater than 0"
        );
        return;
      }
    }

    if (currentDiscount) {
      updateDiscountVoucher(body, currentDiscount._id);
    } else {
      createDiscountVoucher(body);
    }
  };

  const updateDiscountVoucher = async (body, voucherId) => {
    setLoading(true);
    try {
      const data = {
        ...body,
        creator: currentFacility._id,
        singleUse: !showAdditionalInput,
        maxRedemption:
          multipleRedemptions.trim() === "" ? null : multipleRedemptions,
      };
      await updateVoucherById(data, voucherId);
      hideForm();
      setCurrentDiscount(null);

      fetchFieldsAndDiscounts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const createDiscountVoucher = async (body) => {
    setLoading(true);
    try {
      const data = {
        ...body,
        creator: currentFacility._id,
        singleUse: !showAdditionalInput,
        maxRedemption:
          multipleRedemptions.trim() === "" ? null : multipleRedemptions,
      };
      await createVoucher(data);
      hideForm();

      fetchFieldsAndDiscounts();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const editDiscount = (index) => {
    setCurrentDiscount(discounts[index]);
    setEditingIndex(index);
    setFormVisible(true);
  };

  const deleteDiscount = async (voucherId) => {
    if (editingIndex !== null) {
      setLoading(true);
      try {
        await deleteVoucher(voucherId);
        hideForm();
        setCurrentDiscount(null);

        fetchFieldsAndDiscounts();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  return (
    <div className="mx-3 mt-4">
      {!isFormVisible && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-PJSbold text-xl">Discounts</p>
              <p className="font-PJSregular text-secondary text-sm mt-1">
                You have no active discounts
              </p>
            </div>
            <div className="flex items-center gap-5">
              <div className="border-2 px-3 py-2 rounded-full">
                <select className="px-2" name="" id="">
                  <option value="">Sort</option>
                </select>
              </div>
              <button
                onClick={toggleFormVisibility}
                className="flex items-center transition duration-300 ease-in-out transform hover:scale-105 text-[14px] rounded-full bg-lime font-PJSmedium justify-center w-[180px] h-[45px] gap-2"
              >
                <img className="w-5 h-5" src={assets.Plus} alt="" />
                Create Discount
              </button>
            </div>
          </div>

          {discounts.map((discount, index) => (
            <div
              key={index}
              className="mt-4 cursor-pointer"
              onClick={() => editDiscount(index)}
            >
              <div className="flex mt-10 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blueSecondary p-4">
                    <img className="w-6 h-6" src={assets.DiscountBlue} alt="" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-PJSbold text-[16px]">{discount.code}</p>
                    <p className="font-PJSmedium text-xs">
                      {discount.description}
                    </p>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="font-PJSbold text-[16px] uppercase">
                      {discount.discountAmount}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-PJSmedium">
                    <p>{discount.maxRedemption}</p>
                    <img className="w-1" src={assets.circle} alt="" />
                    <p>
                      Valid till{" "}
                      {moment(discount.expiryDate).format("DD/MM/yyyy")}
                    </p>
                    <img className="w-1" src={assets.circle} alt="" />
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-full my-3 bg-secondaryTwenty"></div>
            </div>
          ))}
        </>
      )}
      {isFormVisible && (
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(performSubmit)}>
            {editingIndex !== null && (
              <div className="mb-10">
                <div className="flex items-center justify-between">
                  <p className="font-PJSbold text-xl">
                    Generated Discount Name
                  </p>
                </div>
                <div className="relative mt-5">
                  <input
                    id="code"
                    {...register("code")}
                    className="block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]"
                    type="text"
                  />
                  <label
                    htmlFor="code"
                    className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                  >
                    Discount Name*
                  </label>
                  <button
                    type="button"
                    className="flex absolute bottom-2 right-2 items-center rounded-lg gap-2 p-2 bg-secondaryTen "
                    onClick={() => {
                      const discountCode = methods.getValues("code");
                      if (discountCode) {
                        navigator.clipboard
                          .writeText(discountCode)
                          .then(() => {
                            showToast("Discount code copied to clipboard!");
                          })
                          .catch(() => {
                            showToast("Failed to copy discount code.", "error");
                          });
                      } else {
                        showToast("No discount code to copy!", "error");
                      }
                    }}
                  >
                    <p className="w-[max-content]">Copy</p>
                    <img className="w-3" src={assets.copy} alt="" />
                  </button>
                </div>
              </div>
            )}
            <p className="font-PJSbold text-xl">
              {editingIndex !== null ? "Discount Details" : "Create Discount"}
            </p>
            <div className="mt-5">
              <div className="relative mt-5">
                <select
                  id="discountType"
                  {...register("discountType")}
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}
                >
                  <option value="">Choose an option</option>
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
                <label
                  htmlFor="discountType"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Discount Type*
                </label>
                {errors.discountType && (
                  <span className="error text-sm font-PJSmedium text-redbutton">
                    {errors.discountType.message}
                  </span>
                )}
              </div>
              <div className="relative mt-5">
                <input
                  id="description"
                  type="text"
                  {...register("description")}
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`}
                />
                <label
                  htmlFor="discountType"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Description*
                </label>
                {errors.description && (
                  <span className="error text-sm font-PJSmedium  text-redbutton">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="relative mt-5">
                <input
                  id="code"
                  {...register("code")}
                  type="text"
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`}
                />
                <label
                  htmlFor="code"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Discount Code*
                </label>
                {errors.code && (
                  <span className="error text-sm font-PJSmedium  text-redbutton">
                    {errors.code.message}
                  </span>
                )}
              </div>

              <div className="relative mt-5">
                <input
                  id="discountAmount"
                  {...register("discountAmount")}
                  type={"number"}
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onKeyDown={(e) =>
                    e.key === "ArrowUp" || e.key === "ArrowDown"
                      ? e.preventDefault()
                      : null
                  }
                  onWheel={(e) => e.target.blur()}
                />
                <label
                  htmlFor="discountType"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Discount Amount*
                </label>
                {errors.discountAmount && (
                  <span className="error text-sm font-PJSmedium  text-redbutton">
                    {errors.discountAmount.message}
                  </span>
                )}
              </div>
              <div className="relative mt-5">
                <select
                  id="numberOfUses"
                  {...register("numberOfUses")}
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}
                >
                  <option value="">Choose an option</option>
                  <option value="no_limit">No Limit</option>
                </select>
                <label
                  htmlFor="numberOfUses"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Number of Uses*
                </label>
                {errors.numberOfUses && (
                  <span className="error text-sm font-PJSmedium text-redbutton">
                    {errors.numberOfUses.message}
                  </span>
                )}
              </div>
              <div className="relative mt-5">
                <select
                  id="discountedFields"
                  {...register("discountedFields")}
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}
                >
                  <option value="">Choose an option</option>
                  <option value="all">All Fields</option>
                  {fields.length > 0
                    ? fields.map((f) => {
                        return <option value={`${f._id}`}>{f.name}</option>;
                      })
                    : null}
                </select>
                <label
                  htmlFor="discountedFields"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Discounted Fields*
                </label>
                {errors.discountedFields && (
                  <span className="error text-sm font-PJSmedium  text-redbutton">
                    {errors.discountedFields.message}
                  </span>
                )}
              </div>
              <div className="block px-4 pb-4 border rounded-lg shadow-sm focus:outline-none bg-white border-secondaryThirty w-full mt-4">
                <label
                  htmlFor="discountedDays"
                  className="text-secondary font-PJSmedium text-xs"
                >
                  Discounted Days*
                </label>
                <div className="flex items-center gap-1 w-full">
                  {/* Add margin-top to textarea to create space for the label */}
                  <textarea
                    onClick={() => setDiscountedDaysModal(true)}
                    {...register("discountedDays")}
                    value={discountedDays}
                    className="font-PJSmedium text-sm w-full resize-y my-2" // Allow vertical resizing
                    style={{ minHeight: "40px", height: "auto" }} // Set a min height and allow height to grow
                    readOnly
                  />
                  {selectedDates.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDates([]); // Clear the dates
                      }}
                      className="transform -translate-y-1/2 text-secondary hover:text-red-500 focus:outline-none"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
              <div className="relative mt-5">
                <input
                  onClick={() => setDateModal(true)}
                  id="expiryDate"
                  {...register("expiryDate")}
                  value={moment(selectedDate).format("yyyy-MM-DD")}
                  type="text"
                  readOnly
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`}
                />
                <label
                  htmlFor="expiryDate"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Valid Till*
                </label>
                {errors.expiryDate && (
                  <span className="error text-sm font-PJSmedium  text-redbutton">
                    {errors.expiryDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-10">
              <p className="font-PJSmedium">
                Notify users{" "}
                <span className="text-secondary text-sm">
                  (they’ll receive automatic push and email notifications)
                </span>
              </p>
              <Controller
                name="NotifyUsers"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    sx={{
                      color: "rgba(132, 154, 184, 0.2)",
                      "&.Mui-checked": { color: "rgba(51, 192, 219, 1)" },
                      "&:focus": { color: "rgba(51, 192, 219, 1)" },
                      "& .MuiSvgIcon-root": { fontSize: 32 },
                    }}
                  />
                )}
              />
            </div>
            <div className="flex mt-10 gap-4 w-full justify-center font-PJSMedium items-center">
              <button
                type="button"
                onClick={hideForm}
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
              >
                {editingIndex !== null ? "Save Changes" : "Create"}
              </button>
            </div>
            {editingIndex !== null && (
              <button
                type="button"
                onClick={() => deleteDiscount(currentDiscount._id)}
                className="w-full mt-5 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full border-redbutton border-2 font-PJSmedium justify-center items-center text-redbutton"
              >
                Delete Coupon
              </button>
            )}
          </form>
        </FormProvider>
      )}

      <DatePickerModal
        isOpen={dateModal}
        onClose={() => {
          setSelectedDate(new Date());
          setDateModal(!dateModal);
        }}
        selectedDate={selectedDate}
        handleDataChange={handleSingleDateChange}
        onApply={() => setDateModal(!dateModal)}
      />

      <DatePickerModal
        isOpen={discountedDaysModal}
        onClose={() => {
          setDiscountedDaysModal(!discountedDaysModal);
        }}
        selectedDate={selectedDate}
        handleDataChange={() => {
          const formattedDate = format(date, "yyyy-MM-dd"); // Format date for easy comparison

          // Toggle selection (deselect if already selected)
          if (selectedDates.includes(formattedDate)) {
            setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
          } else {
            setSelectedDates([...selectedDates, formattedDate]);
          }
        }}
        onApply={() => setDiscountedDaysModal(!discountedDaysModal)}
      />

      <Toast open={open} setOpen={setOpen} message={message} type={type} />
      {loading && <Loader />}
    </div>
  );
};

export default Discount;
