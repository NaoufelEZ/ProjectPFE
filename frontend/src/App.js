import { Routes,Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Home from "./Home";
import OtpVerfiy from "./Auth/otpVerfiy";
import ReqAuth from "./Auth/ReqAuth";
import Setting from "./Auth/Setting";
import Profile from "./Auth/Profile";
import Password from "./Auth/Password";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route element={<ReqAuth />}>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Route>
      <Route path="/verify" element={<OtpVerfiy/>} />
      <Route path="/setting" element={<Setting />}>
        <Route path="profile" element={<Profile />}/>
        <Route path="password" element={<Password />}/>
      </Route>
    </Routes>
  );
}

export default App;
