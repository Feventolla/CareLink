import React from "react";
import { LuLogOut } from "react-icons/lu";
import Sidebar from "../common/SideBar";

const EditLoading = () => {
  return (
    <div className="grid grid-cols-7 sm:mt-24">
      <h1 className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8">
        Care<span className="text-black">Link</span>
      </h1>
      <div className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden">
        <LuLogOut color="#131313" className="mt-1" />
        <p className="text-[#131313]">Log Out</p>
      </div>

      <Sidebar className="col-span-1 hidden sm:block" />
      <div className="rounded-md p-4 mx-auto m-4 col-span-7 ml-8 sm:ml-44 mr-8">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="animate-pulse flex flex-col flex-wrap">
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
          </div>
          <div className="animate-pulse flex flex-col flex-wrap">
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
            <div className="animate-pulse h-8 bg-slate-200 mt-8 rounded-md ml-4 sm:ml-6 max-w-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLoading;
