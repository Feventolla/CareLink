import { RxDashboard } from "react-icons/rx";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../../../store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { getCookie } from "../../../utils/cookie";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate("/adminDashboard");
  };

  const handleLogOut = () => {
    dispatch(clearToken());
    navigate("/logout");
  };

  return (
    <div className="bg-white h-screen fixed top-0 left-0 hidden sm:block">
      <div
        className="flex flex-row absolute bottom-3 left-2 gap-2 cursor-pointer"
        onClick={handleLogOut}
      >
        <LuLogOut color="#131313" className="mt-1" />
        <p className="text-[#131313]">
          {getCookie("language") === "en" ? "Log Out" : "ውጣ"}
        </p>
      </div>

      <div className="m-6">
        <h1
          className="text-3xl font-semibold text-[#C276F0] cursor-pointer"
          onClick={() => handleDashboard()}
        >
          Care<span className="text-black">Link</span>
        </h1>
        <div
          className="flex flex-row gap-4 mt-12 cursor-pointer"
          onClick={() => handleDashboard()}
        >
          <RxDashboard color="#C276F0" size={18} />{" "}
          <p className="text-sm text-[#C276F0]">
            {getCookie("language") === "en" ? "DashBoard" : "ዳሽቦርድ"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
