import React from "react";
import DoctorCard from "./DoctorCard";
import Sidebar from "../common/SideBar";
import { LuLogOut } from "react-icons/lu";

const Dashboard = () => {
  const doctorsData = [
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
    {
      name: "Jon Doe",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, qui deleniti quisquam ullam ad officiis? description:",
    },
  ];
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
        <h2 className="text-xl sm:text-2xl mb-4 font-semibold">
          Hospitals Information - Hospital Name
        </h2>
        <h3 className="text-xl sm:text-2xl mb-16 text-center font-semibold mt-16">
          Available Doctors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctorsData.map((data, index) => (
            <DoctorCard key={index} doctorData={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
