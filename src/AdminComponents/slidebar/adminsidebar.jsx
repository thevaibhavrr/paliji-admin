import React, { useState } from "react";
// import { assets } from "../../assets/assets";
import "../../adminCss/sidebar/adminsidebar.css";
import { Link } from "react-router-dom";
function Adminsidebar() {
  const [selectedItem, setSelectedItem] = useState("");
  // Function to handle click on menu items
  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };
  return (
    <div>
      {/* main div */}
      <div className="main_admin_sidebar">
        {/* sidebar div */}
        <div className="admin_sidebar">
          {/* sidebar header div */}
          <div className="admin_sidebar_header">
            {/* sidebar header logo div */}
            <div className="admin_sidebar_header_logo">
              <img
                // src={assets.logo2}
                alt="logo"
                className="admin_sidebar_header_logo_img"
              />
            </div>
          </div>
          {/* sidebar menu div */}
          <div className="admin_sidebar_menu"> 
            {/* sidebar menu list div */}

            <div className="admin_sidebar_menu_list">
              <Link className="Link_tag" to={"/admin/admin-dashboard"}  >
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
              <Link className="Link_tag" to={"/admin/All-coupan"}>
              <div
                className={`admin_sidebar_menu_items ${
                  selectedItem === "All user" && "selected"
                }`}
                onClick={() => handleMenuItemClick("All user")}
              >
                Coupan
              </div>
              </Link>
              <Link className="Link_tag" to={"/admin/all-categories"}>
                <div
                  className={`admin_sidebar_menu_items ${
                    selectedItem === "All catogory" && "selected"
                  }`}
                  onClick={() => handleMenuItemClick("All catogory")}
                >
                  catogory
                </div>
              </Link> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;
