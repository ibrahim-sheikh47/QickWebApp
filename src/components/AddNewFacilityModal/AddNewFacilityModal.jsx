import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import assets from "../../assets/assets";
import AppModal from "../AppModal/AppModal";
import { useState } from "react";
import { useStateContext } from "../../context";
import { createFacility } from "../../api/services/facilityService";
import { uploadFile } from "../../api/services/uploadService";

// Define Yup Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  zip: yup
    .string()
    .matches(/^\d{5}$/, "ZIP Code must be 5 digits")
    .required("ZIP Code is required"),
  address: yup.string().required("Address is required"),
});

const AddNewFacilityModal = ({ isModalOpen, closeModal, setLoading }) => {
  const { setCurrentFacility, user } = useStateContext();
  const [image, setImage] = useState(assets.placeholder);
  const [imageFile, setImageFile] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (upload) => {
        setImage(upload.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      zip: "",
      address: "",
    },
  });

  const upload = (file) => {
    return new Promise(async (resolve, reject) => {
      if (!file) {
        reject(null);
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        resolve(await uploadFile(formData));
      } catch (error) {
        reject(null);
      }
    });
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let icon = "";
      if (imageFile !== null) {
        icon = await upload(imageFile);
      }

      const body = {
        ...data,
        icon: icon,
        location: getMyLocation(),
      };
      const facility = await createFacility(body, user._id);
      setCurrentFacility(facility);
      closeModal("addNew");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <AppModal
      modalopen={isModalOpen.addNew}
      onClose={() => closeModal("addNew")}
      customStyles={{
        overlay: { position: "fixed", top: 0, left: 0, right: 0 },
        modal: {
          position: "absolute",
          top: "35%",
          left: "35%",
          transform: "translate(-50%, -50%)",
          margin: "0",
          maxHeight: "50vh",
          width: "40%",
          overflowY: "auto",
          borderRadius: "8px",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-4">
        <p className="text-lg font-PJSbold">Add New Facility</p>
        <div className="flex flex-col gap-4 justify-center items-center mt-10 relative">
          <img
            style={{ border: "1px solid #ddd" }}
            className="w-[104px] h-[104px] rounded-full object-cover"
            src={image}
            alt="Facility"
          />
          <div
            className="absolute top-0 w-[104px] h-[104px] flex items-center justify-center hover:bg-black hover:bg-opacity-40 rounded-full cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <div className="w-[30px] bg-black bg-opacity-40 rounded-full p-[2px]">
              <img className="w-[30px]" src={assets.cameraIcon} />
            </div>
          </div>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-PJSregular">Name</label>
          <input
            type="text"
            className="w-full mt-2 border rounded-md p-2"
            placeholder="Enter Facility Name"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-PJSregular">ZIP Code</label>
          <input
            type="text"
            className="w-full mt-2 border rounded-md p-2"
            placeholder="Enter ZIP code"
            {...register("zip")}
          />
          {errors.zip && (
            <p className="text-red-500 text-sm">{errors.zip.message}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block text-sm font-PJSregular">Address</label>
          <textarea
            className="w-full mt-2 border rounded-md p-2"
            placeholder="Enter address"
            rows="3"
            {...register("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-6 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
        >
          Add Facility
        </button>
      </form>
    </AppModal>
  );
};

export default AddNewFacilityModal;
