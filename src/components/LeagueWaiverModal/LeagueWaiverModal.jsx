/* eslint-disable react/prop-types */
import AppModal from "../AppModal/AppModal";

const LeagueWaiverModal = ({ modalOpen, onClose }) => {
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
          <p className="text-xl font-PJSbold mb-5">League Waiver</p>

          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(100vh - 150px)" }} // Adjust this value based on your layout needs
          >
            <p>
              League Waiver for Green Fields Miami Soccer Facility <br />
              League Waiver and Release of Liability <br />
              Green Fields Miami Soccer Facility <br />
              Effective [Insert Date] <br />
              <br />
              By signing this waiver, I acknowledge and agree to the following
              terms and conditions for participation in the [League Name]
              organized by Green Fields Miami Soccer Facility: <br />
              <br />
              Assumption of Risk <br />
              I understand that participating in soccer activities involves
              inherent risks, including but not limited to physical injury,
              accidents, or property damage. I voluntarily assume all risks
              associated with my participation.
              <br />
              <br />
              Release of Liability <br />
              I release, waive, and discharge Green Fields Miami Soccer
              Facility, its owners, staff, agents, and league organizers from
              any and all claims, demands, actions, or causes of action related
              to injuries, damages, or losses incurred during my participation
              in the league.
              <br />
              <br />
              Medical Treatment <br />
              I authorize Green Fields Miami Soccer Facility to provide or
              arrange for emergency medical care in the event of an injury or
              emergency. I agree to bear the cost of any such treatment.
              <br />
              <br />
              Code of Conduct <br />
              I agree to abide by all league rules, facility policies, and
              sportsmanship guidelines. I understand that failure to comply may
              result in suspension or removal from the league.
              <br />
              <br />
              Photography/Media Release <br />
              I grant permission to Green Fields Miami Soccer Facility to use
              photographs or videos taken during league activities for
              promotional or marketing purposes.
              <br />
              Acknowledgment and Agreement: <br />I have read, understood, and
              agree to the terms of this waiver. I understand that by signing
              this document, I waive certain legal rights, including the right
              to sue.
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

export default LeagueWaiverModal;
