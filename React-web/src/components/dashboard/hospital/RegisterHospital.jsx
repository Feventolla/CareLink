import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useCreateHospitalMutation } from "../../../store/hospital/hospital-api";
import { clearToken } from "../../../store/auth/auth-slice";
import Sidebar from "../common/SideBar";
import { useDispatch } from "react-redux";
import { setLanguage } from "../../../store/auth/auth-slice";
import { getCookie } from "../../../utils/cookie";

function RegisterHospital() {
  const initialState = {
    name: "",
    generalSpecialization: "",
    description: "",
    address: "",
    phoneNumber: "",
    startTime: "",
    endTime: "",
    webSite: "",
    photo: null,
  };

  const [formData, setFormData] = useState(initialState);
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [createHospital, { isLoading }] = useCreateHospitalMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currLanguage, setCurrLanguage] = useState(
    getCookie("language") || "en"
  );

  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/logout");
  };

  const options = [
    {
      value: "Monday",
      label: `${currLanguage === "am" ? "ሰኞ" : "Monday"}`,
    },
    {
      value: "Tuesday",
      label: `${currLanguage === "am" ? "ማክሰኞ" : "Tuesday"}`,
    },
    {
      value: "Wednesday",
      label: `${currLanguage === "am" ? "ረቡዕ" : "Wednesday"}`,
    },
    {
      value: "Thursday",
      label: `${currLanguage === "am" ? "ሐሙስ" : "Thursday"}`,
    },
    { value: "Friday", label: `${currLanguage === "am" ? "አርብ" : "Friday"}` },
    {
      value: "Saturday",
      label: `${currLanguage === "am" ? "ቅዳሜ" : "Saturday"}`,
    },
    {
      value: "Sunday",
      label: `${currLanguage === "am" ? "እሁድ" : "Sunday"}`,
    },
  ];

  const hospitlaServices = [
    {
      valeu: "Emergency",
      lable: `${currLanguage === "am" ? "ድንገተኛ አደጋ" : "Emergency"}`,
    },
    {
      value: "Maternity",
      lable: `${currLanguage === "am" ? "የወሊድ" : "Maternity"}`,
    },
    {
      value: "Radiolgy",
      lable: `${currLanguage === "am" ? "Radiolgy" : "ራዲዮሎጂ"}`,
    },
    {
      value: "Cardiology",
      lable: `${currLanguage === "am" ? "ካርዲዮሎጂ" : "Cardiology"}`,
    },
    {
      value: "sergury",
      lable: `${currLanguage === "am" ? "ቀዶ ጥገና" : "sergury"}`,
    },
    {
      value: "Laboratory",
      lable: `${currLanguage === "am" ? "ላቦራቶሪ" : "Laboratory"}`,
    },
    {
      value: "Physiotherapy",
      lable: `${currLanguage === "am" ? "ፊዚዮቴራፒ" : "Physiotherapy"}`,
    },
  ];

  const toggleDay = (selectedDay) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(selectedDay)) {
        return prevSelectedDays.filter((day) => day !== selectedDay);
      } else {
        return [...prevSelectedDays, selectedDay];
      }
    });
  };

  const toggleService = (selectedService) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(selectedService)) {
        return prevSelectedServices.filter((day) => day !== selectedService);
      } else {
        return [...prevSelectedServices, selectedService];
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };
  const handleLanguageToggle = () => {
    const newLanguage = currLanguage === "am" ? "en" : "am";
    dispatch(setLanguage({ language: newLanguage }));
    setCurrLanguage(newLanguage);
  };

  const handleAddHospital = async (e) => {
    e.preventDefault();

    const {
      name,
      generalSpecialization,
      description,
      address,
      webSite,
      phoneNumber,
      startTime,
      endTime,
      photo,
    } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("generalSpecialization", generalSpecialization);
    formDataToSend.append("description", description);
    formDataToSend.append("address", address);
    formDataToSend.append("webSite", webSite);
    formDataToSend.append("phoneNumber", phoneNumber);
    if (photo) {
      formDataToSend.append("photo", photo, photo.name);
    }

    for (const service in selectedServices) {
      formDataToSend.append("services[]", selectedServices[service]);
    }
    for (const day in selectedDays) {
      formDataToSend.append("availability[day][]", selectedDays[day]);
    }
    formDataToSend.append("availability[startTime]", startTime);
    formDataToSend.append("availability[endTime]", endTime);
    formDataToSend.append("language", getCookie("language") || "en");
    try {
      const response = await createHospital(formDataToSend).unwrap();
      setFormData(initialState);
      navigate("/adminDashboard");
    } catch (error) {
      // setBackendError(`An error occurred : ${error.data.title}`);
      console.log("An error occurred", error);
    }
  };

  return (
    <div className="grid grid-cols-7 bg-[rgb(250,250,250)] relative">
      <h1 className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8">
        Care<span className="text-black">Link</span>
      </h1>
      <div
        className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden cursor-pointer"
        onClick={handleLogOut}
      >
        <LuLogOut color="#131313" className="mt-1" />
        <p className="text-[#131313]">
          {getCookie("language") === "en" ? "Log Out" : "ውጣ"}
        </p>
      </div>

      <Sidebar className="col-span-1 hidden sm:block" />
      <div className="col-span-7 m-10 ml-8 sm:ml-56 mr-8">
        <div className="flex items-end justify-end">
          <button
            onClick={handleLanguageToggle}
            className="flex justify-self-end"
          >
            {currLanguage === "am" ? "English" : "Amharic"}
          </button>
        </div>

        <h1 className="sm:text-center font-bold text-2xl sm:p-10 mb-6 sm:pb-0">
          {currLanguage === "am" ? "የሆስፒታል መረጃ" : "Hospital Information"}
        </h1>

        <h2 className="pb-6 sm:pb-10 text-lg sm:text-xl font-bold">
          {currLanguage === "am" ? "ሆስፒታል ጨምር" : "Add Hospital"}
        </h2>

        <form onSubmit={handleAddHospital}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              {/* {backEndError && <p className="text-red-500">{backEndError}</p>} */}
              <label htmlFor="name" className="text-sm font-semibold mb-2">
                {currLanguage === "am" ? "የሆስፒታል ስም" : "Hospital Name"}
              </label>
              <input
                name="name"
                onChange={handleInputChange}
                type="text"
                required
                placeholder={currLanguage === "am" ? "ጥቁር አንበሳ" : "Tkur Anbesa"}
                className="py-2 px-2 rounded-lg border max-w-lg mb-6 focus:outline-none focus:ring-1 focus:border-[#035ECF]"
              />

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="generalSpecialization"
              >
                {currLanguage === "am"
                  ? "አጠቃላይ ስፔሻላይዜሽን"
                  : "General Specialization"}
              </label>
              <input
                name="generalSpecialization"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                required
                placeholder="General Specialization"
              />

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="description"
              >
                {currLanguage === "am" ? "ስለ ሆስፒታል" : "About Hospital"}
              </label>
              <input
                name="description"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                required
                placeholder="write here about the hospital"
              />
              <label className="text-sm font-semibold mb-2" htmlFor="address">
                {currLanguage === "am" ? "አድራሻ" : "Address"}
              </label>
              <input
                name="address"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                placeholder="Addis Ababa, Arada Subcity"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="webSite">
                {currLanguage === "am" ? "ድህረገፅ" : "webSite"}
              </label>
              <input
                name="webSite"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="url"
                placeholder="www.tkuranbesa.com"
              />

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="phoneNumber"
              >
                {currLanguage === "am" ? "ስልክ ቁጥር" : "Contact"}
              </label>
              <input
                name="phoneNumber"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="tel"
                required
                placeholder="+251 967 765 789"
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-3" htmlFor="services">
                {currLanguage === "am" ? "አገልግሎቶች" : "Services"}
              </label>

              <div className="flex space-x-2 flex-wrap mb-4">
                {hospitlaServices.map((service, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toggleService(service.value)}
                    className={`py-1 px-2 rounded-lg text-xs mb-2 ${
                      selectedServices.includes(service.value)
                        ? "bg-[#C276F0] text-white"
                        : "bg-white border border-[#C276F0] text-[#C276F0]"
                    }`}
                  >
                    {service.lable}
                  </button>
                ))}
              </div>
              <label className="text-sm font-semibold mb-3" htmlFor="day">
                {currLanguage === "am" ? "የስራ ቀን" : "Working Day"}
              </label>

              <div className="flex space-x-2 flex-wrap mb-4">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleDay(option.value)}
                    className={`py-1 px-2 rounded-lg text-xs mb-2 ${
                      selectedDays.includes(option.value)
                        ? "bg-[#C276F0] text-white"
                        : "bg-white border border-[#C276F0] text-[#C276F0]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <label className="text-sm font-semibold mb-2" htmlFor="startTime">
                {currLanguage === "am" ? "የመክፈቻ ሰአት" : "Opening Time"}
              </label>
              <input
                name="startTime"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="time"
                required
                placeholder="08:00 AM"
              />
              <label className="text-sm font-semibold mb-2" htmlFor="endTime">
                {currLanguage === "am" ? "የመዝጊያ ሰአት" : "Closing Time"}
              </label>
              <input
                name="endTime"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="time"
                required
                placeholder="6:00 PM "
              />

              <label className="text-sm font-semibold mb-2" htmlFor="photo">
                {currLanguage === "am" ? "ፎቶ" : "Photo"}
              </label>
              <input
                name="photo"
                onChange={handleFileChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="file"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#C276F0] py-2 px-16 text-white rounded-full shadow-md hover:shadow-lg hover:opacity-70 transition duration-300"
          >
            {isLoading ? (
              <div role="status" className="mx-auto flex justify-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-100 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              (() => {
                const contentToDisplay =
                  currLanguage === "am" ? "ሆስፒታል ጨምር" : "Add Hospital";
                return <span>{contentToDisplay}</span>;
              })()
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterHospital;
