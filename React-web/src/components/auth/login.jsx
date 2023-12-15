import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/adminDashboard");
  };
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" />

        <label htmlFor="password">Password</label>
        <input type="password" />

        <label htmlFor="name">Name</label>
        <input type="text" />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
