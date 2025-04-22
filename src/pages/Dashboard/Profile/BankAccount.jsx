/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppModal from "../../../components/AppModal/AppModal";
import { useNavigate } from "react-router-dom";
import {
  deleteBankAccount,
  getBankAccounts,
} from "../../../api/services/paymentService";
import { useStateContext } from "../../../context";
import { editFacility } from "../../../api/services/facilityService";
import Loader from "../../../components/Loader/Loader";

const BankAccount = () => {
  const navigate = useNavigate();
  const { currentFacility, setCurrentFacility } = useStateContext();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddAccountSelectionOpen, setIsAddAccountModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("bankAccount");
  const [preferredAccount, setPreferredAccount] = useState("Bank Account");
  const [isAccessRestrictedVisible, setIsAccessRestrictedVisible] =
    useState(true);
  const [isAddAccClicked, setIsAddAccClicked] = useState(false);

  useEffect(() => {
    getAllBankAccounts();
  }, []);

  const getAllBankAccounts = async () => {
    setLoading(true);
    try {
      const res = await getBankAccounts(currentFacility._id);
      console.log(res.data);
      setBankAccounts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setDefaultBankAccount = async (id) => {
    setLoading(true);
    try {
      setCurrentFacility(
        await editFacility({ defaultBankAccount: id }, currentFacility._id)
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBankAccount = async (id, shouldDisable = true) => {
    setLoading(true);
    try {
      const res = await deleteBankAccount({
        pI: id,
        shouldDisable,
        facilityId: currentFacility._id,
      });
      setCurrentFacility(res.data);
      getAllBankAccounts();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
    { name: "Bank Account", icon: assets.bankAccount },
    { name: "Debit Card", icon: assets.debitCard },
    { name: "Paypal", icon: assets.paypal },
  ];

  const handleSetPreferred = (accountName) => {
    setPreferredAccount(accountName);
    if (accountName === "Bank Account") {
      setActiveTab("bankAccount");
    } else if (accountName === "Debit Card") {
      setActiveTab("debitCard");
    } else if (accountName === "Paypal") {
      setActiveTab("paypal");
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
    password: yup.string().required("Password is required."),
  });

  const openAddAccountModal = () => {
    navigate("/Tokenization/bank-account");
    // setIsAddAccountModalOpen(true);
    // setIsAddAccClicked(false);
  };

  const bankAccountSchema = yup.object().shape({
    bank: yup.string().required("Bank is required."),
    accountHolderName: yup
      .string()
      .required("Account holder’s name is required."),
    branchCode: yup.string().required("Branch code is required."),
    accountNumber: yup.string().required("Account number is required."),
  });

  const debitCardSchema = yup.object().shape({
    cardNumber: yup.string().required("Card number is required."),
    expiryDate: yup.string().required("Expiration date is required."),
    cvv: yup.string().required("CVV is required."),
  });

  const {
    register: registerAdminPassword,
    handleSubmit: handleSubmitAdminPassword,
    formState: { errors: errorsAdminPassword },
  } = useForm({
    resolver: yupResolver(adminPasswordSchema),
  });

  const {
    register: registerBankAccount,
    handleSubmit: handleSubmitBankAccount,
    formState: { errors: errorsBankAccount },
  } = useForm({
    resolver: yupResolver(bankAccountSchema),
  });

  const {
    register: registerDebitCard,
    handleSubmit: handleSubmitDebitCard,
    formState: { errors: errorsDebitCard },
  } = useForm({
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
            <p className="font-PJSregular text-secondary text-sm mt-1">
              Admin Password
            </p>
            <img
              className="w-4 mt-1"
              src={assets.info}
              alt="info"
              onClick={openModal}
            />
            <AppModal
              modalopen={isModalOpen}
              onClose={closeModal}
              height="200px"
              width="300px"
              customStyles={{
                overlay: {
                  position: "absolute",
                  top: 100,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                modal: {
                  position: "absolute",
                  top: "100%",
                  left: "42%",
                  transform: "translate(-50%, -50%)",
                  margin: "0",
                },
              }}
            >
              <div>
                <p className="text-sm font-PJSbold">Information</p>
                <p className="text-sm text-secondary mt-5 font-PJSmedium">
                  This password is the same one you use to sign into the
                  platform as the main admin.
                </p>
                <button
                  onClick={handleDone}
                  className="w-full mt-6 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                >
                  Done
                </button>
              </div>
            </AppModal>
          </div>

          <form
            onSubmit={handleSubmitAdminPassword(onSubmitAdminPassword)}
            className="w-full flex flex-col"
          >
            <div className="w-[300px] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
              <input
                {...registerAdminPassword("password")}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full"
                autoComplete="new-password"
              />
              <div
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={assets.showPassword ? assets.eyeOpen : assets.eye}
                  className="w-6 h-6"
                />
              </div>
            </div>
            {errorsAdminPassword.password && (
              <p className="text-red-500">
                {errorsAdminPassword.password.message}
              </p>
            )}

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
              <img
                onClick={handleFormClose}
                className="w-6 h-6"
                src={assets.close}
                alt="Close"
              />
            </div>
          </div>
          <p className="text-sm font-PJSmedium mt-8">
            {bankAccounts.length} Added
          </p>

          {bankAccounts.map((account) => (
            <div
              key={account.name}
              className={`flex items-center justify-between mt-5 border-2 rounded-lg py-3 px-5 ${
                currentFacility.defaultBankAccount !== account.id
                  ? "opacity-50"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-6"
                  src={assets.bankAccount}
                  alt={account.name}
                />

                <div className="flex flex-col">
                  <p className="font-PJSbold text-[1rem]">{account.name}</p>
                  <p className="font-PJSmedium text-[0.6rem]">
                    Account Number: {account.masked_account_number}
                  </p>
                  <p className="font-PJSmedium text-[0.6rem]">
                    Bank Code: {account.bank_code}
                  </p>
                </div>

                {!account.enabled && (
                  <p className="font-PJSmedium text-[0.6rem] text-red-500">
                    disabled
                  </p>
                )}
              </div>

              <div className="flex items-center gap-8">
                <div
                  className={`px-3 border-2 rounded-full bg-secondaryThirty cursor-pointer`}
                  onClick={() => {
                    if (account.enabled) {
                      setDefaultBankAccount(account.id);
                    } else {
                      handleDeleteBankAccount(account.id, false);
                    }
                  }}
                >
                  <p className="font-PJSmedium text-sm">
                    {account.enabled
                      ? currentFacility.defaultBankAccount === account.id
                        ? "Default"
                        : "Set as default"
                      : "Enable"}
                  </p>
                </div>
                {account.enabled && (
                  <div
                    className="border-2 rounded-full p-1 cursor-pointer"
                    onClick={() => handleDeleteBankAccount(account.id)}
                  >
                    <img
                      className="w-[18px] h-[18px]"
                      src={assets.Del}
                      alt="Delete"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* {accounts.map((account) => (
            <div
              key={account.name}
              className={`flex items-center justify-between mt-5 border-2 rounded-lg py-3 px-5 ${
                preferredAccount !== account.name ? "opacity-50" : ""
              }`}
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
                    {preferredAccount === account.name
                      ? "Preferred"
                      : "Set as preferred"}
                  </p>
                </div>
                <div className="border-2 rounded-full p-1">
                  <img
                    className="w-[18px] h-[18px]"
                    src={assets.Del}
                    alt="Delete"
                  />
                </div>
              </div>
            </div>
          ))} */}
          <p className="font-PJSmedium text-sm text-center  text-secondary mt-20">
            Clients' sensitive information is safeguarded with PCI-DSS
            compliance, ensuring <br /> maximum protection. For further details,
            please refer to our{" "}
            <span className="text-[#448FE7]">Privacy Policy </span>and{" "}
            <span className="text-[#448FE7]">Terms of Service</span>
          </p>
          <div>
            <button
              onClick={openAddAccountModal}
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
                <p className="font-PJSbold text-xl">
                  Add an account to receive payments
                </p>
                <p className="font-PJSmedium text-secondary text-sm mt-2">
                  You will receive payments from users directly into this
                  account
                </p>
              </div>

              <div className="cursor-pointer">
                <img
                  onClick={handleFormClose}
                  className="w-6 h-6"
                  src={assets.close}
                  alt=""
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-5 mt-10 font-PJSmedium">
              <div
                className={`text-center flex justify-center items-center border-2 w-[200px] h-[47px] rounded-lg gap-3 cursor-pointer ${
                  activeTab === "bankAccount" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setActiveTab("bankAccount")}
              >
                <img
                  className="w-6"
                  src={assets.bankAccount}
                  alt="Bank Account"
                />
                <p className="text-xl ">Bank Account</p>
              </div>
              <div
                className={`text-center flex justify-center items-center border-2 w-[200px] h-[47px] rounded-lg gap-3 cursor-pointer ${
                  activeTab === "debitCard" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setActiveTab("debitCard")}
              >
                <img className="w-6" src={assets.debitCard} alt="Credit Card" />
                <p className="text-xl">Debit Card</p>
              </div>
              <div
                className={`text-center flex justify-center items-center border-2 w-[200px] h-[47px] rounded-lg gap-3 cursor-pointer ${
                  activeTab === "paypal" ? "opacity-100" : "opacity-50"
                }`}
                onClick={() => setActiveTab("paypal")}
              >
                <img className="w-6" src={assets.paypal} alt="PayPal" />
                <p className="text-xl">PayPal</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            {activeTab === "bankAccount" && (
              <form onSubmit={handleSubmitBankAccount(onSubmitBankAccount)}>
                <div className="grid grid-rows-2 grid-cols-2 gap-7">
                  <div className="flex-col flex">
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="bank"
                    >
                      Bank
                    </label>
                    <select
                      {...registerBankAccount("bank")}
                      className="w-[292px] h-[47px] border-2 selectIcon appearance-none rounded-lg px-4"
                      id="bank"
                    >
                      <option value="Bank" disabled>
                        Choose an Option
                      </option>
                      <option value="Bank">Bank</option>
                    </select>
                    {errorsBankAccount.bank && (
                      <p className="text-red-500">
                        {errorsBankAccount.bank.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-col flex">
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="accountHolderName"
                    >
                      Account Holder’s Name
                    </label>
                    <input
                      {...registerBankAccount("accountHolderName")}
                      className="w-[292px] h-[47px] border-2 rounded-lg px-4 focus:outline-none"
                      type="text"
                      id="accountHolderName"
                    />
                    {errorsBankAccount.accountHolderName && (
                      <p className="text-red-500">
                        {errorsBankAccount.accountHolderName.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-col flex">
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="branchCode"
                    >
                      Branch Code
                    </label>
                    <input
                      {...registerBankAccount("branchCode")}
                      className="w-[292px] h-[47px] border-2 rounded-lg px-4 focus:outline-none"
                      type="text"
                      id="branchCode"
                    />
                    {errorsBankAccount.branchCode && (
                      <p className="text-red-500">
                        {errorsBankAccount.branchCode.message}
                      </p>
                    )}
                  </div>
                  <div className="flex-col flex">
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="accountNumber"
                    >
                      Account Number
                    </label>
                    <input
                      {...registerBankAccount("accountNumber")}
                      className="w-[292px] h-[47px] border-2 rounded-lg px-4 focus:outline-none"
                      type="text"
                      id="accountNumber"
                    />
                    {errorsBankAccount.accountNumber && (
                      <p className="text-red-500">
                        {errorsBankAccount.accountNumber.message}
                      </p>
                    )}
                  </div>
                </div>

                <p className="font-PJSmedium text-sm text-secondary mt-10">
                  Clients' sensitive information is safeguarded with PCI-DSS
                  compliance, ensuring maximum protection. For further details,
                  please refer to our{" "}
                  <span className="text-[#448FE7]">Privacy Policy </span>and{" "}
                  <span className="text-[#448FE7]">Terms of Service</span>
                </p>
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
            {activeTab === "debitCard" && (
              <form onSubmit={handleSubmitDebitCard(onSubmitDebitCard)}>
                <div className="grid grid-rows-2 grid-cols-2 gap-7">
                  <div>
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="cardNumber"
                    >
                      Card Number
                    </label>
                    <div className="w-[330px] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                      <input
                        {...registerDebitCard("cardNumber")}
                        placeholder="Card Number"
                        type="text"
                        className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full focus:outline-none"
                        id="cardNumber"
                      />
                      <img src={assets.creditcardIcon} alt="Credit Card" />
                    </div>
                    {errorsDebitCard.cardNumber && (
                      <p className="text-red-500">
                        {errorsDebitCard.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div></div>
                  <div className="w-full">
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="expiryDate"
                    >
                      Expiration Date
                    </label>
                    <div className="flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                      <input
                        {...registerDebitCard("expiryDate")}
                        placeholder="Expiry Date"
                        type="text"
                        className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%] h-full focus:outline-none"
                        id="expiryDate"
                      />
                    </div>
                    {errorsDebitCard.expiryDate && (
                      <p className="text-red-500">
                        {errorsDebitCard.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label
                      className="text-[15px] mb-2 font-PJSmedium text-secondary"
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <div className="flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4 focus:outline-none">
                      <input
                        {...registerDebitCard("cvv")}
                        placeholder="CVV"
                        type={showCVV ? "text" : "password"}
                        className="font-PJSmedium text-primary text-[14px] outline-none  w-[80%] h-full"
                        id="cvv"
                        autoComplete="cc-csc"
                      />
                      <div
                        className="cursor-pointer"
                        onClick={() => setShowCVV(!showCVV)}
                      >
                        <img
                          src={assets.showCVV ? assets.eyeOpen : assets.eye}
                          className="w-6 h-6"
                        />
                      </div>
                    </div>
                    {errorsDebitCard.cvv && (
                      <p className="text-red-500">
                        {errorsDebitCard.cvv.message}
                      </p>
                    )}
                  </div>
                </div>

                <p className="font-PJSmedium text-sm text-secondary mt-10">
                  Clients' sensitive information is safeguarded with PCI-DSS
                  compliance, ensuring maximum protection. For further details,
                  please refer to our{" "}
                  <span className="text-[#448FE7]">Privacy Policy </span>and{" "}
                  <span className="text-[#448FE7]">Terms of Service</span>
                </p>
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
            {activeTab === "paypal" && (
              <form>
                <div className="flex-col flex text-center">
                  <p className="text-[22px] mb-2 font-PJSmedium">
                    PayPal Content
                  </p>
                </div>
                <p className="font-PJSmedium text-sm text-secondary mt-10">
                  Clients' sensitive information is safeguarded with PCI-DSS
                  compliance, ensuring maximum protection. For further details,
                  please refer to our{" "}
                  <span className="text-[#448FE7]">Privacy Policy </span>and{" "}
                  <span className="text-[#448FE7]">Terms of Service</span>
                </p>
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

      {loading && <Loader />}
    </div>
  );
};

export default BankAccount;
