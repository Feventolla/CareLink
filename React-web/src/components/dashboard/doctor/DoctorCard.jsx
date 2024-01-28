/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  useGetDoctorQuery,
  useDeleteDoctorMutation,
} from "../../../store/doctor/doctor-api";
import { useGetHospitalQuery } from "../../../store/hospital/hospital";
import Modal from "../common/Modal";
import Error from "../common/Error";

const DoctorCard = ({ doctorId, hospitalId }) => {
  const navigate = useNavigate();
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const { refetch: refetchHospitalData } = useGetHospitalQuery(hospitalId);
  const { data: response, isLoading, error } = useGetDoctorQuery(doctorId);

  const handleEditDoctor = () => {
    navigate(`/editDoctor/${doctorId}`);
  };

  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setSelectedDoctorId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteDoctor(selectedDoctorId);
      refetchHospitalData();
    } catch (error) {
      alert("An error occurred while deleting the contest", error);
    }
    setConfirmDelete(false);
    setSelectedDoctorId(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setSelectedDoctorId(null);
  };

  if (isLoading) {
    return;
  }

  if (error) {
    <Error message={"An Error occurred while getting the doctor"} />;
  }

  const doctor = response.value;

  if (!doctor) {
    return;
  }

  return (
    <div className="bg-white py-4 px-6 rounded-lg shadow-lg relative">
      <BiEdit
        className="absolute right-4 top-4 cursor-pointer"
        size={22}
        onClick={handleEditDoctor}
      />
      <img
        src={doctor.photo}
        alt="Doctor"
        className="w-24 h-20 object-cover mb-4 rounded-xl mx-auto"
      />
      <h4 className="font-bold mb-4">{doctor.firstName}</h4>
      <p className="text-gray-600 text-sm mb-4">{doctor.specialization}</p>
      <div className="flex justify-end mt-4 absolute bottom-4 right-4">
        <button
          className="text-red-500 text-sm cursor-pointer"
          onClick={() => handleDelete(doctor._id)}
        >
          Delete Doctor
        </button>
      </div>
      {confirmDelete && (
        <Modal
          onClose={() => setConfirmDelete(false)}
          children={
            <div className="bg-white px-16 rounded-lg lg:text-lg py-8">
              <h1 className="font-bold">Are you sure?</h1>
              <p className="text-secondary-text">
                you want to delete this Doctor
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
                <div role="status" className="mx-auto flex justify-center">
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
    </div>
  );
};

export default DoctorCard;
