import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { useGetDoctorQuery } from "../../../store/doctor/doctor-api";
import { useUpdateDoctorMutation } from "../../../store/doctor/doctor-api";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../store/auth/auth-slice";
import EditLoading from "../common/EditLoading";
import Sidebar from "../common/SideBar";
import { getCookie } from "../../../utils/cookie";

function EditDoctor() {
  const [updateDoctor, { isLoaing: isUpdating }] = useUpdateDoctorMutation();
  const { doctorId } = useParams();
  const { data: response, isLoading, error } = useGetDoctorQuery(doctorId);
  const [formData, setFormData] = useState({});
  const [currLanguage, setCurrLanguage] = useState(
    getCookie("language") || "en"
  );
  const [careerStartTime, setCareerStartTime] = useState("");
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/logout");
  };

  useEffect(() => {
    if (response) {
      const curr = response.value;
      const careerStartTimeFormat = new Date(
        curr.careerStartTime.year,
        curr.careerStartTime.month - 1,
        1,
        0,
        0,
        0,
        0
      );
      const month =
        `${careerStartTimeFormat.getMonth()}`.length == 2
          ? `${careerStartTimeFormat.getMonth() + 1}`
          : `0${careerStartTimeFormat.getMonth() + 1}`;
      setCareerStartTime(`${careerStartTimeFormat.getFullYear()}-${month}-01`);

      const currHospital = {
        firstName: `${
          getCookie("language") === "en" ? curr.firstName : curr.amhFirstName
        }`,
        lastName: `${
          getCookie("language") === "en" ? curr.lastName : curr.amhLastName
        }`,

        specialization: `${
          getCookie("language") === "en"
            ? curr.specialization
            : curr.amhSpecialization
        }`,

        gender: curr.gender,
        hospitalId: curr.hospitalId,
      };
      setFormData(currHospital);
    }
  }, [response, doctorId]);
  const navigate = useNavigate();
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
  const handleEditDoctor = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      specialization,
      gender,
      photo,
      hospitalId,
    } = formData;
    const formDataToSend = new FormData();
    const careerStartTimeParts = careerStartTime.split("-");
    formDataToSend.append("firstName", firstName);
    formDataToSend.append("lastName", lastName);
    formDataToSend.append("specialization", specialization);
    formDataToSend.append(
      "careerStartTime[year]",
      parseInt(careerStartTimeParts[0])
    );
    formDataToSend.append(
      "careerStartTime[month]",
      parseInt(careerStartTimeParts[1])
    );
    formDataToSend.append("gender", gender);
    formDataToSend.append("hospitalId", hospitalId);
    formDataToSend.append("language", currLanguage);

    if (photo) {
      formDataToSend.append("photo", photo, photo.name);
    }

    try {
      await updateDoctor({
        doctor: formDataToSend,
        id: doctorId,
      }).unwrap();
      setFormData({});
      navigate(`/detailHospital/${hospitalId}`);
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
        <h1 className="text-center font-bold text-2xl p-10">
          {currLanguage === "en" ? "Doctors Information" : "የዶክተር መረጃ"}
        </h1>
        <h2 className="pb-10 text-xl font-bold">
          {currLanguage === "am" ? "ዶክተር ቀይር" : "Edit Doctor"}
        </h2>
        <form onSubmit={handleEditDoctor}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold mb-2">
                {currLanguage === "am" ? "ስም" : "First Name"}
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                type="text"
                required
                placeholder="John"
                className="py-2 px-2 rounded-lg border max-w-lg mb-6 focus:outline-none focus:ring-1 focus:border-[#035ECF]"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="lastName">
                {currLanguage === "am" ? "የአባት ስም" : "Last Name"}
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                required
                placeholder="Doe"
              />

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="specialization"
              >
                {currLanguage === "am" ? "ስፔሻላይዜሽን" : "Specialization"}
              </label>
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                placeholder="www.tkuranbesa.com"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="gender">
                {currLanguage === "am" ? "ጾታ" : "Gender"}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                required
              >
                <option value="" disabled selected>
                  {currLanguage === "am" ? "ጾታ ይምረጡ" : "Select Gender"}
                </option>
                <option value="Female">
                  {currLanguage === "am" ? "ሴት" : "Female"}
                </option>
                <option value="Male">
                  {currLanguage === "am" ? "ወንድ" : "Male"}
                </option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-semibold mb-2"
                htmlFor="careerStartTime"
              >
                {currLanguage === "am" ? "የስራ መነሻ ቀን" : "Career Start Time"}
              </label>
              <input
                name="careerStartTime"
                value={careerStartTime}
                onChange={(e) => setCareerStartTime(e.target.value)}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="date"
                required
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
            className="bg-[#C276F0] py-2 px-16 text-white rounded-full shadow-md hover:shadow-lg hover:opacity-70"
          >
            {isUpdating ? (
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
                  currLanguage === "am" ? "ዶክተር ቀይር" : "Edit Doctor";
                return <span>{contentToDisplay}</span>;
              })()
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditDoctor;
