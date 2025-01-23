/* eslint-disable react/prop-types */
// AddTeamModal.js
import { Button } from "antd";
import AppModal from "../AppModal/AppModal";
const AddTeamModal = ({
  isModalOpen,
  onClose,
  teamType,
  teams,
  selectedTeams,
  handleTeamSelection,
  activeMatchday,
}) => {
  return (
    <AppModal
      onClose={onClose}
      modalopen={isModalOpen}
      height="auto"
      width="600px"
    >
      <div>
        <p className="font-PJSbold text-xl text-primary">
          Add Team - {activeMatchday}
        </p>
        <p className="text-sm font-PJSmedium text-secondary mt-3">
          Choose a team to add to this match or tap “Randomize Fixtures” to skip
          this process.
        </p>
        {teams.map((team, index) => {
          const isDisabled =
            (teamType === "team2" && selectedTeams.team1 === team.id) ||
            (teamType === "team1" && selectedTeams.team2 === team.id);
          return (
            <div
              key={index}
              className={`flex items-center mt-7 cursor-pointer ${
                isDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={() => handleTeamSelection(team.id, teamType)}
            >
              <p className="mr-5">{index + 1}</p>
              <img src={team.teamIcon} className="w-8 h-8" alt="team logo" />
              <p className="ml-2">{team.name}</p>
              <p
                className={`ml-auto px-4 py-1 rounded-full text-xs ${
                  selectedTeams[teamType] === team.id
                    ? "bg-lime"
                    : "bg-secondaryTen text-primary"
                } ${isDisabled ? "text-redbutton" : ""}`}
              >
                {selectedTeams[teamType] === team.id
                  ? "Selected"
                  : isDisabled
                  ? "Added"
                  : "Add"}
              </p>
            </div>
          );
        })}
        <Button
          onClick={onClose}
          type="none"
          className="rounded-full h-[42px] w-full bg-lime font-PJSmedium mt-10"
        >
          Confirm
        </Button>
      </div>
    </AppModal>
  );
};

export default AddTeamModal;
