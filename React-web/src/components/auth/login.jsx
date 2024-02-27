import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../../store/auth/auth-api";
import { setToken } from "../../store/auth/auth-slice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let [
    signInUser,
    {
      data: signinData,
      isError: isSigninError,
      isSuccess: isSigninSuccess,
      error: signInError,
      isLoading: isSigninLoading,
    },
  ] = useLoginUserMutation();

  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

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
      signInUser(formData);
      // Proceed with form submission
      // navigate("/adminDashboard");
    }
  };

  useEffect(() => {
    if (isSigninSuccess) {
      const authData = signinData;
      console.log("autData####", authData);
      dispatch(
        setToken({
          email: authData.value.patient.email,
          token: authData.value.token,
          role: authData.value.patient.role,
          language: "en",
        })
      );
      if (authData.value.patient.role === "admin") {
        navigate("/adminDashboard");
      } else {
        setErrors({ ...errors, isAuthorized: "Something went wrong." });
      }
    }
    if (isSigninError && signInError) {
      const customError = signInError;
      if (!customError.data) {
        setErrors({ ...errors, fromBackEnd: "Something went wrong." });
      } else if (customError.data.error) {
        const error = customError.data.error[0];
        const propertyName =
          error.propertyName.charAt(0).toLowerCase() +
          error.propertyName.slice(1);
        if (propertyName === "password") {
          setErrors({ ...errors, password: error.errorMessage });
        } else if (propertyName === "email") {
          setErrors({ ...errors, email: error.errorMessage });
        }
      } else if (customError.data.message) {
        setErrors({ ...errors, fromBackEnd: customError.data.message });
      }
      isSigninLoading = false;
    }
  }, [signinData, isSigninSuccess, isSigninError]);

  return (
    <main className="flex flex-col md:flex-row h-screen w-screen text-black ml-10 md:ml-2 over">
      <div className="w-1/4 bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-3xl font-semibold text-[#C276F0] pt-10 pl-10 bg-white h-full w-48">
          Care<span className="text-black">Link</span>
        </div>
      </div>

      <div className="w-[30em] md:w-3/4 bg-[#FAFAFA] p-8 md:p-10">
        <h1 className="text-3xl font-semibold flex items-center justify-center text-[#C276F0] mt-8 md:mt-24">
          Admin Login
        </h1>

        <form
          onSubmit={handlesubmit}
          className="flex flex-col gap-4 p-4 md:p-10"
        >
          {errors.fromBackEnd && (
            <div>
              <p className="text-red-500 font-bold">{errors.fromBackEnd}</p>
            </div>
          )}
          {errors.isAuthorized && (
            <div>
              <p className="text-red-500 font-bold">
                You are not registed as an admin!
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3 font-semibold">
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

          <div className="flex flex-col gap-3 font-semibold">
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

          <button className="bg-[#C276F0] text-white font-bold py-2 px-5 max-w-lg rounded-lg shadow-md hover:shadow-lg hover:opacity-70">
            {isSigninLoading ? (
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
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>

      <div className="w-0 bg-[#C276F0] rounded-tl-[7em] rounded-bl-[7em] lg:w-[60em] h-full"></div>
    </main>
  );
}

export default Login;
