import assets from "../assets/assets";

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
        { value: "2", label: "2" },
        { value: "3", label: "3" },
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
    case "knockoutTeams":
      return [
        { value: "16", label: "16 Teams" },
        { value: "32", label: "32 Teams" },
      ];
    case "teamsPerGrpAdvToKnockout":
      return [
        { value: "2", label: "2 Teams" },
        { value: "4", label: "4 Teams" },
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
    case "ageFrom":
      return [
        { value: "18", label: "18" },
        { value: "20", label: "20" },
      ];
    case "ageTo":
      return [
        { value: "38", label: "38" },
        { value: "40", label: "40" },
      ];
    default:
      return [];
  }
};
export const teams = [
  { id: 1, name: "The Tigers", teamIcon: assets.team1 },
  { id: 2, name: "New York City", teamIcon: assets.team2 },
  { id: 3, name: "FC Hanover", teamIcon: assets.team3 },
  { id: 4, name: "FC Fulham", teamIcon: assets.team4 },
  { id: 5, name: "Atlanta FC", teamIcon: assets.team5 },
  { id: 6, name: "Juniors Club", teamIcon: assets.team6 },
  { id: 7, name: "Orlando FC", teamIcon: assets.team7 },
];
export const tableTeams = [
  {
    id: 1,
    name: "Real Madrid",
    level: "Pro",
    teamImg: assets.team1,
    p: 10,
    w: 6,
    l: 3,
    d: 1,
    gf: 20,
    ga: 10,
    goalDiff: 10,
    pts: 19,
  },
  {
    id: 2,
    name: "Manchester City",
    level: "Semi-Pro",
    teamImg: assets.team2,
    p: 10,
    w: 5,
    l: 4,
    d: 1,
    gf: 18,
    ga: 12,
    goalDiff: 6,
    pts: 16,
  },
  {
    id: 3,
    name: "Liverpool",
    level: "Amateur",
    teamImg: assets.team3,
    p: 10,
    w: 4,
    l: 5,
    d: 1,
    gf: 15,
    ga: 18,
    goalDiff: -3,
    pts: 13,
  },
  {
    id: 4,
    name: "FC Barcelona",
    level: "Pro",
    teamImg: assets.team4,
    p: 10,
    w: 3,
    l: 5,
    d: 2,
    gf: 12,
    ga: 15,
    goalDiff: -3,
    pts: 11,
  },
  {
    id: 5,
    name: "Real Betis",
    level: "Pro",
    teamImg: assets.team5,
    p: 10,
    w: 3,
    l: 5,
    d: 2,
    gf: 12,
    ga: 15,
    goalDiff: -3,
    pts: 11,
  },
];

export const goalsData = [
  {
    id: 1,
    player: "John Doe",
    goals: 5,
    dp: assets.player1,
    team: "Real Madrid",
  },
  { id: 2, player: "Ramos", goals: 4, dp: assets.player2, team: "Barcelona" },
  { id: 3, player: "Justin", goals: 3, dp: assets.player3, team: "Bayern" },
  { id: 4, player: "Ibrahim", goals: 6, dp: assets.player4, team: "Liverpool" },
];

export const assistsData = [
  {
    id: 1,
    player: "John Doe",
    assists: 5,
    dp: assets.player3,
    team: "Barcelona",
  },
  { id: 2, player: "Ramos", assists: 4, dp: assets.player4, team: "Liverpool" },
  {
    id: 3,
    player: "Justin",
    assists: 3,
    dp: assets.player2,
    team: "Real Madrid",
  },
  {
    id: 4,
    player: "Ibrahim",
    assists: 6,
    dp: assets.player1,
    team: "Manchester City",
  },
];

export const mvpAwardsData = [
  {
    id: 1,
    player: "John Doe",
    mvpAwards: 5,
    dp: assets.player2,
    team: "Real Madrid",
  },
  {
    id: 2,
    player: "Ramos",
    mvpAwards: 4,
    dp: assets.player1,
    team: "Manchester City",
  },
  {
    id: 3,
    player: "Justin",
    mvpAwards: 3,
    dp: assets.player4,
    team: "Barcelona",
  },
  {
    id: 4,
    player: "Ibrahim",
    mvpAwards: 6,
    dp: assets.player3,
    team: "Bayern",
  },
];
export const cleanSheetsData = [
  {
    id: 1,
    player: "John Doe",
    cleanSheets: 5,
    dp: assets.player2,
    team: "Bayern",
  },
  {
    id: 2,
    player: "Ramos",
    cleanSheets: 4,
    dp: assets.player1,
    team: "Barcelona",
  },
  {
    id: 3,
    player: "Ibrahim",
    cleanSheets: 3,
    dp: assets.player3,
    team: "Liverpool",
  },
  {
    id: 4,
    player: "Justin",
    cleanSheets: 6,
    dp: assets.player2,
    team: "Manchester City",
  },
];
