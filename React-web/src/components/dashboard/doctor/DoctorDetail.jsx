import Sidebar from "../common/SideBar";
import { LuLogOut } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHospitalQuery } from "../../../store/hospital/hospital";
import DoctorCard from "./DoctorCard";
import DoctorLoading from "./DoctorLoading";

const DoctorDetail = () => {
  const { hospitalId } = useParams();
  const { data: response, error, isLoading } = useGetHospitalQuery(hospitalId);
  const navigate = useNavigate();
  const handleAddDoctor = (id) => {
    navigate(`/addDoctor/${id}`);
  };

  if (isLoading) {
    return (
      <>
        {" "}
        <div className="grid grid-cols-7 bg-[rgb(250,250,250)] relative min-h-screen">
          <h1 className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8">
            Care<span className="text-black">Link</span>
          </h1>
          <div className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden">
            <LuLogOut color="#131313" className="mt-1" />
            <p className="text-[#131313]">Log Out</p>
          </div>

          <Sidebar className="col-span-1 hidden sm:block" />
          <div className="col-span-7 m-10 ml-8 sm:ml-56 mr-8">
            <DoctorLoading />
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return <Error message={"An Error occurred while getting the hospital"} />;
  }

  const hospitalData = response.hospital;
  const doctorsId = hospitalData.doctors;
  return (
    <div className="grid grid-cols-7 bg-[rgb(250,250,250)] relative min-h-screen">
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
          Hospitals Information -{hospitalData.name}
        </h2>
        <h3 className="text-xl sm:text-2xl mb-16 text-center font-semibold mt-16">
          Available Doctors
        </h3>
        <div className="mb-5">
          <button
            className="bg-[#C276F0] text-white font-bold py-2 px-10 rounded"
            onClick={() => handleAddDoctor(hospitalData._id)}
          >
            Add Doctor
          </button>
        </div>
        {doctorsId.length >= 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {doctorsId.map((id) => (
              <DoctorCard key={id} doctorId={id} hospitalId={hospitalId} />
            ))}
          </div>
        ) : (
          <div className="text-start text-2xl font-bold mt-8">
            No Doctors Added Yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDetail;
