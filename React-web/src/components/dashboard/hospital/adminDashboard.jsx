import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetHospitalsQuery } from "../../../store/hospital/hospital-api";
import { useDeleteHospitalMutation } from "../../../store/hospital/hospital-api";
import { LuLogOut } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../store/auth/auth-slice";
import edit from "../../../assets/edit.svg";
import Modal from "../common/Modal";
import HospitalLoading from "./HospitalLoading";
import Sidebar from "../common/SideBar";

const Admindashboard = () => {
  const { data: hospitals, isError, isLoading, error } = useGetHospitalsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [deleteHospital, { isLoading: isDeleting }] =
    useDeleteHospitalMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState(null);
  const dispatch = useDispatch();
  const handleDashboard = () => {
    navigate("/adminDashboard");
  };

  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setSelectedHospitalId(id);
  };
  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/logout");
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
          <h1
            className="text-3xl font-semibold text-[#C276F0] block sm:hidden ml-8 mt-8 cursor-pointer"
            onClick={() => handleDashboard()}
          >
            Care<span className="text-black">Link</span>
          </h1>
          <div
            className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden cursor-pointer"
            onClick={handleLogOut}
          >
            <LuLogOut color="#131313" className="mt-1" />
            <p className="text-[#131313]">Log Out</p>
          </div>

          <Sidebar className="col-span-1 hidden sm:block" />
          <div className="col-span-7 m-10 ml-8 sm:ml-56 mr-8">
            <div className="flex bg-[#FAFAFA] items-center justify-center w-full text-3xl text-[#3E435D] font-semibold pt-10 pb-10 ml-6 ">
              Welcome
            </div>
            <div className="text-xl font-semibold pb-4 md:pb-7">
              Hospitals Information
            </div>
            <HospitalLoading />
          </div>
        </div>
      </div>
    );
  }
  if (isError || error) {
    // eslint-disable-next-line react/jsx-no-undef
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
  // const handleLogout = () => {
  //   console.log("logout");
  // };

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
      <div
        className="flex flex-row absolute top-10 right-2 gap-2 sm:hidden cursor-pointer"
        onClick={handleLogOut}
      >
        <LuLogOut color="#131313" className="mt-1" />
        <p className="text-[#131313]">Log Out</p>
      </div>

      <Sidebar className="col-span-1 hidden sm:block" />
      <div className="p-5 col-span-7 m-10 ml-8 sm:ml-56 mr-8">
        <div className="flex flex-col md:flex-row gap-16 ">
          <div className="flex flex-col w-full bg-[#FAFAFA] pl-3">
            <div className="flex bg-[#FAFAFA] items-center justify-center w-full text-3xl text-[#3E435D] font-semibold pt-10 pb-10 ml-6 ">
              Welcome
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
                  className="p-2 w-full md:w-96 mb-4 md:mb-0 border rounded focus:outline-none"
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
                      <div
                        className="py-5 cursor-pointer text-sm mb-4"
                        onClick={() => handleDetailHospital(card._id)}
                      >
                        {card.description.length > 150 ? (
                          <>{`${card.description.slice(0, 150)}...`}</>
                        ) : (
                          card.description
                        )}
                      </div>
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
          // eslint-disable-next-line react/no-children-prop
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
              {isDeleting && (
                <div role="status" className="mx-auto flex justify-c">
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
                  <span className="sr-only">deleting...</span>
                </div>
              )}
            </div>
          }
        />
      )}
    </main>
  );
};

export default Admindashboard;
