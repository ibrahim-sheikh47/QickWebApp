import { useState } from "react";
import assets from "../../../assets/assets";



const FieldPrice = () => {
    const [step, setStep] = useState(0);

    const [showFieldsSection, setShowFieldsSection] = useState(true);

    const handleSubmitStep1 = () => {
        setStep(1);
        setShowFieldsSection(false);
    };

    const handleSubmitStep2 = () => {
        setStep(2);
    };
    const handleBack = () => {
        setStep(1);
    };
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedTimes, setSelectedTimes] = useState([]);

    const fieldSizes = ['5v5', '6v6', '7v7', '8v8', '9v9', '11v11'];
    const timeDuration = ['30mins', '60mins', '90mins', '120mins'];

    const handleSizeSelect = (time) => {
        setSelectedSize(time);
    };
    const handleTimeSelect = (time) => {
        setSelectedTimes((prevSelectedTimes) =>
            prevSelectedTimes.includes(time)
                ? prevSelectedTimes.filter((t) => t !== time)
                : [...prevSelectedTimes, time]
        );
    };
    const handleFormClose = () => {
        setShowFieldsSection(true);
        setStep(0);
    }
    const daysOfWeek = [
        "General",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    const [selectedDays, setSelectedDays] = useState([]);

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(item => item !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };
    const selectedDaysInOrder = daysOfWeek.filter(day => selectedDays.includes(day)).join(', ');

    return (
        <div>

            {showFieldsSection && (
                <>
                    <div className="min-h-[600px] relative">
                        <p className="font-PJSbold text-xl">Fields</p>
                        <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-5">
                            <button onClick={handleSubmitStep1}
                                className="w-[600px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium"
                            >
                                Add New Field
                            </button>
                        </div>
                    </div>


                </>
            )}
            {step === 1 && (
                <>
                    <form>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <p className="font-PJSbold text-xl">Add New Field <span className="text-secondary text-sm">(Step 1/2)</span></p>
                            </div>
                            <div>
                                <img onClick={handleFormClose} className="w-6 h-6" src={assets.close} alt="" />
                            </div>
                        </div>

                        <div className="relative mt-5">
                            <input
                                className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`} type="text" />
                            <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Field Name</label>
                        </div>
                        <div className="relative mt-5">
                            <select className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}>
                                <option value="">Choose an option</option>
                                <option value="Indoor">Indoor</option>
                            </select>
                            <label htmlFor="fieldType" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Field Type</label>
                        </div>
                        <div className="relative mt-5">
                            <select className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}>
                                <option value="">Choose an option</option>
                                <option value="Turf">Turf</option>
                            </select>
                            <label htmlFor="fieldType" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Surface Type</label>
                        </div>
                        <div className="mt-10">
                            <p className="font-PJSbold text-[16px] mb-3">Field Size</p>
                            <div className="flex gap-4">
                                {fieldSizes.map((size) => (
                                    <div key={size} className="flex items-center">
                                        <p
                                            className={`font-PJSregular flex justify-center items-center w-[90px] h-[42px] text-sm border rounded-xl cursor-pointer ${selectedSize === size ? 'bg-blue text-white' : ''
                                                }`}
                                            onClick={() => handleSizeSelect(size)}
                                        >
                                            {size}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <div className="flex items-center gap-3">
                                <p className="font-PJSbold text-[16px]">Combo Fields</p>
                                <img className="w-[18px] h-[18px]" src={assets.info} alt="" />
                            </div>

                            <select className="w-full border-2 p-3 mt-3 rounded-xl text-secondary selectIcon appearance-none focus:outline-none" name="" id="">
                                <option className="text-secondary" value="" >Select Option</option>
                                <option className="text-secondary" value="USD">South Field, North Field</option>
                            </select>
                        </div>
                        <div className="w-full mt-12">
                            <button onClick={handleSubmitStep2}
                                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                            >
                                Next
                            </button>
                        </div>
                    </form>

                </>
            )}
            {step === 2 && (
                <>
                    <form>
                        <div className="flex items-center justify-between mb-5">
                            <div>
                                <p className="font-PJSbold text-xl">East Field <span className="text-secondary text-sm"> (Step 2/2)</span></p>
                            </div>
                            <div>
                                <img onClick={handleFormClose} className="w-6 h-6" src={assets.close} alt="" />
                            </div>
                        </div>
                        <div className="mt-10">
                            <p className="font-PJSbold text-[16px]">Customize Prices by Day    <span className="text-xs text-secondary"> (You can select many days at once)</span></p>
                            <div className="flex gap-4 mt-5 overflow-x-auto max-w-[700px]">
                                {daysOfWeek.map((day, index) => (
                                    <div key={index} className="flex items-center">
                                        <p
                                            className={`font-PJSregular  flex justify-center items-center  text-sm whitespace-nowrap border px-5 py-2 rounded-xl cursor-pointer ${selectedDays.includes(day) ? 'bg-blue text-white' : 'text-black'}`}
                                            onClick={() => toggleDay(day)}
                                        >
                                            {day}
                                        </p>

                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="mt-10">
                            <p className="font-PJSbold text-[16px]">Booking Durations <span className="text-xs text-secondary">(Select all that apply)</span></p>
                            <div className="flex gap-4 mt-3">
                                {timeDuration.map((time) => (
                                    <div key={time} className="flex items-center">
                                        <p
                                            className={`font-PJSmedium flex justify-center items-center w-[92px] h-[42px] text-sm border rounded-xl cursor-pointer ${selectedTimes.includes(time) ? 'bg-blue text-white' : ''}`}
                                            onClick={() => handleTimeSelect(time)}
                                        >
                                            {time}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-10">
                            <div>

                                <p className="text-[16px] font-PJSbold flex gap-5 items-center">{selectedDaysInOrder}</p>
                                <div className="relative mt-5">
                                    <input
                                        className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSbold text-sm placeholder-black bg-white border-secondaryThirty w-full h-[54px]`} type="text"
                                        placeholder="$__ to $__"
                                    />
                                    <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Morning price (From <span>__</span> to <span>__</span></label>
                                </div>

                            </div>

                            <div className="flex items-center w-full gap-2">
                                <div className="relative mt-5 w-full">
                                    <select
                                        className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSbold text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[67px]`}
                                    >
                                        <option value="">Choose an option</option>
                                        <option value="General Discount">From Opening</option>
                                    </select>
                                    <label htmlFor="DiscountType" className="absolute top-3 left-4 text-secondary font-PJSmedium text-xs">From</label>
                                </div>
                                <div className="relative mt-5 w-full">
                                    <select
                                        className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSbold text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[67px]`}
                                    >
                                        <option value="">Choose an option</option>
                                        <option value="General Discount">12:00pm</option>
                                    </select>
                                    <label htmlFor="DiscountType" className="absolute top-3 left-4 text-secondary font-PJSmedium text-xs">To</label>
                                </div>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSbold text-sm placeholder-black bg-white border-secondaryThirty w-full h-[54px]`} type="text"
                                    placeholder="Morning Price"
                                />
                                <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Time Slot Name</label>
                            </div>
                            <div className="relative mt-5 flex justify-between items-center  border rounded-lg border-secondaryThirty px-3">
                                <input
                                    className={`block pt-4 shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white  w-full h-[54px]`} type="text" />
                                <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Price for 60 min</label>
                                <div className="mr-3 cursor-pointer">
                                    <img src={assets.dollar} className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="relative mt-5 flex justify-between items-center  border rounded-lg border-secondaryThirty px-3">
                                <input
                                    className={`block pt-4 shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white  w-full h-[54px]`} type="text" />
                                <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Price for 120 min</label>
                                <div className="mr-3 cursor-pointer">
                                    <img src={assets.dollar} className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="h-[1px] w-full my-3 bg-secondaryTwenty mt-4"></div>

                            <div className="flex items-center gap-2 font-PJSbold text-sm mt-2">
                                <div className="bg-lime p-1 rounded-full">
                                    <img className="w-3 h-3" src={assets.Plus} alt="" />
                                </div>

                                <p>Add Time Slot</p>
                                <div className="ml-auto">
                                    <img src={assets.Next} alt="" />
                                </div>

                            </div>

                        </div>

                        {/* <div>
                            <div className="mt-7 flex items-center gap-3">
                                <p className=" text-[16px] font-PJSextra">
                                    Monday , Tuesday , Wednesday
                                </p>
                                <div className="bg-lime rounded-full p-1">
                                    <img src={assets.checkMark} alt="" />
                                </div>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$140 for 60 minutes - $240 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Morning price (6:00 am to 12:00 pm)
                                </label>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$150 for 60 minutes - $250 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Afternoon price (12:00 pm-5:00 pm)
                                </label>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$170 for 60 minutes - $270 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Night price (5:00 pm-Until close)
                                </label>
                            </div>

                        </div>

                        <div>
                            <div className="mt-7 flex items-center gap-3">
                                <p className=" text-[16px] font-PJSextra">
                                    Thursday , Friday
                                </p>
                                <div className="bg-lime rounded-full p-1">
                                    <img src={assets.checkMark} alt="" />
                                </div>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$150 for 60 minutes - $250 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Morning price (6:00 am to 12:00 pm)
                                </label>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$170 for 60 minutes - $270 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Afternoon price (12:00 pm-5:00 pm)
                                </label>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$180 for 60 minutes - $280 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Night price (5:00 pm-Until close)
                                </label>
                            </div>

                        </div>

                        <div>
                            <div className="mt-7 flex items-center gap-3">
                                <p className=" text-[16px] font-PJSextra">
                                    Saturday , Sunday
                                </p>
                                <div className="bg-lime rounded-full p-1">
                                    <img src={assets.checkMark} alt="" />
                                </div>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$140 for 60 minutes - $240 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Morning price (6:00 am to 12:00 pm)
                                </label>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$150 for 60 minutes - $250 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Afternoon price (12:00 pm-5:00 pm)
                                </label>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    type="text"
                                    className="block w-full h-[67px] px-4 pt-5 border border-secondaryThirty rounded-lg shadow-sm focus:outline-none font-PJSbold placeholder-black"
                                    placeholder="$170 for 60 minutes - $270 for 120 minutes"
                                />
                                <label
                                    className="absolute top-[-5px] text-secondary px-4 py-5 font-PJSmedium text-xs"
                                >
                                    Night price (5:00 pm-Until close)
                                </label>
                            </div>

                        </div> */}
                        <div className="flex mt-12 gap-4 w-full justify-center font-PJSMedium items-center">
                            <button onClick={handleBack}
                                className="w-full  transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center "
                            >
                                Back
                            </button>
                            <button
                                className="w-full  h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center text-secondaryThirty"
                                disabled={true}
                            >
                                Finish
                            </button>
                        </div>
                    </form>
                </>
            )}




        </div>
    );
};
export default FieldPrice