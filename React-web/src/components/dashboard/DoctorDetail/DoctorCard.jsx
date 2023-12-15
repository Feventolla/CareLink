/* eslint-disable react/prop-types */
import DocImage from "../../../assets/images/doctor/doc5.jpeg";
import { BiEdit } from "react-icons/bi";

const DoctorCard = ({ doctorData }) => {
  return (
    <div className="bg-white py-4 px-6 rounded-lg shadow-lg relative">
      <BiEdit className="absolute right-4 top-4" size={22} />
      <img
        src={DocImage}
        alt="Doctor"
        className="w-24 h-20 object-cover mb-4 rounded-xl mx-auto"
      />
      <h4 className="font-bold mb-4">{doctorData.name}</h4>
      <p className="text-gray-600 text-sm">{doctorData.description}</p>
      <div className="flex justify-end mt-4">
        <button className="text-red-500 text-sm">Delete Doctor</button>
      </div>
    </div>
  );
};

export default DoctorCard;
