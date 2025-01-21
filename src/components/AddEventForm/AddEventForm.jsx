import React, { useState } from "react";
import InputField from "../InputField/InputField";
import { Selectable } from "../Selectable/Selectable";
import { SelectDate } from "../SelectDate/SelectDate";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Button, Divider, Switch } from "antd";
import assets from "../../assets/assets";
import { getOptions } from "../../constants/leagueIndex";
import EventCard from "../EventCard/EventCard";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
export const AddEventForm = ({ eventType }) => {
  const navigate = useNavigate();

  const handlePublish = () => {
    const eventData = {
      ...formValues, // Spread all formValues
      imageSrc: imageSrc, // Include imageSrc if needed
      eventType: eventType,
    };

    console.log("Event Data being passed:", eventData); // Log the data

    navigate("/Dashboard/Events/", { state: eventData, formValues });
  };

  const [formValues, setFormValues] = useState({
    leagueName: "",
    description: "",
    playableFields: [],
    teamLevel: null,
    gender: null,
    ageFrom: null,
    ageTo: null,
    maxTeams: null,
    teamSignUpRequest: null,
    minPlayers: null,
    maxPlayers: null,
    faceEachOther: null,
    yellowCardsSuspension: null,
    pricePerTeam: "",
    taxRate: null,
    tiebreakers: [],
    registrationStart: "",
    registrationDeadline: "",
    eventStart: "",
    eventEnd: "",
    knockoutStartFrom: null,
    doubleElimination: null,
    placementMatch: null,
    finalHomeOrAway: null,
    cardCleanStages: null,
    numberOfGroups: null,
    knockoutTeams: null,
    teamsPerGrpAdvToKnockout: null,
    InGrpsTeamsFaceEachOther: null,
    freeAgents: null,
    pricePerFreeAgent: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleDateChange = (name, newDate) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: newDate }));
  };

  const [days, setDays] = useState([
    { day: "Monday", checked: false, time: "9:00am" },
    { day: "Tuesday", checked: false, time: "9:00am" },
    { day: "Wednesday", checked: false, time: "9:00am" },
    { day: "Thursday", checked: false, time: "9:00am" },
    { day: "Friday", checked: false, time: "9:00am" },
    { day: "Saturday", checked: false, time: "9:00am" },
    { day: "Sunday", checked: false, time: "9:00am" },
  ]);

  const handleCheckboxChange = (index) => {
    const newDays = [...days];
    newDays[index].checked = !newDays[index].checked;
    setDays(newDays);
  };
  const [imageSrc, setImageSrc] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
    }
  };
  const triggerFileInput = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <>
      <div className="text-xl font-PJSbold my-5">
        {eventType === "League" && <p>League Overview</p>}
        {(eventType === "Group Stage + Knockouts" ||
          eventType === "League + Knockouts") && <p>Tournament Overview</p>}
        {eventType === "Knockouts" && <p>Knockout Overview</p>}
      </div>
      <form>
        <InputField
          name={"leagueName"}
          label="League Name"
          value={formValues.leagueName}
          onChange={handleInputChange}
          placeholder="Enter League Name"
        />
        <InputField
          label="Description"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
          placeholder="Include details such as match duration, rules, presence of referees, and prize information"
          textarea={true} // Pass true to render a textarea
        />

        <div className="flex items-center w-full gap-5">
          <div className="flex-1 mt-3">
            <Selectable
              mode={"multiple"}
              style={"custom-multiple-select"}
              labelStyle={"top-2"}
              options={getOptions("playableFields")}
              value={formValues.playableFields}
              onChange={(value) => handleSelectChange("playableFields", value)}
              label="Playable Fields"
            />
          </div>
          <div className="flex-1">
            {eventType === "League" && (
              <Selectable
                options={getOptions("teamLevel")}
                value={formValues.teamLevel}
                onChange={(value) => handleSelectChange("teamLevel", value)}
                label="Team Level"
              />
            )}
          </div>
        </div>
        <div className="flex items-center w-full gap-5">
          <div className="flex-1">
            <Selectable
              options={getOptions("gender")}
              value={formValues.gender}
              onChange={(value) => handleSelectChange("gender", value)}
              label="Gender"
            />
          </div>
          <div className="flex-1">
            <div className="flex gap-5">
              <div className="flex-1">
                <Selectable
                  options={getOptions("ageFrom")}
                  value={formValues.ageFrom}
                  onChange={(value) => handleSelectChange("ageFrom", value)}
                  label="Ages - from"
                />
              </div>
              <div className="flex-1">
                <Selectable
                  options={getOptions("ageTo")}
                  value={formValues.ageTo}
                  onChange={(value) => handleSelectChange("ageTo", value)}
                  label="Ages - to"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 gap-4 flex flex-col">
          <p className="text-xl font-PJSbold">
            Team Requirement and Rules
            {eventType === "Group Stage + Knockouts" && (
              <>
                <span className="text-secondary"> - Group Stage</span>
              </>
            )}
            {eventType === "League + Knockouts" && (
              <>
                <span className="text-secondary"> - League</span>
              </>
            )}
          </p>
          <div className="flex items-center w-full gap-5">
            <div className="flex-1">
              {(eventType === "League" ||
                eventType === "League + Knockouts") && (
                <Selectable
                  options={getOptions("maxTeams")}
                  value={formValues.maxTeams}
                  onChange={(value) => handleSelectChange("maxTeams", value)}
                  label="Max Number of Teams"
                />
              )}
              {eventType === "Group Stage + Knockouts" && (
                <Selectable
                  options={getOptions("numberOfGroups")}
                  value={formValues.numberOfGroups}
                  onChange={(value) =>
                    handleSelectChange("numberOfGroups", value)
                  }
                  label="Number of Groups"
                />
              )}
              {eventType === "Knockouts" && (
                <Selectable
                  options={getOptions("knockoutTeams")}
                  value={formValues.knockoutTeams}
                  onChange={(value) =>
                    handleSelectChange("knockoutTeams", value)
                  }
                  label="Number of Teams"
                />
              )}
            </div>
            <div className="flex-1">
              <Selectable
                options={getOptions("teamSignUpRequest")}
                value={formValues.teamSignUpRequest}
                onChange={(value) =>
                  handleSelectChange("teamSignUpRequest", value)
                }
                label="Teams must request access to sign up"
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-5">
            <div className="flex-1">
              <Selectable
                options={getOptions("minPlayers")}
                value={formValues.minPlayers}
                onChange={(value) => handleSelectChange("minPlayers", value)}
                label="Min Players Per Team"
              />
            </div>
            <div className="flex-1">
              <Selectable
                options={getOptions("maxPlayers")}
                value={formValues.maxPlayers}
                onChange={(value) => handleSelectChange("maxPlayers", value)}
                label="Max Players Per Team"
              />
            </div>
          </div>
          <div className="flex items-center w-full gap-5">
            <div className="flex-1">
              {(eventType === "League" ||
                eventType === "League + Knockouts") && (
                <Selectable
                  options={getOptions("faceEachOther")}
                  value={formValues.faceEachOther}
                  onChange={(value) =>
                    handleSelectChange("faceEachOther", value)
                  }
                  label="Teams face each other"
                />
              )}
              {eventType === "Group Stage + Knockouts" && (
                <Selectable
                  options={getOptions("teamsPerGroup")}
                  value={formValues.teamsPerGroup}
                  onChange={(value) =>
                    handleSelectChange("teamsPerGroup", value)
                  }
                  label="Teams per group"
                />
              )}
              {eventType === "Knockouts" && (
                <div>
                  <Selectable
                    options={getOptions("doubleElimination")}
                    value={formValues.doubleElimination}
                    onChange={(value) =>
                      handleSelectChange("doubleElimination", value)
                    }
                    label="Are these knockout rounds double elimination (e.g., Home & Away)?"
                  />
                </div>
              )}
            </div>
            <div className="flex-1">
              <Selectable
                options={getOptions("yellowCardsSuspension")}
                value={formValues.yellowCardsSuspension}
                onChange={(value) =>
                  handleSelectChange("yellowCardsSuspension", value)
                }
                label="Accumulated yellow cards for 1-match suspension"
              />
            </div>
          </div>
          {eventType === "Knockouts" && (
            <div className="flex w-full gap-5">
              <div className="flex-1">
                <Selectable
                  options={getOptions("placementMatch")}
                  value={formValues.placementMatch}
                  onChange={(value) =>
                    handleSelectChange("placementMatch", value)
                  }
                  label="Is there a 3rd vs 4th place match"
                />
              </div>
              <div className="flex-1">
                <Selectable
                  options={getOptions("finalHomeOrAway")}
                  value={formValues.finalHomeOrAway}
                  onChange={(value) =>
                    handleSelectChange("finalHomeOrAway", value)
                  }
                  label="Is the final  Home & Away?"
                />
              </div>
            </div>
          )}
          {eventType === "Group Stage + Knockouts" && (
            <div className="flex w-full gap-5">
              <div className="flex-1">
                <Selectable
                  options={getOptions("teamsPerGrpAdvToKnockout")}
                  value={formValues.teamsPerGrpAdvToKnockout}
                  onChange={(value) =>
                    handleSelectChange("teamsPerGrpAdvToKnockout", value)
                  }
                  label="How many teams per group advance to knockouts"
                />
              </div>
              <div className="flex-1">
                <Selectable
                  options={getOptions("InGrpsTeamsFaceEachOther")}
                  value={formValues.InGrpsTeamsFaceEachOther}
                  onChange={(value) =>
                    handleSelectChange("InGrpsTeamsFaceEachOther", value)
                  }
                  label="In groups, teams face each other"
                />
              </div>
            </div>
          )}
          <div className="flex w-full gap-5">
            <div className="flex-1">
              <div className="flex gap-5">
                <div className="flex-1">
                  <InputField
                    type="number"
                    name={"pricePerTeam"}
                    value={formValues.pricePerTeam}
                    onChange={handleInputChange}
                    label="Price per team"
                  />
                </div>
                <div className="flex-1">
                  <InputField
                    type="number"
                    name={"taxRate"}
                    value={formValues.taxRate}
                    onChange={handleInputChange}
                    label="Tax rate"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              {(eventType === "League" ||
                eventType === "League + Knockouts") && (
                <Selectable
                  mode={"multiple"}
                  style={"custom-multiple-select"}
                  labelStyle={"top-2"}
                  options={getOptions("tiebreakers")}
                  value={formValues.tiebreakers}
                  onChange={(value) => handleSelectChange("tiebreakers", value)}
                  label="Tiebreakers when two teams are tied in points (listed by priority):"
                />
              )}
              {eventType === "Knockouts" && (
                <Selectable
                  options={getOptions("cardCleanStages")}
                  value={formValues.cardCleanStages}
                  onChange={(value) =>
                    handleSelectChange("cardCleanStages", value)
                  }
                  label="In what stages are cards cleaned?"
                />
              )}
            </div>
          </div>

          {(eventType === "League + Knockouts" ||
            eventType === "Group Stage + Knockouts") && (
            <>
              <p className="text-xl font-PJSbold mt-10">
                Rules <span className="text-secondary"> - Knockout</span>
              </p>
              <div className="w-1/2 pr-2">
                {eventType === "League + Knockouts" && (
                  <Selectable
                    options={getOptions("knockoutStartFrom")}
                    value={formValues.knockoutStartFrom}
                    onChange={(value) =>
                      handleSelectChange("knockoutStartFrom", value)
                    }
                    label="Knockouts start from:"
                  />
                )}
              </div>
              <div className="flex w-full gap-4">
                <div className="flex-1">
                  <Selectable
                    options={getOptions("doubleElimination")}
                    value={formValues.doubleElimination}
                    onChange={(value) =>
                      handleSelectChange("doubleElimination", value)
                    }
                    label="Are these knockout rounds double elimination (e.g., Home & Away)?"
                  />
                </div>
                <div className="flex-1">
                  <Selectable
                    options={getOptions("placementMatch")}
                    value={formValues.placementMatch}
                    onChange={(value) =>
                      handleSelectChange("placementMatch", value)
                    }
                    label="Is there a 3rd vs 4th place match"
                  />
                </div>
              </div>
              <div className="flex w-full gap-4">
                <div className="flex-1">
                  <Selectable
                    options={getOptions("finalHomeOrAway")}
                    value={formValues.finalHomeOrAway}
                    onChange={(value) =>
                      handleSelectChange("finalHomeOrAway", value)
                    }
                    label="Is the final  Home & Away?"
                  />
                </div>
                <div className="flex-1">
                  <Selectable
                    options={getOptions("cardCleanStages")}
                    value={formValues.cardCleanStages}
                    onChange={(value) =>
                      handleSelectChange("cardCleanStages", value)
                    }
                    label="In what stages are cards cleaned?"
                  />
                </div>
              </div>
            </>
          )}
          <p className="text-xl font-PJSbold mt-10">
            Registration and Schedule
          </p>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SelectDate
                label="Registration Starts"
                value={formValues.registrationStart}
                onChange={(value) =>
                  handleDateChange("registrationStart", value)
                }
              />
            </div>
            <div className="flex-1">
              <SelectDate
                label="Registration Deadline"
                value={formValues.registrationDeadline}
                onChange={(value) =>
                  handleDateChange("registrationDeadline", value)
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <SelectDate
                label="Event Starts"
                value={formValues.eventStart}
                onChange={(value) => handleDateChange("eventStart", value)}
              />
            </div>
            <div className="flex-1">
              <SelectDate
                label="Events Ends"
                value={formValues.eventEnd}
                onChange={(value) => handleDateChange("eventEnd", value)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-16 mt-5">
          {days.map((entry, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center">
                <FormGroup className="flex-shrink-0">
                  <FormControlLabel
                    className="w-[130px] font-PJSmedium"
                    control={
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            color: "rgba(51, 192, 219, 1)",
                          },
                        }}
                        checked={entry.checked || false}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={
                      <span className="text-sm font-PJSmedium">
                        {entry.day}
                      </span>
                    }
                  />
                </FormGroup>

                <InputField
                  style={"min-w-[400px]"}
                  label={"Time"}
                  value={entry.time}
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <p className="text-secondary font-PJSregular italic text-sm mt-5">
          These dates are for informational purposes only.{" "}
          <strong>qick </strong>
          is flexible and allows you to select the date and time of each match
          according to your preference.
        </p>
        <p className="text-xl font-PJSbold mt-10">Free Agents</p>
        <div
          className="h-[67px] border-secondaryThirty rounded-2xl mt-10 w-[49%]
         border-[1px] flex items-center justify-between px-5"
        >
          <p className="text-[16px] font-PJSmedium">
            Allow free agents to sign up
          </p>
          <Switch defaultChecked />
        </div>
        <div className="w-full flex gap-4">
          <div className="flex-1">
            <Selectable
              options={getOptions("freeAgents")}
              value={formValues.freeAgents}
              onChange={(value) => handleSelectChange("freeAgents", value)}
              label="Amount of Free Agents Allowed to Join"
            />
          </div>
          <div className="flex-1">
            <InputField
              name="pricePerFreeAgent"
              label={"Price per free agent"}
              value={formValues.pricePerFreeAgent}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <p className="text-xl font-PJSbold mt-10 mb-5">
          Waiver and League Rules
        </p>
        <div className="flex items-center gap-5">
          <div
            className="h-[67px] border-secondaryThirty rounded-2xl w-[42%]
         border-[1px] flex items-center justify-between px-5"
          >
            <p>{"FILE HERE"}</p>
            <img src={assets.Check} className="w-6 h-6 ml-auto" alt="" />
          </div>
          <div className="h-[67px] w-[67px] rounded-full border border-secondaryThirty flex items-center justify-center">
            <img
              src={assets.linkicon}
              className="w-6 h-6 cursor-pointer"
              alt=""
            />
          </div>
        </div>
        <p className="text-sm text-secondary font-PJSmedium mt-3">
          All users who join the event are required to sign the waiver
        </p>
        <div className="flex items-center gap-5 mt-7">
          <div
            className="h-[67px] border-secondaryThirty rounded-2xl w-[42%]
         border-[1px] flex items-center justify-between px-5"
          >
            <p>{"FILE HERE"}</p>
            <img src={assets.Check} className="w-6 h-6 ml-auto" alt="" />
          </div>
          <div className="h-[67px] w-[67px] rounded-full border border-secondaryThirty flex items-center justify-center">
            <img
              src={assets.linkicon}
              className="w-6 h-6 cursor-pointer"
              alt=""
            />
          </div>
        </div>
        <p className="text-sm text-secondary font-PJSmedium mt-3">
          The League Rules will be shown to users at the signup screen
        </p>
      </form>
      <Divider
        style={{
          marginTop: "50px",
          borderTopColor: "rgba(132, 154, 184, 0.3)",
        }}
      />
      <div>
        <p className="text-xl font-PJSbold">
          {eventType === "League" && <>New League</>}
          {(eventType === "League + Knockouts" ||
            eventType === "Group Stage + Knockouts") && <>New Tournament</>}
          {eventType === "Knockouts" && <>New Knockout Tournament</>}
        </p>
        <p className="text-sm font-PJSregular text-secondary">
          Be sure all details are good before you publish this event:
        </p>
        <div className="w-1/2 h-[350px] flex justify-center items-center bg-gray-100 relative mt-10 rounded-2xl cursor-pointer ">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-t-2xl"
            />
          ) : (
            <button
              onClick={triggerFileInput}
              className="text-lg items-center text-secondary font-PJSbold"
            >
              + <span className="text-xs">Upload Photo</span>
            </button>
          )}

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="flex flex-col gap-1">
          <EventCard
            leagueName={formValues.leagueName}
            knockoutTeams={formValues.knockoutTeams}
            maxTeams={formValues.maxTeams}
            numberOfGroups={formValues.numberOfGroups}
            eventStart={formValues.eventStart}
            eventEnd={formValues.eventEnd}
            playableFields={formValues.playableFields}
            cardStyle={"w-1/2 pb-4"}
          />
          <div
            className="h-[67px] border-secondaryThirty rounded-2xl mt-10 w-[49%]
         border-[1px] flex items-center justify-between px-5"
          >
            <p className="text-[16px] font-PJSmedium">
              Send mass push invitations to users
            </p>
            <Switch defaultChecked />
          </div>
        </div>
        <div className="flex justify-end gap-5 mt-14">
          <Button
            type="none"
            className="h-[54px] w-[297px] rounded-3xl bg-secondaryTen font-PJSmedium text-[16px] hover:scale-105"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePublish}
            type="none"
            className="h-[54px] w-[297px] rounded-3xl bg-lime font-PJSmedium text-[16px] hover:scale-105"
          >
            Publish League
          </Button>
        </div>
      </div>
    </>
  );
};
