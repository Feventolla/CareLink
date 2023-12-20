import React from "react";

const IsDoctorCardLoading = () => {
  return (
    <div className="rounded-md p-4 w-full mx-auto m-4">
      <div className="animate-pulse flex flex-row flex-wrap">
        <div className="animate-pulse h-28 bg-slate-200 mt-8 w-64 rounded-xl ml-4 sm:ml-6"></div>
      </div>
    </div>
  );
};

export default IsDoctorCardLoading;
