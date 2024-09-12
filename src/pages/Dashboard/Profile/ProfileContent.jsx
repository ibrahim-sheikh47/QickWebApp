/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import club from "../../../assets/svgs/profile.svg";
import close from "../../../assets/svgs/close.svg";
import cameraIcon from "../../../assets/svgs/Camera-white.svg"
import Plus from "../../../assets/svgs/Plus.svg"
import bankAccount from "../../../assets/svgs/bankAccount.svg";
import debitCard from "../../../assets/svgs/debitCard.svg";
import creditcardIcon from "../../../assets/svgs/creditcardIcon.svg";
import paypal from "../../../assets/paypal.png";
import info from "../../../assets/svgs/Info.svg"
import PhotoIcon from "../../../assets/svgs/ImagesSquare.svg"
import googleMap from "../../../assets/google-map.png"
import DiscountBlue from "../../../assets/svgs/Percent-blue.svg";
import dollar from "../../../assets/svgs/dollar.svg";
import Del from "../../../assets/svgs/TrashSimple.svg";
import checkMark from "../../../assets/svgs/CheckBlack.svg";
import Next from "../../../assets/svgs/Chevron_Left.svg";
import eye from "../../../assets/svgs/EyeSlash.svg";
import eyeOpen from "../../../assets/view.png";
import CheckCircle from "../../../assets/svgs/CheckCircleBlue.svg";
import edit from "../../../assets/svgs/PencilSimple.svg";
import editBlack from "../../../assets/svgs/editBlack.svg";
import circle from "../../../assets/circle.png";
import step1 from "../../../assets/svgs/step-circle.svg";
import step2 from "../../../assets/svgs/Users.svg";
import limeCircle from "../../../assets/svgs/limecircle.svg";
import yellowcircle from "../../../assets/svgs/yellowcircle.svg";
import percent from "../../../assets/svgs/Percent.svg";
import linkicon from "../../../assets/svgs/Paperclip.svg";
import copy from "../../../assets/copy.png";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Info from "../../../assets/svgs/Info.svg";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import AppModal from "../../../components/AppModal/AppModal";

