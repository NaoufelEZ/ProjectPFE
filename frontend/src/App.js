import { Routes,Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home";
import OtpVerfiy from "./Auth/otpVerfiy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/verify" element={<OtpVerfiy/>} />
    </Routes>
  );
}

export default App;
