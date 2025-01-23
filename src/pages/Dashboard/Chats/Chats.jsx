/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from "react";
//modal
import { AppModal } from "../../../components";
//forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toast from "../../../components/Toast/Toast";

import assets from "../../../assets/assets";
import { getAllUsers, sendMail } from "../../../api/services/userService";
import Loader from "../../../components/Loader/Loader";
import {
  createChat,
  getChatById,
  getChatMessages,
  getChatsList,
  saveCommunicationHistory,
  sendMessage,
} from "../../../api/services/chatService";
import { useStateContext } from "../../../context";
import { Editor } from "@tinymce/tinymce-react";
import { uploadFile } from "../../../api/services/uploadService";
import { Link } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import AttachmentPreview from "../../../components/AttachmentPreview/AttachmentPreview";

const Chats = () => {
  const { user, currentFacility } = useStateContext();
  const [screenstate, setscreenstate] = useState(1);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [pnMessage, setPNMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [modal, setmodal] = useState(false);
  const [infomodal, setinfomodal] = useState(false);
  const [sortmodal, setsortmodal] = useState(false);
  const [detailsmodal, setdetailsmodal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [type, setType] = useState("success");
  const [selectedCreateNew, setSelectedCreateNew] = useState("push");
  const [allChats, setAllChats] = useState([]);
  const [chats, setChats] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState(null);
  const [userToChat, selectUserToChat] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const messagesEndRef = useRef(null);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [imageToView, setImageToView] = useState("");

  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef(null);

  const togglePicker = () => {
    if (!showPicker) {
      // Get the button's position
      const button = buttonRef.current.getBoundingClientRect();

      // Set the picker position to be above the button
      setPickerPosition({
        top: button.top - 300, // Adjust for the height of the picker
        left: button.left,
      });
    }

    setShowPicker(!showPicker);
  };

  const onEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native); // Append emoji to the message
  };

  useEffect(() => {
    fetAllChatsAndUsers();
  }, []);

  useEffect(() => {
    if (userToChat) {
      fetchChatById();
    }
  }, [userToChat]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const fetAllChatsAndUsers = async () => {
    setLoading(true);
    try {
      let res = await getChatsList();
      let chats = res.chatList;
      chats.forEach(async (c) => {
        let messages = await getChatMessages(c.chatId);
        chats.messages = messages;
      });
      setChats(chats);
      setAllChats(chats);

      let users = await getAllUsers();
      setUsers(users.users.filter((u) => u._id !== user._id));
      setAllUsers(users.users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchChatById = async () => {
    setLoading(true);
    try {
      let res = await getChatById(`${user._id}-${userToChat._id}`);
      if (res.chat !== null) {
        setChat(res.chat);
        setMessages([...res.messages].reverse());
      } else {
        setChat(null);
        setMessages([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = await upload(file); // Await the result of the upload
      if (url !== null) {
        onSubmit(url); // Use the resolved URL
      } else {
        console.error("File upload returned null or failed.");
      }
    }
  };

  const handleAttachmentsUpload = async (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleAttachmentsChange = (updatedAttachments) => {
    setAttachments(updatedAttachments); // Update attachments after removal
  };

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
    title: yup.string().required("Title is required."),
    message: yup.string().required("Message is required."),
  });
  const { register, handleSubmit, formState, watch, control } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const { errors } = formState;
  const onSubmit = async (image = null) => {
    setLoading(true);
    console.log(image);
    try {
      let body = {
        chatId: `${user._id}-${userToChat._id}`,
        altChatId: `${userToChat._id}-${user._id}`,
        facility: currentFacility._id,
        senderId: user._id,
        receiverIds: [userToChat._id],
        type: image != null ? "image" : "text",
      };
      if (image == null) {
        body.text = message;
      }
      if (image != null) {
        body.image = image;
      }
      console.log(body);
      if (!chat) {
        await createChat(JSON.stringify(body));
        window.location.reload();
      } else {
        await sendMessage(body);
        setMessage("");
        fetchChatById();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sendPushNotification = () => {
    setLoading(true);
    try {
      // selectedUsers.forEach(async (user) => {
      //   const body = {
      //     uid: user._id,
      //     subject: subject,
      //     message: mailBody,
      //   };
      //   await sendMail(body);
      // });

      setTimeout(() => {
        showToast("Push Notifications sent to all selected users");
        setSelectedUsers([]);
        setTitle("");
        setPNMessage("");
      }, 2500);
    } catch (err) {
      console.log(err);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  const sendMailNotifications = async () => {
    setLoading(true); // Set loading at the start
    let attachmentUrls = [];

    try {
      const uploadPromises = attachments.map((file) => upload(file));
      attachmentUrls = await Promise.all(uploadPromises);
      attachmentUrls = attachmentUrls.filter((url) => url !== null);

      await saveCommunicationHistory({
        type: "email-notification",
        subject: subject,
        body: mailBody,
        usersCount: selectedUsers.length,
        attachments: attachmentUrls,
      });

      // Map selectedUsers to a list of promises
      const mailPromises = selectedUsers.map(async (user) => {
        const body = {
          uid: user._id,
          subject: subject,
          message: mailBody,
          attachments: attachmentUrls,
        };
        return sendMail(body); // Assume sendMail returns a Promise
      });

      // Wait for all promises to complete
      await Promise.all(mailPromises);

      showToast("Email sent to all selected users");
      setAttachments([]);
      setSelectedUsers([]);
      setSubject("");
      setMailBody("");
    } catch (err) {
      console.log(err);
      showToast("Failed to send email to some or all users");
    } finally {
      setLoading(false); // Always clear the loading state
    }
  };

  const searchInChatsAndUsers = (query) => {
    if (query.trim().length > 0) {
      if (allChats.length > 0 && screenstate == 1) {
        let values = allChats.filter((c) =>
          c.members
            .find((m) => m._id !== user._id)
            .name.toLowerCase()
            .includes(query.toLowerCase())
        );
        setChats(values);
        if (values.length === 0) {
          let userValues = allUsers.filter((u) =>
            u.name.toLowerCase().includes(query.toLowerCase())
          );
          setUsers(userValues);
        }
      } else {
        let userValues = allUsers.filter((u) =>
          u.name.toLowerCase().includes(query.toLowerCase())
        );
        setUsers(userValues);
      }
    } else {
      setChats(allChats);
      setUsers(allUsers);
    }
  };

  const upload = async (file) => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      return await uploadFile(formData);
    } catch (error) {
      return null;
    }
  };

  const showToast = (message, type = "success") => {
    setToastMessage(message);
    setType(type);
    setOpen(true);
  };

  return (
    <div className=" min-h-full min-w-full flex justify-center items-center  ">
      {screenstate === 1 ? (
        <>
          <div className="flex flex-col w-[500px] h-[750px] bg-white rounded-l-[16px]">
            <div className="flex justify-between items-center px-4 mt-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1">
                  <div>Chats</div>
                  <button onClick={openinfomodal}>
                    <img src={assets.info} className="w-[20px] h-[20px]" />
                  </button>
                </div>
                {/* <div className="font-PJSregular text-[14px] text-secondary">
                    4 new messages
                  </div> */}
              </div>
              {/* icons search and new chat */}
              <div className="flex flex-row justify-end items-center gap-3 w-[70%] ">
                <button className="flex justify-center items-center rounded-[100px]  ">
                  <form action="" className="relative mx-auto w-max">
                    <input
                      type="search"
                      className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                      onChange={(e) => searchInChatsAndUsers(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
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
                  onClick={() => setscreenstate(2)}
                  className={`flex justify-center items-center rounded-[100px] bg-lime h-12 w-12`}
                >
                  <img src={assets.plus} className="w-5 h-5" />
                </button>
              </div>

              {/* icons search and new chat */}
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="flex px-4 justify-between mt-4">
              <div className="font-PJSbold text-[24px] flex gap-2 items-center">
                {chats.length > 0
                  ? "Recent "
                  : users.length > 0
                  ? "Users "
                  : "Recent"}
                <p className="font-PJSbold text-[16px]">{`(${
                  chats.length > 0
                    ? chats.length
                    : users.length > 0
                    ? users.length
                    : chats.length
                })`}</p>
              </div>
              <div className="flex gap-2">
                {/* <button
                    className="h-10 w-10 rounded-full border border-secondaryThirty flex justify-center items-center"
                    onClick={() => {
                      setscreenstate(2), console.log(screenstate);
                    }}
                  >
                    <img src={assets.megaphone} />
                  </button> */}
                <button className="h-10 w-10 rounded-full border border-secondaryThirty flex justify-center items-center">
                  <img src={assets.funnel} />
                </button>
                <button
                  onClick={opensortmodal}
                  className=" gap-2 font-PJSregular text-[14px] h-10 w-[100px] rounded-full border border-secondaryThirty flex justify-center items-center"
                >
                  Sort:All
                  <img src={assets.down} />
                </button>
              </div>
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="overflow-y-scroll flex flex-col gap-5 mt-4 scrollbar-hide">
              {chats.length > 0 &&
                chats.map((item, index) => {
                  const user2 = item.members.find((m) => m._id !== user._id);
                  return (
                    <div
                      onClick={() => {
                        selectUserToChat(user2);
                      }}
                      key={index}
                      className="flex justify-between px-4 hover:bg-secondaryTen cursor-pointer py-2"
                    >
                      <div className="flex gap-4">
                        {/* image div */}
                        <div>
                          {/* Adjust the path to be relative to the current file */}
                          <img
                            src={user2.avatar}
                            alt=""
                            className="w-12 h-12 rounded-full"
                          />
                        </div>
                        {/* image div */}
                        {/* name and message */}
                        <div className="flex flex-col gap-1">
                          <div className="font-PJSbold text-[16px]">
                            {user2.name}
                          </div>
                          <div className="font-PJSbold text-[14px]">
                            {item.lastMessage}
                          </div>
                          <div className="font-PJSregular text-[12px] text-secondary flex items-center gap-2">
                            {new Date(item.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                        {/* name and message */}
                      </div>
                      {/* unread */}
                      {/* <div className="flex flex-col items-center gap-2">
                        <div className="font-PJSregular text-secondary text-[12px]">
                          {item.ago}
                        </div>
                        <div className="h-6 w-6 bg-blue rounded-full flex justify-center items-center font-PJSregular text-white text-[12px]">
                          {item.remaining}
                        </div>
                      </div> */}
                      {/* unread */}
                    </div>
                  );
                })}

              {chats.length === 0 &&
                users.length > 0 &&
                users.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between px-4 hover:bg-secondaryTen cursor-pointer py-2 gap-4`}
                  >
                    <div>
                      {/* Adjust the path to be relative to the current file */}
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                    {/* image div */}
                    {/* name and message */}
                    <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                      <div className="font-PJSbold text-[16px]">
                        {item.name}
                      </div>
                      <div className="font-PJSregular text-[12px] text-secondary flex items-center gap-2">
                        {item.skill}
                      </div>
                    </div>
                    {/* name and message */}

                    <button
                      onClick={() => selectUserToChat(item)}
                      className="rounded-full bg-white px-6 border-[1px]"
                    >
                      Chat
                    </button>
                  </div>
                ))}
            </div>
          </div>

          <div className="w-[700px] h-[750px] bg-chatbackground relative rounded-r-[16px]">
            {userToChat && (
              <div className="flex flex-col items-center h-full">
                {/* Chat Header */}
                <div className="flex justify-between px-6 mt-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                      <div>
                        <img
                          src={userToChat.avatar}
                          className="w-[55px] h-[55px] rounded-full"
                        />
                      </div>
                      <button className="text-[18px]">{userToChat.name}</button>
                    </div>
                  </div>
                  {/* Icons: Details and Block User */}
                  <div className="flex flex-row justify-start items-center gap-3">
                    <button
                      onClick={opendetailsmodal}
                      className="flex gap-2 font-PJSmedium text-[12px] justify-center items-center rounded-[100px] bg-white w-[140px] h-[40px]"
                    >
                      <img src={assets.calendarblue} className="w-5 h-5" />
                      Details
                    </button>
                    <button
                      onClick={openmodal}
                      className="flex gap-2 font-PJSmedium text-[12px] justify-center items-center rounded-[100px] bg-white w-[140px] h-[40px]"
                    >
                      <img src={assets.block} className="w-5 h-5" />
                      Block User
                    </button>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="flex flex-col flex-1 w-full overflow-y-scroll px-4 mt-2 scrollbar-hide">
                  {messages.map((m, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        m.senderId === user._id
                          ? "justify-end"
                          : "justify-start"
                      } w-full mt-2`}
                    >
                      <div
                        className={`${
                          m.senderId === user._id
                            ? "bg-lime text-white"
                            : "bg-secondaryTen text-primary"
                        } max-w-[70%] rounded-[10px] p-3`}
                      >
                        <div className="font-PJSmedium text-[14px]">
                          {m.type === "text" && m.text}
                          {m.type === "image" && (
                            <img
                              onClick={() => {
                                setImageToView(m.image);
                                setIsImageViewerOpen(true);
                              }}
                              className={"h-[120px] w-[120px]"}
                              src={m.image}
                            />
                          )}
                        </div>
                        <div className="text-[12px] text-secondary mt-1 text-right">
                          {new Date(m.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div ref={messagesEndRef}></div>
                </div>

                {/* Message Input */}
                <div className="flex gap-4 w-full px-4 py-4">
                  <div className="flex bg-white h-[60px] w-full rounded-full items-center justify-between px-5">
                    <button ref={buttonRef} onClick={togglePicker}>
                      <img src={assets.smiley} />
                    </button>
                    <input
                      type={"text"}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message..."
                      className="font-PJSregular text-secondary text-[14px] outline-none appearance-none w-[80%] h-full"
                    />
                    <div className="flex gap-4">
                      <input
                        type="file"
                        id="imageUpload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*"
                      />

                      <button
                        onClick={() =>
                          document.getElementById("imageUpload").click()
                        }
                      >
                        <img src={assets.attachfile} />
                      </button>
                    </div>
                  </div>
                  <button
                    disabled={message.trim().length === 0 ? true : false}
                    onClick={() => onSubmit()}
                    className="h-[60px] w-[60px] rounded-full bg-lime flex items-center justify-center"
                  >
                    <img src={assets.Send} />
                  </button>
                </div>
              </div>
            )}

            {!userToChat && (
              <div
                className="text-center"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="text-[18px] font-PJSbold">New Chat</div>
                <div className="text-[12px] font-PJregular">
                  Click the chat button to start a chat
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col w-[500px] h-[750px] bg-white rounded-l-[16px] border-r-[1px] border-secondaryTen">
            <div className="flex justify-between px-4 mt-6 pb-6 font-PJSbold text-[24px] h-[100px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center w-[400px]  ">
                <div
                  className="flex rounded-full w-[80%] p-1 h-[100%]"
                  style={{ backgroundColor: "#e2e2e2" }}
                >
                  <button
                    onClick={() => setSelectedCreateNew("push")}
                    className={`rounded-full ${
                      selectedCreateNew === "push" ? "bg-white" : ""
                    } font-PJSbold text-[16px]`}
                    style={{ flex: 1 }}
                  >
                    Push
                  </button>
                  <button
                    onClick={() => setSelectedCreateNew("email")}
                    className={`rounded-full ${
                      selectedCreateNew === "email" ? "bg-white" : ""
                    } font-PJSbold text-[16px]`}
                    style={{ flex: 1 }}
                  >
                    Email
                  </button>
                </div>
              </div>
              {/* icons search and new chat */}
              <div className="flex flex-row justify-end items-center gap-3 w-[70%] ">
                <button className="flex justify-center items-center rounded-[100px]  ">
                  <form action="" className="relative mx-auto w-max">
                    <input
                      type="search"
                      className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                      onChange={(e) => searchInChatsAndUsers(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
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
                  <img src={assets.cross} className="w-5 h-5" />
                </button>
              </div>

              {/* icons search and new chat */}
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="flex px-4 justify-between mt-4">
              <div className="font-PJSbold text-[24px] flex gap-2 items-center">
                Users{" "}
                <p className="font-PJSbold text-[16px]">({users.length})</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (
                      selectedUsers.length > 0 &&
                      selectedUsers.length === allUsers.length
                    ) {
                      setSelectedUsers([]);
                    } else setSelectedUsers(allUsers);
                  }}
                  className=" gap-2 font-PJSregular text-[14px] h-10 w-[100px] rounded-full border border-secondaryThirty flex justify-center items-center"
                >
                  {selectedUsers.length > 0 &&
                  selectedUsers.length === allUsers.length
                    ? "Unselect All"
                    : "Select All"}
                </button>
              </div>
            </div>
            {/* Recent and 3 icons filter etc */}
            <div className="overflow-y-scroll flex flex-col gap-5 mt-4 scrollbar-hide">
              {users.map((item, index) => (
                <div key={index} className="flex justify-between px-4 py-2">
                  <div className="flex gap-4">
                    {/* image div */}
                    <div>
                      {/* Adjust the path to be relative to the current file */}
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-12 h-12 rounded-full"
                      />
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
                      className={`h-6 w-6 border rounded-full flex justify-center items-center font-PJSregular text-white text-[12px] ${
                        selectedUsers.some((i) => i._id === item._id)
                          ? "bg-blue"
                          : "bg-transparent"
                      }`}
                      onClick={() => {
                        const isSelected = selectedUsers.some(
                          (i) => i._id === item._id
                        );
                        if (isSelected) {
                          // Remove the item by filtering it out
                          setSelectedUsers(
                            selectedUsers.filter((i) => i._id !== item._id)
                          );
                        } else {
                          // Add the item to the selectedUsers array
                          setSelectedUsers([...selectedUsers, item]);
                        }
                      }}
                    >
                      {selectedUsers.some((i) => i._id === item._id) ? (
                        <img src={assets.checkwhite} />
                      ) : null}
                    </button>
                  </div>
                  {/* unread */}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[700px] h-[750px] bg-white rounded-r-[16px]">
            <div className="flex justify-between px-6 mt-6 pb-6 font-PJSbold text-[24px] w-full border-b-[1px] border-secondaryTwenty ">
              <div className="flex flex-col justify-center w-full">
                {/* Placeholder for no selected users */}
                {selectedUsers.length === 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="w-[56px] h-[56px] rounded-full bg-secondaryTen flex justify-center items-center">
                      <img src={assets.usericon} className="w-6 h-6" />
                    </div>
                    <div className="text-[18px]">Selected Users</div>
                  </div>
                ) : (
                  /* Display selected users */
                  <div
                    className="flex flex-wrap gap-2 pb-2 overflow-hidden"
                    style={{ width: "100%" }}
                  >
                    {selectedUsers.map((user, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 border border-secondaryThirty px-3 py-1 rounded-full bg-secondaryTen"
                      >
                        {/* User Avatar */}
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-6 w-6 rounded-full object-cover shrink-0"
                        />

                        {/* User Name */}
                        <span className="text-[12px] font-PJSmedium truncate">
                          {user.name}
                        </span>

                        {/* Remove Tag Icon */}
                        <img
                          src={assets.cross}
                          onClick={() =>
                            setSelectedUsers(
                              selectedUsers.filter((u) => u._id !== user._id)
                            )
                          }
                          className="flex items-center justify-center w-[16px] h-[16px] rounded-full cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Message Inputs */}
            {selectedCreateNew === "push" && (
              <div className="flex flex-col w-full justify-center mx-8">
                {/* Title Input */}
                <div className="w-[90%] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[100%] h-full"
                  />
                </div>

                {/* Message Input */}
                <div className="w-[90%] flex items-center border border-secondaryThirty mt-4 rounded-[10px] px-4">
                  <textarea
                    value={pnMessage}
                    onChange={(e) => setPNMessage(e.target.value)}
                    placeholder="Message"
                    className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-full h-[150px]"
                  />
                </div>

                {/* Send Button */}
                <button
                  disabled={
                    selectedUsers.length == 0 ||
                    title.trim().length == 0 ||
                    pnMessage.trim().length == 0
                      ? true
                      : false
                  }
                  onClick={sendPushNotification}
                  className="flex justify-center items-center w-[50%] self-center rounded-full bg-lime h-[50px] mt-4 font-PJSbold"
                >
                  Send
                </button>
              </div>
            )}

            {selectedCreateNew === "email" && (
              <div className="flex flex-col w-full justify-center mx-8">
                <div className="w-[90%] flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
                  <span style={{ color: "grey" }}>Subject</span>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[100%] h-full px-3"
                  />
                </div>

                <div className="w-[90%] mt-4">
                  <Editor
                    value={mailBody}
                    onEditorChange={setMailBody}
                    init={{
                      height: 300,
                      menubar: false,
                      plugins:
                        "advlist autolink preview insertdatetime fullscreen link lists wordcount",
                      toolbar:
                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist advlist outdent indent | link | align lineheight | removeformat | preview fullscreen hr anchor",
                      lists_indent_on_tab: true,
                      advlist_bullet_styles: "circle,disc,square,default",
                    }}
                  />
                </div>

                <AttachmentPreview
                  attachments={attachments}
                  onAttachmentsChange={handleAttachmentsChange}
                  onClick={(image) => {
                    setImageToView(image);
                    setIsImageViewerOpen(true);
                  }}
                />

                <div className="flex gap-4">
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    onChange={handleAttachmentsUpload}
                    accept="image/*"
                    multiple={true}
                  />

                  <button
                    className="flex my-5 border-[2px] py-1 px-4 rounded-full"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                  >
                    Attachments <img src={assets.attachfile} />
                  </button>
                </div>

                <button
                  disabled={
                    selectedUsers.length == 0 ||
                    subject.trim().length == 0 ||
                    mailBody.trim().length == 0
                      ? true
                      : false
                  }
                  onClick={sendMailNotifications}
                  className="flex justify-center items-center w-[50%] self-center rounded-full bg-lime h-[50px] mt-4 font-PJSbold"
                >
                  Send
                </button>
              </div>
            )}

            <button
              disabled={
                selectedUsers.length == 0 ||
                subject.trim().length == 0 ||
                mailBody.trim().length == 0
                  ? true
                  : false
              }
              className="px-4 py-1 rounded-full border-[2px] mt-10 mx-10"
              style={{ alignSelf: "flex-end" }}
            >
              <Link to="CommunicationHistory">{"History >"}</Link>
            </button>
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
            <img src={assets.infolarge} className="h-[48px] w-[48px]" />
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
              <img src={assets.checkblack} />
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
                <img src={assets.checkwhite} className="w-[12px] h-[12px]" />
              </div>
            </div>
            <div className="flex justify-between font-PJSmedium text-[14px]">
              Chats with inactive bookings
              <div className="flex justify-center items-center bg-blue w-[18px] h-[18px] rounded-[4px]">
                <img src={assets.checkwhite} className="w-[12px] h-[12px]" />
              </div>
            </div>
            <div className="flex justify-between font-PJSmedium text-[14px]">
              Archived chats
              <div className="flex justify-center items-center bg-blue w-[18px] h-[18px] rounded-[4px]">
                <img src={assets.checkwhite} className="w-[12px] h-[12px]" />
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
          {/* <div className="font-PJSbold text-[20px]">Booking Details</div> */}
          <div className="flex flex-col gap-4 mt-2 justify-center  ">
            {/* <div className="font-PJSregular text-[14px]">
              Total Bookings: 08
            </div> */}
            <div className="flex justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex items-center gap-2">
                <img
                  src={userToChat ? userToChat.avatar : ""}
                  className="w-[56px] h-[56px] rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-PJSregular text-secondary">Name</div>
                  <div className="font-PJSregular underline">
                    {userToChat ? userToChat.name : ""}
                  </div>
                </div>
              </div>
              {/* <div className="font-PJSmedium text-[14px]">The Tigers</div> */}
            </div>
            {/* Greyline */}
            <div className="h-[1px] w-full bg-secondaryTwenty"></div>
            {/* Greyline */}

            {/* Item 1 */}
            <div className="flex flex-col  justify-between items-center font-PJSmedium text-[14px]">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <div className="flex w-[48px] h-[48px] rounded-full bg-secondaryTen justify-center items-center">
                    <img src={assets.message} />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      Email
                    </div>
                    <div className="font-PJSmedium text-[14px]">
                      {userToChat ? userToChat.email : ""}
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
                    <img src={assets.phone} />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-PJSregular text-secondary text-[12px]">
                      Mobile Number
                    </div>
                    <div className="font-PJSmedium text-[14px]">
                      {userToChat ? userToChat.phone : ""}
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
                    <img src={assets.hash} />
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
                    <img src={assets.calendar} />
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
      {isImageViewerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsImageViewerOpen(false)}
        >
          <img src={imageToView} className="max-h-full max-w-full" />
        </div>
      )}

      {showPicker && (
        <div
          style={{
            position: "absolute",
            top: pickerPosition.top,
            left: pickerPosition.left,
            zIndex: 1000,
          }}
        >
          <Picker data={data} onEmojiSelect={onEmojiSelect} />
        </div>
      )}
      <Toast open={open} setOpen={setOpen} message={toastMessage} type={type} />
      {loading && <Loader />}
    </div>
  );
};

export default Chats;
