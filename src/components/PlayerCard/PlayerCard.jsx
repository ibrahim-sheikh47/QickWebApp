/* eslint-disable react/prop-types */
// PlayerCard.js

const PlayerCard = ({
  playerName,
  playerPosition,
  technical,
  defensive,
  tactical,
  physical,
  playerImage,
  playerScore,
}) => {
  return (
    <div>
      <div className="relative flex items-center justify-center">
        {/* Player Image */}
        <img src={playerImage} alt="" className="w-full h-auto" />

        {/* Position Text - Centered on Image */}
        <p className="absolute mt-20 text-white font-PJSbold text-lg">
          {playerPosition}
        </p>
        <p className="absolute top-[21.5%]  left-[16%] text-white font-PJSextra text-5xl">
          {playerScore}
        </p>

        <p className="absolute top-40  left-[16%] text-white font-PJSextra text-xl">
          {playerName}
        </p>

        {/* Horizontal Line Below Position */}
        <div className="absolute mt-32 w-72 h-[1.5px] bg-secondaryTen"></div>

        {/* Stats Container Below Position */}
        <div className="absolute mt-52 flex items-center w-full px-10 text-lg font-PJSmedium uppercase">
          {/* Left Side (Technical & Defensive) */}
          <div className="w-1/2 text-right pr-5 text-secondary space-y-2">
            <p>
              <span className="text-white mr-1">{technical}</span> Technical
            </p>
            <p>
              <span className="text-white mr-1">{defensive}</span> Defensive
            </p>
          </div>

          {/* Center Vertical Line */}
          <div className="h-20 w-0.5 bg-secondaryTen"></div>

          {/* Right Side (Tactical & Physical) */}
          <div className="w-1/2 text-left pl-5 text-secondary space-y-2 font-PJSmedium">
            <p>
              <span className="text-white mr-1">{tactical}</span>Tactical
            </p>
            <p>
              <span className="text-white mr-1">{physical}</span>Physical
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