const MyFacilityContent = () => {
    const [image, setImage] = useState(club);
    const [bannerImage, setBannerImage] = useState(null);
    const [selectedAmenities, setSelectedAmenities] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [modalOpen, setModalOpen] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [fieldNames, setFieldNames] = useState([]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (upload) => {
                setImage(upload.target.result);
            };
            reader.readAsDataURL(file);
            console.log("file uploaded");
        }
    };

    const handleBannerImageUpload = (event) => {
        const bannerFile = event.target.files[0];
        if (bannerFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBannerImage(e.target.result);
            };
            reader.readAsDataURL(bannerFile);
        }
    };

    const handleFileUpload2 = (e) => {
        const files = Array.from(e.target.files);
        const newPhotos = files.map(file => URL.createObjectURL(file));
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        setFieldNames(prevFieldNames => [...prevFieldNames, ...Array(newPhotos.length).fill('')]);
    };

    const openModal = (index) => {
        setModalOpen(index);
    };

    const closeModal = () => {
        setModalOpen(null);
    };

    const handleFieldNameChange = (index, value) => {
        const newFieldNames = [...fieldNames];
        newFieldNames[index] = value;
        setFieldNames(newFieldNames);
    };

    const handleSaveChanges = () => {
        closeModal();
    };

    const amenitiesData = [
        "Showers",
        "Drinks",
        "Food",
        "Referee",
        "Lockers",
        "Ball rental",
        "Free parking",
        "A/C",
        "Spectator seating",
    ];

    const toggleAmenity = (amenity) => {
        if (selectedAmenities.includes(amenity)) {
            setSelectedAmenities(selectedAmenities.filter(item => item !== amenity));
        } else {
            setSelectedAmenities([...selectedAmenities, amenity]);
        }
    };

    const validationSchema = yup.object().shape({
        facilityName: yup.string().required("Facility Name is required"),
        zipCode: yup.string().required("Zip Code is required"),
        writtenAddress: yup.string().required("Written Address is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (values) => {
        console.log(values);
    };
    const handleDeletePhoto = (index) => {
        const newPhotos = [...photos];
        const newFieldNames = [...fieldNames];
        newPhotos.splice(index, 1);
        newFieldNames.splice(index, 1);
        setPhotos(newPhotos);
        setFieldNames(newFieldNames);
        closeModal();
    };

    return (
        <div className="mx-3">
            <div className="flex items-center justify-between">
                <p className="font-PJSbold text-xl">My Facility</p>
                <p className="text-sm border-2 border-secondaryTwenty hover:bg-secondaryTwenty rounded-full px-6 py-2 cursor-pointer font-PJSregular">Edit</p>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center mt-10 relative">
                <img className="w-[104px] h-[104px] rounded-full object-cover" src={image} alt="Club" />
                <div className="absolute top-0 w-[104px] h-[104px] flex items-center justify-center hover:bg-black hover:bg-opacity-40 rounded-full cursor-pointer"
                    onClick={() => document.getElementById('imageUpload').click()}>
                    <div className="w-[30px] bg-black bg-opacity-40 rounded-full p-[2px]">
                        <img className="w-[30px]" src={cameraIcon} />
                    </div>
                </div>
                <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept="image/*"
                />
                <p className="text-lg font-PJSbold">Futeca Club</p>
            </div>
            <p className="font-PJSbold text-xl mt-10">Account Details</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5 mt-5">
                    <div className="relative mt-5">
                        <input {...register("facilityName")}
                            className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[340px] h-[54px]`} type="text" />
                        <label htmlFor="FacilityName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Facility Name*</label>
                        {errors.facilityName && <p className="text-red-500">{errors.facilityName.message}</p>}
                    </div>
                    <div className="relative mt-5">
                        <input {...register("zipCode")}
                            className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[340px] h-[54px]`} type="text" />
                        <label htmlFor="ZipCode" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Zip Code*</label>
                        {errors.zipCode && <p className="text-red-500">{errors.zipCode.message}</p>}
                    </div>
                </div>
                <div className="mt-10 w-[700px]">
                    <p className="font-PJSbold text-xl mb-3">Amenities</p>
                    <div className="overflow-x-auto no-scrollbar">
                        <div className="flex gap-4">
                            {amenitiesData.map((amenity, index) => (
                                <div key={index} className="flex items-center">
                                    <p
                                        className={`font-PJSregular text-sm whitespace-nowrap border px-4 py-3 rounded-xl cursor-pointer ${selectedAmenities.includes(amenity) ? 'bg-blue text-white' : 'text-black'}`}
                                        onClick={() => toggleAmenity(amenity)}
                                    >
                                        {amenity}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="font-PJSbold text-xl mb-3">Facility’s Location</p>
                    <div className="relative mt-5">
                        <input {...register("writtenAddress")}
                            className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]`} type="text" />
                        <label htmlFor="WrittenAddress" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Written Address*</label>
                        {errors.writtenAddress && <p className="text-red-500">{errors.writtenAddress.message}</p>}
                    </div>
                </div>
                <div className="mt-5">
                    <img className="w-full" src={googleMap} alt="Google Map" />
                </div>
                <div className="mt-10">
                    <p className="font-PJSbold text-xl mb-3">Upload Field Images</p>
                    <div className="overflow-x-auto no-scrollbar w-[100%]">
                        <div className="flex gap-7 min-w-[max-content]">
                            <div className="w-44 h-44 rounded-xl border-secondaryThirty border-2 flex justify-center items-center">
                                <div className="text-center min-w-44">
                                    <label htmlFor="uploadInput" className="cursor-pointer">
                                        <img src={PhotoIcon} alt="Upload Icon" className="mx-auto mb-2" />
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
                            <div className="flex gap-4 flex-wrap">
                                {photos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="relative w-44 h-44 flex justify-center items-center cursor-pointer"
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
                                    >
                                        <img src={photo} alt={`Uploaded photo ${index}`} className="w-full h-full object-cover rounded-xl" />
                                        {hoveredIndex === index && (
                                            <div
                                                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl"
                                            >
                                                <img src={edit} className="object-cover" onClick={() => openModal(index)} />
                                            </div>
                                        )}
                                        <div className="absolute bottom-3 left-4">
                                            <p className="text-white font-PJSbold text-sm">{fieldNames[index]}</p>
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
                                        <p className="text-[20px] font-PJSbold">Edit Photo</p>
                                        <div className="relative mt-5">
                                            <input
                                                className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]`}
                                                type="text"
                                                value={fieldNames[index]}
                                                onChange={(e) => handleFieldNameChange(index, e.target.value)}
                                            />
                                            <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Field Name</label>
                                        </div>
                                    </div>
                                    <img src={photo} alt={`Modal photo ${index}`} className="w-full h-[230px] object-cover rounded-xl mt-5" />
                                    <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                                        <button onClick={handleDeletePhoto}
                                            className="w-[220px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full border-redbutton border-2 font-PJSmedium justify-center items-center text-redbutton"
                                        >
                                            Delete Photo
                                        </button>
                                        <button
                                            className="w-[220px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                                            onClick={() => handleSaveChanges(index)}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </AppModal>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <p className="font-PJSbold text-xl mb-3">Upload Banner Ads</p>
                    <div className="w-full h-[165px] rounded-lg border-secondaryThirty border-2 flex justify-center items-center overflow-hidden relative">
                        {bannerImage ? (
                            <img src={bannerImage} alt="Uploaded" className="w-full h-[165px] object-cover" />
                        ) : (
                            <div className="text-center">
                                <img src={PhotoIcon} alt="Upload Icon" className="mx-auto mb-2" />
                                <p>Upload Photos</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerImageUpload}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <button type="submit"
                        className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};


const HrsOperationContent = () => {
    const initialDays = [
        { day: 'Monday', open: '9:00am', close: '6:00pm', checked: true },
        { day: 'Tuesday', open: '9:00am', close: '6:00pm', checked: true },
        { day: 'Wednesday', open: '9:00am', close: '6:00pm', checked: true },
        { day: 'Thursday', open: '9:00am', close: '6:00pm', checked: true },
        { day: 'Friday', open: '9:00am', close: '6:00pm', checked: true },
        { day: 'Saturday', open: '9:00am', close: '6:00pm', checked: true },
        { day: 'Sunday', open: '9:00am', close: '6:00pm', checked: true },
    ];

    const [days, setDays] = useState(initialDays);
    const [editMode, setEditMode] = useState(false); // State to control edit mode

    const handleCheckboxChange = (index) => {
        if (editMode) {
            const newDays = [...days];
            newDays[index].checked = !newDays[index].checked;
            setDays(newDays);
        }
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const validationSchema = yup.object().shape({
        holidays: yup.string().required("Holidays required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <div className="mx-3 mt-4">
            <div className="flex items-center justify-between">
                <p className="font-PJSbold text-xl">Hours of Operation</p>
                <button onClick={toggleEditMode} className="font-PJSregular transition-transform text-sm border-2 flex items-center gap-3 border-secondaryTwenty hover:bg-secondaryTwenty rounded-full px-6 py-2 cursor-pointer">
                    {editMode ? "Save Timings" : "Edit Timings"}
                    <img className="w-4" src={editBlack} alt="" />
                </button>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-10">
                <div className="font-PJSbold py-4">Days</div>
                <div className="font-PJSbold py-4">Open</div>
                <div className="font-PJSbold py-4">Close</div>
                {days.map((entry, index) => (
                    <React.Fragment key={index}>
                        <div className={`flex items-center ${!entry.checked ? 'opacity-50' : ''}`}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={entry.checked}
                                            onChange={() => handleCheckboxChange(index)}
                                            disabled={!editMode}
                                            sx={{
                                                color: 'rgba(132, 154, 184, 0.2)',
                                                '&.Mui-checked': { color: 'rgba(51, 192, 219, 1)' },
                                                '&:focus': { color: 'rgba(51, 192, 219, 1)' },
                                                '& .MuiSvgIcon-root': { fontSize: 32 },
                                            }}
                                        />
                                    }
                                />
                            </FormGroup>
                            <div className={`ml-[-10px] font-PJSmedium text-sm ${!entry.checked ? 'opacity-50' : ''}`}>{entry.day}</div>
                        </div>
                        <div className={`p-4 border-2 font-PJSmedium text-sm rounded-lg ${!entry.checked ? 'opacity-50' : ''}`}>{entry.open}</div>
                        <div className={`p-4 border-2 font-PJSmedium text-sm rounded-lg ${!entry.checked ? 'opacity-50' : ''}`}>{entry.close}</div>
                    </React.Fragment>
                ))}
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-1 mt-10">
                    <div className="font-PJSbold text-xl">Holidays</div>
                    <button>
                        <img src={Info} className="w-[20px] h-[20px]" alt="Info" />
                    </button>
                </div>
                <div className="relative mt-5">
                    <input {...register("holidays")}
                        className="block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]" type="text" />
                    <label htmlFor="holidays" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Holidays*</label>
                    {errors.holidays && <p className="text-red-500">{errors.holidays.message}</p>}
                </div>
                <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button
                        className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
                    >
                        Cancel
                    </button>
                    <button type="submit"
                        className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};



const FieldPriceContent = () => {
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
                                <img onClick={handleFormClose} className="w-6 h-6" src={close} alt="" />
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
                                <img className="w-[18px] h-[18px]" src={info} alt="" />
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
                                <img onClick={handleFormClose} className="w-6 h-6" src={close} alt="" />
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
                                    <img src={dollar} className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="relative mt-5 flex justify-between items-center  border rounded-lg border-secondaryThirty px-3">
                                <input
                                    className={`block pt-4 shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white  w-full h-[54px]`} type="text" />
                                <label htmlFor="FieldName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Price for 120 min</label>
                                <div className="mr-3 cursor-pointer">
                                    <img src={dollar} className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="h-[1px] w-full my-3 bg-secondaryTwenty mt-4"></div>

                            <div className="flex items-center gap-2 font-PJSbold text-sm mt-2">
                                <div className="bg-lime p-1 rounded-full">
                                    <img className="w-3 h-3" src={Plus} alt="" />
                                </div>

                                <p>Add Time Slot</p>
                                <div className="ml-auto">
                                    <img src={Next} alt="" />
                                </div>

                            </div>

                        </div>

                        {/* <div>
                            <div className="mt-7 flex items-center gap-3">
                                <p className=" text-[16px] font-PJSextra">
                                    Monday , Tuesday , Wednesday
                                </p>
                                <div className="bg-lime rounded-full p-1">
                                    <img src={checkMark} alt="" />
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
                                    <img src={checkMark} alt="" />
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
                                    <img src={checkMark} alt="" />
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


const FacilityRulesContent = () => {
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
                        {step >= 2 ? <img className="w-6 animate-zoom-in" src={checkMark} alt="Check Mark" /> : <img src={step1} alt="Step 1" />}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className={`h-0.5 w-5 ${step >= 2 ? 'bg-lime' : 'bg-[#d7d7d7]'}`}></div>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${step > 2 ? 'bg-lime border-none' : 'bg-none' && step == 2 ? ' border-lime' : ''}`}>
                        {step >= 3 ? <img className="w-6 animate-zoom-in" src={checkMark} alt="Check Mark" /> : <img src={step1} alt="Step 2" />}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className={`h-0.5 w-5 ${step >= 3 ? 'bg-lime' : 'bg-[#d7d7d7]'}`}></div>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-[#d7d7d7] border-[3px] flex justify-center items-center ${step > 3 ? 'bg-lime border-none' : 'bg-none' && step == 3 ? ' border-lime' : ''}`}>
                        {step >= 4 ? <img className="w-6 animate-zoom-in" src={checkMark} alt="Check Mark" /> : <img src={step2} alt="Step 2" />}
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
                                <div className="relative"><img className="w-5 absolute bottom-4 right-4" src={percent} alt="" /></div>
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

                                    <div className="border-2 cursor-pointer rounded-full p-5"><img src={linkicon} alt="" /></div>
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

                                        <img className="absolute bottom-5 right-5 w-7" src={CheckCircle} alt="" />
                                    </div>

                                    <div className="border-2 cursor-pointer rounded-full p-5"><img src={linkicon} alt="" /></div>
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




const FacilityManagersContent = () => {
    return (
        <>
            <div className="mx-3 mt-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-PJSbold text-xl">Facility Managers</p>
                        <p className="font-PJSregular text-secondary text-sm mt-1">Manage the information of your members</p>
                    </div>
                    <button
                        className="flex items-center transition duration-300 ease-in-out transform hover:scale-105 text-[14px] rounded-full bg-lime font-PJSmedium justify-center w-[135px] h-[45px] gap-2"
                    >
                        <img className="w-5 h-5" src={Plus} alt="" />
                        Add New
                    </button>
                </div>
                <div className="flex items-center gap-10 mt-10">
                    <div className="flex items-center justify-between px-7 h-[75px] w-full border-2 rounded-lg ">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="text-primary  text-sm font-PJSbold">Justin McNab</label>
                            <label htmlFor="" className="text-primary  text-xs font-PJSregular">justin@qick.app</label>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-[26px] w-[137px] border rounded-full  text-center">

                                <select name="" id="" className="font-PJSmedium text-sm">
                                    <option value="Full Access" className="font-PJSbold ">Full Access</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={limeCircle} alt="" />
                                <p className="text-sm font-PJSmedium text-primary">Active</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img className="w-6" src={Del} alt="Delete Icon" />
                    </div>
                </div>
                <div className="flex items-center gap-10 mt-5">
                    <div className="flex items-center justify-between px-7 h-[75px] w-full border-2 rounded-lg ">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="text-primary  text-sm font-PJSbold">Johana Barahona</label>
                            <label htmlFor="" className="text-primary  text-xs font-PJSregular">johana@qick.app</label>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="h-[26px] w-[164px] border rounded-full  text-center">

                                <select name="" id="" className="font-PJSmedium text-sm ">
                                    <option value="Full Access" className="font-PJSbold ">Calendar & Users</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <img src={yellowcircle} alt="" />
                                <p className="text-sm font-PJSmedium text-primary">Pending</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img className="w-6" src={Del} alt="Delete Icon" />
                    </div>
                </div>

            </div>
        </>
    );
};
const DiscountContent = () => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [discounts, setDiscounts] = useState([]);
    const [currentDiscount, setCurrentDiscount] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
    };

    const hideForm = () => {
        setFormVisible(false);
        setCurrentDiscount(null);
        setEditingIndex(null);
    };

    const schema = yup.object().shape({
        DiscountType: yup.string().required('Please select Discount Type'),
        Description: yup.string().required('Please enter Description'),
        DiscountName: yup.string().required('Please enter Discount Name'),
        DiscountAmount: yup.string().required('Please enter Discount Amount'),
        uses: yup.string().required('Please enter Number of uses'),
        DiscountedFields: yup.string().required('Please select Discounted Fields'),
        DiscountDays: yup.string().required('Please enter Discount days'),
        ValidTill: yup.string().required('Please select Valid Till date'),
    });

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: currentDiscount || {},
    });

    const onSubmit = (values) => {
        console.log("Submitted values:", values);
        if (editingIndex !== null) {
            const updatedDiscounts = [...discounts];
            updatedDiscounts[editingIndex] = values;
            setDiscounts(updatedDiscounts);
        } else {
            setDiscounts([...discounts, values]);
        }
        hideForm();
    };


    const editDiscount = (index) => {
        setCurrentDiscount(discounts[index]);
        setEditingIndex(index);
        setFormVisible(true);
    };

    const deleteDiscount = () => {
        if (editingIndex !== null) {
            const updatedDiscounts = discounts.filter((_, index) => index !== editingIndex);
            setDiscounts(updatedDiscounts);
            hideForm();
        }
    };
    console.log("rerender");

    return (
        <div className="mx-3 mt-4">
            {!isFormVisible && (
                <>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-PJSbold text-xl">Discounts</p>
                            <p className="font-PJSregular text-secondary text-sm mt-1">You have no active discounts</p>
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
                                <img className="w-5 h-5" src={Plus} alt="" />
                                Create Discount
                            </button>
                        </div>
                    </div>

                    {discounts.map((discount, index) => (
                        <div key={index} className="mt-4 cursor-pointer" onClick={() => editDiscount(index)}>
                            <div className="flex mt-10 items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-blueSecondary p-4">
                                        <img className="w-6 h-6" src={DiscountBlue} alt="" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-PJSbold text-[16px]">{discount.DiscountName}</p>
                                        <p className="font-PJSmedium text-xs">{discount.Description}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p className="font-PJSbold text-[16px] uppercase">{discount.DiscountAmount}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-PJSmedium">
                                        <p>{discount.uses}</p>
                                        <img className="w-1" src={circle} alt="" />
                                        <p>Till {discount.ValidTill}</p>
                                        <img className="w-1" src={circle} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="h-[1px] w-full my-3 bg-secondaryTwenty"></div>
                        </div>
                    ))}
                </>
            )}
            {isFormVisible && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {editingIndex !== null && (
                        <div className="mb-10">
                            <div className="flex items-center justify-between">
                                <p className="font-PJSbold text-xl">Generated Discount Code</p>
                            </div>
                            <div className="relative mt-5">
                                <input
                                    id="discountCode"
                                    {...register('DiscountCode')}
                                    className="block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]"
                                    type="text"
                                />
                                <label htmlFor="DiscountType" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discount Code*</label>
                                <button className="flex absolute bottom-2 right-2 items-center rounded-lg gap-2 p-2 bg-secondaryTen ">
                                    <p className="w-[max-content]">Copy</p>
                                    <img className="w-3" src={copy} alt="" />
                                </button>
                            </div>
                        </div>
                    )}
                    <p className="font-PJSbold text-xl">{editingIndex !== null ? 'Discount Details' : 'Create Discount'}</p>
                    <div className="mt-5">
                        <div className="relative mt-5">
                            <select
                                id="DiscountType"
                                {...register('DiscountType')}
                                className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}
                            >
                                <option value="">Choose an option</option>
                                <option value="General Discount">General Discount</option>
                            </select>
                            <label htmlFor="DiscountType" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discount Type*</label>
                            {errors.DiscountType && <span className="error text-sm font-PJSmedium text-redbutton">{errors.DiscountType.message}</span>}
                        </div>
                        <div className="relative mt-5">
                            <input id="Description" type="text" {...register('Description')} className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`} />
                            <label htmlFor="DiscountType" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Description*</label>
                            {/* {errors.Description && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.Description.message}</span>} */}
                        </div>
                        <div className="relative mt-5">
                            <input id="DiscountName" {...register('DiscountName')} type="text" className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`} />
                            <label htmlFor="DiscountName" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discount Name*</label>
                            {/* {errors.DiscountAmount && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.DiscountName.message}</span>} */}
                        </div>

                        <div className="relative mt-5">
                            <input id="DiscountAmount" {...register('DiscountAmount')} type="text" className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`} />
                            <label htmlFor="DiscountType" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discount Amount*</label>
                            {/* {errors.DiscountAmount && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.DiscountName.message}</span>} */}
                        </div>
                        <div className="relative mt-5">
                            <select id="uses" {...register('uses')} className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}>
                                <option value="">Choose an option</option>
                                <option value="No Limit">No Limit</option>
                            </select>
                            <label htmlFor="uses" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discount Type*</label>
                            {/* {errors.uses && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.uses.message}</span>} */}
                        </div>
                        <div className="relative mt-5">
                            <select id="DiscountedFields" {...register('DiscountedFields')} className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}>
                                <option value="">Choose an option</option>
                                <option value="All Fields">All Fields</option>
                            </select>
                            <label htmlFor="DiscountedFields" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discounted Fields*</label>
                            {/* {errors.DiscountedFields && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.DiscountedFields.message}</span>} */}
                        </div>
                        <div className="relative mt-5">
                            <input id="DiscountDays" {...register('DiscountDays')} className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm  bg-white border-secondaryThirty w-full h-[54px]`} type="text" />
                            <label htmlFor="DiscountDays" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">Discount Days*</label>
                            {/* {errors.DiscountDays && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.DiscountDays.message}</span>} */}
                        </div>
                        <div className="relative mt-5">
                            <select id="ValidTill" {...register('ValidTill')} className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm appearance-none bg-white border-secondaryThirty selectIcon w-full h-[54px]`}>
                                <option value="">Choose an option</option>
                                <option value="10 Jan 2024">10 Jan 2024</option>
                            </select>
                            <label htmlFor="ValidTill" className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs">ValidTill*</label>
                            {/* {errors.ValidTill && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.ValidTill.message}</span>} */}
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mt-10">
                        <p>From</p>
                        <input
                            className="w-[140px] h-[55px] p-[14px] justify-center border-2 border-secondaryTwenty rounded-lg focus:outline-none"
                            {...register('From')}
                            placeholder="6:00am"
                        />
                        <p>To</p>
                        <input
                            className="w-[140px] h-[55px] p-[14px] justify-center border-2 border-secondaryTwenty rounded-lg focus:outline-none"
                            {...register('To')}
                            placeholder="12:00pm"
                        />
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <p className="font-PJSmedium">
                            Notify users <span className="text-secondary text-sm">(they’ll receive automatic push and email notifications)</span>
                        </p>
                        <Controller
                            name="NotifyUsers"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    sx={{
                                        color: 'rgba(132, 154, 184, 0.2)',
                                        '&.Mui-checked': { color: 'rgba(51, 192, 219, 1)' },
                                        '&:focus': { color: 'rgba(51, 192, 219, 1)' },
                                        '& .MuiSvgIcon-root': { fontSize: 32 },
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
                            {editingIndex !== null ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                    {editingIndex !== null && (
                        <button
                            type="button"
                            onClick={deleteDiscount}
                            className="w-full mt-5 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full border-redbutton border-2 font-PJSmedium justify-center items-center text-redbutton"
                        >
                            Delete Coupon
                        </button>
                    )}
                </form>
            )}
        </div>
    );
};

const BankAccountContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddAccountSelectionOpen, setIsAddAccountModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('bankAccount');
    const [preferredAccount, setPreferredAccount] = useState('Bank Account');
    const [isAccessRestrictedVisible, setIsAccessRestrictedVisible] = useState(true);
    const [isAddAccClicked, setIsAddAccClicked] = useState(false);

    const onSubmitAdminPassword = (data) => {
        console.log(data);
        setIsAccessRestrictedVisible(false);
        setIsAddAccClicked(true);
    };

    const onSubmitBankAccount = (data) => {
        console.log(data);
    };

    const onSubmitDebitCard = (data) => {
        console.log(data);
    };


    const accounts = [
        { name: 'Bank Account', icon: bankAccount },
        { name: 'Debit Card', icon: debitCard },
        { name: 'Paypal', icon: paypal }
    ];

    const handleSetPreferred = (accountName) => {
        setPreferredAccount(accountName);
        if (accountName === 'Bank Account') {
            setActiveTab('bankAccount');
        } else if (accountName === 'Debit Card') {
            setActiveTab('debitCard');
        } else if (accountName === 'Paypal') {
            setActiveTab('paypal');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDone = () => {
        closeModal();
    };

    const handleFormClose = () => {
        setIsAddAccClicked(false);
        setIsAddAccountModalOpen(false);
        setIsAccessRestrictedVisible(true);
    };

    const adminPasswordSchema = yup.object().shape({
        password: yup.string().required('Password is required.'),
    });

    const openAddAccountModal = () => {
        setIsAddAccountModalOpen(true);
        setIsAddAccClicked(false);
    };


    const bankAccountSchema = yup.object().shape({
        bank: yup.string().required('Bank is required.'),
        accountHolderName: yup.string().required('Account holder’s name is required.'),
        branchCode: yup.string().required('Branch code is required.'),
        accountNumber: yup.string().required('Account number is required.'),
    });

    const debitCardSchema = yup.object().shape({
        cardNumber: yup.string().required('Card number is required.'),
        expiryDate: yup.string().required('Expiration date is required.'),
        cvv: yup.string().required('CVV is required.'),
    });

    const { register: registerAdminPassword, handleSubmit: handleSubmitAdminPassword, formState: { errors: errorsAdminPassword } } = useForm({
        resolver: yupResolver(adminPasswordSchema),
    });

    const { register: registerBankAccount, handleSubmit: handleSubmitBankAccount, formState: { errors: errorsBankAccount } } = useForm({
        resolver: yupResolver(bankAccountSchema),
    });

    const { register: registerDebitCard, handleSubmit: handleSubmitDebitCard, formState: { errors: errorsDebitCard } } = useForm({
        resolver: yupResolver(debitCardSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showCVV, setShowCVV] = useState(false);

    console.log("rerender");


    return (
        <div className="mx-3 mt-4 min-h-[600px] relative">
            {isAccessRestrictedVisible && (
                <div>
                    <p className="font-PJSbold text-xl">Access Restricted</p>
                    <div className="flex items-center gap-2 mt-10 relative cursor-pointer">
                        <p className="font-PJSregular text-secondary text-sm mt-1">Admin Password</p>
                        <img className="w-4 mt-1" src={info} alt="info" onClick={openModal} />
                        <AppModal
                            modalopen={isModalOpen}
                            onClose={closeModal}
                            height="200px"
                            width="300px"
                            customStyles={{
                                overlay: {
                                    position: 'absolute',
                                    top: 100,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                },
                                modal: {
                                    position: 'absolute',
                                    top: '100%',
                                    left: '42%',
                                    transform: 'translate(-50%, -50%)',
                                    margin: '0',
                                },
                            }}
                        >
                            <div>
                                <p className="text-sm font-PJSbold">Information</p>
                                <p className="text-sm text-secondary mt-5 font-PJSmedium">
                                    This password is the same one you use
                                    to sign into the platform as the main
                                    admin.
                                </p>
                                <button onClick={handleDone}
                                    className="w-full mt-6 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                                >
                                    Done
                                </button>
                            </div>
                        </AppModal>
                    </div>

                    <form onSubmit={handleSubmitAdminPassword(onSubmitAdminPassword)} className="w-full flex flex-col">
                        <div className="w-[300px] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                            <input
                                {...registerAdminPassword("password")}
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full"
                                autoComplete="new-password"
                            />
                            <div className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                <img src={showPassword ? eyeOpen : eye} className="w-6 h-6" />
                            </div>
                        </div>
                        {errorsAdminPassword.password && <p className="text-red-500">{errorsAdminPassword.password.message}</p>}


                        <div className="absolute bottom-5 left-0 right-0 flex justify-center mb-5">
                            <button
                                type="submit"
                                className="w-[600px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium"
                            >
                                Proceed
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {isAddAccClicked && (
                <div>
                    <div className="flex justify-between">
                        <div>
                            <p className="text-xl font-PJSbold">My Accounts</p>
                        </div>
                        <div className="cursor-pointer">
                            <img onClick={handleFormClose} className="w-6 h-6" src={close} alt="Close" />
                        </div>
                    </div>
                    <p className="text-sm font-PJSmedium mt-8">3 Added</p>

                    {accounts.map((account) => (
                        <div
                            key={account.name}
                            className={`flex items-center justify-between mt-5 border-2 rounded-lg py-3 px-5 ${preferredAccount !== account.name ? 'opacity-50' : ''}`}
                        >
                            <div className="flex items-center gap-3">
                                <img className="w-6" src={account.icon} alt={account.name} />
                                <p>{account.name}</p>
                            </div>
                            <div className="flex items-center gap-8">
                                <div
                                    className={`px-3 border-2 rounded-full bg-secondaryThirty cursor-pointer`}
                                    onClick={() => handleSetPreferred(account.name)}
                                >
                                    <p className="font-PJSmedium text-sm">
                                        {preferredAccount === account.name ? 'Preferred' : 'Set as preferred'}
                                    </p>
                                </div>
                                <div className="border-2 rounded-full p-1">
                                    <img className="w-[18px] h-[18px]" src={Del} alt="Delete" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <p className="font-PJSmedium text-sm text-center  text-secondary mt-20">Clients' sensitive information is safeguarded with PCI-DSS compliance, ensuring <br /> maximum protection. For further details, please refer to our <span className="text-[#448FE7]">Privacy Policy </span>and <span className="text-[#448FE7]">Terms of Service</span></p>
                    <div>
                        <button onClick={openAddAccountModal}
                            type="submit"
                            className="mt-12 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium"
                        >
                            Add Account
                        </button>
                    </div>
                </div>
            )}

            {isAddAccountSelectionOpen && (
                <>
                    <div>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-PJSbold text-xl">Add an account to receive payments</p>
                                <p className="font-PJSmedium text-secondary text-sm mt-2">
                                    You will receive payments from users directly into this account
                                </p>
                            </div>

                            <div className="cursor-pointer">
                                <img onClick={handleFormClose} className="w-6 h-6" src={close} alt="" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-x-5 mt-10 font-PJSmedium">
                            <div
                                className={`text-center flex justify-center items-center border-2 w-[200px] h-[47px] rounded-lg gap-3 cursor-pointer ${activeTab === 'bankAccount' ? 'opacity-100' : 'opacity-50'}`}
                                onClick={() => setActiveTab('bankAccount')}
                            >
                                <img className="w-6" src={bankAccount} alt="Bank Account" />
                                <p className="text-xl ">Bank Account</p>
                            </div>
                            <div
                                className={`text-center flex justify-center items-center border-2 w-[200px] h-[47px] rounded-lg gap-3 cursor-pointer ${activeTab === 'debitCard' ? 'opacity-100' : 'opacity-50'}`}
                                onClick={() => setActiveTab('debitCard')}
                            >
                                <img className="w-6" src={debitCard} alt="Credit Card" />
                                <p className="text-xl">Debit Card</p>
                            </div>
                            <div
                                className={`text-center flex justify-center items-center border-2 w-[200px] h-[47px] rounded-lg gap-3 cursor-pointer ${activeTab === 'paypal' ? 'opacity-100' : 'opacity-50'}`}
                                onClick={() => setActiveTab('paypal')}
                            >
                                <img className="w-6" src={paypal} alt="PayPal" />
                                <p className="text-xl">PayPal</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        {activeTab === 'bankAccount' && (
                            <form onSubmit={handleSubmitBankAccount(onSubmitBankAccount)}>
                                <div className="grid grid-rows-2 grid-cols-2 gap-7">
                                    <div className="flex-col flex">
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="bank">Bank</label>
                                        <select {...registerBankAccount("bank")} className="w-[292px] h-[47px] border-2 selectIcon appearance-none rounded-lg px-4" id="bank">
                                            <option value="Bank" disabled>Choose an Option</option>
                                            <option value="Bank">Bank</option>
                                        </select>
                                        {errorsBankAccount.bank && <p className="text-red-500">{errorsBankAccount.bank.message}</p>}
                                    </div>
                                    <div className="flex-col flex">
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="accountHolderName">Account Holder’s Name</label>
                                        <input {...registerBankAccount("accountHolderName")} className="w-[292px] h-[47px] border-2 rounded-lg px-4 focus:outline-none" type="text" id="accountHolderName" />
                                        {errorsBankAccount.accountHolderName && <p className="text-red-500">{errorsBankAccount.accountHolderName.message}</p>}
                                    </div>
                                    <div className="flex-col flex">
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="branchCode">Branch Code</label>
                                        <input {...registerBankAccount("branchCode")} className="w-[292px] h-[47px] border-2 rounded-lg px-4 focus:outline-none" type="text" id="branchCode" />
                                        {errorsBankAccount.branchCode && <p className="text-red-500">{errorsBankAccount.branchCode.message}</p>}
                                    </div>
                                    <div className="flex-col flex">
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="accountNumber">Account Number</label>
                                        <input {...registerBankAccount("accountNumber")} className="w-[292px] h-[47px] border-2 rounded-lg px-4 focus:outline-none" type="text" id="accountNumber" />
                                        {errorsBankAccount.accountNumber && <p className="text-red-500">{errorsBankAccount.accountNumber.message}</p>}
                                    </div>
                                </div>

                                <p className="font-PJSmedium text-sm text-secondary mt-10">Clients' sensitive information is safeguarded with PCI-DSS compliance, ensuring maximum protection. For further details, please refer to our <span className="text-[#448FE7]">Privacy Policy </span>and <span className="text-[#448FE7]">Terms of Service</span></p>
                                <div>
                                    <button
                                        type="submit"
                                        className="mt-10 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        )}
                        {activeTab === 'debitCard' && (
                            <form onSubmit={handleSubmitDebitCard(onSubmitDebitCard)}>
                                <div className="grid grid-rows-2 grid-cols-2 gap-7">
                                    <div>
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="cardNumber">Card Number</label>
                                        <div className="w-[330px] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                                            <input
                                                {...registerDebitCard("cardNumber")}
                                                placeholder="Card Number"
                                                type="text"
                                                className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full focus:outline-none"
                                                id="cardNumber"
                                            />
                                            <img src={creditcardIcon} alt="Credit Card" />
                                        </div>
                                        {errorsDebitCard.cardNumber && <p className="text-red-500">{errorsDebitCard.cardNumber.message}</p>}
                                    </div>
                                    <div></div>
                                    <div className="w-full">
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="expiryDate">Expiration Date</label>
                                        <div className="flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                                            <input
                                                {...registerDebitCard("expiryDate")}
                                                placeholder="Expiry Date"
                                                type="text"
                                                className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full focus:outline-none"
                                                id="expiryDate"
                                            />
                                        </div>
                                        {errorsDebitCard.expiryDate && <p className="text-red-500">{errorsDebitCard.expiryDate.message}</p>}
                                    </div>
                                    <div className="w-full">
                                        <label className="text-[15px] mb-2 font-PJSmedium text-secondary" htmlFor="cvv">CVV</label>
                                        <div className="flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4 focus:outline-none">
                                            <input
                                                {...registerDebitCard("cvv")}
                                                placeholder="CVV"
                                                type={showCVV ? "text" : "password"}
                                                className="font-PJSmedium text-primary text-[14px] outline-none  w-[80%] h-full"
                                                id="cvv"
                                                autoComplete="cc-csc"
                                            />
                                            <div className="cursor-pointer" onClick={() => setShowCVV(!showCVV)}>
                                                <img src={showCVV ? eyeOpen : eye} className="w-6 h-6" />
                                            </div>
                                        </div>
                                        {errorsDebitCard.cvv && <p className="text-red-500">{errorsDebitCard.cvv.message}</p>}
                                    </div>
                                </div>

                                <p className="font-PJSmedium text-sm text-secondary mt-10">Clients' sensitive information is safeguarded with PCI-DSS compliance, ensuring maximum protection. For further details, please refer to our <span className="text-[#448FE7]">Privacy Policy </span>and <span className="text-[#448FE7]">Terms of Service</span></p>
                                <div>
                                    <button
                                        type="submit"
                                        className="mt-10 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        )}
                        {activeTab === 'paypal' && (
                            <form>
                                <div className="flex-col flex text-center">
                                    <p className="text-[22px] mb-2 font-PJSmedium">PayPal Content</p>

                                </div>
                                <p className="font-PJSmedium text-sm text-secondary mt-10">Clients' sensitive information is safeguarded with PCI-DSS compliance, ensuring maximum protection. For further details, please refer to our <span className="text-[#448FE7]">Privacy Policy </span>and <span className="text-[#448FE7]">Terms of Service</span></p>
                                <div>
                                    <button
                                        type="submit"
                                        className="mt-10 w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </>
            )}

        </div>
    );
};








export { MyFacilityContent, HrsOperationContent, FieldPriceContent, FacilityRulesContent, FacilityManagersContent, DiscountContent, BankAccountContent };