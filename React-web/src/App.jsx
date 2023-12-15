import { useState } from "react";
import Dashboard from "./component/DoctorDetail/DoctorDetail";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;
