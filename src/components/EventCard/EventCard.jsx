/* eslint-disable react/prop-types */
import moment from "moment";
import { getOptions } from "../../constants/leagueIndex";
import assets from "../../assets/assets";

const EventCard = ({
  leagueName,
  maxPlayers,
  eventStart,
  eventEnd,
  playableFields,
  imageSrc,
  cardStyle,
  eventType,
}) => {
  const shortNames = {
    "League + Knockouts": "League + KO",
    "Group Stage + Knockouts": "Groups + KO",
  };
  return (
    <div className={`flex flex-col gap-1 ${cardStyle}`}>
      {imageSrc && (
        <div className="w-full h-[350px] bg-gray-200 rounded-2xl overflow-hidden relative">
          <img
            src={imageSrc}
            alt="Event"
            className="w-full h-full object-cover"
          />
          {eventType && (
            <p
              className={`absolute top-2 right-2 rounded-xl text-xs px-3 py-1 font-PJSmedium ${
                eventType === "League"
                  ? "bg-[#9CFC384D]" // Background for event1
                  : eventType === "League + Knockouts"
                  ? "bg-[#35E7804D]" // Background for event2
                  : eventType === "Group Stage + Knockouts"
                  ? "bg-[#1F29334D]" // Background for event3
                  : eventType === "Knockouts"
                  ? "bg-[#33C0DB4D]" // Background for event4
                  : "" // Default background if no event type matches
              }`}
            >
              {shortNames[eventType] || eventType}{" "}
              {/* Shortened event type name */}
            </p>
          )}
        </div>
      )}
      <div className="mt-5 flex items-center">
        {leagueName && <p className="font-PJSbold text-lg">{leagueName}</p>}
        {maxPlayers && (
          <p className="flex items-center gap-2 font-PJSmedium text-sm ml-auto">
            <img src={assets.users} alt="" />
            {maxPlayers}
          </p>
        )}
      </div>
      {eventStart && eventEnd && (
        <>
          <p className="text-sm text-primary font-PJSregular">
            From {moment(eventStart).format("MMMM Do")} -{" "}
            {moment(eventEnd).format("MMMM Do")}
          </p>
          <div className="flex items-center justify-between">
            {playableFields && (
              <p className="text-sm text-primary font-PJSregular">
                {getOptions("playableFields")
                  .filter((option) => playableFields.includes(option.value))
                  .map((option) => option.label)
                  .join(", ")}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EventCard;
