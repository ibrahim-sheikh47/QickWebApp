/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Button, Divider } from "antd";
import { playersData } from "../../../constants/reportsIndex";
import assets from "../../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { AppModal } from "../../../components";
import pro from "../../../assets/image.png";
import PlayerCard from "../../../components/PlayerCard/PlayerCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { RadarChart } from "../../../components/RadarChart/RadarChart";

const Players = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { team } = location.state || { name: "Unknown Team" };

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const totalSlides = 4; // 4 slides after removing index 3

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    setSlideIndex(0); // Reset to first slide
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Render Top Skills with a check for undefined or missing attributes
  const renderTopSkills = () => {
    if (!selectedPlayer) return null;

    const skills = [
      { name: "Ball Control", value: selectedPlayer.ballControl },
      { name: "Dribbling", value: selectedPlayer.dribbling },
      { name: "Awareness", value: selectedPlayer.awareness },
      { name: "Passing", value: selectedPlayer.passing },
      { name: "Vision", value: selectedPlayer.vision },
      { name: "Acceleration", value: selectedPlayer.acceleration },
      { name: "Long Distance Speed", value: selectedPlayer.longDistanceSpeed },
      { name: "Composure", value: selectedPlayer.composure },
      { name: "Balance", value: selectedPlayer.balance },
    ];

    return skills.map((skill, index) => {
      // Determine the color based on the value
      let skillColor = "gray"; // default color

      switch (true) {
        case skill.value >= 90:
          skillColor = "#047C37";
          break;
        case skill.value >= 80:
          skillColor = "#9CFC38";
          break;
        case skill.value >= 70:
          skillColor = "#FFCB12";
          break;
        case skill.value > 60:
          skillColor = "#FF9212";
          break;
        default:
          skillColor = "#FF9212"; // in case skill.value < 60
      }

      return (
        <div key={index} className="flex items-end gap-4 mt-8">
          <div className="w-[70%] flex-col gap-5 flex">
            <p className="text-sm">{skill.name}</p>
            <div className="w-full h-2 bg-gray-300 rounded-full">
              <div
                style={{
                  width: `${skill.value}%`,
                  backgroundColor: skillColor,
                }}
                className="h-full rounded-full"
              ></div>
            </div>
          </div>
          <p className="text-3xl font-PJSextra ml-auto">{skill.value}</p>
        </div>
      );
    });
  };

  return (
    <div className="bg-white mt-10 rounded-xl p-4">
      <div className="flex items-center gap-4">
        <img
          src={assets.Back}
          alt="Back"
          onClick={() => window.history.back()}
          className="cursor-pointer"
        />
        <div className="flex items-center gap-4 cursor-pointer">
          <img
            src={team.icon}
            alt={`${team.name} icon`}
            className="w-10 h-10"
          />
          <div>
            <p className="text-xl font-PJSbold text-primary">{team.name}</p>
            <p className="text-sm font-PJSmedium text-secondary">
              {team.level}
            </p>
          </div>
        </div>
      </div>
      <Divider />

      {playersData.map((player, index) => (
        <React.Fragment key={index}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handlePlayerClick(player)}
          >
            <p className="mr-8 text-sm">{index + 1}</p>
            <img
              className="w-10 h-10 rounded-full"
              src={player.img}
              alt={`${player.name} image`}
            />
            <p className="whitespace-nowrap text-primary text-sm font-PJSmedium">
              {player.name}
            </p>
            {player.isAdmin && (
              <p className="whitespace-nowrap text-secondary text-xs font-PJSmedium">
                (Admin)
              </p>
            )}
            {player.isPro && (
              <p className="text-[10px] italic bg-lime rounded-3xl py-1/2 px-2 font-PJSbold">
                PRO
              </p>
            )}
          </div>
          {index < playersData.length - 1 && (
            <Divider className="border-t-1 border-t-secondaryThirty" />
          )}
        </React.Fragment>
      ))}

      {/* Pro Player Modal with Slides */}
      {selectedPlayer && selectedPlayer.isPro && (
        <AppModal
          modalopen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          width={"550px"}
          height={"90%"}
          customStyles={{
            modal: {
              overflowY: "scroll",
            },
          }}
        >
          <div className="flex justify-between items-center">
            {/* Left Arrow */}
            {slideIndex > 0 && (
              <LeftOutlined
                className="cursor-pointer text-xl text-primary"
                onClick={handlePrevSlide}
              />
            )}

            {/* Slide Content */}
            <div className="w-full">
              <h2 className="text-lg font-PJSbold text-primary">
                {selectedPlayer.name}
              </h2>
              <h2 className="text-sm font-PJSmdeium text-secondary">
                {team.name}
              </h2>
              {slideIndex === 0 ? (
                <PlayerCard
                  playerName={selectedPlayer.name}
                  playerPosition={selectedPlayer.position}
                  technical={selectedPlayer.technical}
                  defensive={selectedPlayer.defensive}
                  tactical={selectedPlayer.tactical}
                  physical={selectedPlayer.physical}
                  playerScore={selectedPlayer.fullScore}
                  playerImage={pro}
                />
              ) : slideIndex === 1 ? (
                <div className="px-10 mb-10">
                  <p className="text-[16px] font-PJSbold mt-5">Top 10 Skills</p>
                  {renderTopSkills()}
                </div>
              ) : slideIndex === 2 ? (
                <>
                  <RadarChart
                    graphSize={450}
                    scaleCount={10}
                    numberInterval={1}
                    data={[
                      {
                        overall: selectedPlayer.fullScore,
                        technical: selectedPlayer.technical,
                        defensive: selectedPlayer.defensive,
                        tactical: selectedPlayer.tactical,
                        physical: selectedPlayer.physical,
                      },
                    ]}
                    options={{
                      showAxis: true,
                      showIndicator: true,
                      dotList: [false, false],
                    }}
                  />
                </>
              ) : slideIndex === 3 ? (
                <div className="p-4">
                  <p className="text-[16px] font-PJSbold mt-5">Trophies</p>
                  <div className="flex gap-5">
                    <div className="h-[262px] bg-secondaryTwenty rounded-2xl mt-5 flex-1"></div>
                    <div className="h-[262px] bg-secondaryTwenty rounded-2xl mt-5 flex-1"></div>
                  </div>
                  <p className="text-[16px] font-PJSbold mt-5">
                    Individual Awards
                  </p>
                  <div className="flex gap-5">
                    <div className="h-[262px] bg-secondaryTwenty rounded-2xl mt-5 flex-1"></div>
                    <div className="h-[262px] bg-secondaryTwenty rounded-2xl mt-5 flex-1"></div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Right Arrow */}
            {slideIndex < totalSlides - 1 && (
              <RightOutlined
                className="cursor-pointer text-xl text-primary"
                onClick={handleNextSlide}
              />
            )}
          </div>

          <Button
            className=" bg-lime w-full h-[54px] rounded-full text-sm font-PJSmedium mt-4"
            type="none"
            onClick={() => navigate(`/Dashboard/Chats`)}
          >
            Open Chat
          </Button>
        </AppModal>
      )}

      {/* Non-Pro Player Modal */}
      {selectedPlayer && !selectedPlayer.isPro && (
        <AppModal
          modalopen={!!selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          width={"500px"}
          height={"250px"}
        >
          <div className="flex items-center mt-5">
            <div>
              {" "}
              <p className="text-lg font-PJSbold text-primary">
                {selectedPlayer.name}
              </p>
              <p className="text-sm font-PJSmedium text-secondary mt-1">
                {team.name}
              </p>
              <p className="text-sm font-PJSmedium text-secondary mt-1">
                {selectedPlayer.position} , Non Pro
              </p>
            </div>

            <img
              src={selectedPlayer.img}
              className="w-12 h-12 ml-auto"
              alt="Non-Pro Player"
            />
          </div>
          <Button
            className="mt-12 bg-lime w-full h-[54px] rounded-full text-sm font-PJSmedium"
            type="none"
            onClick={() => navigate(`/Dashboard/Chats`)}
          >
            Open Chat
          </Button>
        </AppModal>
      )}
    </div>
  );
};

export default Players;
