import assets from "../../../assets/assets";


const FacilityManagers = () => {
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
                        <img className="w-5 h-5" src={assets.Plus} alt="" />
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
                                <img src={assets.limeCircle} alt="" />
                                <p className="text-sm font-PJSmedium text-primary">Active</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img className="w-6" src={assets.Del} alt="Delete Icon" />
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
                                <img src={assets.yellowcircle} alt="" />
                                <p className="text-sm font-PJSmedium text-primary">Pending</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img className="w-6" src={assets.Del} alt="Delete Icon" />
                    </div>
                </div>

            </div>
        </>
    );
};

export default FacilityManagers