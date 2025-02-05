/* eslint-disable react/prop-types */

import assets from "../../assets/assets";

const MatchCompletedCard = ({
  team1,
  team2,
  team1score,
  team2score,
  team1icon,
  team2icon,
  bgColor, // Accept background color as a prop
  day,
  date,
}) => {
  return (
    <>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">
          {day}, {date}
        </p>
      </div>

      <div className="h-[106px] border-secondaryThirty border shadow-custom w-[430px] rounded-[10px] flex items-center">
        <div
          className={`h-[106px] w-[25%] rounded-l-[10px] flex justify-center items-center ${bgColor}`}
        >
          <p>FT</p>
        </div>
        <div className="flex flex-col justify-center items-start px-3 w-[60%]">
          <div className="text-sm text-primary font-PJSbold flex items-center gap-2 cursor-pointer w-full">
            <img src={team1icon} alt={`${team1} Icon`} className="w-6 h-6" />
            <p className="font-PJSmedium">{team1}</p>
            <span className="ml-auto">{team1score}</span>
          </div>
          <div className="border-t border-secondaryThirty w-full my-3"></div>
          <div className="text-sm text-primary font-PJSbold flex items-center gap-2 cursor-pointer w-full">
            <img src={team2icon} alt={`${team2} Icon`} className="w-6 h-6" />
            <p className="font-PJSmedium">{team2}</p>
            <span className="ml-auto">{team2score}</span>
          </div>
        </div>
        <div className="ml-5">
          <img
            src={assets.info}
            alt="Options"
            className="cursor-pointer w-5 h-5"
          />
        </div>
      </div>
    </>
  );
};

export default MatchCompletedCard;
