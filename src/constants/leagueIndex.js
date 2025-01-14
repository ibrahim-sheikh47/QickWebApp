export const getOptions = (fieldType) => {
  switch (fieldType) {
    case "playableFields":
      return [
        { value: "field1", label: "East Field (7v7)" },
        { value: "field2", label: "North Field (7v7)" },
        { value: "field3", label: "South Field (7v7)" },
      ];
    case "teamLevel":
      return [
        { value: "level1", label: "Level 1" },
        { value: "level2", label: "Level 2" },
      ];
    case "gender":
      return [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "other", label: "Other" },
      ];
    case "ageRange":
      return [
        { value: "under18", label: "Under 18" },
        { value: "18to25", label: "18 to 25" },
        { value: "25to35", label: "25 to 35" },
        { value: "above35", label: "Above 35" },
      ];
    case "maxTeams":
      return [
        { value: "10", label: "10 Teams" },
        { value: "20", label: "20 Teams" },
        { value: "30", label: "30 Teams" },
      ];
    case "teamSignUpRequest":
      return [
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
      ];
    case "minPlayers":
      return [
        { value: "5", label: "5 Players" },
        { value: "10", label: "10 Players" },
        { value: "15", label: "15 Players" },
      ];
    case "maxPlayers":
      return [
        { value: "15", label: "15 Players" },
        { value: "20", label: "20 Players" },
        { value: "25", label: "25 Players" },
      ];
    case "faceEachOther":
      return [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ];
    case "yellowCardsSuspension":
      return [
        { value: "2", label: "2 Yellow Cards" },
        { value: "3", label: "3 Yellow Cards" },
      ];
    case "tiebreakers":
      return [
        { value: "goalDifference", label: "Goal Difference" },
        { value: "headToHead", label: "Head to Head" },
      ];
    case "knockoutStartFrom":
      return [
        { value: "quarterFinals", label: "Quarter Finals" },
        { value: "semiFinals", label: "Semi Finals" },
      ];
    case "doubleElimination":
      return [
        { value: "enabled", label: "Enabled" },
        { value: "disabled", label: "Disabled" },
      ];
    case "placementMatch":
      return [
        { value: "thirdPlace", label: "Third Place Match" },
        { value: "noMatch", label: "No Match" },
      ];
    case "finalHomeOrAway":
      return [
        { value: "home", label: "Home" },
        { value: "away", label: "Away" },
      ];
    case "cardCleanStages":
      return [
        { value: "groupStage", label: "Group Stage" },
        { value: "knockoutStage", label: "Knockout Stage" },
      ];
    case "numberOfGroups":
      return [
        { value: "4", label: "4 Groups" },
        { value: "8", label: "8 Groups" },
      ];
    case "numberOfTeams":
      return [
        { value: "16", label: "16 Teams" },
        { value: "32", label: "32 Teams" },
      ];
    case "teamsPerGrpAdvToKnockout":
      return [
        { value: "2", label: "Top 2 Teams" },
        { value: "4", label: "Top 4 Teams" },
      ];
    case "InGrpsTeamsFaceEachOther":
      return [
        { value: "once", label: "Once" },
        { value: "twice", label: "Twice" },
      ];
    case "freeAgents":
      return [
        { value: "allowed", label: "Allowed" },
        { value: "notAllowed", label: "Not Allowed" },
      ];
    default:
      return [];
  }
};
