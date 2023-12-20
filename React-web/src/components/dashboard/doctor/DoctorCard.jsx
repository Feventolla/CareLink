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
import IsDoctorCardLoading from "./IsDoctorCardLoading";

const DoctorCard = ({ doctorId, hospitalId }) => {
  const navigate = useNavigate();
  const handleEditDoctor = () => {
    navigate(`/editDoctor/${doctorId}`);
  };
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const handleDelete = async (id) => {
    setConfirmDelete(true);
    setSelectedDoctorId(id);
  };
  const { refetch: refetchHospitalData } = useGetHospitalQuery(hospitalId);
  const handleConfirmDelete = async () => {
    try {
      await deleteDoctor(selectedDoctorId);
      refetchHospitalData();
    } catch (error) {
      // Handle contest deletion error
      alert("An error occurred while deleting the contest", error);
    }
    setConfirmDelete(false);
    setSelectedDoctorId(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setSelectedDoctorId(null);
  };
  const { data: response, isLoading, error } = useGetDoctorQuery(doctorId);
  if (isLoading) {
    return;
  }
  if (error) {
    <div>Error</div>;
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
      <p className="text-gray-600 text-sm">{doctor.specialization}</p>
      <div className="flex justify-end mt-4">
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
            </div>
          }
        />
      )}
    </div>
  );
};

export default DoctorCard;
