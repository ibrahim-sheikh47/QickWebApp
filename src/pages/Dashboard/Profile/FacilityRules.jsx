/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import assets from "../../../assets/assets";


const FacilityRules = () => {
    const [step, setStep] = useState(1);

    const [currency, setCurrency] = useState('');
    const [salesTax, setSalesTax] = useState('');
    const [generalBookingRule, setGeneralBookingRule] = useState('');
    const [autoMessage, setAutoMessage] = useState('Dear [Username], Booking confirmed! Pro tip: invite friends to form teams on the app and share this booking with them. This way, the app will seamlessly split the total cost between all those who join. See you soon! Best,[Your Organization/Team]');
    const [autoMessageFrequency, setAutoMessageFrequency] = useState('');
    const [recurringBookingMessage, setRecurringBookingMessage] = useState('Dear [Username] or [Team], Kindly confirm your attendance for the upcoming booking via the app. If unable to attend, please cancel in advance and no penalties will apply. Best, [Your Organization/Team]');
    const [recurringMessageFrequency, setRecurringMessageFrequency] = useState('');
    const [daysInAdvance, setDaysInAdvance] = useState('');
    const [cancellationHours, setCancellationHours] = useState('');
    const [bookingNotes, setBookingNotes] = useState('e.g. no metal studs, no cleats. Please be on time to your booking!');
    const [recurringBookingFollowupHours, setRecurringBookingFollowupHours] = useState('');
    const [waiverLink, setWaiverLink] = useState('');

    const handleSubmitStep1 = () => {
        setStep(2);
    };

    const handleSubmitStep2 = () => {
        setStep(3);
    };

    const handleSubmitStep3 = () => {
        setStep(4);
    };

    console.log("rerender");
    console.log(currency, salesTax, generalBookingRule, autoMessageFrequency, recurringMessageFrequency, daysInAdvance, cancellationHours, recurringBookingFollowupHours, waiverLink);
    return (
        <>
            <div className="mx-3 mt-4">
                <p className="font-PJSbold text-xl">Facility Rules</p>
                <p className="font-PJSregular text-secondary text-sm mt-1">Set your organization's custom roles</p>

                <div className="mt-10 flex flex-row justify-center items-center">
                    <div className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${step > 1 ? 'bg-lime border-none' : 'bg-none' && step == 1 ? ' border-lime' : ''}`}>
                        {step >= 2 ? <img className="w-6 animate-zoom-in" src={assets.checkMark} alt="Check Mark" /> : <img src={assets.step1} alt="Step 1" />}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className={`h-0.5 w-5 ${step >= 2 ? 'bg-lime' : 'bg-[#d7d7d7]'}`}></div>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${step > 2 ? 'bg-lime border-none' : 'bg-none' && step == 2 ? ' border-lime' : ''}`}>
                        {step >= 3 ? <img className="w-6 animate-zoom-in" src={assets.checkMark} alt="Check Mark" /> : <img src={assets.step1} alt="Step 2" />}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className={`h-0.5 w-5 ${step >= 3 ? 'bg-lime' : 'bg-[#d7d7d7]'}`}></div>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${step > 3 ? 'bg-lime border-none' : 'bg-none' && step == 3 ? ' border-lime' : ''}`}>
                        {step >= 4 ? <img className="w-6 animate-zoom-in" src={assets.checkMark} alt="Check Mark" /> : <img src={assets.step2} alt="Step 2" />}
                    </div>
                </div>

                {step === 1 && (
                    <>
                        <div>
                            <div className="w-full">
                                <p className="font-PJSbold text-[16px] mb-3">Currency</p>

                                <select className="w-full border-2 h-[67px] px-5 rounded-xl selectIcon appearance-none text-secondary" name="" id="" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                    <option className="text-secondary" value="" >Select Currency</option>
                                    <option className="text-secondary" value="USD">US Dollar ($)</option>
                                </select>
                            </div>
                            <div className="w-full mt-5">
                                <p className="font-PJSbold text-[16px] mb-3">Sales tax rate</p>

                                <input className="w-full border-2 h-[67px] px-5 rounded-xl focus:outline-none text-secondary" name="" id="" type="text" value={salesTax} onChange={(e) => setSalesTax(e.target.value)}>
                                </input>
                                <div className="relative"><img className="w-5 absolute bottom-4 right-4" src={assets.percent} alt="" /></div>
                                <p className="text-secondary font-PJSregular text-xs mt-1">Sales tax will be included in price shown to users</p>
                            </div>
                            <div className="w-full mt-10">
                                <p className="font-PJSbold text-[16px] mb-3">General Booking Rules</p>
                                <p className="mt-7 font-PJSmedium text-sm">Users must send a request to book a field</p>
                                <select className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl text-secondary selectIcon appearance-none" name="" id="" value={generalBookingRule} onChange={(e) => setGeneralBookingRule(e.target.value)}>
                                    <option className="text-secondary" value="">Select Option</option>
                                    <option className="text-secondary" value="Yes">Yes</option>
                                </select>
                            </div>
                            <div className="w-full my-3">
                                <p className="font-PJSmedium text-sm">Automatic message after a new user books a field</p>
                                <div className="border-2 p-3 rounded-xl mt-3">
                                    <textarea rows="4" cols="50" className="text-sm font-PJSregular w-full leading-normal text-secondary p-2 focus:outline-none" value={autoMessage} onChange={(e) => setAutoMessage(e.target.value)}>
                                        {autoMessage}</textarea>
                                </div>
                            </div>

                            <div className="w-full my-3">
                                <p className="font-PJSmedium text-sm">How many times do you want to send this message to the same user?</p>
                                <select className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl focus:outline-none text-secondary selectIcon appearance-none " name="" id="" value={autoMessageFrequency} onChange={(e) => setAutoMessageFrequency(e.target.value)}>
                                    <option className="text-secondary" value="">Select Option</option>
                                    <option className="text-secondary" value="2 times">2 times</option>
                                </select>
                            </div>
                            <div className="w-full my-3">
                                <p className="font-PJSmedium text-sm">Automatic message reminder for recurring bookings</p>
                                <div className="border-2 p-3 rounded-xl mt-3">
                                    <textarea rows="3" cols="50" className="text-sm font-PJSregular leading-normal text-secondary p-2 focus:outline-none w-full" value={recurringBookingMessage} onChange={(e) => setRecurringBookingMessage(e.target.value)}>
                                        {recurringBookingMessage}</textarea>
                                </div>
                            </div>
                            <div className="w-full my-3">
                                <p className="font-PJSmedium text-sm">How many times do you want to send this message to the same user?</p>
                                <select className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl focus:outline-none text-secondary selectIcon appearance-none " name="" id="" value={recurringMessageFrequency} onChange={(e) => setRecurringMessageFrequency(e.target.value)}>
                                    <option className="text-secondary" value="">Select Option</option>
                                    <option className="text-secondary" value="Permanent">Permanent</option>
                                </select>
                            </div>
                            <div className="w-full my-3">
                                <p className="text-sm font-PJSmedium">Days in advance to allow users to book a field</p>
                                <select className="w-full border-2 h-[67px] px-5 mt-3 rounded-xl focus:outline-none selectIcon appearance-none text-secondary" name="" id="" value={daysInAdvance} onChange={(e) => setDaysInAdvance(e.target.value)}>
                                    <option className="text-secondary" value="">Select Option</option>
                                    <option className="text-secondary" value="10 days">10 days</option>
                                </select>
                            </div>

                            <button className="mt-10 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center" onClick={handleSubmitStep1}>Next: Step 2 of 3</button>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <>
                        <div>
                            <div className="w-full mt-10">
                                <p className="font-PJSbold text-[16px] mb-3">Rule for New Bookings</p>
                                <p className="font-PJSmedium text-sm">Hours prior booking to allow users to cancel and get credits</p>
                                <p className="font-PJSregular text-secondary text-sm mt-2">Note: A user is required to add payment method to book a field</p>

                                <select className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none " name="" id="" value={cancellationHours} onChange={(e) => setCancellationHours(e.target.value)}>
                                    <option className="text-secondary" value="" >Select Option</option>
                                    <option className="text-secondary" value="24 hours before the booking starts">24 hours before the booking starts</option>
                                </select>
                            </div>
                            <div className="w-full my-3">
                                <p className="font-PJSbold text-[16px]">Custom Booking Notes</p>
                                <p className="font-PJSmedium text-sm mt-5">Automatic message after a new user books a field</p>
                                <div className="border-2 p-3 rounded-xl mt-3">
                                    <textarea rows="3" cols="50" className="text-sm font-PJSregular leading-normal text-secondary p-2 w-full focus:outline-none" value={bookingNotes} onChange={(e) => setBookingNotes(e.target.value)}>
                                        {bookingNotes}</textarea>
                                </div>
                            </div>
                            <div className="w-full mt-10">
                                <p className="font-PJSbold text-[16px] mb-5">Rules for Recurring Bookings</p>
                                <p className="font-PJSmedium text-sm w-[400px]">Hours prior for the app to automatically follow up on a user/team towards their next recurring booking</p>
                                <p className="font-PJSregular text-secondary text-sm mt-2">Note: A user is required to add payment method to book a field</p>

                                <select className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none " name="" id="" value={recurringBookingFollowupHours} onChange={(e) => setRecurringBookingFollowupHours(e.target.value)}>
                                    <option className="text-secondary" value="" >Select Option</option>
                                    <option className="text-secondary" value="36 hours before the booking starts">36 hours before the booking starts</option>
                                </select>
                            </div>
                            <div className="w-full mt-10">
                                <p className="font-PJSmedium text-sm w-[400px]">Hours prior for the app to automatically follow up on a user/team towards their next recurring booking</p>

                                <select className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none " name="" id="" value={recurringBookingFollowupHours} onChange={(e) => setRecurringBookingFollowupHours(e.target.value)}>
                                    <option className="text-secondary" value="" >Select Option</option>
                                    <option className="text-secondary" value="24 hours or more before the booking starts">24 hours or more before the booking starts</option>
                                </select>
                            </div>
                            <div className="w-full mt-10">
                                <p className="font-PJSmedium text-sm w-[400px]">Hours prior to allow recurring booking holders to cancel and receive credits</p>
                                <p className="font-PJSmedium text-sm mt-2 text-secondary">
                                    Note: If users cancel after this time, they will not get credit refunds
                                </p>
                                <select className="w-full border-2 h-[67px] px-5 rounded-xl text-secondary mt-5 selectIcon appearance-none " name="" id="" value={recurringBookingFollowupHours} onChange={(e) => setRecurringBookingFollowupHours(e.target.value)}>
                                    <option className="text-secondary" value="" >Select Option</option>
                                    <option className="text-secondary" value="6 hours or more before the booking starts">6 hours or more before the booking starts</option>
                                </select>
                            </div>
                            <button className="mt-10 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center" onClick={handleSubmitStep2}>Next: Step 3 of 3</button>
                        </div>
                    </>
                )}
                {step === 3 && (
                    <>
                        <div className="mt-10">
                            <div className="w-full">
                                <p className="font-PJSbold text-[16px]">Upload Booking Acceptance (Waiver)</p>

                                <div className="flex items-center gap-5 mt-5">
                                    <input type="text" className="mt-2 focus:outline-none border-2 w-full rounded-xl h-[67px] px-5 " name="" id="" placeholder="Paste link or URL..." value={waiverLink} onChange={(e) => setWaiverLink(e.target.value)} />

                                    <div className="border-2 cursor-pointer rounded-full p-5"><img src={assets.linkicon} alt="" /></div>
                                </div>
                                <p className="text-secondary text-sm font-PJSregular mt-5">Note: All users who join a booking are required to accept this waiver.</p>
                            </div>

                            <button className="mt-10 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center" onClick={handleSubmitStep3}>Finish</button>
                        </div>
                    </>
                )}
                {step === 4 && (
                    <>
                        <div className="mt-10">
                            <div className="w-full">
                                <p className="font-PJSbold text-[16px]">Upload Booking Acceptance (Waiver)</p>

                                <div className="flex items-center gap-5 mt-5 ">
                                    <div className="w-full relative">
                                        <input type="text" className="mt-2 focus:outline-none border-2 w-full h-[67px] px-5 rounded-xl" name="" id="" placeholder="Paste link or URL..." value={waiverLink} onChange={(e) => setWaiverLink(e.target.value)}
                                        />

                                        <img className="absolute bottom-5 right-5 w-7" src={assets.CheckCircle} alt="" />
                                    </div>

                                    <div className="border-2 cursor-pointer rounded-full p-5"><img src={assets.linkicon} alt="" /></div>
                                </div>
                                <p className="text-secondary text-sm font-PJSregular mt-5">Note: All users who join a booking are required to accept this waiver.</p>
                            </div>
                            <button
                                className="mt-10 w-full  h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center text-secondaryThirty"
                                onClick={handleSubmitStep3}
                                disabled={true}
                            >
                                Success!
                            </button>

                        </div>
                    </>
                )}

            </div>
        </>
    );
};

export default FacilityRules