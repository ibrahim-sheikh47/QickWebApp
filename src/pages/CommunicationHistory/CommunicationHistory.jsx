// CommunicationHistory.jsx
import React, { useEffect, useState } from "react";
import { getCommunicationHistory } from "../../api/services/chatService";
import Loader from "../../components/Loader/Loader";
import moment from "moment";

const CommunicationHistory = () => {
  const [communicationData, setCommunicationData] = useState([]);
  const [loading, setLoading] = useState(false);
  // [
  //   {
  //     type: "Push",
  //     users: 322,
  //     subject: "Hey guys, listen up🔥",
  //     description:
  //       "We will be launching a new tournament starting next week. Sign ups start now!",
  //     timestamp: "Jan. 1st, 2024 @ 4:55 pm",
  //     sender: "Push sent by Justin McNab",
  //   },
  //   {
  //     type: "Push",
  //     users: 1782,
  //     subject: "Good news🔥",
  //     description: "We opened a new field! Check it out now",
  //     timestamp: "Jan. 2nd, 2024 @ 4:40 pm",
  //     sender: "Push sent by Justin McNab",
  //   },
  //   {
  //     type: "Email",
  //     users: 1782,
  //     subject: "New field opened",
  //     description: `Dear guests,\n\nWe are thrilled to announce that we have opened a new field! This expansion is part of our commitment to providing you with more opportunities and an enhanced experience.\n\nWe invite you to visit and see all the new possibilities for yourself. Your feedback is invaluable to us, and we would love to hear your thoughts on this new development.\n\nThank you for your continued support. We look forward to seeing you soon and hope you are as excited as we are about this new addition!`,
  //     timestamp: "Jan. 2nd, 2024 @ 4:38 pm",
  //     sender: "Email sent by Ronald Jackson",
  //     attachments: ["newfield.png", "newfield.pdf"],
  //   },
  // ];

  useEffect(() => {
    getAllHistory();
  }, []);

  const getAllHistory = async () => {
    setLoading(true);
    try {
      const res = await getCommunicationHistory();
      setCommunicationData(res.history);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Always clear the loading state
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Communication History</h1>
        {communicationData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            {communicationData.map((item, index) => (
              <div key={index} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium bg-gray-200 px-2 py-1 rounded">
                      {item.type === "push-notification" ? "Push" : "Email"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      ({item.usersCount} users)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {moment(item.createdAt).format("DD/MM/yyyy @ hh:mm")}
                  </span>
                </div>
                <h2 className="text-lg font-medium mb-1">{item.subject}</h2>
                <div
                  className="text-gray-600 whitespace-pre-wrap mb-2"
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                <p className="text-gray-500 text-sm mb-1">{`${
                  item.type === "push-notification" ? "Push" : "Email"
                } sent by ${item.sender.name}`}</p>
                {item.attachments.length > 0 && (
                  <div className="text-sm text-blue-600">
                    Attachments:{" "}
                    {item.attachments
                      .map((file, i) => (
                        <a
                          key={i}
                          href={file}
                          target="_blank" // Open in a new tab
                          rel="noopener noreferrer" // Replace # with file path if available
                          className="hover:underline"
                        >
                          {file.split("/").pop()}
                        </a>
                      ))
                      .reduce((prev, curr) => [prev, ", ", curr])}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {loading && <Loader />}
    </div>
  );
};

export default CommunicationHistory;
