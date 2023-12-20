import React from "react";

const DoctorLoading = () => {
  return (
    <div className="rounded-md p-4 w-full mx-auto m-4">
      <h2 className="text-xl sm:text-2xl mb-4 font-semibold">
        Hospitals Information
      </h2>
      <h3 className="text-xl sm:text-2xl mb-16 text-center font-semibold mt-16">
        Available Doctors
      </h3>
      <div className="animate-pulse flex flex-row flex-wrap">
        <div className="h-44 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 rounded-xl mt-8 w-64 ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 rounded mt-8 w-64 ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 rounded-xl mt-8 w-64 ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 rounded mt-8 w-64 ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-44 bg-slate-200 rounded-xl mt-8 w-64 ml-4 sm:ml-6"></div>
      </div>
    </div>
  );
};

export default DoctorLoading;
