import React from "react";

const HospitalLoading = () => {
  return (
    <div className="rounded-md p-4 w-full mx-auto m-4">
      <div className="animate-pulse flex flex-row flex-wrap">
        <div className="h-52 bg-slate-200 mt-8 w-52 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 rounded-xl mt-8 w-52 ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 rounded mt-8 w-52 ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 mt-8 w-52 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 rounded-xl mt-8 w-52 ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 rounded mt-8 w-52 ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 mt-8 w-52 rounded-xl ml-4 sm:ml-6"></div>
        <div className="h-52 bg-slate-200 rounded-xl mt-8 w-52 ml-4 sm:ml-6"></div>
      </div>
    </div>
  );
};

export default HospitalLoading;
