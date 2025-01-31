import { Routes,Route } from "react-router-dom";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register";
import Home from "./Home.jsx";
import OtpVerify from "./Pages/public/Otp/OtpVerify";
import ReqAuth from "./Pages/Auth/ReqBack.jsx";
import Setting from "./Pages/public/Setting/Setting";
import Profile from "./Pages/public/Setting/Profile";
import Password from "./Pages/public/Setting/Password";
import Products from "./Pages/public/Products/Products";
import Product from "./Pages/public/Products/Product";
import ReqLogin from "./Pages/Auth/ReqLogin.jsx";
import AuthOtp from "./Pages/public/Otp/AuthOtp.jsx";

function App() {
  return (
    <Routes>
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product/>} />
      <Route path="/" element={<Home/>} />
      <Route element={<ReqLogin />}>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Route>
      <Route path="/verify/:hash" element={<OtpVerify/>} />
      <Route element={<ReqAuth />}>
      <Route path="/auth/verify" element={<AuthOtp/>} />
      <Route path="/setting" element={<Setting />}>
        <Route path="profile" element={<Profile />}/>
        <Route path="password" element={<Password />}/>
      </Route>
      </Route>
    </Routes>
  );
}

export default App;
