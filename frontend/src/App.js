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
import Checkout from "./Pages/public/Products/Checkout.jsx";
import AddressBox from "./Pages/public/Products/AddressBox.jsx";
import New from "./Pages/public/Products/New.jsx";
import Purchases from "./Pages/public/Setting/Purchases.jsx";
import SavedAddresses from "./Pages/public/Setting/SavedAddresses.jsx";
import AccountChangePassword from "./Pages/public/Setting/AccountChangePassword.jsx";
import AccountChangeEmail from "./Pages/public/Setting/AccountChangeEmail.jsx";
import AddAddress from "./Pages/public/Setting/AddAddress.jsx";
import Home from "./Pages/Home.jsx";
import Orders from "./Pages/Dashboard/Admin/Orders.jsx";
import Categories from "./Pages/Dashboard/ProductManger/Categories.jsx";
import AddCategory from "./Pages/Dashboard/ProductManger/AddCategory.jsx";
import Subcategories from "./Pages/Dashboard/ProductManger/Subcategories.jsx";
import CategoryDetails from "./Pages/Dashboard/ProductManger/CategoryDetails.jsx";
import DeliveryCompany from "./Pages/Dashboard/Admin/DeliveryCompany.jsx";
import AddDeliveryCompany from "./Pages/Dashboard/Admin/AddDeliveryCompany.jsx";
import AddSubcategory from "./Pages/Dashboard/ProductManger/AddSubcatgeory.jsx";
import AddCategoryDetails from "./Pages/Dashboard/ProductManger/AddCategoryDetails.jsx";
import DashboardSetting from "./Pages/Dashboard/DashboardSetting.jsx";
import DashboardChangeMail from "./Pages/Dashboard/DashboardChangeMail.jsx";
import DashboardChangePassword from "./Pages/Dashboard/DashboardChangePassword.jsx";
import Overview from "./Pages/Dashboard/Overview.jsx";
import Category from "./Pages/Dashboard/ProductManger/Catgeory.jsx";
import Subcategory from "./Pages/Dashboard/ProductManger/Subcategory.jsx";
import Detail from "./Pages/Dashboard/ProductManger/Detail.jsx";
import Order from "./Pages/Dashboard/Admin/Order.jsx";
import UseRule from "./Pages/Auth/UseRule.jsx";
import User from "./Pages/Dashboard/Admin/User.jsx";
import ProductDashboard from "./Pages/Dashboard/ProductManger/ProductDashboard.jsx";
import CashOrderConfirmation from "./Pages/public/Products/CashOrderConfirmation.jsx";
import VisaOrderConfirmation from "./Pages/public/Products/VisaOrderConfirmation.jsx";
import Address from "./Pages/public/Setting/Address.jsx";
import Wishlist from "./Pages/public/Products/Wishlist.jsx";
import SubcategoryPage from "./Pages/public/Products/SubcategoryPage.jsx";
import ConnectWithGoogle from "./Pages/Auth/ConnectWithGoogle.jsx";
import CreateAccountWithGoogle from "./Pages/Auth/CreateAccountWithGoogle.jsx";
import Delivery from "./Pages/Dashboard/Admin/Delivery.jsx";
import TermsAndConditions from "./Components/Footer/TermsAndConditions.jsx";


function App() {
  return (
    <Routes>
      <Route path="/google/new/account/:token" element={<CreateAccountWithGoogle />}/>
    <Route element={<UseRule />}>
     <Route path="/" element={<Navigate to="/Men" replace />} />
     <Route path="/:cat" element={<Home/>} />
      <Route path="/addressbox" element={<AddressBox />} />
      <Route path="/google/account/:token" element={<ConnectWithGoogle />}/>

      <Route path="/customer-service" element={<TermsAndConditions />}/>
      <Route path="/track-order" element={<TermsAndConditions />}/>
      <Route path="/returns-exchanges" element={<TermsAndConditions />}/>
      <Route path="/faqs" element={<TermsAndConditions />}/>

      <Route path="/privacy-policy" element={<TermsAndConditions />}/>
      <Route path="/cookies-policy" element={<TermsAndConditions />}/>    
      <Route path="/terms" element={<TermsAndConditions />}/>

      
      <Route path="/forget_password" element={<ForgetPassword />} />
      <Route path="/password/verify/:token" element={<PasswordVerify />} />
      <Route path="/password/change/:token" element={<ChangePassword />} />
      <Route path="/test" element={<HeaderTest />} />
      <Route path="/:cat/New" element={<New />} />
      <Route path="/:cat/:sub" element={<SubcategoryPage />} />
      <Route path="/:cat/:sub/:detail" element={<Products />} />
      <Route path="/product/:id" element={<Product/>} />
      <Route path="/*" element={<Err404 />} />
      <Route element={<ReqLogin />}>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Route>
      <Route path="/verify/:hash" element={<OtpVerify/>} />
      {/* auth */}
      <Route element={<ReqAuth />}>
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/auth/verify" element={<AuthOtp/>} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout/order-confirmation/cash" element={<CashOrderConfirmation />} />
      <Route path="/checkout/visa-payment/order-confirmation/:token" element={<VisaOrderConfirmation />} />
      <Route path="/setting"  element={<Setting />}>
        <Route path="personal-details" element={<Profile />}/>
        <Route path="saved-addresses" element={<SavedAddresses />}/>
        <Route path="saved-addresses/:id" element={<Address />}/>
        <Route path="purchases" element={<Purchases />}/>
        <Route path="change-password" element={<AccountChangePassword />}/>
        <Route path="change-email" element={<AccountChangeEmail />}/>
        <Route path="address" element={<AddAddress />} />
      </Route>
      </Route>
      </Route>
      {/* Protected Routes*/}
      <Route element={<ReqRule allowedRule={["Admin","Product Manager"]}/>}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Overview />} />
          <Route path="inventory" element={<DashboardProducts />} />
          <Route path="setting" element={<DashboardSetting />} />
          <Route path="setting/change-email" element={<DashboardChangeMail />} />
          <Route path="setting/change-password" element={<DashboardChangePassword />} />

        {/* Admin */}
          <Route element={<ReqRule allowedRule={["Admin"]}/>}>
              <Route path="users" element={<Users />}/>
              <Route path="users/add" element={<AddUsers />} />
              <Route path="users/:userId" element={<User />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:ordId" element={<Order />} />
              <Route path="delivery-company" element={<DeliveryCompany />} />
              <Route path="delivery-company/add" element={<AddDeliveryCompany />} />
              <Route path="delivery-company/:id" element={<Delivery />} />
            </Route>
          {/* Product Manger */}
          <Route element={<ReqRule allowedRule={["Product Manager"]}/>}>
              <Route path="inventory/:idProd" element={<ProductDashboard />} />
              <Route path="inventory/add" element={<AddProduct />} />
              <Route path="categories" element={<Categories />} />
              <Route path="subcategories/add" element={<AddSubcategory />} />
              <Route path="categories/add" element={<AddCategory />} />
              <Route path="categories/:catId" element={<Category />} />
              <Route path="subcategories" element={<Subcategories />} />
              <Route path="subcategories/:subId" element={<Subcategory />} />
              <Route path="category-details" element={<CategoryDetails />} />
              <Route path="category-details/:delId" element={<Detail />} />
              <Route path="category-details/add" element={<AddCategoryDetails />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
