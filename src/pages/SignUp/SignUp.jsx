import { useCallback, useEffect, useState } from "react";

import assets from "../../assets/assets";
//forms
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//router
import { useNavigate } from "react-router-dom";

//phoneinput
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useFetch from "../../api/hooks/useFetch";
import { login, signup } from "../../api/services/authService";
import Loader from "../../components/Loader/Loader";
import Toast from "../../components/Toast/Toast";
import { createFacility } from "../../api/services/facilityService";
import { useStateContext } from "../../context";

const SignUp = () => {
  const { setUser, setCurrentFacility } = useStateContext();
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/Dashboard/Reports");
    }
  }, []);

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is required."),
    facilityname: yup.string().required("Facility Name is required."),
    zipcode: yup.string().required("Zip Code is required."),
    password: yup.string().required("Password is required."),
    message: yup.string(),
    email: yup
      .string()
      .email("Please enter a valid Email")
      .required("Email is required."),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const getMyLocation = () => {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      location.getCurrentPosition(
        (position) => {
          return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        },
        (error) => {
          return { latitude: null, longitude: null };
        }
      );
    } else {
      return { latitude: null, longitude: null };
    }
  };

  const { errors } = formState;
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await signup(data);
      if (response.existingUser) {
        const loginResponse = await login({
          email: data.email,
          password: data.password,
        });
        if (loginResponse.existingUser) {
          localStorage.setItem("authToken", loginResponse.token);
          localStorage.setItem("isLoggedIn", true);
          setUser(loginResponse.existingUser);

          const body = {
            zip: data.zipcode,
            name: data.facilityname,
            location: getMyLocation(),
          };
          const facility = await createFacility(
            body,
            response.existingUser._id
          );
          setCurrentFacility(facility);
          showToast(response.message);
          navigate("/Dashboard/Reports");
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        showToast(err.response.data.message, "error");
      } else console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center items-center min-w-full min-h-screen bg-image relative">
      <div className="flex flex-col bg-white min-w-[508px] h-[900px] rounded-l-[20px] overflow-hidden my-5 mb-5">
        <div className="h-[50px] w-[508px] bg-primary flex justify-start items-center">
          <img src={assets.logo} className="px-5 w-auto h-[35px]" />
        </div>
        <div className="flex items-start justify-center h-full px-5 flex-col w-full">
          <div className="font-PJSextra text-[26px] ">Sign Up</div>
          <div className="font-PJSregular text-[14px] text-secondary ">
            Signing-up is a breeze!
          </div>
          {/* Input fields */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full"
          >
            <input
              {...register("name")}
              placeholder="Full Name"
              className="border outline-none border-secondaryThirty w-full mt-4 rounded-[10px] h-[50px] px-4 font-PJSmedium text-primary text-[14px]"
            />
            {errors.name && (
              <span className="error text-sm font-PJSmedium  text-redbutton">
                {errors.name.message}
              </span>
            )}
            <input
              {...register("facilityname")}
              placeholder="Facility Name"
              className="border outline-none border-secondaryThirty w-full mt-4 rounded-[10px] h-[50px] px-4 font-PJSmedium text-primary text-[14px]"
            />
            {errors.facilityname && (
              <span className="error text-sm font-PJSmedium  text-redbutton">
                {errors.facilityname.message}
              </span>
            )}
            <input
              {...register("email")}
              placeholder="Email Address"
              type="email"
              className="border outline-none border-secondaryThirty w-full mt-4 rounded-[10px] h-[50px] px-4 font-PJSmedium text-primary text-[14px]"
            />
            {/* {errors.email && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.email.message}</span>} */}

            <div className="mt-4">
              <PhoneInput
                country={"hn"}
                placeholder="Phone Number"
                value={value}
                onChange={(value) => setValue(value)}
                buttonStyle={{
                  borderColor: "rgba(132, 154, 184, 0.3)",
                  width: 132,
                  height: 50,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                }}
                dropdownStyle={{
                  width: 300,
                  height: 300,
                  position: "absolute",
                  marginLeft: 170,
                  marginTop: 260,
                }}
                inputStyle={{
                  borderColor: "rgba(132, 154, 184, 0.3)",
                  width: 315,
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: "white",
                  marginLeft: 150,
                }}
              />
            </div>

            <input
              {...register("zipcode")}
              placeholder="Zip Code"
              className="border outline-none border-secondaryThirty w-full mt-4 rounded-[10px] h-[50px] px-4 font-PJSmedium text-primary text-[14px]"
            />
            {/* {errors.zipcode && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.zipcode.message}</span>} */}
            <div className="w-full flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px] h-[50px] px-4">
              <input
                {...register("password")}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className=" font-PJSmedium text-primary text-[14px] outline-none appearance-none w-[80%]  h-full"
              />
              <div
                className="mr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? assets.eyeOpen : assets.eye}
                  className="w-6 h-6"
                />
              </div>
            </div>
            {/* {errors.password && <span className="error text-sm font-PJSmedium  text-redbutton">{errors.password.message}</span>} */}
            <textarea
              {...register("message")}
              placeholder="Additional Notes"
              className="w-full flex justify-between items-center border border-secondaryThirty mt-4 rounded-[10px]  py-2 px-4"
              rows={4}
            />

            <button
              type="submit"
              className="bg-lime w-full h-[50px] rounded-[100px] mt-4 text-[14px] font-PJSmedium transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign Up
            </button>
            <div className="flex justify-center items-center gap-1 bg-secondaryTen w-full h-[50px] rounded-[100px] mt-4 text-[14px] font-PJSregular transition duration-300 ease-in-out transform hover:scale-105">
              Already registered?
              <button
                onClick={() => navigate("/SignIn")}
                className="flex w-[60px] font-PJSbold"
              >
                Sign In
              </button>
            </div>
          </form>
          {/* Input fields */}
        </div>
      </div>
      <div className="min-w-[508px] h-[900px] rounded-r-[20px]">
        <img src={assets.bgImage} className="w-[508px] h-full" />
      </div>

      <Toast open={open} setOpen={setOpen} message={message} type={type} />

      {loading && <Loader />}
    </div>
  );
};

export default SignUp;
