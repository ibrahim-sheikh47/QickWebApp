import { Link, useNavigate } from "react-router-dom";
import assets from "../assets/assets";
import { useEffect } from "react";
import useNotificationPermission from "../RequestPermission";

const SplashScreen = () => {
  const navigate = useNavigate();
  const requestPermission = useNotificationPermission();

  useEffect(() => {
    // localStorage.clear();
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/Dashboard/Reports");
    }
  }, []);

  return (
    <div className="splash-screen relative h-screen items-center justify-center">
      <img
        className="blur-md w-full h-full object-cover"
        src={assets.splash}
        alt=""
      />

      <img
        className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60"
        src={assets.logo}
        alt=""
      />

      <button
        onClick={() => {
          requestPermission();
          navigate("/SignIn");
        }}
        className="justify-center mx-auto text-center items-center px-40 py-5 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#9CFC38] rounded-full transition duration-300 ease-in-out hover:scale-105 font-semibold"
        type="button"
      >
        Get Started
      </button>
    </div>
  );
};

export default SplashScreen;
