// import { useNavigate } from "react-router-dom";
// import Select from "react-select";
// function AddDoctors() {
//   const options = [
//     { value: "Monday", label: "Monday" },
//     { value: "Tuesday", label: "Tuesday" },
//     { value: "Wednesday", label: "Wednesday" },
//     { value: "Thursday", label: "Thursday" },
//     { value: "Friday", label: "Friday" },
//     { value: "Saturday", label: "Saturday" },
//     { value: "Sunday", label: "Sunday" },
//   ];
//   const navigate = useNavigate();
//   const handleAddDoctor = () => {
//     navigate("/detailHospital");
//   };
//   return (
//     <div>
//       <form onSubmit={handleAddDoctor}>
//         <label htmlFor="fname">First Name</label>
//         <input type="text" required placeholder="John" />
//         <br />

//         <label htmlFor="lname">Last Name</label>
//         <input type="text" required placeholder="Doe" />
//         <br />

//         <label htmlFor="phoneNumber">Phone Number</label>
//         <input
//           type="tel"
//           required
//           placeholder="251 967 765 789"
//           pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}"
//         />
//         <br />

//         <label htmlFor="email">Email</label>
//         <input type="email" required placeholder="johndoe45@gmail,com" />
//         <br />

//         <label htmlFor="specialization">Specialization</label>
//         <input type="text" required placeholder="surgeon" />
//         <br />

//         <label htmlFor="yearsOfExperience">Years of Experience</label>
//         <input type="number" required placeholder="3" />
//         <br />

//         <div>
//           <label htmlFor="gender">Gender</label>
//           <select name="geneder-select" required>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="workingdays">Availabilty</label>
//           <Select options={options}></Select>
//         </div>
//         <div>
//           <label htmlFor="startTime">Start Time</label>
//           <input type="time" required />
//           <label htmlFor="endTime">End Time</label>
//           <input type="time" required />
//         </div>

//         <label htmlFor="photo">Photo</label>
//         <input type="file" />
//         <br />
//         <button type="submit">Add Doctor</button>
//       </form>
//     </div>
//   );
// }
// export default AddDoctors;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Sidebar from "../dashboard/common/SideBar";
import { LuLogOut } from "react-icons/lu";

function AddDoctors() {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    specialization: "",
    phoneNumber: "",
    day: [],
    startTime: "",
    endTime: "",
    yearsOfExperience: "",
    gender: "",
    photo: null,
    hospitalId: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [selectedDays, setSelectedDays] = useState([]);

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
  const handleAddHospital = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    console.log(formData, "the form data");
    setFormData(initialState);
    navigate("/detailHospital");
  };
  const options = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
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

  return (
    <div className="grid grid-cols-7 bg-[rgb(250,250,250)] relative">
      <h1 className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8">
        Care<span className="text-black">Link</span>
      </h1>
      <div className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden">
        <LuLogOut color="#131313" className="mt-1" />
        <p className="text-[#131313]">Log Out</p>
      </div>

      <Sidebar className="col-span-1 hidden sm:block" />
      <div className="col-span-7 m-10 ml-8 sm:ml-56 mr-8">
        <h1 className="text-center font-bold text-2xl p-10">
          Doctors Information
        </h1>
        <h2 className="pb-10 text-xl font-bold">Add Doctor</h2>
        <form onSubmit={handleAddHospital}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm font-semibold mb-2">
                First Name
              </label>
              <input
                name="firstName"
                onChange={handleInputChange}
                type="text"
                required
                placeholder="John"
                className="py-2 px-2 rounded-lg border max-w-lg mb-6 focus:outline-none focus:ring-1 focus:border-[#035ECF]"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                name="lastName"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                required
                placeholder="Doe"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="email">
                email
              </label>
              <input
                name="email"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="email"
                required
                placeholder="johndoe45@gmail.com"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="startTime">
                Start Time
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
                End Time
              </label>
              <input
                name="endTime"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="time"
                required
                placeholder="6:00 PM"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-semibold mb-2"
                htmlFor="specialization"
              >
                Specialization
              </label>
              <input
                name="specialization"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="text"
                placeholder="www.tkuranbesa.com"
              />

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="phoneNumber"
              >
                Contact
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

              <label
                className="text-sm font-semibold mb-2"
                htmlFor="yearsOfExperience"
              >
                Years Of Experience
              </label>
              <input
                name="yearsOfExperience"
                onChange={handleInputChange}
                className="py-2 px-2 focus:outline-none focus:ring-1 focus:border-[#035ECF] rounded-lg border max-w-lg mb-6"
                type="number"
                required
                placeholder="5"
                min="0"
              />

              <label className="text-sm font-semibold mb-2" htmlFor="day">
                working days
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

              <label className="text-sm font-semibold mb-2" htmlFor="photo">
                Photo
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
            Add Hospital
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctors;
