/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import AppModal from "../AppModal/AppModal";

const LeagueRuleModal = ({ modalOpen, onClose }) => {
  return (
    <div>
      <AppModal
        modalopen={modalOpen}
        onClose={onClose}
        title="Waiver"
        width={"560px"}
        height={"100%"}
        customStyles={{
          modal: { padding: 20 },
        }}
      >
        <div className="relative text-sm font-PJSmedium text-primary">
          <p className="text-xl font-PJSbold mb-5">League Rules</p>

          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 150px)" }} // Adjust this value based on your layout needs
          >
            <p>
              League Rules for Green Fields Miami Soccer Facility <br />
              League Rules and Regulations <br />
              <br />
              To ensure a fun, fair, and safe environment for all participants,
              the following rules apply to the [League Name]: <br />
              <br /> Game Duration <br />
              <br /> Matches consist of two halves, each lasting [insert
              minutes]. A [insert-minute] halftime break is provided. <br />{" "}
              Team Composition <br /> <br /> Teams must have [insert number]
              players on the field, including a goalkeeper. <br />A minimum of
              [insert number] players is required to start the match. <br />{" "}
              Player Eligibility <br /> <br /> All participants must register
              and sign the league waiver before participating. <br />{" "}
              Substitutes must be registered and approved before the match.{" "}
              <br />
              Sportsmanship <br />
              <br /> Respect referees, players, and staff. Unsportsmanlike
              behavior (e.g., foul language, aggressive play) will result in
              warnings or ejection. <br /> Uniforms and Equipment <br />
              <br /> Teams must wear matching jerseys with visible numbers.{" "}
              <br /> Shin guards are mandatory. <br /> Only cleats approved by
              the facility are allowed on the field. <br /> Match Rules <br />
              <br /> FIFA rules apply unless otherwise stated. <br /> Slide
              tackles are [allowed/not allowed] (clarify). <br /> The referee's
              decision is final. <br />
              Schedule and Punctuality <br />
              <br /> Teams must arrive at least [insert minutes] before their
              scheduled match time. <br /> Late arrivals may result in
              forfeiture. <br />
              <br />
              Scoring and Standings <br />
              <br /> Points are awarded as follows: 3 points for a win, 1 point
              for a draw, 0 points for a loss. <br /> Tiebreakers are determined
              by goal difference, head-to-head results, and goals scored. <br />
              Disciplinary Actions <br />
              <br /> Yellow cards result in a [insert-minute] penalty. <br />{" "}
              Red cards result in ejection and suspension for the next game.{" "}
              <br /> Weather Policy <br />
              <br /> Matches canceled due to weather will be rescheduled. Check
              facility notifications for updates. <br /> By participating, all
              players agree to adhere to these rules. <br /> Green Fields Miami
              Soccer Facility reserves the right to modify rules and regulations
              as needed.
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-3 w-full rounded-full bg-lime h-[54px]"
          >
            Done
          </button>
        </div>
      </AppModal>
    </div>
  );
};

export default LeagueRuleModal;
