import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate Name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Validate Email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    // Validate Password
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      // Proceed with form submission
      navigate("/adminDashboard");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <main className="flex flex-col md:flex-row h-screen w-screen text-black ml-10 md:ml-2">
      <div className="w-1/4 bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-3xl font-semibold text-[#C276F0] pt-10 pl-10 bg-white h-full w-48">
          Care<span className="text-black">Link</span>
        </div>
      </div>

      <div className="w-[30em] md:w-3/4 bg-[#FAFAFA] p-8 md:p-10">
        <h1 className="text-3xl font-semibold flex items-center justify-center text-[#C276F0] mt-8 md:mt-8">
          Admin Login
        </h1>

        <form
          onSubmit={handlesubmit}
          className="flex flex-col gap-4 p-4 md:p-10"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Maria Stephen"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input input-bordered max-w-lg p-3 border-solid border-2 border-gray-300 rounded-xl focus:outline-none ${
                errors.name ? "" : ""
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="maria@email.com"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input input-bordered max-w-lg p-3 border-solid border-2 border-gray-300 rounded-xl focus:outline-none ${
                errors.email ? "" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="........."
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`input input-bordered max-w-lg p-3 border-solid border-2 border-gray-300 rounded-xl focus:outline-none ${
                errors.password ? "" : ""
              }`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          <button className="bg-[#C276F0] text-white font-bold py-2 px-5 max-w-lg rounded-lg">
            Login
          </button>
        </form>
      </div>

      <div className=" w-0  bg-[#C276F0] rounded-tl-[7em] rounded-bl-[7em] lg:w-[60em] h-full"></div>
    </main>
  );
}

export default Login;
