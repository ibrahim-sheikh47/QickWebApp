/* eslint-disable react/prop-types */
import moment from "moment";
import { getOptions } from "../../constants/leagueIndex";
import assets from "../../assets/assets";

export const EventCard = ({
  viewType = "card", // default to card view
  leagueName,
  maxTeams,
  knockoutTeams,
  numberOfGroups,
  eventStart,
  eventEnd,
  playableFields,
  imageSrc,
  cardStyle,
  eventType,
  onClickInfo,
  onClickCardDetail,
}) => {
  const shortNames = {
    "League + Knockouts": "League + KO",
    "Group Stage + Knockouts": "Groups + KO",
  };
  const progress = 30;

  return (
    <div
      className={`flex flex-col gap-1 ${cardStyle} shadow-xl rounded-2xl cursor-pointer`}
    >
      {viewType === "card" ? (
        <>
          {imageSrc && (
            <div
              className="w-full h-[350px] bg-gray-200 rounded-t-2xl overflow-hidden relative cursor-pointer"
              onClick={onClickCardDetail}
            >
              <img
                src={imageSrc}
                alt="Event"
                className="w-full h-full object-cover"
              />
              {eventType && (
                <p
                  className={`absolute top-2 right-24 rounded-xl text-xs px-3 py-1 font-PJSmedium ${
                    {
                      League: "bg-[#9CFC384D]",
                      "League + Knockouts": "bg-[#35E7804D]",
                      "Group Stage + Knockouts": "bg-[#1F29334D]",
                      Knockouts: "bg-[#33C0DB4D]",
                    }[eventType] || ""
                  }`}
                >
                  {shortNames[eventType] || eventType}
                </p>
              )}
              <div className="absolute top-[10px] right-2">
                <div className="relative w-[75px] h-5 bg-gray-300 rounded-md">
                  <div
                    className="absolute top-0 left-0 h-full bg-[#33C0DB] rounded-md"
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-black font-semibold z-10 text-xs">
                    {progress}%
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="px-4">
            <div className="mt-5 flex items-center">
              {leagueName && (
                <p className="font-PJSbold text-lg">{leagueName}</p>
              )}
              {renderEventInfo(
                eventType,
                maxTeams,
                numberOfGroups,
                knockoutTeams
              )}
            </div>
            {eventStart && eventEnd && (
              <p className="text-sm text-primary font-PJSregular">
                From {moment(eventStart).format("MMMM Do")} -{" "}
                {moment(eventEnd).format("MMMM Do")}
              </p>
            )}
            <div className="flex justify-between">
              {playableFields && (
                <p className="text-sm text-primary font-PJSregular">
                  {getOptions("playableFields")
                    .filter((option) => playableFields.includes(option.value))
                    .map((option) => option.label)
                    .join(", ")}
                </p>
              )}
              {onClickInfo && (
                <>
                  <img
                    className="w-5 mb-5 cursor-pointer"
                    src={assets.info}
                    onClick={onClickInfo}
                    alt="Info"
                  />
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        // List View Layout
        <div className="flex items-center gap-5 border-b pb-4 mt-5 px-4">
          {imageSrc && (
            <div
              className="w-[120px] h-[80px] bg-gray-200 rounded-lg overflow-hidden"
              onClick={onClickCardDetail}
            >
              <img
                src={imageSrc}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center">
              <span className="font-PJSbold text-lg">{leagueName}</span>
              <p className="text-secondary ml-1">
                {renderEventInfo(
                  eventType,
                  maxTeams,
                  numberOfGroups,
                  knockoutTeams
                )}
              </p>
            </div>
            {eventStart && eventEnd && (
              <p className="text-sm text-primary font-PJSregular">
                From {moment(eventStart).format("MMMM Do")} -{" "}
                {moment(eventEnd).format("MMMM Do")}
              </p>
            )}
            {playableFields && (
              <p className="text-sm text-primary font-PJSregular">
                {getOptions("playableFields")
                  .filter((option) => playableFields.includes(option.value))
                  .map((option) => option.label)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center gap-12">
            <div>
              {eventType && (
                <p
                  className={` rounded-3xl text-xs px-4 w-full h-[35px] flex justify-center items-center font-PJSmedium ${
                    {
                      League: "bg-[#9CFC384D]",
                      "League + Knockouts": "bg-[#35E7804D]",
                      "Group Stage + Knockouts": "bg-[#1F29334D]",
                      Knockouts: "bg-[#33C0DB4D]",
                    }[eventType] || ""
                  }`}
                >
                  {eventType}
                </p>
              )}
            </div>
            <div className="relative w-[75px] h-5 bg-gray-300 rounded-md">
              <div
                className="absolute top-0 left-0 h-full bg-[#33C0DB] rounded-md"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white font-semibold z-10 text-xs">
                {progress}%
              </span>
            </div>
            <div>
              <img
                className="w-5 cursor-pointer"
                src={assets.info}
                onClick={onClickInfo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function renderEventInfo(eventType, maxTeams, numberOfGroups, knockoutTeams) {
    if (eventType === "League" || eventType === "League + Knockouts") {
      return (
        maxTeams && (
          <p className="flex items-center gap-1 font-PJSmedium text-xs ml-auto text-secondary">
            (<img className="w-4" src={assets.users} alt="Teams" />
            {maxTeams})
          </p>
        )
      );
    } else if (eventType === "Group Stage + Knockouts") {
      return (
        numberOfGroups && (
          <p className="flex items-center gap-1 font-PJSmedium text-xs ml-auto text-secondary">
            (<img className="w-4" src={assets.users} alt="Groups" />
            {numberOfGroups})
          </p>
        )
      );
    } else if (eventType === "Knockouts") {
      return (
        knockoutTeams && (
          <p className="flex items-center gap-1 font-PJSmedium text-xs ml-auto text-secondary">
            (<img src={assets.users} alt="Knockouts" />
            {knockoutTeams})
          </p>
        )
      );
    }
  }
};

export default EventCard;
