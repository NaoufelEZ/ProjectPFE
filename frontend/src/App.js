import { Routes,Route, Navigate } from "react-router-dom";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register";
import OtpVerify from "./Pages/public/Otp/OtpVerify";
import ReqAuth from "./Pages/Auth/ReqBack.jsx";
import Setting from "./Pages/public/Setting/Setting";
import Profile from "./Pages/public/Setting/Profile";
import Products from "./Pages/public/Products/Products";
import Product from "./Pages/public/Products/Product";
import ReqLogin from "./Pages/Auth/ReqLogin.jsx";
import AuthOtp from "./Pages/public/Otp/AuthOtp.jsx";
import HeaderTest from "./Components/Header2.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx";
import Users from "./Pages/Dashboard/Admin/Users.jsx";
import ReqRule from "./Pages/Auth/ReqRule.jsx";
import Err404 from "./Pages/public/Errors/Err404.jsx";
import ForgetPassword from "./Pages/Auth/ForgetPassword.jsx";
import PasswordVerify from "./Pages/public/Otp/PasswordVerify.jsx";
import ChangePassword from "./Pages/public/Otp/ChangePassword.jsx";
import DashboardProducts from "./Pages/Dashboard/ProductManger/Products.jsx";
import AddUsers from "./Pages/Dashboard/Admin/AddUsers.jsx";
import AddProduct from "./Pages/Dashboard/ProductManger/AddProduct.jsx";
import Header2 from "./Components/Header2.jsx";
import Checkout from "./Pages/public/Products/Checkout.jsx";
import AddressBox from "./Pages/public/Products/AddressBox.jsx";
import New from "./Pages/public/Products/New.jsx";
import Purchases from "./Pages/public/Setting/Purchases.jsx";
import SavedAddresses from "./Pages/public/Setting/SavedAddresses.jsx";
import AccountChangePassword from "./Pages/public/Setting/AccountChangePassword.jsx";
import AccountChangeEmail from "./Pages/public/Setting/AccountChangeEmail.jsx";
import Employers from "./Pages/Dashboard/Admin/Employers.jsx";
import Message from "./Pages/Dashboard/Admin/Message.jsx";
import OverviewManger from "./Pages/Dashboard/ProductManger/Overview.jsx";
import Address from "./Pages/public/Setting/Address.jsx";
import Home from "./Pages/Home.jsx";
import Filter from "./Components/Filter.jsx";
import Orders from "./Pages/Dashboard/Admin/Orders.jsx";

function App() {
  return (
    <Routes>
    <Route path="/filter" element={<Filter />} />
     <Route path="/" element={<Navigate to="/Man" replace />} />
     <Route path="/:cat" element={<Home/>} />
      <Route path="/addressbox" element={<AddressBox />} />
      
      <Route path="/Test" element={<Header2 />} />
      <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/password/verify/:token" element={<PasswordVerify />} />
      <Route path="/password/change/:token" element={<ChangePassword />} />
      <Route path="/test" element={<HeaderTest />} />
      <Route path="/:cat/new" element={<New />} />
      <Route path="/:cat/:sub/:detail" element={<Products />} />
      <Route path="/:cat/product/:id" element={<Product/>} />
      <Route path="/*" element={<Err404 />} />
      <Route element={<ReqLogin />}>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Route>
      <Route path="/verify/:hash" element={<OtpVerify/>} />
      {/* auth */}
      <Route element={<ReqAuth />}>
      <Route path="/auth/verify" element={<AuthOtp/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/setting"  element={<Setting />}>
        <Route path="personal-details" element={<Profile />}/>
        <Route path="saved-addresses" element={<SavedAddresses />}/>
        <Route path="purchases" element={<Purchases />}/>
        <Route path="change-password" element={<AccountChangePassword />}/>
        <Route path="change-email" element={<AccountChangeEmail />}/>
        <Route path="address" element={<Address />} />

      </Route>
      </Route>
      {/* Protected Routes*/}
      <Route element={<ReqRule allowedRule={["Admin","Product Manager"]}/>}>
        <Route path="/dashboard" element={<Dashboard />}>
        {/* Admin */}
          <Route path="admin" element={<ReqRule allowedRule={["Admin"]}/>}>
            <Route path="overview" element={<Message />} />
              <Route path="users">
                <Route path="employers" element={<Employers />} />
                <Route path="add-user" element={<AddUsers />} />
              </Route>
              <Route path="orders" element={<Orders />} />
            </Route>
          {/* Product Manger */}
          <Route path="manger" element={<ReqRule allowedRule={["Product Manager"]}/>}>
              <Route path="overview" element={<OverviewManger />} />
              <Route path="products" element={<DashboardProducts />} />
              <Route path="product/add" element={<AddProduct />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
