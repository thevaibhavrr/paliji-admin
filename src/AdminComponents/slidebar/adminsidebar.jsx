

import React, { useState } from "react";
import "../../adminCss/sidebar/adminsidebar.css";
import { Link } from "react-router-dom";
import Logo from "./logo.png";

function Adminsidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  const [isOpen, setIsOpen] = useState(true); 

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`main_admin_sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggleButton" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <div className="admin_sidebar">
        <div className="admin_sidebar_header">
          <div className="admin_sidebar_header_logo">
            <img
              alt="logo"
              src={Logo}
              className="admin_sidebar_header_logo_img"
            />
          </div>
        </div>
        <div className="admin_sidebar_menu">
          <div className="admin_sidebar_menu_list">
            <Link className="Link_tag" to={"/admin/admin-dashboard"}>
              <div
                className={`admin_sidebar_menu_items ${
                  selectedItem === "Dashboard" && "selected"
                }`}
                onClick={() => handleMenuItemClick("Dashboard")}
              >
                Dashboard
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/allproducts"}>
              <div
                className={`admin_sidebar_menu_items ${
                  selectedItem === "All Products" && "selected"
                }`}
                onClick={() => handleMenuItemClick("All Products")}
              >
                Products
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/all-orders"}>
              <div
                className={`admin_sidebar_menu_items ${
                  selectedItem === "All Orders" && "selected"
                }`}
                onClick={() => handleMenuItemClick("All Orders")}
              >
                Orders
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/all-categories"}>
              <div
                className={`admin_sidebar_menu_items ${
                  selectedItem === "All catogory" && "selected"
                }`}
                onClick={() => handleMenuItemClick("All catogory")}
              >
                Category
              </div>
            </Link>
            <Link className="Link_tag" to={"/admin/all-coupan"}>
              <div
                className={`admin_sidebar_menu_items ${
                  selectedItem === "All Coupan" && "selected"
                }`}
                onClick={() => handleMenuItemClick("All Coupan")}
              >
                Coupan
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;
