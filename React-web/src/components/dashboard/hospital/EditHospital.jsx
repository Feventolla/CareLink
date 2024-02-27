import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHospitalQuery } from "../../../store/hospital/hospital-api";
import { useUpdateHospitalMutation } from "../../../store/hospital/hospital-api";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../store/auth/auth-slice";
import Sidebar from "../common/SideBar";
import EditLoading from "../common/EditLoading";
import { getCookie } from "../../../utils/cookie";

function EditHospital() {
  const [updateHospital, { isLoaing: isUpdating }] =
    useUpdateHospitalMutation();

  const { hospitalId } = useParams();

  const {
    data: response,
    isLoading,
    error,
  } = useGetHospitalQuery(hospitalId.toString());

  const [formData, setFormData] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [currLanguage, setCurrLanguage] = useState(
    getCookie("language") || "en"
  );
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/logout");
  };
  useEffect(() => {
    if (response) {
      const curr = response.hospital;
      const currHospital = {
        name: `${currLanguage === "en" ? curr.name : curr.amhName}`,
        generalSpecialization: `${
          currLanguage === "en"
            ? curr.generalSpecialization
            : curr.amhGeneralSpecialization
        }`,
        description: `${
          currLanguage === "en" ? curr.description : curr.amhDescription
        }`,
        address: `${currLanguage === "en" ? curr.address : curr.amhAddress}`,
        webSite: curr.webSite,
        phoneNumber: curr.phoneNumber,
        startTime: curr.availability.startTime,
        endTime: curr.availability.endTime,
        photo: "",
      };
      setFormData(currHospital);
      setSelectedDays(curr.availability.day);

      setSelectedServices(curr.services);
    }
  }, [response, hospitalId]);

  const navigate = useNavigate();

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
      value: "Emergency",
      lable: `${currLanguage === "am" ? "ድንገተኛ አደጋ" : "Emergency"}`,
    },
    {
      value: "Maternity",
      lable: `${currLanguage === "am" ? "የወሊድ" : "Maternity"}`,
    },
    {
      value: "Radiolgy",
      lable: `${currLanguage === "am" ? "ራዲዮሎጂ" : "Radiolgy"}`,
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

  const handleEditHospital = async (e) => {

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
    formDataToSend.append("language", getCookie("language"));

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

    try {
      const response = await updateHospital({
        hospital: formDataToSend,
        id: hospitalId,
      }).unwrap();

      setFormData({});
      navigate("/adminDashboard");
    } catch (error) {
      // setBackendError(`An error occurred : ${error.data.title}`);
      console.log("An error occurred", error);
    }
  };

  if (isLoading) {
    return <EditLoading />;
  }
  if (error) {
    return <Error message={"An Error occurred while getting the hospital"} />;
  }

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
        <h1 className="sm:text-center font-bold text-2xl sm:p-10 mb-6 sm:pb-0">
          {currLanguage === "am" ? "የሆስፒታል መረጃ" : "Hospital Information"}
        </h1>
        <h2 className="pb-6 sm:p b-10 text-lg sm:text-xl font-bold">
          {currLanguage === "am" ? "ሆስፒታል ቀይር" : "Edit Hospital"}
        </h2>
        <form onSubmit={handleEditHospital}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold mb-2">
                {currLanguage === "am" ? "የሆስፒታል ስም" : "Hospital Name"}
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                type="text"
                required
                placeholder="Tkur Anbesa"
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
                value={formData.generalSpecialization}
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                required
                placeholder="General Hospital"
              />

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="description"
              >
                {currLanguage === "am" ? "ስለ ሆስፒታል" : "About Hospital"}
              </label>
              <input
                name="description"
                value={formData.description}
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
                value={formData.address}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                required
                placeholder="Addis Ababa, Arada Subcity"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="webSite">
                {currLanguage === "am" ? "ድህረገፅ" : "webSite"}
              </label>
              <input
                name="webSite"
                value={formData.webSite}
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
                value={formData.phoneNumber}
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
                Working Day
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
                value={formData.startTime}
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
                value={formData.endTime}
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
            {isUpdating ? (
              <p>Updating...</p>
            ) : (
              (() => {
                const contentToDisplay =
                  currLanguage === "am" ? "ሆስፒታል ቀይር" : "Edit Hospital";
                return <span>{contentToDisplay}</span>;
              })()
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditHospital;
