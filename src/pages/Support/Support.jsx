import { useState } from "react";
import assets from "../../assets/assets";
import Toast from "../../components/Toast/Toast";
import Loader from "../../components/Loader/Loader";

const SupportPage = () => {
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [type, setType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setToastMessage("Your request has been submitted successfully!");
      setType("success");
      setOpen(true);
      setEmail("");
      setRequest("");
    } catch (err) {
      setToastMessage("Failed to submit request. Please try again.");
      setType("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-[90vh] bg-white rounded-[16px] p-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b border-secondaryTwenty">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondaryTen flex items-center justify-center">
            <img src={assets.support} alt="Support" className="w-6 h-6" />
          </div>
          <h1 className="font-PJSbold text-[24px]">Support Center</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-[40%]">
          <div className="my-8">
            <h2 className="font-PJSbold text-[20px] mb-2">
              How can we help you?
            </h2>
            <p className="font-PJSregular text-secondary">
              Describe your issue and we'll get back to you soon
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="font-PJSmedium text-[14px] block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 rounded-full border border-secondaryThirty font-PJSregular focus:outline-none focus:ring-2 focus:ring-lime-300"
                  placeholder="your@email.com"
                />
                <img
                  src={assets.mail}
                  className="absolute right-4 top-3 w-6 h-6 opacity-50"
                  alt="Email"
                />
              </div>
            </div>

            {/* Request Input */}
            <div className="space-y-2">
              <label className="font-PJSmedium text-[14px] block">
                Your Request
              </label>
              <textarea
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-[16px] border border-secondaryThirty font-PJSregular focus:outline-none focus:ring-2 focus:ring-lime-300 resize-none"
                placeholder="Describe your issue in detail..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-lime font-PJSbold text-white hover:bg-limeDark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <Loader size={24} color="white" /> : "Submit Request"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-secondaryTen text-center mb-8">
            <p className="font-PJSregular text-secondary mb-4">
              Prefer other contact methods?
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="tel:+50487328251"
                className="flex items-center gap-2 font-PJSmedium"
              >
                <img src={assets.phone} className="w-5 h-5" alt="Phone" />
                +(504) 87328251
              </a>
              <a
                href="mailto:justin@qick.app"
                className="flex items-center gap-2 font-PJSmedium"
              >
                <img src={assets.mail} className="w-5 h-5" alt="Email" />
                justin@qick.app
              </a>
            </div>
          </div>
        </div>
      </div>

      <Toast open={open} setOpen={setOpen} message={toastMessage} type={type} />
    </div>
  );
};

export default SupportPage;
