import { useState } from "react";
import edit from "../../../assets/edit.svg";
import { useNavigate } from "react-router-dom";
import { useGetHospitalsQuery } from "../../../store/hospital/hospital";
import { useDeleteHospitalMutation } from "../../../store/hospital/hospital";
import Modal from "../common/Modal";
import HospitalLoading from "./HospitalLoading";
import Sidebar from "../common/SideBar";
import { LuLogOut } from "react-icons/lu";

const Admindashboard = () => {
  const { data: hospitals, error, isLoading } = useGetHospitalsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [deleteHospital, { isLoading: isDeleting }] =
    useDeleteHospitalMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);

  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setSelectedHospitalId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteHospital(selectedHospitalId);
    } catch (error) {
      alert("An error occurred while deleting the contest", error);
    }
    setConfirmDelete(false);
    setSelectedHospitalId(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setSelectedHospitalId(null);
  };

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-7 bg-[rgb(250,250,250)] min-h-screen">
          <h1 className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8">
            Care<span className="text-black">Link</span>
          </h1>
          <div className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden">
            <LuLogOut color="#131313" className="mt-1" />
            <p className="text-[#131313]">Log Out</p>
          </div>

          <Sidebar className="col-span-1 hidden sm:block" />
          <div className="col-span-7 m-10 ml-8 sm:ml-56 mr-8">
            <HospitalLoading />
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return <Error message={"An Error occurred while getting the hospitals"} />;
  }
  console.log(hospitals);
  const hospitalData = hospitals.value;
  const filteredhospitalData = hospitalData.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleDetailHospital = (id) => {
    navigate(`/detailHospital/${id}`);
  };
  const handleAddHospital = () => {
    navigate("/addHospital");
  };

  const handleEdit = (id) => {
    console.log(`Edit card with id ${id}`);
    navigate(`/editHospital/${id}`);
  };
  const handleLogout = () => {
    console.log("logout");
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currenthospitalData = filteredhospitalData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredhospitalData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <main className="grid grid-cols-7 bg-[rgb(250,250,250)] text-black min-h-screen max-w-full">
      <h1 className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8">
        Care<span className="text-black">Link</span>
      </h1>
      <div className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden">
        <LuLogOut color="#131313" className="mt-1" />
        <p className="text-[#131313]">Log Out</p>
      </div>

      <Sidebar className="col-span-1 hidden sm:block" />
      <div className="p-5 col-span-7 m-10 ml-8 sm:ml-56 mr-8">
        <div className="flex flex-col md:flex-row gap-16 ">
          <div className="flex flex-col w-full bg-[#FAFAFA] pl-3">
            <div className="flex bg-[#FAFAFA] items-center justify-center w-full text-3xl text-[#3E435D] font-semibold pt-10 pb-10 ml-6 ">
              Welcome, Dagim
            </div>
            <div className="text-xl font-semibold pb-4 md:pb-7">
              Hospitals Information
            </div>
            <div className="flex flex-col md:flex-row justify-between md:space-x-4 mb-5">
              <div className="mb-4 md:mb-0">
                <button
                  className="bg-[#C276F0] text-white font-bold py-2 px-10 rounded"
                  onClick={handleAddHospital}
                >
                  Add Hospital
                </button>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-2 w-full md:w-96 mb-4 md:mb-0 border rounded"
                />
              </div>
            </div>

            {currenthospitalData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shadow-sm">
                {currenthospitalData.map((card) => (
                  <div
                    key={card._id}
                    className="bg-white p-4 border rounded-2xl shadow relative"
                  >
                    <div className="flex flex-row items-center space-x-3">
                      <div className="">
                        <img
                          src={card.photo}
                          alt="Card"
                          className="w-14 h-9 rounded-lg"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{card.name}</h3>
                      </div>
                      <div
                        onClick={() => handleEdit(card._id)}
                        className="flex items-end cursor-pointer"
                      >
                        <img
                          src={edit}
                          alt="Edit"
                          className=""
                          // Add any styles you need for the edit icon
                        />
                      </div>
                    </div>
                    <div className="card-content">
                      <p
                        className="py-5 cursor-pointer text-sm mb-4"
                        onClick={() => handleDetailHospital(card._id)}
                      >
                        {card.description}
                      </p>
                      <div className="bottom-4 right-3 absolute">
                        <button
                          onClick={() => handleDelete(card._id)}
                          className="text-red-500 text-sm cursor-pointer"
                        >
                          Delete Hospital
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex text-3xl justify-center mt-4">
                Oops, No Hospital Found
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 md:mt-4 ml-2 md:ml-2">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-2 px-4 py-2 ${
                  currentPage === page
                    ? "bg-[#C276F0] text-white"
                    : "bg-gray-200"
                } rounded-lg`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
      {confirmDelete && (
        <Modal
          onClose={() => setConfirmDelete(false)}
          children={
            <div className="bg-white px-16 rounded-lg lg:text-lg py-8">
              <h1 className="font-bold">Are you sure?</h1>
              <p className="text-secondary-text">
                you want to delete this Hospital
              </p>
              <div className="flex justify-end mt-4 font-medium">
                <button
                  className="mr-5 hover:underline text-red-600"
                  onClick={handleConfirmDelete}
                >
                  Yes
                </button>
                <button
                  className="text-primary hover:underline"
                  onClick={handleCancelDelete}
                >
                  No
                </button>
              </div>
            </div>
          }
        />
      )}
    </main>
  );
};

export default Admindashboard;
