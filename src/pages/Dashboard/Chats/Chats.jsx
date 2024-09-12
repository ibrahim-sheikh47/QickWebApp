import React, { useState } from "react";

//svgs
import info from "../../../assets/svgs/Info.svg";
import search from "../../../assets/svgs/Search.svg";
import plus from "../../../assets/svgs/Plus.svg";
import calendarblue from "../../../assets/svgs/Calendarblue.svg";
import block from "../../../assets/svgs/Block.svg";
import megaphone from "../../../assets/svgs/Megaphone.svg";
import funnel from "../../../assets/svgs/FunnelSimple.svg";
import down from "../../../assets/svgs/Down.svg";
import cross from "../../../assets/svgs/Cross.svg";
import checkwhite from "../../../assets/svgs/CheckWhite.svg";
import usericon from "../../../assets/svgs/User.svg";
import smiley from "../../../assets/svgs/Smiley.svg";
import attachfile from "../../../assets/svgs/Paperclip.svg";
import camera from "../../../assets/svgs/Camera.svg";
import infolarge from "../../../assets/svgs/InfoLarge.svg";
import checkblack from "../../../assets/svgs/CheckBlack.svg";
import message from "../../../assets/svgs/EnvelopeSimple.svg";
import phone from "../../../assets/svgs/Phone.svg";
import hash from "../../../assets/svgs/Hash.svg";
import calendar from "../../../assets/svgs/CalendarBlack.svg";

//images
import user from "../../../assets/user.png";

//icons
import { LuPlus } from "react-icons/lu";

//modal
import { AppModal } from "../../../components";

