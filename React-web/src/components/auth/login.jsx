import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/adminDashboard");
  };

  return (
    <main className="flex h-screen w-screen text-black">
      {/* Left Section - Form */}
      <div
        style={{}}
        className="flex items-center justify-center bg-[#FAFAFA] "
      >
        <div className="text-3xl font-semibold text-[#C276F0] pt-10 pl-10  bg-white  h-full w-48">
          Care<span className="text-black">Link</span>
        </div>
        <div className="w-[40em] h-full   ">
          <h1 className="text-3xl font-semibold flex items-center justify-center text-[#C276F0] mt-40 ">
            Admin Login
          </h1>
          <div className="p-10 pl-32 ">
            <form onSubmit={handlesubmit}>
              <div className="flex flex-col gap-3 ">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder="Maria Stephen"
                  name="name"
                  id="name"
                  className="input input-bordered w-[25em] max-w-lg  ml-4 p-3 border-solid border-2 border-gray-300 rounded-xl "
                />
              </div>
              <br />
              <div className="flex flex-col gap-3">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  placeholder="maria@email.com"
                  name="email"
                  id="email"
                  className="input input-bordered w-[25em] max-w-lg ml-4 p-2 border-solid border-2 border-gray-300 rounded-xl"
                />
              </div>
              <br />
              <div className="flex flex-col gap-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  placeholder="+251-923-123-13"
                  name="password"
                  id="password"
                  className="input input-bordered w-[25em] max-w-lg ml-4 p-2 border-solid border-2 border-gray-300 rounded-xl"
                />
              </div>
              <br />

              <button
                className="bg-[#C276F0] text-white font-bold py-2 px-16 rounded-lg"
                type="sumbit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-[#C276F0] rounded-tl-[7em] rounded-bl-[7em] "></div>
    </main>
  );
}
//  {ErrorMessage ? (
//       <p className="text-red-500 text-2xl"> {ErrorMessage}</p>
//     ) : null}

export default Login;
