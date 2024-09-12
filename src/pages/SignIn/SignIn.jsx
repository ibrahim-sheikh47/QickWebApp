/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

//images
import image from "../../assets/SignIn.png";
import logo from "../../assets/logo.png";
import eye from "../../assets/svgs/EyeSlash.svg";
import eyeOpen from "../../assets/view.png";
//forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//react
import { useState } from "react";

//router
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const formSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please provide a valid email!")
      .required("Email is required."),
    password: yup.string().required("Password is required."),
  });
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const { errors } = formState;
  const onSubmit = (data) => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState(false);

  console.log("rerender");
  return (
    <div className="flex justify-center items-center min-w-full min-h-screen bg-image relative">
      <div className="flex flex-col bg-white min-w-[508px] h-[560px] rounded-l-[20px] overflow-hidden">
        <div className="h-[50px] w-[508px] bg-primary flex justify-start items-center">
          <img src={logo} className="px-5 w-auto h-[36px]" />
        </div>
        <div className="flex items-start justify-center h-full px-5 flex-col w-full">
          <div className="font-PJSextra text-[26px] ">Sign In</div>
          <div className="font-PJSregular text-[14px] text-secondary ">
            Please sign-in into your account
          </div>
          {/* Input fields */}
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mt-5 w-full">
              <input
                id="email"
                {...register("email")}
                className={`border outline-none border-secondaryThirty w-full mt-4 pt-4 rounded-[10px] h-[50px] px-4 font-PJSmedium text-primary text-sm`}
              />
              <label htmlFor="email" className="absolute top-6 left-4 w-full text-secondary font-PJSmedium text-xs">
                Email Address
              </label>
              {/* {errors.email && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.email.message}</span>} */}
            </div>
            <div className="relative mt-5 flex items-center border border-secondaryThirty h-[50px] rounded-[10px]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`outline-none w-full mt-4 px-4 font-PJSmedium text-primary text-sm`}
              />
              <label htmlFor="password" className="absolute top-[6px] left-4 text-secondary font-PJSmedium text-xs">
                Password
              </label>
              <div className="mr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                <img src={showPassword ? eyeOpen : eye} className="w-6 h-6" />
              </div>
            </div>
            {/* {errors.password && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.password.message}</span>} */}
            <button
              type="submit"
              onClick={() => navigate("/Dashboard")}
              className="bg-lime w-full h-[50px] rounded-[100px] mt-4 text-[14px] font-PJSmedium transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign In
            </button>
            <div className="flex justify-center items-center gap-1 bg-secondaryTen w-full h-[50px] rounded-[100px] mt-4 text-[14px] font-PJSregular transition duration-300 ease-in-out transform hover:scale-105">
              Don't have an account?
              <button onClick={() => navigate("/SignUp")} className="flex w-[60px] font-PJSbold">
                Sign Up
              </button>
            </div>
            <div className="flex justify-center items-center w-full">
              <button className="flex justify-center items-center mt-4 text-blue font-PJSmedium text-[14px]">
                Forgot your password?
              </button>
            </div>
          </form>
          {/* Input fields */}
        </div>
      </div>
      <div className="min-w-[508px] h-[560px] ">
        <img src={image} className="w-[508px] h-full object-cover rounded-r-[20px]" />
      </div>
    </div>
  );
};

export default SignIn;
