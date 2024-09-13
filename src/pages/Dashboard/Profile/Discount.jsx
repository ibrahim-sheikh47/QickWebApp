import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import assets from "../../../assets/assets";
import { Checkbox } from "@mui/material";

const Discount = () => {
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
                                <img className="w-5 h-5" src={assets.Plus} alt="" />
                                Create Discount
                            </button>
                        </div>
                    </div>

                    {discounts.map((discount, index) => (
                        <div key={index} className="mt-4 cursor-pointer" onClick={() => editDiscount(index)}>
                            <div className="flex mt-10 items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full bg-blueSecondary p-4">
                                        <img className="w-6 h-6" src={assets.DiscountBlue} alt="" />
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
                                        <img className="w-1" src={assets.circle} alt="" />
                                        <p>Till {discount.ValidTill}</p>
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
                                    <img className="w-3" src={assets.copy} alt="" />
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

export default Discount