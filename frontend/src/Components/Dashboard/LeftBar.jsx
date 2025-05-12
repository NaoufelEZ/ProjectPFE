import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AiFillDashboard,
  AiOutlineSetting
} from "react-icons/ai";
import {
  BiCategoryAlt
} from "react-icons/bi";
import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaTruck,
  FaTags
} from "react-icons/fa";
import {
  MdCategory,
  MdLogout,
  MdAdminPanelSettings,
  MdManageAccounts
} from "react-icons/md";
import { RiMenuFoldLine, RiMenuUnfoldLine } from "react-icons/ri";

import Cookies from "universal-cookie";
import axios from "axios";
import { APIURL, ApiKey } from "../../Api/Api";
import useUser from "../../Hooks/useUser";

import "./leftBar.css";

const LeftBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useUser();
  const location = useLocation();
  const currentPath = location.pathname.split("/")[2];

  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get(`${APIURL}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": ApiKey
        }
      })
      .then(() => cookie.remove("auth", { path: "/" }))
      .finally(() => {
        navigate("/")
        window.location.reload(); 
      });
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <AiFillDashboard />,
      path: "/dashboard",
      key: undefined
    },
    ...(user?.role === "Admin"
      ? [
          {
            title: "Users",
            icon: <FaUsers />,
            path: "/dashboard/users",
            key: "users"
          },
          {
            title: "Orders",
            icon: <FaShoppingCart />,
            path: "/dashboard/orders",
            key: "orders"
          },
          {
            title: "Inventory",
            icon: <FaBoxOpen />,
            path: "/dashboard/inventory",
            key: "inventory"
          },
          {
            title: "Delivery Company",
            icon: <FaTruck />,
            path: "/dashboard/delivery-company",
            key: "delivery-company"
          }
        ]
      : [
          {
            title: "Inventory",
            icon: <FaBoxOpen />,
            path: "/dashboard/inventory",
            key: "inventory"
          },
          {
            title: "Categories",
            icon: <BiCategoryAlt />,
            path: "/dashboard/Categories",
            key: "Categories"
          },
          {
            title: "Subcategories",
            icon: <MdCategory />,
            path: "/dashboard/subcategories",
            key: "subcategories"
          },
          {
            title: "Category Details",
            icon: <FaTags />,
            path: "/dashboard/category-details",
            key: "category-details"
          }
        ]),
    {
      title: "Settings",
      icon: <AiOutlineSetting />,
      path: "/dashboard/setting",
      key: "setting"
    }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className={`sidebar-header ${isCollapsed ? "justify-content-center" : "justify-content-between"}`}>
        <h5 className="text-white">{!isCollapsed && "Dashboard"}</h5>
        <div role="button" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? (
            <RiMenuUnfoldLine className="toggle-icon" />
          ) : (
            <RiMenuFoldLine className="toggle-icon" />
          )}
        </div>
      </div>

      {user ? (
        <>
          <div className={`user-info ${isCollapsed ? "collapsed" : ""}`}>
            {user.role === "Admin" ? (
              <MdAdminPanelSettings className="user-icon" />
            ) : (
              <MdManageAccounts className="user-icon" />
            )}
            {!isCollapsed && (
              <div className="user-text">
                <span className="user-name">
                  {user.first_name} {user.last_name}
                </span>
                <span className="user-role text-capitalize">{user.role}</span>
              </div>
            )}
          </div>
          <hr />

          <Nav className="flex-column gap-2">
            {menuItems.map((item) => (
              <Nav.Link
                key={item.key}
                href={item.path}
                className={`nav-item d-flex align-items-center ${
                  currentPath === item.key ? "active" : ""
                }`}
              >
                <span className={`nav-icon ${isCollapsed ? "me-0" : "me-2"}`}>{item.icon}</span>
                {!isCollapsed && <span>{item.title}</span>}
              </Nav.Link>
            ))}

            <hr />
            <div
              role="button"
              className="nav-item d-flex align-items-center logout"
              onClick={handleLogout}
            >
              <MdLogout className="nav-icon me-3" />
              {!isCollapsed && <span>Logout</span>}
            </div>
          </Nav>
        </>
      ) : (
        <div className="text-white text-center mt-5">Loading...</div>
      )}
    </div>
  );
};

export default LeftBar;
