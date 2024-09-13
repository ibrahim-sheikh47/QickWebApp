import { Link } from "react-router-dom";
import assets from "../assets/assets";

const SplashScreen = () => {
  return (
    <div className="splash-screen relative h-screen items-center justify-center">
      <img className="blur-md w-full h-full object-cover" src={assets.splash} alt="" />

      <img className="absolute top-[45%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60" src={assets.logo} alt="" />

      <Link to='/SignIn'>
        <button className="justify-center mx-auto text-center items-center px-40 py-5 absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#9CFC38] rounded-full transition duration-300 ease-in-out hover:scale-105 font-semibold" type="submit">
          Get Started
        </button>
      </Link>

    </div>
  );
};

export default SplashScreen;