//forms
import { useForm, useController } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PushUsers, UserData } from "../../../constants";
let selected = [];
const Chats = () => {
  const [screenstate, setscreenstate] = useState(1);
  const [modal, setmodal] = useState(false);
  const [infomodal, setinfomodal] = useState(false);
  const [sortmodal, setsortmodal] = useState(false);
  const [detailsmodal, setdetailsmodal] = useState(false);

  const openmodal = () => {
    setmodal(true);
  };
  const closemodal = () => {
    setmodal(false);
  };
  const openinfomodal = () => {
    setinfomodal(true);
  };
  const closeinfomodal = () => {
    setinfomodal(false);
  };
  const opensortmodal = () => {
    setsortmodal(true);
  };
  const closesortmodal = () => {
    setsortmodal(false);
  };
  const opendetailsmodal = () => {
    setdetailsmodal(true);
  };
  const closedetailsmodal = () => {
    setdetailsmodal(false);
  };

  const formSchema = yup.object().shape({
    title: yup
      .string()

      .required("Title is required."),
    message: yup.string().required("Message is required."),
  });
  const { register, handleSubmit, formState, watch, control } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
  };

  const [selectedFriends, setSelectedFriends] = useState([]);
  const handleFriends = (rival) => {
    if (selectedFriends.includes(rival)) {
      // Rival is already selected, remove it from the list
      const updatedRivals = selected.filter(
        (selectedRival) => selectedRival !== rival
      );
      setSelectedFriends(updatedRivals);
      selected = updatedRivals;
    } else {
      // Rival is not selected, add it to the list
      selected.push(rival);
      setSelectedFriends([...selected]);
    }
    // console.log(`${selectedTimes} SelectedTimes Variable Array`);
    // console.log(`${selectedTime} SelectedTime State Array`);
  };
  return (
    <div className=" min-h-full min-w-full flex justify-center items-center  ">
      {screenstate === 1 ? (
        <>
          <div className="flex flex-col  w-[500px] h-[750px] bg-white rounded-l-[16px]">
            <div className="flex justify-between px-4 mt-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center  ">
                <div className="flex items-center gap-1">
                  <div>Chats</div>
                  <button onClick={openinfomodal}>
                    <img src={info} className="w-[20px] h-[20px]" />
                  </button>
                </div>
                <div className="font-PJSregular text-[14px] text-secondary">
                  4 new messages
                </div>
              </div>
              {/* icons search and new chat */}
              <div className="flex flex-row justify-end items-center gap-3 w-[70%] ">
                <button className="flex justify-center items-center rounded-[100px]  ">
                  <form action="" class="relative mx-auto w-max">
                    <input
                      type="search"
                      class="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </form>
                </button>
                <button className="flex justify-center items-center rounded-[100px] bg-lime h-12 w-12">
                  <img src={plus} className="w-5 h-5" />
                </button>
              </div>

              {/* icons search and new chat */}
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="flex px-4 justify-between mt-4">
              <div className="font-PJSbold text-[24px] flex gap-2 items-center">
                Recent <p className="font-PJSbold text-[16px]">(3)</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="h-10 w-10 rounded-full border border-secondaryThirty flex justify-center items-center"
                  onClick={() => {
                    setscreenstate(2), console.log(screenstate);
                  }}
                >
                  <img src={megaphone} />
                </button>
                <button className="h-10 w-10 rounded-full border border-secondaryThirty flex justify-center items-center">
                  <img src={funnel} />
                </button>
                <button
                  onClick={opensortmodal}
                  className=" gap-2 font-PJSregular text-[14px] h-10 w-[100px] rounded-full border border-secondaryThirty flex justify-center items-center"
                >
                  Sort:All
                  <img src={down} />
                </button>
              </div>
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="overflow-y-scroll flex flex-col gap-5 mt-4 scrollbar-hide">
              {UserData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between px-4 hover:bg-secondaryTen cursor-pointer py-2"
                >
                  <div className="flex gap-4">
                    {/* image div */}
                    <div>
                      {/* Adjust the path to be relative to the current file */}
                      <img src={item.image} alt="" className="w-12 h-12" />
                    </div>
                    {/* image div */}
                    {/* name and message */}
                    <div className="flex flex-col gap-1">
                      <div className="font-PJSbold text-[16px]">
                        {item.name}
                      </div>
                      <div className="font-PJSbold text-[14px]">
                        {item.message}
                      </div>
                      <div className="font-PJSregular text-[12px] text-secondary flex items-center gap-2">
                        {item.day}
                        <div className="h-1 w-1 rounded bg-secondary"></div>
                        {item.time}
                        <div className="h-1 w-1 rounded bg-secondary"></div>
                        {item.field}
                      </div>
                    </div>
                    {/* name and message */}
                  </div>
                  {/* unread */}
                  <div className="flex flex-col items-center gap-2">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      {item.ago}
                    </div>
                    <div className="h-6 w-6 bg-blue rounded-full flex justify-center items-center font-PJSregular text-white text-[12px]">
                      {item.remaining}
                    </div>
                  </div>
                  {/* unread */}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[700px] h-[750px] bg-chatbackground rounded-r-[16px] relative items-center">
            <div className="flex justify-between px-6 mt-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center  ">
                <div className="flex items-center gap-2">
                  <div>
                    <img src={user} className="w-[55px] h-[55px]" />
                  </div>
                  <button className="text-[18px]">Angelina Marcus</button>
                </div>
              </div>
              {/* icons search and new chat */}
              <div className="flex flex-row justify-start items-center gap-3 ">
                <button
                  onClick={opendetailsmodal}
                  className="flex gap-2 font-PJSmedium text-[12px] justify-center items-center rounded-[100px] bg-white w-[140px] h-[40px] "
                >
                  <img src={calendarblue} className="w-5 h-5" />
                  Booking Details
                </button>
                <button
                  onClick={openmodal}
                  className="flex gap-2 font-PJSmedium text-[12px] justify-center items-center rounded-[100px] bg-white w-[140px] h-[40px] "
                >
                  <img src={block} className="w-5 h-5" />
                  Block User
                </button>
              </div>

              {/* icons search and new chat */}
            </div>
            {/* input */}
            <div className="flex bg-white h-[60px] w-[610px] absolute bottom-4 rounded-full items-center justify-between px-5">
              <button>
                <img src={smiley} />
              </button>
              <input
                {...register("title")}
                placeholder="Type message..."
                className=" font-PJSregular text-secondary  text-[14px] outline-none appearance-none w-[80%]  h-full"
              />
              <div className="flex gap-4">
                <button>
                  <img src={attachfile} />
                </button>
                <button>
                  <img src={camera} />
                </button>
              </div>
            </div>

            {/* input */}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col  w-[440px] h-[750px] bg-white rounded-l-[16px] border-r-[1px] border-secondaryTen">
            <div className="flex justify-between px-4 mt-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center w-[400px]  ">
                <div className="flex items-center gap-1">
                  <div className="w-full ">Push Notifications</div>
                </div>
              </div>
              {/* icons search and new chat */}
              <div className="flex flex-row justify-end items-center gap-3 w-[70%] ">
                <button className="flex justify-center items-center rounded-[100px]  ">
                  <form action="" class="relative mx-auto w-max">
                    <input
                      type="search"
                      class="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </form>
                </button>
                <button
                  className="flex justify-center items-center rounded-[100px] border border-secondaryThirty h-12 w-12"
                  onClick={() => setscreenstate(1)}
                >
                  <img src={cross} className="w-5 h-5" />
                </button>
              </div>

              {/* icons search and new chat */}
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="flex px-4 justify-between mt-4">
              <div className="font-PJSbold text-[24px] flex gap-2 items-center">
                Users <p className="font-PJSbold text-[16px]">(5)</p>
              </div>
              <div className="flex gap-2">
                <button className=" gap-2 font-PJSregular text-[14px] h-10 w-[100px] rounded-full border border-secondaryThirty flex justify-center items-center">
                  Select All
                </button>
              </div>
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="overflow-y-scroll flex flex-col gap-5 mt-4 scrollbar-hide">
              {PushUsers.map((item, index) => (
                <div key={index} className="flex justify-between px-4 py-2">
                  <div className="flex gap-4">
                    {/* image div */}
                    <div>
                      {/* Adjust the path to be relative to the current file */}
                      <img src={item.image} alt="" className="w-12 h-12" />
                    </div>
                    {/* image div */}
                    {/* name and message */}
                    <div className="flex flex-col gap-1">
                      <div className="font-PJSbold text-[16px]">
                        {item.name}
                      </div>
                      <div className="font-PJSregular text-[14px] text-secondary">
                        {item.position}
                      </div>
                    </div>
                    {/* name and message */}
                  </div>
                  {/* unread */}
                  <div className="flex flex-col items-center gap-2">
                    <button
                      className={`h-6 w-6 border rounded-full flex justify-center items-center font-PJSregular text-white text-[12px] ${selected.includes(item.name)
                        ? "bg-blue"
                        : "bg-transparent"
                        }`}
                      onClick={() => handleFriends(item.name)}
                    >
                      {selected.includes(item.name) ? (
                        <img src={checkwhite} />
                      ) : null}
                    </button>
                  </div>
                  {/* unread */}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[660px] h-[750px] bg-white rounded-r-[16px]">
            <div className="flex justify-between px-6 mt-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center  ">
                <div className="flex items-center gap-2">
                  <div className="w-[56px] h-[56px] rounded-full bg-secondaryTen flex justify-center items-center">
                    <img src={usericon} className="w-6 h-6" />
                  </div>
                  <button className="text-[18px]">Selected Users</button>
                </div>
              </div>
              {/* icons search and new chat */}

              {/* icons search and new chat */}
            </div>
            {/* inputs div */}
            <div className="flex flex-col w-full justify-center mx-8">
              <div className="w-[90%] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                <input
                  {...register("title")}
                  placeholder="Title"
                  className=" font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%]  h-full"
                />
              </div>
              <div className="w-[90%] flex items-center border border-secondaryThirty mt-4 rounded-[10px]  px-4 ">
                <textarea
                  {...register("message")}
                  placeholder="Message"
                  className=" font-PJSmedium text-primary text-[14px] outline-none appearance-none w-full mt-4 "
                  rows={10}
                />
              </div>
              <button className="flex justify-center items-center w-[50%] rounded-full bg-lime h-[50px] mt-4 font-PJSbold">
                Send
              </button>
            </div>
            {/* inputs div */}
          </div>
        </>
      )}
      {/* Block user modal */}
      <AppModal
        onClose={closemodal}
        modalopen={modal}
        height={"316px"}
        width={"494px"}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="flex w-[80px] h-[80px] bg-secondaryTen rounded-full justify-center items-center">
            <img src={infolarge} className="h-[48px] w-[48px]" />
          </div>
          <div className="font-PJSbold text-[20px] mt-2">Block User</div>
          <div className="font-PJSregular text-[14px] mt-2 text-secondary">
            Are you sure you want to block this user?
          </div>
          <div className="flex mt-12 gap-4">
            <button
              onClick={closemodal}
              className="flex w-[223px] h-[52px] rounded-full bg-secondaryTen font-PJSregular  justify-center items-center"
            >
              Cancel
            </button>
            <button className="flex w-[223px] h-[52px] rounded-full bg-redbutton font-PJSregular text-white justify-center items-center">
              Block
            </button>
          </div>
        </div>
      </AppModal>
      {/* Block user modal */}
      {/* Info modal */}
      <AppModal
        onClose={closeinfomodal}
        modalopen={infomodal}
        height={"316px"}
        width={"494px"}
      >
        <div className="flex flex-col justify-center ">
          <div className="font-PJSbold text-[20px]">Info</div>

          <div className="flex gap-2 mt-6">
            <div className="flex justify-center font-PJSregular items-center h-[24px] w-[24px] rounded-full bg-lime">
              <img src={checkblack} />
            </div>{" "}
            Booking confirmed by users or teams
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex justify-center font-PJSregular items-center h-[24px] w-[24px] rounded-full border-2 border-dashed border- border-lime"></div>{" "}
            Pending confirmation (Pro tip: Follow up)
          </div>
          <div className="flex gap-2 mt-4">
            <div className="flex justify-center font-PJSregular items-center h-[24px] w-[24px] rounded-full border border-secondaryThirty"></div>{" "}
            No active bookings
          </div>
          <div className="flex mt-14 gap-4 w-full justify-center items-center">
            <button
              onClick={closeinfomodal}
              className="flex w-[90%] h-[52px] rounded-full bg-lime font-PJSmedium justify-center items-center"
            >
              Close
            </button>
          </div>
        </div>
      </AppModal>
      {/* Info modal */}
      {/* Sort modal */}
      <AppModal
        onClose={closesortmodal}
        modalopen={sortmodal}
        height={"274px"}
        width={"282px"}
      >
        <div className="flex flex-col justify-center ">
          <div className="font-PJSbold text-[20px]">Sort chats</div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between font-PJSmedium text-[14px]">
              Chats with active bookings
              <div className="flex justify-center items-center bg-blue w-[18px] h-[18px] rounded-[4px]">
                <img src={checkwhite} className="w-[12px] h-[12px]" />
              </div>
            </div>
            <div className="flex justify-between font-PJSmedium text-[14px]">
              Chats with inactive bookings
              <div className="flex justify-center items-center bg-blue w-[18px] h-[18px] rounded-[4px]">
                <img src={checkwhite} className="w-[12px] h-[12px]" />
              </div>
            </div>
            <div className="flex justify-between font-PJSmedium text-[14px]">
              Archived chats
              <div className="flex justify-center items-center bg-blue w-[18px] h-[18px] rounded-[4px]">
                <img src={checkwhite} className="w-[12px] h-[12px]" />
              </div>
            </div>
          </div>

          <div className="flex mt-8 gap-4 w-full justify-center items-center">
            <button
              onClick={closesortmodal}
              className="flex w-[125px] h-[50px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
            >
              Cancel
            </button>
            <button
              onClick={closesortmodal}
              className="flex w-[125px] h-[50px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
            >
              Sort
            </button>
          </div>
        </div>
      </AppModal>
      {/* Sort modal */}
      {/* Booking Details modal */}
      <AppModal
        onClose={closedetailsmodal}
        modalopen={detailsmodal}
        height={"623px"}
        width={"494px"}
      >
        <div className="flex flex-col justify-center ">
          <div className="font-PJSbold text-[20px]">Booking Details</div>
          <div className="flex flex-col gap-4 mt-2 justify-center  ">
            <div className="font-PJSregular text-[14px]">
              Total Bookings: 08
            </div>
            <div className="flex justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex items-center gap-2">
                <img src={user} className="w-[56px] h-[56px]" />
                <div className="flex flex-col">
                  <div className="font-PJSregular text-secondary">Name</div>
                  <div className="font-PJSregular underline">
                    Angelina Marcus (ID37)
                  </div>
                </div>
              </div>
              <div className="font-PJSmedium text-[14px]">The Tigers</div>
            </div>
            {/* Greyline */}
            <div className="h-[1px] w-full bg-secondaryTwenty"></div>
            {/* Greyline */}

            {/* Item 1 */}
            <div className="flex flex-col  justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <div className="flex w-[48px] h-[48px] rounded-full bg-secondaryTen justify-center items-center">
                    <img src={message} />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      Name
                    </div>
                    <div className="font-PJSmedium text-[14px]">
                      angelina_marcus018@gmail.com
                    </div>
                  </div>
                </div>
                <button className="flex justify-center items-center bg-secondaryTen w-[79px] h-[39px] rounded-full font-PJSmedium text-[12px]">
                  Copy
                </button>
              </div>
              <div className="h-[1px] w-full bg-secondaryTwenty mt-4"></div>
            </div>
            {/* Item 1 */}
            {/* Item 2 */}
            <div className="flex flex-col  justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <div className="flex w-[48px] h-[48px] rounded-full bg-secondaryTen justify-center items-center">
                    <img src={phone} />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      Mobile Number
                    </div>
                    <div className="font-PJSmedium text-[14px]">
                      +1(985) 8690-2225
                    </div>
                  </div>
                </div>
                <button className="flex justify-center items-center bg-secondaryTen w-[79px] h-[39px] rounded-full font-PJSmedium text-[12px]">
                  Call
                </button>
              </div>
              <div className="h-[1px] w-full bg-secondaryTwenty mt-4"></div>
            </div>
            {/* Item 2 */}
            {/* Item 3 */}
            <div className="flex flex-col  justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <div className="flex w-[48px] h-[48px] rounded-full bg-secondaryTen justify-center items-center">
                    <img src={hash} />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      Booking ID
                    </div>
                    <div className="font-PJSmedium text-[14px]">B4555</div>
                  </div>
                </div>
                <button className="flex justify-center items-center bg-secondaryTen w-[79px] h-[39px] rounded-full font-PJSmedium text-[12px]">
                  Copy
                </button>
              </div>
              <div className="h-[1px] w-full bg-secondaryTwenty mt-4"></div>
            </div>
            {/* Item 3 */}
            {/* Item 4 */}
            <div className="flex flex-col  justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <div className="flex w-[48px] h-[48px] rounded-full bg-secondaryTen justify-center items-center">
                    <img src={calendar} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      Booking Details
                    </div>
                    <div className="font-PJSmedium text-[14px]">
                      6-7pm, 6v6, South Field
                      <div className="font-PJSmedium">
                        Sun, Jan 10th, 2023 (Recurring, Sun)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-PJSbold">120$</div>
              </div>
            </div>
            {/* Item 4 */}
          </div>

          <div className="flex mt-10 gap-4 w-full justify-center items-center">
            <button
              onClick={closedetailsmodal}
              className="flex w-[223px] h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
            >
              Cancel
            </button>
            <button
              onClick={closedetailsmodal}
              className=" text-white flex w-[223px] h-[54px] text-[14px] rounded-full bg-redbutton font-PJSmedium justify-center items-center"
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </AppModal>
      {/* Booking Details modal */}
    </div>
  );
};

export default Chats;
