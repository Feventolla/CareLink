import { Routes, Route } from "react-router-dom";
import Admindashboard from "./components/dashboard/adminDashboard";
import Login from "./components/auth/login";
import Dashboard from "./components/dashboard/DoctorDetail/DoctorDetail";
import RegisterHospitals from "./components/hospitals/register_hospitals";
import AddDoctors from "./components/hospitals/register_doctors";

function App() {
  // const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/adminDashboard" element={<Admindashboard />} />
      <Route path="/detailHospital" element={<Dashboard />} />
      <Route path="/addHospital" element={<RegisterHospitals />} />
      <Route path="/addDoctor" element={<AddDoctors />} />
    </Routes>
  );
}

export default App;
