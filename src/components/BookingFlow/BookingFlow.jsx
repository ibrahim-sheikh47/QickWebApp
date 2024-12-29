import React, { useState } from "react";
import AddBookingModal from "../AddBookingModal";
import AddUserOrTeamModal from "../AddUserOrTeamModal";

const BookingFlow = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({});

  const handleNext = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
    setStep(step + 1);
  };

  const handleCancel = () => {
    setStep(1);
    setBookingData({});
  };

  return (
    <div>
      {step === 1 && (
        <AddBookingModal
          isVisible={step === 1}
          onClose={handleCancel}
          onNext={handleNext}
        />
      )}
      {step === 2 && (
        <AddUserOrTeamModal
          isVisible={step === 2}
          onClose={handleCancel}
          onNext={handleNext}
        />
      )}
      {/* Add more steps as needed */}
    </div>
  );
};

export default BookingFlow;
