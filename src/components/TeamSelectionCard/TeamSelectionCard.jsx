/* eslint-disable react/prop-types */

const TeamSelectionCard = ({
  team1,
  team2,
  team1score,
  team2score,
  teams,
  assets,
  handleOptionClick,
}) => {
  const getTeamDetails = (teamId) => {
    return teams.find((team) => team.id === teamId);
  };

  return (
    <div className="h-[106px] border-secondaryThirty border shadow-custom w-[430px] rounded-[10px] flex items-center">
      <div className="h-[106px] bg-lime w-[25%] rounded-l-[10px] flex justify-center items-center">
        <p>Add</p>
      </div>
      <div className="flex-col justify-center items-center">
        <div className="text-sm text-primary font-PJSbold flex items-center gap-2 px-3 cursor-pointer">
          {team1 ? (
            <>
              <img
                src={getTeamDetails(team1)?.teamIcon}
                alt="Team 1 Icon"
                className="w-6 h-6"
              />
              <p className="font-PJSmedium">{getTeamDetails(team1)?.name}</p>
              <span className="ml-auto">{team1score}</span>
            </>
          ) : (
            <p className="font-PJSmedium text-secondary">Not Selected</p>
          )}
        </div>
        <div className="border-t border-secondaryThirty w-[220px] my-3 ml-3"></div>
        <div className="text-sm text-primary font-PJSbold flex items-center gap-2 px-3 cursor-pointer">
          {team2 ? (
            <>
              <img
                src={getTeamDetails(team2)?.teamIcon}
                alt="Team 2 Icon"
                className="w-6 h-6"
              />
              <p className="font-PJSmedium">{getTeamDetails(team2)?.name}</p>
              <span className="ml-auto">{team2score}</span>
            </>
          ) : (
            <p className="font-PJSmedium text-secondary">Not Selected</p>
          )}
        </div>
      </div>

      <div className="ml-10">
        {/* Check if assets and assets.option exist */}
        {assets?.option ? (
          <img
            src={assets.option}
            alt="Options"
            className="cursor-pointer"
            onClick={handleOptionClick}
          />
        ) : (
          <p>No option available</p> // Display a fallback message or element
        )}
      </div>
    </div>
  );
};

export default TeamSelectionCard;
