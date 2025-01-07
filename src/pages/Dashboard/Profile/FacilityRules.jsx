/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import {
  createFacilityRules,
  editFacility,
  getFacilityRules,
  updateFacilityRules,
} from "../../../api/services/facilityService";
import { useStateContext } from "../../../context";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Loader from "../../../components/Loader/Loader";

const FacilityRules = () => {
  const { currentFacility } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [rules, setRules] = useState(null);
  const [step, setStep] = useState(1);
  const [waiverContent, setWaiverContent] = useState("");

  const defaultValues = {
    currency: rules?.currency || "",
    salesTax: rules?.salesTax || "",
    generalBookingRule: rules?.generalBooking.requestToBook || "",
    autoMessage:
      rules?.generalBooking.automaticMessage ||
      "Dear [Username], Booking confirmed! Pro tip: invite friends to form teams on the app and share this booking with them. This way, the app will seamlessly split the total cost between all those who join. See you soon! Best,[Your Organization/Team]",
    autoMessageFrequency: rules?.generalBooking.timesMessageSent || "",
    recurringBookingMessage:
      rules?.generalBooking?.automaticMessageReminder ||
      "Dear [Username] or [Team], Kindly confirm your attendance for the upcoming booking via the app. If unable to attend, please cancel in advance and no penalties will apply. Best, [Your Organization/Team]",
    recurringMessageFrequency:
      rules?.generalBooking.timesReminderMessageSent || "",
    daysInAdvance: rules?.generalBooking?.advanceDays || "",
    cancellationHours: rules?.newBookingRules?.hoursPriorToCancel || "",
    recurringBookingFollowupHours:
      rules?.recurringBookingRule?.hoursPriorToFollowUp || "",
    recurringBookingCancelWithoutPenaltyHours:
      rules?.recurringBookingRule?.hoursPriorToCancelWithoutPenalty || "",
    recurringBookingCancelWithoutPenaltyAndReceiveCreditsHours:
      rules?.recurringBookingRule
        ?.hoursPriorToCancelWithoutPenaltyAndReceiveCredits || "",
    bookingNotes:
      rules?.customBookingNotes ||
      "e.g. no metal studs, no cleats. Please be on time to your booking!",
    waiverLink: rules?.bookingAcceptanceWaiver || "",
  };

  useEffect(() => {
    fetchRules();
  }, []);

  // Step-wise validation schemas
  const schemas = [
    yup.object().shape({
      currency: yup.string().required("Currency is required"),
      salesTax: yup
        .number()
        .typeError("Sales Tax must be a number")
        .required("Sales Tax is required"),
      generalBookingRule: yup
        .string()
        .required("General booking rule is required"),
      autoMessage: yup.string().required("Automatic message is required"),
      autoMessageFrequency: yup
        .string()
        .required("Automatic message frequency is required"),
      recurringBookingMessage: yup
        .string()
        .required("Recurring Booking Message is required"),
      recurringMessageFrequency: yup
        .string()
        .required("Recurring Booking Message frequency is required"),
      daysInAdvance: yup.string().required("Advance days are required"),
    }),
    yup.object().shape({
      cancellationHours: yup
        .string()
        .required("Cancellation hours are required"),
      bookingNotes: yup.string().required("Booking notes are required"),
      recurringBookingFollowupHours: yup
        .string()
        .required("Follow-up hours are required"),
      recurringBookingCancelWithoutPenaltyHours: yup
        .string()
        .required("Cancellation hours without penalty are required"),
      recurringBookingCancelWithoutPenaltyAndReceiveCreditsHours: yup
        .string()
        .required(
          "Cancellation hours without penalty and credit hours are required"
        ),
    }),
    yup.object().shape({
      waiverLink: yup.string().required("Waiver text or link is required"),
    }),
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setWaiverContent(e.target.result); // Set the file content as the input value
      };
      reader.readAsText(file); // Read file as text
    }
  };

  const currentSchema = schemas[step - 1];
  const methods = useForm({
    resolver: yupResolver(currentSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (methods != null) methods.reset(defaultValues);
  }, [rules, methods]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const stepBack = () => {
    setStep(step - 1);
  };

  const stepForward = async (data) => {
    if (step == 3) {
      let body = {
        currency: data.currency,
        salesTax: data.salesTax,
        generalBooking: {
          requestToBook: data.generalBookingRule,
          automaticMessage: data.autoMessage,
          timesMessageSent: data.autoMessageFrequency,
          automaticMessageReminder: data.recurringBookingMessage,
          timesReminderMessageSent: data.recurringMessageFrequency,
          advanceDays: data.daysInAdvance,
        },
        newBookingRules: {
          hoursPriorToCancel: data.cancellationHours,
        },
        customBookingNotes: data.bookingNotes,
        recurringBookingRule: {
          hoursPriorToFollowUp: data.recurringBookingFollowupHours,
          hoursPriorToCancelWithoutPenalty:
            data.recurringBookingCancelWithoutPenaltyHours,
          hoursPriorToCancelWithoutPenaltyAndReceiveCredits:
            data.recurringBookingCancelWithoutPenaltyAndReceiveCreditsHours,
        },
        bookingAcceptanceWaiver: data.waiverLink,
      };
      setLoading(true);
      try {
        if (rules) {
          await updateFacilityRules(body, rules._id);
        } else {
          await createFacilityRules(body, currentFacility._id);
        }
        window.location.reload();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    } else {
      setStep(step + 1);
    }
  };

  const fetchRules = async () => {
    setLoading(true);
    try {
      const facilityRules = await getFacilityRules(currentFacility._id);
      setRules(facilityRules.length > 0 ? facilityRules[0] : null);
      setWaiverContent(
        facilityRules.length > 0 ? facilityRules[0].bookingAcceptanceWaiver : ""
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(stepForward)}>
          <div className="mx-3 mt-4">
            <p className="font-PJSbold text-xl">Facility Rules</p>
            <p className="font-PJSregular text-secondary text-sm mt-1">
              Set your organization's custom roles
            </p>

            <div className="mt-10 flex flex-row justify-center items-center">
              <div
                className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${
                  step > 1
                    ? "bg-lime border-none"
                    : "bg-none" && step == 1
                    ? " border-lime"
                    : ""
                }`}
              >
                {step >= 2 ? (
                  <img
                    className="w-6 animate-zoom-in"
                    src={assets.checkMark}
                    alt="Check Mark"
                  />
                ) : (
                  <img src={assets.step1} alt="Step 1" />
                )}
              </div>
              <div className="flex justify-center items-center">
                <div
                  className={`h-0.5 w-5 ${
                    step >= 2 ? "bg-lime" : "bg-[#d7d7d7]"
                  }`}
                ></div>
              </div>
              <div
                className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${
                  step > 2
                    ? "bg-lime border-none"
                    : "bg-none" && step == 2
                    ? " border-lime"
                    : ""
                }`}
              >
                {step >= 3 ? (
                  <img
                    className="w-6 animate-zoom-in"
                    src={assets.checkMark}
                    alt="Check Mark"
                  />
                ) : (
                  <img src={assets.step1} alt="Step 2" />
                )}
              </div>
              <div className="flex justify-center items-center">
                <div
                  className={`h-0.5 w-5 ${
                    step >= 3 ? "bg-lime" : "bg-[#d7d7d7]"
                  }`}
                ></div>
              </div>
              <div
                className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${
                  step > 3
                    ? "bg-lime border-none"
                    : "bg-none" && step == 3
                    ? " border-lime"
                    : ""
                }`}
              >
                {step >= 4 ? (
                  <img
                    className="w-6 animate-zoom-in"
                    src={assets.checkMark}
                    alt="Check Mark"
                  />
                ) : (
                  <img src={assets.step2} alt="Step 3" />
                )}
              </div>
            </div>

            {step === 1 && (
              <>
                <div>
                  <div className="w-full">
                    <p className="font-PJSbold text-[16px] mb-3">Currency</p>

                    <select
                      className="w-full border-2 h-[67px] px-5 rounded-xl selectIcon appearance-none text-secondary"
                      {...register("currency")}
                    >
                      <option className="text-secondary" value="">
                        Select Currency
                      </option>
                      <option className="text-secondary" value="USD">
                        US Dollar ($)
                      </option>
                    </select>
                    {errors.currency && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.currency.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full mt-5">
                    <p className="font-PJSbold text-[16px] mb-3">
                      Sales tax rate
                    </p>

                    <input
                      className="w-full border-2 h-[67px] px-5 rounded-xl focus:outline-none text-secondary"
                      {...register("salesTax")}
                    ></input>

                    <div className="relative">
                      <img
                        className="w-5 absolute bottom-4 right-4"
                        src={assets.percent}
                        alt=""
                      />
                    </div>
                    <p className="text-secondary font-PJSregular text-xs mt-1">
                      Sales tax will be included in price shown to users
                    </p>
                  </div>
                  {errors.salesTax && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salesTax.message}
                    </p>
                  )}
                  <div className="w-full mt-10">
                    <p className="font-PJSbold text-[16px] mb-3">
                      General Booking Rules
                    </p>
                    <p className="mt-7 font-PJSmedium text-sm">
                      Users must send a request to book a field
                    </p>
                    <select
                      className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl text-secondary selectIcon appearance-none"
                      {...register("generalBookingRule")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option className="text-secondary" value="Yes">
                        Yes
                      </option>
                    </select>
                    {errors.generalBookingRule && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.generalBookingRule.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full my-3">
                    <p className="font-PJSmedium text-sm">
                      Automatic message after a new user books a field
                    </p>
                    <div className="border-2 p-3 rounded-xl mt-3">
                      <textarea
                        rows="4"
                        cols="50"
                        className="text-sm font-PJSregular w-full leading-normal text-secondary p-2 focus:outline-none"
                        {...register("autoMessage")}
                      />
                    </div>
                    {errors.autoMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.autoMessage.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full my-3">
                    <p className="font-PJSmedium text-sm">
                      How many times do you want to send this message to the
                      same user?
                    </p>
                    <select
                      className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl focus:outline-none text-secondary selectIcon appearance-none "
                      {...register("autoMessageFrequency")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option className="text-secondary" value="2 times">
                        2 times
                      </option>
                    </select>
                    {errors.autoMessageFrequency && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.autoMessageFrequency.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full my-3">
                    <p className="font-PJSmedium text-sm">
                      Automatic message reminder for recurring bookings
                    </p>
                    <div className="border-2 p-3 rounded-xl mt-3">
                      <textarea
                        rows="3"
                        cols="50"
                        className="text-sm font-PJSregular leading-normal text-secondary p-2 focus:outline-none w-full"
                        {...register("recurringBookingMessage")}
                      />
                    </div>
                    {errors.recurringBookingMessage && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.recurringBookingMessage.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full my-3">
                    <p className="font-PJSmedium text-sm">
                      How many times do you want to send this message to the
                      same user?
                    </p>
                    <select
                      className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl focus:outline-none text-secondary selectIcon appearance-none "
                      {...register("recurringMessageFrequency")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option className="text-secondary" value="Permanent">
                        Permanent
                      </option>
                    </select>
                    {errors.recurringMessageFrequency && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.recurringMessageFrequency.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full my-3">
                    <p className="text-sm font-PJSmedium">
                      Days in advance to allow users to book a field
                    </p>
                    <select
                      className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl focus:outline-none selectIcon appearance-none text-secondary"
                      {...register("daysInAdvance")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option className="text-secondary" value="10 days">
                        10 days
                      </option>
                    </select>
                    {errors.daysInAdvance && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.daysInAdvance.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <div>
                  <div className="w-full mt-10">
                    <p className="font-PJSbold text-[16px] mb-3">
                      Rule for New Bookings
                    </p>
                    <p className="font-PJSmedium text-sm">
                      Hours prior booking to allow users to cancel and get
                      credits
                    </p>
                    <p className="font-PJSregular text-secondary text-sm mt-2">
                      Note: A user is required to add payment method to book a
                      field
                    </p>

                    <select
                      className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none "
                      {...register("cancellationHours")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option
                        className="text-secondary"
                        value="24 hours before the booking starts"
                      >
                        24 hours before the booking starts
                      </option>
                    </select>
                    {errors.bookingNotes && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cancellationHours.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full my-3">
                    <p className="font-PJSbold text-[16px]">
                      Custom Booking Notes
                    </p>
                    <p className="font-PJSmedium text-sm mt-5">
                      Automatic message after a new user books a field
                    </p>
                    <div className="border-2 p-3 rounded-xl mt-3">
                      <textarea
                        rows="3"
                        cols="50"
                        className="text-sm font-PJSregular leading-normal text-secondary p-2 w-full focus:outline-none"
                        {...register("bookingNotes")}
                      />
                    </div>
                    {errors.bookingNotes && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bookingNotes.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full mt-10">
                    <p className="font-PJSbold text-[16px] mb-5">
                      Rules for Recurring Bookings
                    </p>
                    <p className="font-PJSmedium text-sm w-[400px]">
                      Hours prior for the app to automatically follow up on a
                      user/team towards their next recurring booking
                    </p>
                    <p className="font-PJSregular text-secondary text-sm mt-2">
                      Note: A user is required to add payment method to book a
                      field
                    </p>

                    <select
                      className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none "
                      name=""
                      id=""
                      {...register("recurringBookingFollowupHours")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option
                        className="text-secondary"
                        value="36 hours before the booking starts"
                      >
                        36 hours before the booking starts
                      </option>
                    </select>
                    {errors.recurringBookingFollowupHours && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.recurringBookingFollowupHours.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full mt-10">
                    <p className="font-PJSmedium text-sm w-[400px]">
                      Hours prior for the app to automatically follow up on a
                      user/team towards their next recurring booking
                    </p>

                    <select
                      className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none "
                      {...register("recurringBookingCancelWithoutPenaltyHours")}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option
                        className="text-secondary"
                        value="24 hours or more before the booking starts"
                      >
                        24 hours or more before the booking starts
                      </option>
                    </select>
                    {errors.recurringBookingCancelWithoutPenaltyHours && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors.recurringBookingCancelWithoutPenaltyHours
                            .message
                        }
                      </p>
                    )}
                  </div>
                  <div className="w-full mt-10">
                    <p className="font-PJSmedium text-sm w-[400px]">
                      Hours prior to allow recurring booking holders to cancel
                      and receive credits
                    </p>
                    <p className="font-PJSmedium text-sm mt-2 text-secondary">
                      Note: If users cancel after this time, they will not get
                      credit refunds
                    </p>
                    <select
                      className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none "
                      {...register(
                        "recurringBookingCancelWithoutPenaltyAndReceiveCreditsHours"
                      )}
                    >
                      <option className="text-secondary" value="">
                        Select Option
                      </option>
                      <option
                        className="text-secondary"
                        value="6 hours or more before the booking starts"
                      >
                        6 hours or more before the booking starts
                      </option>
                    </select>
                    {errors.recurringBookingCancelWithoutPenaltyAndReceiveCreditsHours && (
                      <p className="text-red-500 text-sm mt-1">
                        {
                          errors
                            .recurringBookingCancelWithoutPenaltyAndReceiveCreditsHours
                            .message
                        }
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <div className="mt-10">
                  <div className="w-full">
                    <p className="font-PJSbold text-[16px]">
                      Upload Booking Acceptance (Waiver)
                    </p>

                    <div className="flex items-center gap-5 mt-5">
                      <input
                        type="text"
                        className="mt-2 focus:outline-none border-2 w-full rounded-xl h-[67px] px-5 "
                        placeholder="Paste text or attach text file to read waiver..."
                        {...register("waiverLink")}
                        value={waiverContent}
                        onChange={(e) => setWaiverContent(e.target.value)}
                      />

                      <div
                        onClick={() => {}}
                        className="border-2 cursor-pointer rounded-full p-5"
                      >
                        {/* <img src={assets.linkicon} alt="" /> */}
                        <label htmlFor="fileInput" className="cursor-pointer">
                          <img src={assets.linkicon} alt="Attach File" />
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          accept=".txt"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <p className="text-secondary text-sm font-PJSregular mt-5">
                      Note: All users who join a booking are required to accept
                      this waiver.
                    </p>

                    {errors.waiverLink && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.waiverLink.message}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="row mt-10 flex justify-between gap-x-4">
              {step > 1 && (
                <button
                  type="button"
                  style={{ backgroundColor: "#03180F", color: "white" }}
                  className="w-[30%] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full font-PJSmedium justify-center items-center"
                  onClick={stepBack}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className={`${
                  step > 1 ? "w-[70%]" : "w-full"
                } transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center`}
              >
                {step < 3
                  ? `Next: Step ${step + 1} of 3`
                  : rules
                  ? "Update"
                  : "Finish"}
              </button>
            </div>
          </div>

          {loading && <Loader />}
        </form>
      </FormProvider>
    </>
  );
};

export default FacilityRules;
