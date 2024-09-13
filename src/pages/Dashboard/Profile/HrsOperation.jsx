import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { initialDays } from "../../../constants/profile-index";
import assets from "../../../assets/assets";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";


const HrsOperation = () => {


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
                    <img className="w-4" src={assets.editBlack} alt="" />
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
                        <img src={assets.Info} className="w-[20px] h-[20px]" alt="Info" />
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

export default HrsOperation