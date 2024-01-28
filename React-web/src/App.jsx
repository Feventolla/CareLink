import { Routes, Route } from "react-router-dom";
import Admindashboard from "./components/dashboard/hospital/adminDashboard";
import Login from "./components/auth/login";
import DoctorDetail from "./components/dashboard/Doctor/DoctorDetail";
import RegisterHospitals from "./components/dashboard/hospital/RegisterHospital";
import AddDoctors from "./components/dashboard/doctor/RegisterDoctor";
import EditDoctor from "./components/dashboard/doctor/EditDoctor";
import EditHospital from "./components/dashboard/hospital/EditHospital";

function App() {
  // const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/adminDashboard" element={<Admindashboard />} />
      <Route path="/detailHospital/:hospitalId" element={<DoctorDetail />} />
      <Route path="/addHospital" element={<RegisterHospitals />} />
      <Route path="/addDoctor/:hospitalId" element={<AddDoctors />} />
      <Route path="/editHospital/:hospitalId" element={<EditHospital />} />
      <Route path="/editDoctor/:doctorId" element={<EditDoctor />} />
    </Routes>
  );
}

export default App;
