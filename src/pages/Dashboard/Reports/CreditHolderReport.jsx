import { useState } from "react";
import Back from "../../../assets/svgs/back.svg";
import search from "../../../assets/svgs/Search.svg";
import down from "../../../assets/svgs/Down.svg";
import download from "../../../assets/svgs/Export.svg";
import mail from "../../../assets/svgs/EnvelopeSimple.svg";
import phone from "../../../assets/svgs/Phone.svg";
import dollar from "../../../assets/svgs/dollar.svg";
import CheckCircle from "../../../assets/svgs/CheckCircleBlue.svg";
import user from "../../../assets/user.png";
import { AppModal } from "../../../components";
import { holderDetails } from "../../../constants/reportsIndex";

const CreditHolderReport = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    function backNav() {
        window.history.back();
    }

    const handleRowClick = (client) => {
        setSelectedClient(client);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedClient(null);
        setIsFieldModalOpen(false);
    };

    const handleClose = () => {
        setModalOpen(false);
    };
    const openFieldModal = () => {
        setIsFieldModalOpen(true);
    };
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };


    return (
        <>
            <div className="">
                <p className="font-PJSextra text-3xl text-primary">Futeca</p>
                <p className="font-PJSregular text-sm text-secondary mt-2">Elevate your soccer experience</p>
            </div>

            <div className="bg-white rounded-lg mt-5 p-2">
                <div className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-4">
                        <img src={Back} alt="Back" onClick={backNav} className="cursor-pointer" />
                        <p className="text-2xl font-PJSbold text-primary">Credit Holders
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex justify-center items-center">
                            <form action="" className="relative mx-auto w-max">
                                <input
                                    type="search"
                                    className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border-2 border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                                />
                                <img
                                    className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                                    src={search}
                                    alt="Search"
                                />
                            </form>
                        </button>
                        <div className="border-2 border-secondaryThirty bg-transparent w-[165px] text-center justify-center flex h-[42px] rounded-full" onClick={openFieldModal}>
                            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                                Highest Credits
                                <img src={down} alt="Down" /></p>
                        </div>
                        <div className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full">
                            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                                <img src={download} className="w-5 h-5" alt="Download" />
                                Download
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-5 items-center gap-4 mx-3 text-sm font-PJSmedium text-[#8f9499] mt-5 whitespace-nowrap px-3">
                    <p>Client Name</p>
                    <p>Credit Balance</p>
                </div>

                <div className="h-[1px] bg-secondaryThirty mt-1"></div>
                <div className="cursor-pointer my-10">
                    {holderDetails.map((item, index) => (
                        <div key={item.id} onClick={() => handleRowClick(item)}>
                            <div className={`grid grid-cols-5 items-center gap-4 mx-3 text-sm font-PJSmedium mt-4`}>
                                <p className="flex items-center gap-4 p-2">
                                    <span className="p-1 px-[10px] bg-secondaryTwenty rounded-full">{index + 1}
                                    </span>
                                    <span className="underline">{item.client}</span>
                                </p>
                                <p className="p-3">{item.balance}</p>
                            </div>
                            <div className="h-[1px] bg-secondaryTwenty mt-1"></div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedClient && (
                <AppModal onClose={closeModal} modalopen={modalOpen} height="570px" width="495px">
                    <div>
                        <p className="text-xl font-PJSbold text-primary">User Details</p>
                        <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center justify-center gap-3">
                                <div>
                                    <img src={user} className="w-[56px] h-[56px] rounded-full" alt="" />
                                </div>
                                <div className="font-PJSmedium">
                                    <p className="text-secondary text-xs">Name</p>
                                    <p className="text-sm">{selectedClient.client}</p>
                                </div>
                            </div>
                            <button className="bg-lime rounded-full w-[80px] h-[40px] flex justify-center items-center">
                                Chat
                            </button>
                        </div>

                        <div className="h-[1px] bg-secondaryTwenty my-5"></div>

                        <div className="flex items-center justify-between mt-5">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center bg-secondaryTen">
                                    <img src={mail} className="w-6 h-6" alt="" />
                                </div>
                                <div className="font-PJSmedium">
                                    <p className="text-secondary text-xs">Email Address</p>
                                    <p className="text-sm">{selectedClient.email}</p>
                                </div>
                            </div>
                            <button className="bg-secondaryTen rounded-full w-[80px] h-[40px] flex justify-center items-center">
                                Copy
                            </button>
                        </div>

                        <div className="h-[1px] bg-secondaryTwenty my-5"></div>

                        <div className="flex items-center gap-3">
                            <div className="w-[48px] h-[48px] rounded-full justify-center flex items-center bg-secondaryTen">
                                <img src={phone} className="w-5 h-5" alt="" />
                            </div>
                            <div className="font-PJSmedium">
                                <p className="text-secondary text-xs">Mobile Number</p>
                                <p className="text-sm">{selectedClient.phone}</p>
                            </div>
                        </div>
                        <div className="h-[1px] bg-secondaryTwenty my-5"></div>

                        <div className="flex items-start gap-3">
                            <div className="min-w-[48px] min-h-[48px] rounded-full justify-center flex items-center bg-secondaryTen">
                                <img src={dollar} className="w-6 h-6" alt="" />
                            </div>
                            <div className="font-PJSmedium">
                                <p className="text-secondary text-xs mb-1">Credit Balance</p>
                                <p className="text-xs">{selectedClient.balance}</p>
                                <p className="text-xs">------------- </p>
                                <p className="text-xs">$7.89 from booking B4434 (May/05/2024) </p>
                                <p className="text-xs">$10.00 from booking B2134 (Feb/01/2024) </p>
                            </div>
                        </div>


                        <div className="h-[1px] bg-secondaryTwenty my-5"></div>
                        <div className="flex mt-10 gap-4 w-full justify-center font-PJSMedium items-center">
                            <button onClick={handleClose}
                                className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </AppModal>
            )}
            <AppModal
                modalopen={isFieldModalOpen}
                onClose={closeModal}
                height="211px"
                width="300px"
                customStyles={{
                    overlay: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    },
                    modal: {
                        position: 'absolute',
                        top: '45%',
                        right: '0',
                        transform: 'translate(-50%, -50%)',
                        margin: '0',
                    },
                }}>
                <div className="mt-0">
                    <p className="font-PJSmedium text-sm">Filter</p>
                    <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

                    <div className="font-PJSmedium text-sm flex flex-col gap-2">
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('Highest Credits')}>
                            <p className="underline">Highest Credits</p>
                            {selectedOption === 'Highest Credits' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                        <div className="flex items-center justify-between cursor-pointer" onClick={() => handleOptionSelect('Lowest Credits')}>
                            <p>Lowest Credits</p>
                            {selectedOption === 'Lowest Credits' && <img src={CheckCircle} className="w-5" alt="Check" />}
                        </div>
                    </div>
                    <button
                        className="w-full mt-10 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                    >
                        Apply
                    </button>
                </div>

            </AppModal>
        </>

    );
};

export default CreditHolderReport;
