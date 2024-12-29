import { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { amenitiesData } from "../../../constants/profile-index";
import AppModal from "../../../components/AppModal/AppModal";
import { useStateContext } from "../../../context";
import { uploadFile } from "../../../api/services/uploadService";
import Toast from "../../../components/Toast/Toast";
import Loader from "../../../components/Loader/Loader";
import { editFacility } from "../../../api/services/facilityService";
import endpoints from "../../../api/endpoints";

const MyFacility = () => {
  const { user, currentFacility, setCurrentFacility } = useStateContext();
  const [image, setImage] = useState(
    currentFacility &&
      currentFacility.icon &&
      currentFacility.icon !== null &&
      currentFacility.icon.trim() !== ""
      ? currentFacility.icon
      : assets.placeholder
  );
  const [imageFile, setImageFile] = useState(null);
  const [bannerImage, setBannerImage] = useState(
    currentFacility &&
      currentFacility.bannerAdPhotos.length > 0 &&
      currentFacility.bannerAdPhotos[0] !== null
      ? currentFacility.bannerAdPhotos[0]
      : null
  );
  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState(
    currentFacility && currentFacility.amenities
  );
  const [photos, setPhotos] = useState(currentFacility.facilityPhotos);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [fieldNames, setFieldNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

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

  const handleBannerImageUpload = (event) => {
    const bannerFile = event.target.files[0];
    if (bannerFile) {
      setBannerImageFile(bannerFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerImage(e.target.result);
      };
      reader.readAsDataURL(bannerFile);
    }
  };

  const handleFileUpload2 = (e) => {
    const files = Array.from(e.target.files);
    setPhotoFiles(files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
    setFieldNames((prevFieldNames) => [
      ...prevFieldNames,
      ...Array(newPhotos.length).fill(""),
    ]);
  };

  const openModal = (index) => {
    setModalOpen(index);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const handleFieldNameChange = (index, value) => {
    const newFieldNames = [...fieldNames];
    newFieldNames[index] = value;
    setFieldNames(newFieldNames);
  };

  const handleSaveChanges = () => {
    closeModal();
  };

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(
        selectedAmenities.filter((item) => item !== amenity)
      );
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const validationSchema = yup.object().shape({
    facilityName: yup.string().required("Facility Name is required"),
    zipCode: yup.string().required("Zip Code is required"),
    writtenAddress: yup.string().required("Written Address is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    let facilityPhoto = image;
    let bannerPhoto = bannerImage;
    let facilityPhotos = photos.filter((p) => p.includes("https"));
    try {
      if (
        facilityPhoto !== assets.placeholder &&
        !facilityPhoto.includes("https")
      ) {
        facilityPhoto = await upload(imageFile);
      }
      if (bannerPhoto != null && !bannerPhoto.includes("https")) {
        bannerPhoto = await upload(bannerImageFile);
      }
      if (photoFiles.length > 0) {
        facilityPhotos = await Promise.all(photoFiles.map((p) => upload(p)));
      }

      const body = {
        name: data.facilityName,
        zip: data.zipCode,
        address: data.writtenAddress,
        icon: facilityPhoto,
        facilityPhotos: facilityPhotos,
        bannerAdPhotos: [bannerPhoto],
        amenities: selectedAmenities,
      };
      const facility = await editFacility(body, currentFacility._id);
      setCurrentFacility(facility);
      window.location.reload();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...photos];
    const newFieldNames = [...fieldNames];
    newPhotos.splice(index, 1);
    newFieldNames.splice(index, 1);
    setPhotos(newPhotos);
    setFieldNames(newFieldNames);
    closeModal();
  };

  const upload = async (file) => {
    if (!file) {
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      return await uploadFile(formData);
    } catch (error) {
      return null;
    }
  };

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  return (
    <div className="mx-3">
      <div className="flex items-center justify-between">
        <p className="font-PJSbold text-xl">My Facility</p>
        <p className="text-sm border-2 border-secondaryTwenty hover:bg-secondaryTwenty rounded-full px-6 py-2 cursor-pointer font-PJSregular">
          Edit
        </p>
      </div>
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
          onChange={handleImageUpload}
          accept="image/*"
        />
        <p className="text-lg font-PJSbold">
          {currentFacility ? currentFacility.name : ""}
        </p>
      </div>
      <p className="font-PJSbold text-xl mt-10">Account Details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 mt-5">
          <div className="relative mt-5">
            <input
              {...register("facilityName")}
              className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[340px] h-[54px]`}
              type="text"
              value={currentFacility ? currentFacility.name : ""}
            />
            <label
              htmlFor="FacilityName"
              className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
            >
              Facility Name*
            </label>
            {errors.facilityName && (
              <p className="text-red-500">{errors.facilityName.message}</p>
            )}
          </div>
          <div className="relative mt-5">
            <input
              {...register("zipCode")}
              className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-[340px] h-[54px]`}
              type="text"
              value={currentFacility ? currentFacility.zip : ""}
            />
            <label
              htmlFor="ZipCode"
              className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
            >
              Zip Code*
            </label>
            {errors.zipCode && (
              <p className="text-red-500">{errors.zipCode.message}</p>
            )}
          </div>
        </div>
        <div className="mt-10 w-[700px]">
          <p className="font-PJSbold text-xl mb-3">Amenities</p>
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex gap-4">
              {amenitiesData.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <p
                    className={`font-PJSregular text-sm whitespace-nowrap border px-4 py-3 rounded-xl cursor-pointer ${
                      selectedAmenities.includes(amenity)
                        ? "bg-blue text-white"
                        : "text-black"
                    }`}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="font-PJSbold text-xl mb-3">Facility’s Location</p>
          <div className="relative mt-5">
            <input
              {...register("writtenAddress")}
              className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]`}
              type="text"
              value={currentFacility ? currentFacility.address : ""}
            />
            <label
              htmlFor="WrittenAddress"
              className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
            >
              Written Address*
            </label>
            {errors.writtenAddress && (
              <p className="text-red-500">{errors.writtenAddress.message}</p>
            )}
          </div>
        </div>
        <div className="mt-5">
          <img className="w-full" src={assets.googleMap} alt="Google Map" />
        </div>
        <div className="mt-10">
          <p className="font-PJSbold text-xl mb-3">Upload Facility Images</p>
          <div className="overflow-x-auto no-scrollbar w-[100%]">
            <div className="flex gap-7 min-w-[max-content]">
              <div className="w-44 h-44 rounded-xl border-secondaryThirty border-2 flex justify-center items-center">
                <div className="text-center min-w-44">
                  <label htmlFor="uploadInput" className="cursor-pointer">
                    <img
                      src={assets.PhotoIcon}
                      alt="Upload Icon"
                      className="mx-auto mb-2"
                    />
                    <p className="font-PJSmedium">Upload Photos</p>
                  </label>
                  <input
                    type="file"
                    id="uploadInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload2}
                    multiple
                  />
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-44 h-44 flex justify-center items-center cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <img
                      src={photo}
                      alt={`Uploaded photo ${index}`}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {hoveredIndex === index && (
                      <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-xl">
                        <img
                          src={assets.edit}
                          className="object-cover"
                          onClick={() => openModal(index)}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-3 left-4">
                      <p className="text-white font-PJSbold text-sm">
                        {fieldNames[index]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {photos.map((photo, index) => (
                <AppModal
                  key={index}
                  onClose={closeModal}
                  modalopen={modalOpen === index}
                  height="auto"
                  width="500px"
                >
                  <div>
                    <p className="text-[20px] font-PJSbold">Edit Photo</p>
                    <div className="relative mt-5">
                      <input
                        className={`block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]`}
                        type="text"
                        value={fieldNames[index]}
                        onChange={(e) =>
                          handleFieldNameChange(index, e.target.value)
                        }
                      />
                      <label
                        htmlFor="FieldName"
                        className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
                      >
                        Field Name
                      </label>
                    </div>
                  </div>
                  <img
                    src={photo}
                    alt={`Modal photo ${index}`}
                    className="w-full h-[230px] object-cover rounded-xl mt-5"
                  />
                  <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
                    <button
                      onClick={handleDeletePhoto}
                      className="w-[220px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full border-redbutton border-2 font-PJSmedium justify-center items-center text-redbutton"
                    >
                      Delete Photo
                    </button>
                    <button
                      className="w-[220px] transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                      onClick={() => handleSaveChanges(index)}
                    >
                      Save Changes
                    </button>
                  </div>
                </AppModal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="font-PJSbold text-xl mb-3">Upload Banner Ads</p>
          <div className="w-full h-[165px] rounded-lg border-secondaryThirty border-2 flex justify-center items-center overflow-hidden relative">
            {bannerImage ? (
              <img
                src={bannerImage}
                alt="Uploaded"
                className="w-full h-[165px] object-cover"
              />
            ) : (
              <div className="text-center">
                <img
                  src={assets.PhotoIcon}
                  alt="Upload Icon"
                  className="mx-auto mb-2"
                />
                <p>Upload Photos</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerImageUpload}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Save Changes
          </button>
        </div>
      </form>

      <Toast open={open} setOpen={setOpen} message={message} type={type} />

      {loading && <Loader />}
    </div>
  );
};
export default MyFacility;
