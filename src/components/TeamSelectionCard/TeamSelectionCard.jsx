/* eslint-disable react/prop-types */
const TeamSelectionCard = ({
  team1,
  team2,
  team1score,
  team2score,
  teams,
  assets,
  handleOptionClick,
  customStyle,
  isKnockout,
}) => {
  const getTeamDetails = (teamId) => {
    return (
      teams.find((team) => team.id === teamId) || {
        name: "TBD",
        teamIcon: assets.defaultTeamIcon,
      }
    );
  };

  const isEliminated = (teamScore, opponentScore) => {
    return (
      isKnockout &&
      teamScore !== null &&
      opponentScore !== null &&
      teamScore < opponentScore
    );
  };

  const renderTeamRow = (teamId, score, opponentScore) => {
    const team = getTeamDetails(teamId);
    const eliminated = isEliminated(score, opponentScore);

    return (
      <div className="text-sm text-primary font-PJSbold flex items-center gap-2 px-3 cursor-pointer">
        <img
          src={team.teamIcon}
          alt={`${team.name} Icon`}
          className="w-6 h-6"
        />
        <p
          className={`font-PJSmedium ${
            eliminated
              ? `relative after:absolute after:left-0 after:bottom-2 after:w-full after:h-[2px] after:bg-secondary after:content-['']`
              : ""
          }`}
        >
          {team.name}
        </p>
        {score !== null && <span className="ml-auto">{score}</span>}
      </div>
    );
  };

  return (
    <div
      className={`h-[106px] shadow-custom w-[430px] rounded-[10px] flex items-center ${customStyle}`}
    >
      {!isKnockout && (
        <div className="h-[106px] bg-lime w-[45%] rounded-l-[10px] flex justify-center items-center">
          <p>Add</p>
        </div>
      )}
      <div className="flex-col justify-center items-center w-full">
        {renderTeamRow(team1, team1score, team2score, "top")}
        <div className="border-t border-secondaryThirty w-[220px] my-3 ml-3" />
        {renderTeamRow(team2, team2score, team1score, "bottom")}
      </div>

      <div className="ml-10">
        {assets?.option ? (
          <img
            src={assets.option}
            alt="Options"
            className="cursor-pointer mr-10"
            onClick={handleOptionClick}
          />
        ) : null}
      </div>
    </div>
  );
};
export default TeamSelectionCard;
