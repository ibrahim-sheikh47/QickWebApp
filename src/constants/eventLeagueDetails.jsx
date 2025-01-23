import assets from "../assets/assets";
import { getOptions } from "./leagueIndex";

const getLabelForValue = (fieldType, value) => {
  const options = getOptions(fieldType);
  return (Array.isArray(value) ? value : [value])
    .map((val) => options.find((option) => option.value === val)?.label || val)
    .join(", ");
};

export const eventDetails = (formValues) => [
  {
    icon: assets.usersBlack,
    title: "Teams",
    description: `${formValues.maxTeams} teams of ${formValues.minPlayers}-${formValues.maxPlayers} players`,
  },
  {
    icon: assets.level,
    title: "Team Level",
    description: getLabelForValue("teamLevel", formValues.teamLevel),
  },
  {
    icon: assets.playableFields,
    title: "Playable Fields",
    description: getLabelForValue("playableFields", formValues.playableFields),
  },
  {
    icon: assets.regStarts,
    title: "Registration Starts",
    description: formValues.registrationStart,
  },
  {
    icon: assets.regEnds,
    title: "Registration Ends",
    description: formValues.registrationDeadline,
  },
  {
    icon: assets.eventStarts,
    title: "Event Starts",
    description: formValues.eventStart,
  },
  {
    icon: assets.eventEnds,
    title: "Event Ends",
    description: formValues.eventEnd,
  },
  {
    icon: assets.time,
    title: "Playing Days and Hours",
    description: "Trophies for top 3 teams",
  },
  {
    icon: assets.gender,
    title: "Gender",
    description: getLabelForValue("gender", formValues.gender),
  },
  {
    icon: assets.ages,
    title: "Ages",
    description: `From ${formValues.ageFrom}-${formValues.ageTo} years`,
  },
  {
    icon: assets.access,
    title: "Access for Free Agents",
    description: getLabelForValue("freeAgents", formValues.freeAgents),
  },
  {
    icon: assets.cost,
    title: "Cost Per Free Agent",
    description: formValues.pricePerFreeAgent,
  },
  {
    icon: assets.cost,
    title: "Cost per team",
    description: formValues.pricePerTeam,
  },
];

export const eventFormatDetails = (formValues) => {
  let eventFormatDetails = [];

  switch (formValues.eventType) {
    case "League":
      eventFormatDetails = [
        {
          icon: assets.versus,
          title: "Times teams face each other in the league",
          description: `${formValues.faceEachOther} times`,
        },
        {
          icon: assets.cards,
          title: "Yellow cards that lead to a match suspension",
          description: `${formValues.yellowCardsSuspension} yellow cards`,
        },
        {
          icon: assets.rules,
          title: "Tiebreaker Rules",
          description: getLabelForValue(
            "tiebreakerRules",
            formValues.tiebreakers
          ),
        },
        {
          icon: assets.cards,
          title: "Knockout stage after the league?",
          description: `${formValues.yellowCardsSuspension} yellow cards`,
        },
      ];
      break;

    case "League + Knockouts":
      eventFormatDetails = [
        {
          icon: assets.versus,
          title: "Times teams face each other in the league",
          description: `${formValues.faceEachOther} times`,
        },
        {
          icon: assets.cards,
          title: "Yellow cards that lead to a match suspension",
          description: `${formValues.yellowCardsSuspension} yellow cards`,
        },
        {
          icon: assets.cards,
          title: "In what stage are cards cleaned?",
          description: getLabelForValue(
            "overtimeRules",
            formValues.cardCleanStages
          ),
        },
        {
          icon: assets.rules,
          title: "Tiebreaker Rules",
          description: getLabelForValue("tiebreakers", formValues.tiebreakers),
        },
        {
          icon: assets.cards,
          title: "Knockout stage after the league?",
          description: `${formValues.yellowCardsSuspension} yellow cards`,
        },
        {
          icon: assets.knockoutStage,
          title: "Knockout round type",
          description: getLabelForValue("tiebreakers", formValues.tiebreakers),
        },
        {
          icon: assets.knockoutStage,
          title: "Is there a 3rd vs 4th place match",
          description: getLabelForValue(
            "placementMatch",
            formValues.placementMatch
          ),
        },
        {
          icon: assets.knockoutStage,
          title: "Is the final match a double leg? (Home & Away)",
          description: getLabelForValue(
            "doubleElimination",
            formValues.doubleElimination
          ),
        },
      ];
      break;

    case "Group Stage + Knockouts":
      eventFormatDetails = [
        {
          icon: assets.versus,
          title: "Number of Groups",
          description: `${formValues.numberOfGroups}`,
        },
        {
          icon: assets.cards,
          title: "Teams Per Group",
          description: `${formValues.teamsPerGroup}`,
        },
        {
          icon: assets.cards,
          title: "How many teams per group advance to knockouts",
          description: `${formValues.teamsPerGrpAdvToKnockout}`,
        },
        {
          icon: assets.cards,
          title: "Group round type",
          description: formValues.groupStageFormat,
        },
        {
          icon: assets.cards,
          title: "Accumulated yellow cards for 1-match suspension",
          description: formValues.yellowCardsSuspension,
        },
        {
          icon: assets.cards,
          title: "In what stage are cards cleaned?",
          description: getLabelForValue(
            "overtimeRules",
            formValues.cardCleanStages
          ),
        },
        {
          icon: assets.rules,
          title: "Tiebreaker Rules",
          description: getLabelForValue("tiebreakers", formValues.tiebreakers),
        },
        {
          icon: assets.knockoutStage,
          title: "Knockout round type",
          description: getLabelForValue("tiebreakers", formValues.tiebreakers),
        },
        {
          icon: assets.knockoutStage,
          title: "Is there a 3rd vs 4th place match",
          description: getLabelForValue(
            "placementMatch",
            formValues.placementMatch
          ),
        },
        {
          icon: assets.knockoutStage,
          title: "Is the final match a double leg? (Home & Away)",
          description: getLabelForValue(
            "doubleElimination",
            formValues.doubleElimination
          ),
        },
      ];
      break;

    case "Knockouts":
      eventFormatDetails = [
        {
          icon: assets.cards,
          title: "In what stage are cards cleaned?",
          description: getLabelForValue(
            "overtimeRules",
            formValues.cardCleanStages
          ),
        },
        {
          icon: assets.knockoutStage,
          title: "Knockout round type",
          description: getLabelForValue("tiebreakers", formValues.tiebreakers),
        },
        {
          icon: assets.knockoutStage,
          title: "Is there a 3rd vs 4th place match",
          description: getLabelForValue(
            "placementMatch",
            formValues.placementMatch
          ),
        },
        {
          icon: assets.knockoutStage,
          title: "Is the final match a double leg? (Home & Away)",
          description: getLabelForValue(
            "doubleElimination",
            formValues.doubleElimination
          ),
        },
      ];
      break;

    default:
      break;
  }

  return eventFormatDetails;
};
