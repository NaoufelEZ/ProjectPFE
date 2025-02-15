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
import HeaderTest from "./Components/HeaderTest.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Users from "./Pages/Dashboard/Users.jsx";
import ReqRule from "./Pages/Auth/ReqRule.jsx";
import Err404 from "./Pages/public/Errors/Err404.jsx";
import Order from "./Pages/public/Products/Order.jsx";
import ForgetPassword from "./Pages/Auth/ForgetPassword.jsx";
import PasswordVerify from "./Pages/public/Otp/PasswordVerify.jsx";
import ChangePassword from "./Pages/public/Otp/ChangePassword.jsx";
import Test from "./Pages/public/Otp/Test.jsx";

function App() {
  return (
    <Routes>
      <Route path="/test1" element={<Test />} />
      <Route path="/order" element={<Order />} />
      <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/password/verify/:token" element={<PasswordVerify />} />
      <Route path="/password/change/:token" element={<ChangePassword />} />
      <Route path="/test" element={<HeaderTest />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product/>} />
      <Route path="/" element={<Home/>} />
      <Route path="/*" element={<Err404 />} />
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
      {/* Protected Routes*/}
      <Route element={<ReqRule allowedRule={["Admin","Product Manager"]}/>}>
        <Route path="/dashboard" element={<Dashboard />}>
        {/* Admin */}
          <Route element={<ReqRule allowedRule={["Admin"]}/>}>
            <Route path="users" element={<Users />} />
            <Route path="user/add" element={<Users />} />
          </Route>
          {/* Product Manger */}
          <Route element={<ReqRule allowedRule={["Admin","Product Manager"]}/>}>
            <Route path="products" element={<Users />} />
            <Route path="product/add" element={<Users />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
