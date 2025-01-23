/* eslint-disable react/prop-types */
// components/EventComponents/EventHeader.js
const EventHeader = ({ activeTab }) => (
  <div className="col-span-13 grid grid-cols-13 gap-40 whitespace-nowrap text-sm font-semibold text-[#849AB8] ">
    <p className="ml-5">Type</p>
    <p>Started</p>
    {activeTab === "Active" && <p>Progress</p>}{" "}
    {activeTab === "Completed" && <p>Ended</p>}
    <p># of Teams</p>
    <p>Players</p>
    <p>Free Agents</p>
    <p>Avg. Age</p>
    <p>Male/Female (%)</p>
    <p>Avg. Player Payment</p>
    <p>Revenue</p>
    <p>Additional Info</p>
  </div>
);

export default EventHeader;
