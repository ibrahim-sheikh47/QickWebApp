import { useEffect, useRef, useState } from "react";
import assets from "../../../assets/assets";
import {
  createFacilityField,
  deleteFacilityFields,
  getFacilityFields,
  updateFacilityField,
} from "../../../api/services/facilityService";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../../../components/Loader/Loader";
import { useStateContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdDragHandle } from "react-icons/md";
import AppModal from "../../../components/AppModal/AppModal";
import { uploadFile } from "../../../api/services/uploadService";
import Toast from "../../../components/Toast/Toast";

const FieldPrice = () => {
  const { currentFacility } = useStateContext();
  const [currentField, setCurrentField] = useState(null);
  const [fields, setFields] = useState([]);
  const [step, setStep] = useState(0);
  const [showFieldsSection, setShowFieldsSection] = useState(true);
  const [loading, setLoading] = useState(true);
  const dataX = useRef();

  const [photos, setPhotos] = useState(
    currentField ? currentField.fieldImages : []
  );
  const [modalOpen, setModalOpen] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fieldNames, setFieldNames] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);

  function parseTime(time) {
    const [hourMinute, period] = time.split(/(AM|PM)/i); // Split time and period
    const [hours, minutes] = hourMinute.trim().split(":").map(Number); // Extract hours and minutes
    let adjustedHours = hours;

    if (period.toLowerCase() === "pm" && hours !== 12) {
      adjustedHours += 12; // Convert PM hours to 24-hour format
    } else if (period.toLowerCase() === "am" && hours === 12) {
      adjustedHours = 0; // Handle midnight case
    }

    return new Date(
      `1970-01-01T${String(adjustedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:00`
    );
  }

  // Function to calculate the time values between the minimum and maximum times
  function getTimeValuesBetweenMinAndMax(hoursArray) {
    // Parse all open and close times
    const parsedTimes = hoursArray
      .map(({ open, close }) => {
        // Ensure open and close values are valid before parsing
        if (!open || !close) {
          return null; // Skip entries with invalid or null times
        }

        return {
          open: parseTime(open),
          close: parseTime(close),
        };
      })
      .filter((time) => time !== null);

    // Find the minimum open time and maximum close time
    const minTime = new Date(
      Math.min(...parsedTimes.map((time) => time.open.getTime()))
    );
    const maxTime = new Date(
      Math.max(...parsedTimes.map((time) => time.close.getTime()))
    );

    // Generate hourly time values between minTime and maxTime
    const timeValues = [];
    let currentTime = new Date(minTime);

    while (currentTime <= maxTime) {
      const timeX = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      timeValues.push({
        key: timeX,
        value: timeX,
      });

      currentTime.setHours(currentTime.getHours() + 1); // Increment by 1 hour
    }

    return timeValues;
  }

  const handleSubmitStep1 = () => {
    setStep(1);
    setShowFieldsSection(false);
  };

  const handleBack = () => {
    if (step > 1) setStep(1);
    else {
      setStep(0);
      setShowFieldsSection(true);
    }
  };
  const [selectedSize, setSelectedSize] = useState(null);

  const fieldSizes = ["5v5", "6v6", "7v7", "8v8", "9v9", "10v10", "11v11"];

  const timingObject = {
    from: "",
    to: "",
    name: "",
    prices: [],
  };
  const [bookingDurations, setBookingDurations] = useState([
    { name: "30mins", isSelected: false },
    { name: "60mins", isSelected: false },
    { name: "90mins", isSelected: false },
    { name: "120mins", isSelected: false },
  ]);
  const [customisedPrices, setCustomisedPrices] = useState([
    { day: "General", name: "General", isSelected: false, isEnabled: true },
    { day: "Mon", name: "Monday", isSelected: false, isEnabled: true },
    { day: "Tue", name: "Tuesday", isSelected: false, isEnabled: true },
    { day: "Wed", name: "Wednesday", isSelected: false, isEnabled: true },
    { day: "Thur", name: "Thursday", isSelected: false, isEnabled: true },
    { day: "Fri", name: "Friday", isSelected: false, isEnabled: true },
    { day: "Sat", name: "Saturday", isSelected: false, isEnabled: true },
    { day: "Sun", name: "Sunday", isSelected: false, isEnabled: true },
  ]);
  const [timings, setTimings] = useState([timingObject]);
  const [savedPrices, setSavedPrices] = useState([]);
  const [outerIndex, setOuterIndex] = useState(null);
  const [innerIndex, setInnerIndex] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const colors = {
    primary: "#141F2B",
    secondary: "#849AB8",
    lime: "#9CFC38",
    limeTenPercent: "rgba(156, 252, 56, 0.1)",
    limeFortyPercent: "rgba(156, 252, 56, 0.4)",
    limeNinetyPercent: "rgba(156, 252, 56, 0.8)",
    button: "#1F2933",
    buttonTenPercent: "rgba(31, 41, 51, 0.1)",
    footer: "#33C0DB",
    disabledButton: "#2F4B2E",
    disabledText: "#21352C",
    tabbar: "#181818",
    map: "#F14336",
    mapTenPercent: "rgba(241, 67, 54, 0.1)",
    mapFortyPercent: "rgba(241, 67, 54, 0.4)",
    banner: "#661FFE",
    all: "#FCAE38",
    card: "#0C1621",
    star: "#FFCB12",
    starTenPercent: "rgba(255, 203, 18, 0.1)",
    orange: "#FF9212",
    darkGreen: "#047C37",
    clock: "#33C0DB",
    clockTenPercent: "rgba(51, 192, 219, 0.1)",
    clockThirtyPercent: "rgba(51, 192, 219, 0.3)",
    switchTrack: "#1A2D23",
    profileButton: "#333333",
    golden: "#FFCB12",
    light: "#F8F8F8",
    white: "#FFFFFF",
    lightSelected: "#F4F4F5",
    chartblue: "#33C0DB",
    chartyellow: "#FFCB12",
    cancel: "rgba(132, 154, 184, 0.1)",
    lightIconBg: "#D9D9D9",
    lightEventsBg: "#F3F5F8",
    secondaryEightPercent: "rgba(132, 154, 184, 0.08)",
    secondaryTenPercent: "rgba(132, 154, 184, 0.1)",
    secondaryTwentyPercent: "rgba(132, 154, 184, 0.2)",
    secondaryThirtyPercent: "rgba(132, 154, 184, 0.3)",
    secondaryFiftyPercent: "rgba(132, 154, 184, 0.5)",
    green: "rgba(53, 231, 128, 1)",
    black: "black",
    locationtext: "rgba(121, 121, 121, 1)",
    whiteTenPercent: "rgba(255, 255, 255, 0.1)",
    whiteFiftyPercent: "rgba(255, 255, 255, 0.5)",
  };

  const timeSlots = [
    { key: "6am", value: "06:00 am" },
    { key: "7am", value: "07:00 am" },
    { key: "8am", value: "08:00 am" },
    { key: "9am", value: "09:00 am" },
    { key: "10am", value: "10:00 am" },
    { key: "11am", value: "11:00 am" },
    { key: "12pm", value: "12:00 pm" },
    { key: "1pm", value: "01:00 pm" },
    { key: "2pm", value: "02:00 pm" },
    { key: "3pm", value: "03:00 pm" },
    { key: "4pm", value: "04:00 pm" },
    { key: "5pm", value: "05:00 pm" },
    { key: "6pm", value: "06:00 pm" },
    { key: "7pm", value: "07:00 pm" },
    { key: "8pm", value: "08:00 pm" },
    { key: "9pm", value: "09:00 pm" },
    { key: "until_close", value: "Until Close" },
  ];

  useEffect(() => {
    if (currentField) {
      if (step == 1) {
        reset({
          name: currentField.name || "",
          fieldType: currentField.fieldType || "",
          surfaceType: currentField.surfaceType || "",
        });
        setSelectedSize(currentField.fieldSize || null);
      }
    }
  }, [step, currentField]);

  useEffect(() => {
    if (outerIndex === null || innerIndex === null) {
      timings[timings.length - 1].prices = [];

      var length = bookingDurations.filter((bD) => bD.isSelected).length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          if (
            customisedPrices.filter(
              (cP) => cP.name === "General" && cP.isEnabled && cP.isSelected
            ).length > 0
          ) {
            timings[timings.length - 1].name = "General";
          } else {
            timings[timings.length - 1].name = "";
          }

          timings[timings.length - 1].prices.push({
            price: "",
            bookingDuration: "",
          });
        }
      }
      if (timings[timings.length - 1].prices.length === length)
        setTimings([...timings]);
    } else {
      console.log(timings);
    }
  }, [bookingDurations, timings.length, customisedPrices]);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    setLoading(true);
    try {
      const facilityFields = await getFacilityFields(currentFacility._id);
      setFields(facilityFields);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSizeSelect = (time) => {
    setSelectedSize(time);
  };

  const handleFormClose = () => {
    setCurrentField(null);
    reset({
      name: "",
      fieldType: "",
      surfaceType: "",
    });
    setSelectedSize(null);
    setPhotos([]);
    setPhotoFiles([]);
    setShowFieldsSection(true);
    setStep(0);
  };

  const step1Schema = yup.object().shape({
    name: yup.string().required("Field name is required."),
    fieldType: yup.string().required("Field type is required."),
    surfaceType: yup.string().required("Surface type is required."),
  });

  const step2Schema = yup.object().shape({});

  const methods = useForm({
    resolver: yupResolver(step === 1 ? step1Schema : step2Schema),
    defaultValues: {
      name: "",
      fieldType: "",
      surfaceType: "",
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    if (showFieldsSection && step == 0) {
      setStep(1);
      setShowFieldsSection(false);
    } else if (step == 1) {
      if (!selectedSize) {
        showToast(
          "You must select at least one option for field size",
          "error"
        );
        return;
      }

      dataX.current = { ...data, fieldSize: selectedSize };

      if (currentField) {
        //General Price
        if (
          currentField.generalPrice &&
          currentField.generalPrice.bookingDurations.length > 0
        ) {
          let price = customisedPrices.find(
            (cP) => cP.name === currentField.generalPrice.timeSlotName
          );
          let index = customisedPrices.indexOf(price);
          price.isEnabled = false;
          price.isSelected = true;
          customisedPrices[index] = price;

          const test = {
            from: currentField.generalPrice.from,
            to: currentField.generalPrice.to,
            name: currentField.generalPrice.timeSlotName,
            prices: currentField.generalPrice.pricing.map((p) => {
              return {
                price: parseFloat(p.split("for")[0].trim().replace("$", "")),
                bookingDuration: p.split("for")[1].trim(),
              };
            }),
          };
          savedPrices.push({
            days: [price],
            timings: [test],
          });

          setCustomisedPrices([...customisedPrices]);
          setSavedPrices([...savedPrices]);
        }

        //Specific Prices
        if (currentField.specificPrice.length > 0) {
          const groupedData = [];

          currentField.specificPrice.forEach((entry) => {
            customisedPrices.forEach((customisedPrice) => {
              if (customisedPrice.name === entry.day) {
                customisedPrice.isSelected = true;
                customisedPrice.isEnabled = false;
              }
            });

            const daysGroup = groupedData.find((group) =>
              group.days.includes(entry.day)
            );

            const timing = {
              name: entry.timeSlotName,
              from: entry.from,
              to: entry.to,
              prices: entry.pricing.map((price) => {
                const [priceValue, duration] = price.split(" for ");
                return {
                  price: parseFloat(priceValue.replace("$", "")),
                  bookingDuration: duration,
                };
              }),
            };

            if (daysGroup) {
              daysGroup.timings.push(timing);
            } else {
              groupedData.push({
                days: [entry.day],
                timings: [timing],
              });
            }
          });

          // Step 2: Map short days to full names and merge days with identical timings
          const finalData = [];

          groupedData.forEach((group) => {
            const fullDays = group.days.map((shortDay) => {
              const match = customisedPrices.find((cp) => cp.name === shortDay);
              return match ? match : shortDay;
            });

            const existingGroup = finalData.find(
              (data) =>
                JSON.stringify(data.timings) === JSON.stringify(group.timings)
            );

            if (existingGroup) {
              existingGroup.days.push(...fullDays);
            } else {
              finalData.push({
                days: fullDays,
                timings: group.timings,
              });
            }
          });

          setCustomisedPrices([...customisedPrices]);
          setSavedPrices([...finalData]);
        }
      }

      setStep(2);
    } else {
      try {
        let uploadedUrls = photos.filter((p) => p.includes("https"));
        if (photoFiles.length > 0) {
          const urls = await uploadFiles();
          uploadedUrls = [...uploadedUrls, ...urls]; // Wait for file uploads to complete
        }

        saveField(uploadedUrls); // Proceed to saving the field with uploaded URLs
      } catch (error) {
        console.log(error);
        showToast("File upload failed. Please try again.", "error");
      }
    }
  };

  const uploadFiles = async () => {
    try {
      // Use Promise.all to wait for all file uploads to complete
      const uploadPromises = photoFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const url = await uploadFile(formData); // Assuming uploadFile returns the URL
          return url;
        } catch (error) {
          console.error("File upload failed:", error);
          throw error; // Stop execution if any upload fails
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error("Error during file uploads:", error);
      throw new Error("File upload failed"); // Handle errors as needed
    }
  };

  const validateForm = () => {
    if (!timings[timings.length - 1].from.trim().length) {
      showToast("Missing required field: Kindly select FROM TIME", "error");
      return false;
    } else if (!timings[timings.length - 1].to.trim().length) {
      showToast("Missing required field: Kindly select TO TIME", "error");
      return false;
    } else if (!timings[timings.length - 1].name.trim().length) {
      showToast("Missing required field: Kindly enter NAME", "error");
      return false;
    } else if (
      !timings[timings.length - 1].prices.filter((p) => p.price !== "").length
    ) {
      showToast(
        "Missing required field: Kindly add prices for selected booking durations",
        "error"
      );
      return false;
    }

    return true;
  };

  const saveField = async (files = []) => {
    setLoading(true);
    var specificPrices = [];
    let generalPrice = {};
    try {
      savedPrices.forEach((savedPrice) => {
        if (
          savedPrice.days.length === 1 &&
          savedPrice.days[0].name === "General"
        ) {
          savedPrice.timings.forEach((timing) => {
            generalPrice = {
              bookingDurations: timing.prices.map((p) => {
                return p.bookingDuration;
              }),
              from: timing.from,
              to: timing.to,
              timeSlotName: timing.name,
              pricing: timing.prices.map((p) => {
                return `$${p.price} for ${p.bookingDuration}`;
              }),
            };
          });
        } else {
          savedPrice.days.forEach((day) => {
            savedPrice.timings.forEach((timing) => {
              specificPrices.push({
                day: day.name,
                bookingDurations: timing.prices.map((p) => {
                  return p.bookingDuration;
                }),
                from: timing.from,
                to: timing.to,
                timeSlotName: timing.name,
                pricing: timing.prices.map((p) => {
                  return `$${p.price} for ${p.bookingDuration}`;
                }),
              });
            });
          });
        }
      });
    } catch (err) {
      console.log(err);
    }

    try {
      let body = { ...dataX.current };
      body.fieldImages = files;
      body.location = {
        latitude: 31.561609,
        longitude: 74.412559,
      };
      body.generalPrice = generalPrice;
      body.specificPrice = specificPrices;

      if (currentField) {
        await updateFacilityField(body, currentField._id);
      } else {
        await createFacilityField(body, currentFacility._id);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteField = async (fieldId) => {
    setLoading(true);
    try {
      await deleteFacilityFields(fieldId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      fetchFields();
    }
  };

  const handleFileUpload2 = (e) => {
    const files = Array.from(e.target.files);
    setPhotoFiles(files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const openModal = (index) => {
    setModalOpen(index);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const handleEdit = (indexOut, indexInn) => {
    if (outerIndex === indexOut && innerIndex === indexInn) {
      setOuterIndex(null);
      setInnerIndex(null);
    } else {
      // Populate fields with the saved price details
      const priceToEdit = JSON.parse(JSON.stringify(savedPrices[indexOut]));
      const timingToEdit = JSON.parse(
        JSON.stringify(priceToEdit.timings[indexInn])
      );

      // Repopulate timings
      setTimings([timingToEdit]);

      // Set the editable index
      setOuterIndex(indexOut);
      setInnerIndex(indexInn);

      // Mark as editing
      setIsFinished(false);
    }
  };

  const saveEditedPrice = () => {
    if (validateForm()) {
      // Update the savedPrices array with edited values
      const updatedPrices = [...savedPrices];
      updatedPrices[outerIndex].timings[innerIndex] = JSON.parse(
        JSON.stringify(timings[timings.length - 1])
      );
      setSavedPrices(updatedPrices);

      // Reset states
      customisedPrices.forEach((cP) => {
        if (cP.isSelected) {
          cP.isEnabled = false;
        } else {
          cP.isEnabled = true;
          cP.isSelected = false;
        }
      });

      setCustomisedPrices([...customisedPrices]);
      setBookingDurations((prev) =>
        prev.map((bD) => ({ ...bD, isSelected: false }))
      );
      setTimings[timingObject];

      // Reset editable state
      setOuterIndex(null);
      setInnerIndex(null);
    }
  };

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const editField = (index) => {
    setCurrentField(fields[index]);
    setPhotos(fields[index].fieldImages);
    handleSubmitStep1();
  };

  return (
    <div>
      {showFieldsSection && (
        <>
          <div className="min-h-[600px] relative">
            <p className="font-PJSbold text-xl">Fields</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                marginTop: "10px",
              }}
            >
              {fields.length > 0 &&
                fields.map((field, index) => {
                  let price = field.generalPrice;
                  if (!price.bookingDurations.length || !price.pricing.length) {
                    price = "No general price mentioned.";
                  } else {
                    price = field.generalPrice.pricing.join(", ");
                  }

                  return (
                    <div
                      onClick={() => editField(index)}
                      key={field._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        padding: "1.2rem",
                        borderColor: colors.secondary,
                        height: "70px",
                        width: "100%",
                        borderRadius: "16px",
                        backgroundColor: "white",
                        border: "1px solid grey",
                      }}
                    >
                      <MdDragHandle color={colors.lime} size={"2rem"} />
                      <div style={{ flex: 1 }}>
                        <div className="font-PJSbold text-large">
                          {field.name}
                        </div>
                        <div className="font-PJSlight text-md">{price}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteField(field._id)}
                      >
                        <img
                          className="w-6"
                          src={assets.Del}
                          alt="Delete Icon"
                        />
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <button
            onClick={handleSubmitStep1}
            style={{
              backgroundColor: colors.lime,
              color: "#000",
            }}
            className="w-full  h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center text-secondaryThirty"
          >
            Add New Field
          </button>
        </>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-PJSbold text-xl">
                    Add New Field{" "}
                    <span className="text-secondary text-sm">(Step 1/2)</span>
                  </p>
                </div>
                <div>
                  <img
                    onClick={handleFormClose}
                    className="w-6 h-6"
                    src={assets.close}
                    alt=""
                  />
                </div>
              </div>

              <div className="relative mt-5">
                <input
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`}
                  type="text"
                  {...register("name")}
                />

                {errors.name && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 45,
                      marginTop: 5,
                    }}
                  >
                    {errors.name.message}
                  </span>
                )}

                <label
                  htmlFor="FieldName"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Field Name
                </label>
              </div>
              <div className="relative mt-5">
                <select
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}
                  {...register("fieldType")}
                >
                  <option value="">Choose an option</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                </select>

                {errors.fieldType && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 45,
                      marginTop: 5,
                    }}
                  >
                    {errors.fieldType.message}
                  </span>
                )}

                <label
                  htmlFor="fieldType"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Field Type
                </label>
              </div>
              <div className="relative mt-5">
                <select
                  className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}
                  {...register("surfaceType")}
                >
                  <option value="">Choose an option</option>
                  <option value="Turf/Synthetic Grass">
                    Turf/Synthetic Grass
                  </option>
                  <option value="Natural Grass">Natural Grass</option>
                </select>

                {errors.surfaceType && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 45,
                      marginTop: 5,
                    }}
                  >
                    {errors.surfaceType.message}
                  </span>
                )}

                <label
                  htmlFor="fieldType"
                  className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                >
                  Surface Type
                </label>
              </div>
              <div className="mt-10">
                <p className="font-PJSbold text-[16px] mb-3">Field Size</p>
                <div className="flex gap-4" style={{ overflowX: "auto" }}>
                  {fieldSizes.map((size, index) => (
                    <div key={`${index}`}>
                      <button
                        type="button"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          width: 100,
                          height: 45,
                          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", // Box shadow here
                          borderRadius: 16,
                          backgroundColor:
                            selectedSize === size ? colors.clock : colors.white,
                          marginTop: 10,
                          gap: 10,
                          margin: "10px",
                        }}
                        onClick={() => handleSizeSelect(size)} // Update the selected value
                      >
                        <span
                          style={{
                            color:
                              selectedSize === size ? colors.white : "black",
                            fontSize: 12,
                          }}
                        >
                          {size}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full mt-5">
                <div className="flex items-center gap-3">
                  <p className="font-PJSbold text-[16px]">Combo Fields</p>
                  <img className="w-[18px] h-[18px]" src={assets.info} alt="" />
                </div>

                <select
                  className="w-full border-2 p-3 mt-3 rounded-xl text-secondary selectIcon appearance-none focus:outline-none"
                  {...register("combinationFields")}
                >
                  <option className="text-secondary" value="">
                    Select Option
                  </option>
                  <option className="text-secondary" value="USD">
                    South Field, North Field
                  </option>
                </select>

                {errors.combinationFields && (
                  <span
                    style={{
                      fontSize: 10,
                      color: "red",
                      marginLeft: 45,
                      marginTop: 5,
                    }}
                  >
                    {errors.combinationFields.message}
                  </span>
                )}
              </div>

              <div className="mt-10">
                <p className="font-PJSbold text-xl mb-3">
                  Upload Field Images (Max 5)
                </p>
                <div className="overflow-x-auto no-scrollbar w-[100%]">
                  <div className="flex gap-7 min-w-[max-content]">
                    {photos.length < 5 && (
                      <div className="w-44 h-44 rounded-xl border-secondaryThirty border-2 flex justify-center items-center">
                        <div className="text-center min-w-44">
                          <label
                            htmlFor="uploadInput"
                            className="cursor-pointer"
                          >
                            <img
                              src={assets.PhotoIcon}
                              alt="Upload Icon"
                              className="mx-auto mb-2"
                            />
                            <p className="font-PJSmedium">Upload Photos</p>
                          </label>
                          <input
                            type="file"
                            id="uploadInput"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileUpload2}
                            multiple
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex gap-4 flex-wrap">
                      {photos.map((photo, index) => (
                        <div
                          key={index}
                          className="relative w-44 h-44 flex justify-center items-center cursor-pointer"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <img
                            src={photo}
                            alt={`Uploaded photo ${index}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                          {hoveredIndex === index && (
                            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl">
                              <img
                                src={assets.edit}
                                className="object-cover"
                                onClick={() => openModal(index)}
                              />
                            </div>
                          )}
                          <div className="absolute bottom-3 left-4">
                            <p className="text-white font-PJSbold text-sm">
                              {fieldNames[index]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {photos.map((photo, index) => (
                      <AppModal
                        key={index}
                        onClose={closeModal}
                        modalopen={modalOpen === index}
                        height="auto"
                        width="500px"
                      >
                        <div>
                          <p className="text-[20px] font-PJSbold">
                            Remove Photo
                          </p>
                        </div>
                        <img
                          src={photo}
                          alt={`Modal photo ${index}`}
                          className="w-full h-[230px] object-cover rounded-xl mt-5"
                        />
                        <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                          <button
                            type={"button"}
                            onClick={() => {
                              if (photos.length === photoFiles.length) {
                                setPhotoFiles(
                                  photoFiles.filter((p, ind) => ind !== index)
                                );
                              }
                              setPhotos(
                                photos.filter((p, ind) => ind !== index)
                              );
                              closeModal();
                            }}
                            className="w-[220px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full border-redbutton border-2 font-PJSmedium justify-center items-center text-redbutton"
                          >
                            Delete Photo
                          </button>
                        </div>
                      </AppModal>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="font-PJSbold text-xl">
                    East Field{" "}
                    <span className="text-secondary text-sm"> (Step 2/2)</span>
                  </p>
                </div>
                <div>
                  <img
                    onClick={handleFormClose}
                    className="w-6 h-6"
                    src={assets.close}
                    alt=""
                  />
                </div>
              </div>

              <div>
                {/* Customize Prices */}
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <h2 style={{ fontSize: "16px", color: "black" }}>
                      Customize its Prices
                    </h2>
                    <p style={{ fontSize: "10px", color: "gray" }}>
                      (You can select many at once)
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 10,
                      height: 60,
                    }}
                  >
                    {customisedPrices.map((customisedPrice, index) => (
                      <button
                        type="button"
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          width: 100,
                          height: 45,
                          borderRadius: 16,
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)", // Box shadow here
                          backgroundColor: customisedPrice.isEnabled
                            ? customisedPrice.isSelected
                              ? colors.clock
                              : colors.white
                            : "gray",
                          color: customisedPrice.isEnabled
                            ? customisedPrice.isSelected
                              ? "white"
                              : "black"
                            : "white",
                          marginTop: 10,
                        }}
                        disabled={!customisedPrice.isEnabled}
                        onClick={() => {
                          const index =
                            customisedPrices.indexOf(customisedPrice);
                          if (customisedPrice.day === "General") {
                            customisedPrices
                              .filter((c) => c.day !== "General")
                              .forEach((cP) => {
                                cP.isSelected = false;
                              });
                          } else {
                            customisedPrices
                              .filter((c) => c.day === "General")
                              .forEach((cP) => {
                                cP.isSelected = false;
                              });
                          }
                          customisedPrices[index].isSelected =
                            !customisedPrice.isSelected;
                          setCustomisedPrices([...customisedPrices]);
                        }}
                      >
                        {customisedPrice.day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking Durations */}
                <div style={{ marginTop: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <h2 style={{ fontSize: "16px", color: "black" }}>
                      Booking Durations
                    </h2>
                    <p style={{ fontSize: "10px", color: "gray" }}>
                      (Select all that apply)
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      gap: 10,
                      height: 60,
                    }}
                  >
                    {bookingDurations.map((bookingDuration, index) => (
                      <button
                        type="button"
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          width: 100,
                          height: 45,
                          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)", // Box shadow here
                          borderRadius: 16,
                          backgroundColor: bookingDuration.isSelected
                            ? colors.clock
                            : colors.white,
                          color: bookingDuration.isSelected ? "white" : "black",
                          marginTop: 10,
                        }}
                        disabled={innerIndex !== null}
                        onClick={() => {
                          const index =
                            bookingDurations.indexOf(bookingDuration);
                          bookingDurations[index].isSelected =
                            !bookingDuration.isSelected;
                          setBookingDurations([...bookingDurations]);
                        }}
                      >
                        {bookingDuration.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Saved Prices Layout */}
                {savedPrices.length > 0 &&
                  savedPrices.map((sP, i) => (
                    <div key={i}>
                      <div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            alignSelf: "center",
                            alignItems: "center",
                            marginTop: 10,
                          }}
                        >
                          <h2 style={{ fontSize: "16px", color: "black" }}>
                            {sP.days.map(
                              (c, i) =>
                                `${c.name}${
                                  i !== sP.days.length - 1 ? ", " : ""
                                }`
                            )}
                          </h2>
                          <div style={{ flex: 1 }} />
                          <button
                            type="button"
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "1px solid gray",
                            }}
                            onClick={() => {
                              sP.days.forEach((d) => {
                                customisedPrices.forEach((cP) => {
                                  if (
                                    cP.name === d.name &&
                                    cP.isSelected &&
                                    !cP.isEnabled
                                  ) {
                                    cP.isSelected = false;
                                    cP.isEnabled = true;
                                  }
                                });
                              });
                              setCustomisedPrices([...customisedPrices]);
                              setSavedPrices(
                                savedPrices.filter((sp, index) => index !== i)
                              );
                              setInnerIndex(null);
                            }}
                          >
                            <img
                              className="w-6"
                              src={assets.Del}
                              alt="Delete Icon"
                            />
                          </button>
                        </div>
                      </div>

                      {sP.timings.length > 0 &&
                        sP.timings.map((timing, index) => {
                          return (
                            <div
                              style={{
                                width: "100%",
                                height: "60px",
                                borderColor: colors.secondary,
                                borderRadius: "16px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.white,
                                border: "1px solid grey",
                                gap: "20px",
                                padding: "20px",
                                marginTop: "20px",
                              }}
                              key={index}
                            >
                              <div style={{ flex: "1" }}>
                                <span
                                  style={{
                                    color: colors.black,
                                    fontSize: "10px",
                                  }}
                                >
                                  {`${timing.name} (${timing.from} to ${timing.to})`}
                                </span>
                                <span
                                  style={{
                                    color: colors.black,
                                    fontSize: "14px",
                                  }}
                                >
                                  {timing.prices &&
                                    timing.prices
                                      .map((t, ti) => {
                                        return `$${t.price} for ${
                                          t.bookingDuration
                                        }${
                                          ti <= timing.prices.length - 2
                                            ? " - "
                                            : ""
                                        }`;
                                      })
                                      .join("")}
                                </span>
                              </div>

                              <button
                                type="button"
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "1px solid gray",
                                }}
                                onClick={() => handleEdit(i, index)}
                              >
                                <img
                                  className="w-6"
                                  src={assets.editBlack}
                                  alt="Edit Icon"
                                />
                              </button>
                              <button
                                type="button"
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 20,
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  border: "1px solid gray",
                                }}
                                onClick={() => {
                                  savedPrices[index].timings =
                                    sP.timings.filter(
                                      (t) => t.name !== timing.name
                                    );

                                  setSavedPrices([...savedPrices]);
                                }}
                              >
                                <img
                                  className="w-6"
                                  src={assets.Del}
                                  alt="Delete Icon"
                                />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  ))}
              </div>

              {customisedPrices.filter((cP) => cP.isEnabled && cP.isSelected)
                .length > 0 &&
                (outerIndex === null || innerIndex === null) && (
                  <div style={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        margin: "0 auto",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: colors.black,
                          fontSize: "16px",
                        }}
                      >
                        {customisedPrices
                          .filter((cP) => cP.isSelected && cP.isEnabled)
                          .map((c, i) => {
                            return `${c.name}${
                              i !==
                              customisedPrices.filter(
                                (cP) => cP.isSelected && cP.isEnabled
                              ).length -
                                1
                                ? ", "
                                : ""
                            }`;
                          })}
                      </span>

                      <button
                        type="button"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderColor: colors.secondary,
                          borderWidth: "1px",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          customisedPrices.forEach((cP) => {
                            if (cP.isEnabled && cP.isSelected) {
                              cP.isSelected = false;
                            }
                          });
                          bookingDurations.forEach((bD) => {
                            if (bD.isSelected) {
                              bD.isSelected = false;
                            }
                          });

                          // resetting timings array
                          setTimings([timingObject]);
                          // Disabling already selected days
                          setCustomisedPrices([...customisedPrices]);
                          // clearing booking durations
                          setBookingDurations([...bookingDurations]);
                        }}
                      >
                        <img
                          className="w-6"
                          src={assets.Del}
                          alt="Delete Icon"
                        />
                      </button>
                    </div>

                    {timings.length > 1 &&
                      timings
                        .slice(0, timings.length - 1)
                        .map((timing, index) => {
                          return (
                            <div
                              style={{
                                width: "100%",
                                height: "60px",
                                borderColor: colors.secondary,
                                borderRadius: "16px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: colors.white,
                                border: "1px solid grey",
                                gap: "20px",
                                padding: "20px",
                                marginTop: "20px",
                              }}
                              key={index}
                            >
                              <div style={{ flex: "1" }}>
                                <span
                                  style={{
                                    color: colors.black,
                                    fontSize: "10px",
                                  }}
                                >
                                  {`${timing.name} (${timing.from} to ${timing.to})`}
                                </span>
                                <span
                                  style={{
                                    color: colors.black,
                                    fontSize: "14px",
                                  }}
                                >
                                  {timing.prices &&
                                    timing.prices
                                      .map((t, i) => {
                                        return `$${t.price} for ${
                                          t.bookingDuration
                                        }${
                                          i <= timing.prices.length - 2
                                            ? " - "
                                            : ""
                                        }`;
                                      })
                                      .join("")}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setTimings(
                                    timings.filter(
                                      (t) => t.name !== timing.name
                                    )
                                  );
                                }}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                <img
                                  className="w-6"
                                  src={assets.cross}
                                  alt="Cross Icon"
                                />
                              </button>
                            </div>
                          );
                        })}
                  </div>
                )}

              <div>
                <div
                  style={{
                    height: "1px",
                    backgroundColor: colors.secondary,
                    width: "100%",
                    alignSelf: "center",
                    marginTop: "20px",
                  }}
                />

                {((customisedPrices.filter(
                  (cP) => cP.isEnabled && cP.isSelected
                ).length > 0 &&
                  !isFinished) ||
                  (customisedPrices.filter(
                    (cP) => !cP.isEnabled && cP.isSelected
                  ).length > 0 &&
                    outerIndex !== null &&
                    innerIndex !== null)) && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: "0.48" }}>
                        <select
                          defaultValue={
                            outerIndex !== null && innerIndex !== null
                              ? timings[timings.length - 1].from
                              : null
                          }
                          style={{
                            borderWidth: "1px",
                            borderColor: colors.secondary,
                            height: "60px",
                            width: "100%",
                            marginTop: "25px",
                            borderRadius: "12px",
                            paddingLeft: "20px",
                            fontSize: "14px",
                            color: colors.secondary,
                          }}
                          onChange={(e) => {
                            // if (outerIndex !== null && innerIndex !== null) {
                            //   savedPrices[outerIndex].timings[innerIndex].from =
                            //     e.target.value;
                            // } else {
                            timings[timings.length - 1].from = e.target.value;
                            setTimings([...timings]);
                            // }
                          }}
                        >
                          <option value="" disabled selected>
                            From
                          </option>
                          {getTimeValuesBetweenMinAndMax(
                            currentFacility?.hoursOfOperation
                          ).map((slot, index) => (
                            <option key={index} value={slot.key}>
                              {slot.value}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ flex: "0.48" }}>
                        <select
                          defaultValue={
                            outerIndex !== null && innerIndex !== null
                              ? timings[timings.length - 1].to
                              : null
                          }
                          style={{
                            borderWidth: "1px",
                            borderColor: colors.secondary,
                            height: "60px",
                            width: "100%",
                            marginTop: "25px",
                            borderRadius: "12px",
                            paddingLeft: "20px",
                            fontSize: "14px",
                            color: colors.secondary,
                          }}
                          onChange={(e) => {
                            // if (outerIndex !== null && innerIndex !== null) {
                            //   savedPrices[outerIndex].timings[innerIndex].to =
                            //     e.target.value;
                            // } else {
                            timings[timings.length - 1].to = e.target.value;
                            setTimings([...timings]);
                            // }
                          }}
                        >
                          <option value="" disabled selected>
                            To
                          </option>
                          {getTimeValuesBetweenMinAndMax(
                            currentFacility?.hoursOfOperation
                          ).map((slot, index) => (
                            <option key={index} value={slot.key}>
                              {slot.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      <input
                        type="text"
                        style={{
                          backgroundColor: "white",
                          borderColor: colors.secondary,
                          height: "60px",
                          width: "100%",
                          marginTop: "20px",
                          borderRadius: "16px",
                          paddingLeft: "20px",
                          fontSize: "14px",
                          color: colors.secondary,
                          border: "1px solid grey",
                        }}
                        onChange={(e) => {
                          // if (outerIndex !== null && innerIndex !== null) {
                          //   if (
                          //     savedPrices[outerIndex].timings[innerIndex]
                          //       .name !== "General"
                          //   ) {
                          //     savedPrices[outerIndex].timings[innerIndex].name =
                          //       e.target.value;
                          //   }
                          // } else {
                          if (
                            customisedPrices.filter(
                              (cP) =>
                                cP.day === "General" &&
                                cP.isEnabled &&
                                cP.isSelected
                            ).length === 0
                          ) {
                            timings[timings.length - 1].name = e.target.value;
                          } else {
                            timings[timings.length - 1].name = "General";
                          }
                          setTimings([...timings]);
                          // }
                        }}
                        value={
                          // outerIndex !== null && innerIndex !== null
                          //   ? savedPrices[outerIndex].timings[innerIndex].name
                          //   :
                          customisedPrices.filter(
                            (cP) =>
                              cP.day === "General" &&
                              cP.isEnabled &&
                              cP.isSelected
                          ).length > 0
                            ? "General"
                            : timings[timings.length - 1]?.name || ""
                        }
                        placeholder="Time Slot Name"
                        disabled={
                          // outerIndex !== null && innerIndex !== null
                          //   ? savedPrices[outerIndex].timings[innerIndex]
                          //       .name === "General"
                          //   :
                          customisedPrices.filter(
                            (cP) =>
                              cP.day === "General" &&
                              cP.isEnabled &&
                              cP.isSelected
                          ).length > 0
                        }
                      />
                    </div>

                    <div
                      style={{
                        marginTop: "10px",
                      }}
                    >
                      {timings[timings.length - 1].prices &&
                        timings[timings.length - 1].prices.length ===
                          timings[timings.length - 1].prices.map((p) => {
                            return p.bookingDuration;
                          }).length &&
                        bookingDurations
                          .filter(
                            (b) =>
                              outerIndex === null || innerIndex === null
                                ? b.isSelected
                                : timings[timings.length - 1].prices
                                    .map((p) => p.bookingDuration)
                                    .find(
                                      (bookingDuration) =>
                                        bookingDuration === b.name
                                    ) // Return the result
                          )
                          .map((b, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <input
                                type="number"
                                style={{
                                  borderColor: colors.secondary,
                                  height: "60px",
                                  width: "100%",
                                  marginTop: "20px",
                                  borderRadius: "16px",
                                  paddingLeft: "20px",
                                  fontSize: "14px",
                                  color: colors.secondary,
                                  backgroundColor: "white",
                                  border: "1px solid grey",
                                }}
                                onChange={(e) => {
                                  // if (
                                  //   outerIndex !== null &&
                                  //   innerIndex !== null
                                  // ) {
                                  //   savedPrices[outerIndex].timings[
                                  //     innerIndex
                                  //   ].prices[i].price = e.target.value;
                                  // } else {
                                  var lastTimingPrice = timings[
                                    timings.length - 1
                                  ]?.prices[i] || {
                                    price: "",
                                    bookingDuration: "",
                                  };
                                  lastTimingPrice.price = e.target.value;
                                  lastTimingPrice.bookingDuration = b.name;
                                  setTimings([...timings]);
                                  // }
                                }}
                                value={
                                  // outerIndex !== null && innerIndex !== null
                                  //   ? savedPrices[outerIndex].timings[
                                  //       innerIndex
                                  //     ].prices[i].price
                                  //   :
                                  timings[timings.length - 1]?.prices[i]
                                    ?.price || ""
                                }
                                placeholder={`Price for ${b.name}`}
                              />
                            </div>
                          ))}
                    </div>
                  </div>
                )}

                {(customisedPrices.filter((cP) => cP.isEnabled && cP.isSelected)
                  .length > 0 ||
                  savedPrices.length > 0) &&
                  !isFinished &&
                  (outerIndex === null || innerIndex === null) && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (validateForm()) {
                            timings.push(timingObject);
                            setTimings([...timings]);
                          }
                        }}
                      >
                        +
                        <span
                          style={{
                            fontSize: "14px",
                            color: isFinished ? colors.white : colors.primary,
                          }}
                        >
                          Add Time Slot
                        </span>
                      </div>

                      {timings.length > 0 &&
                        customisedPrices.filter(
                          (cP) => cP.isEnabled && cP.isSelected
                        ).length !== 0 && (
                          <div
                            style={{
                              width: "30%",
                              height: "55px",
                              borderRadius: "30px",
                              backgroundColor: colors.cancel,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              if (validateForm()) {
                                timings.push(timingObject);
                                setTimings([...timings]);
                                setIsFinished(true);
                              }
                            }}
                          >
                            <span style={{ fontSize: "14px", color: "black" }}>
                              Finish
                            </span>
                          </div>
                        )}
                    </div>
                  )}
              </div>

              <div>
                {outerIndex !== null && innerIndex !== null && (
                  <button
                    type="button"
                    style={{
                      width: "25%",
                      borderRadius: 30,
                      backgroundColor: colors.lime,
                      display: "flex",
                      marginHorizontal: 10,
                      marginTop: 20,
                      padding: 5,
                      justifyContent: "center",
                      alignItems: "center",
                      alignSelf: "flex-end",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={saveEditedPrice}
                  >
                    <p
                      style={{
                        color: colors.primary,
                        fontSize: 11,
                        margin: 0,
                      }}
                    >
                      Done
                    </p>
                  </button>
                )}

                {isFinished && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 20,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        color: "black",
                        fontSize: 12,
                        margin: 0,
                      }}
                    >
                      {`You've set prices for ${customisedPrices
                        .filter((cP) => cP.isSelected && cP.isEnabled)
                        .map((c, i) => {
                          return `${c.name}${
                            i !==
                            customisedPrices.filter((cP) => cP.isSelected)
                              .length -
                              1
                              ? ", "
                              : ""
                          }`;
                        })
                        .join("")}`}
                    </p>

                    <button
                      type="button"
                      style={{
                        flex: 0.25,
                        borderRadius: 30,
                        backgroundColor: colors.lime,
                        display: "flex",
                        marginHorizontal: 10,
                        padding: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        // Adding the data to saved prices list
                        savedPrices.push({
                          days: customisedPrices.filter(
                            (cP) => cP.isSelected && cP.isEnabled
                          ),
                          timings: timings.slice(0, timings.length - 1),
                        });
                        setSavedPrices([...savedPrices]);

                        setTimeout(() => {
                          customisedPrices.forEach((cP) => {
                            if (cP.isEnabled && cP.isSelected) {
                              cP.isEnabled = false;
                            }
                          });
                          bookingDurations.forEach((bD) => {
                            if (bD.isSelected) {
                              bD.isSelected = false;
                            }
                          });

                          // resetting timings array
                          setTimings([timingObject]);
                          // Disabling already selected days
                          setCustomisedPrices([...customisedPrices]);
                          // clearing booking durations
                          setBookingDurations([...bookingDurations]);

                          setIsFinished(false);
                        }, 300);
                      }}
                    >
                      <p
                        style={{
                          color: colors.primary,
                          fontSize: 11,
                          margin: 0,
                        }}
                      >
                        Save
                      </p>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!showFieldsSection && (
            <div className="flex mt-12 gap-4 w-full justify-center font-PJSMedium items-center">
              <button
                type="button"
                onClick={handleBack}
                className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
              >
                Back
              </button>
              <button
                type={"submit"}
                style={{
                  backgroundColor: colors.lime,
                  color: "#000",
                }}
                className="w-full  h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center text-secondaryThirty"
                disabled={!(step !== 2 || savedPrices.length > 0)}
              >
                {step === 1
                  ? "Next"
                  : currentField
                  ? "Update Field"
                  : "Add Field"}
              </button>
            </div>
          )}

          {loading && <Loader />}
        </form>
      </FormProvider>

      <Toast open={open} setOpen={setOpen} message={message} type={type} />
    </div>
  );
};
export default FieldPrice;
