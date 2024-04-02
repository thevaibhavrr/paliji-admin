import React, { useEffect, useState } from "react";
import "../../adminCss/order/allorder.css";
import { makeApi } from "../../api/callApi";
import { Link } from "react-router-dom";
import UpdateOrderPopup from "./updateorder";
import Loader from "../../components/loader/loader";

function AllOrder() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-order?status=${status}`, "GET");
      setOrders(response.data.Orders);
      // console.log(orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status]);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };
  const handleOpenPopup = (orderId) => {
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setSelectedOrderId(null);
  };
  // const handleMenuItemClick = (itemName) => {
  //   setSelectedItem(itemName);
  // };

  return (
    <div className="all-orders-container">
      <div className="all_orders_status_buttons">
        <button
          className={`admin_add_product_button ${selectedStatus === "Pending" ? "selectedStatus" : ""
            }`}
          onClick={() => handleStatusChange("Pending")}
        >
          Pending Orders
        </button>

        <button
          className={`admin_add_product_button ${selectedStatus === "Cancelled" ? "selectedStatus" : ""
            }`}
          onClick={() => handleStatusChange("Cancelled")}
        >
          Cancelled Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Shipped" ? "selectedStatus" : ""
            }`}
          onClick={() => handleStatusChange("Shipped")}
        >
          Shipped Orders
        </button>
        <button
          className={`admin_add_product_button ${selectedStatus === "Delivered" ? "selectedStatus" : ""
            }`}
          onClick={() => handleStatusChange("Delivered")}
        >
          Delivered Orders
        </button>
      </div>
      <div className="order-list">
        {loading ? (
          <Loader />
        ) : (
          <div className="main_order_list_container">
            {orders?.map((data, index) => (
              <div key={index} className="order_list_container">
                {/* product details */}
                <div>
                  {data?.orderItems?.map((item, index) => (
                    <div key={index} className="order_item_details">
                      <div>
                        <img
                          src={item?.productId?.thumbnail}
                          alt="thumbnail"
                          className="all_order_thumbnail"
                        />
                      </div>
                      <div>
                        <p>
                          {" "}
                          <b>Name :</b> {item?.productId?.name}
                        </p>
                        {/* <p>Quantity: {item?.quantity}</p> */}
                        <p>
                          {" "}
                          <b> Price :</b> {item?.productId?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* order details */}
                <div className="order_details all_order_details">
                  <div>
                    {" "}
                    <b> Order Id :</b> {data._id}
                  </div>
                  <div>
                    {" "}
                    <b> Status : </b> {data.status}
                  </div>
                  <div>
                    {" "}
                    <b> Total Price : </b> {data.totalPrice}
                  </div>
                </div>
                {/* shippingAddress */}
                <div className="all_order_shippingAddress all_order_details">
                  <div>
                    {" "}
                    <b> Pincode : </b> {data.shippingAddress.pincode}
                  </div>
                  <div>
                    {" "}
                    <b> State : </b> {data.shippingAddress.state}
                  </div>
                  <div>
                    {" "}
                    <b> City : </b> {data.shippingAddress.city}
                  </div>
                </div>
                {/* other details */}
                <div className="all_order_other_details all_order_details">
                  <div>
                    {" "}
                    <b> Payment Method : </b> {data.paymentMethod}{" "}
                  </div>
                  <div>
                    <b> Created At : </b>{" "}
                    {new Date(data.createdAt).toLocaleString("en-US", {
                      timeZone: "UTC", // Change this according to your timezone if needed
                    })}
                  </div>
                </div>
                {/* price realted details */}
                <div className="all_order_price_details all_order_details">
                  <div>
                    {" "}
                    <b> Total Price : </b> {data.totalPrice}{" "}
                  </div>
                  <div>
                    {" "}
                    <b> Shipping Price : </b> {data.shippingPrice}{" "}
                  </div>
                  <div>
                    {" "}
                    <b> Tax Price : </b> {data.taxPrice}{" "}
                  </div>
                </div>
                {/* view order button */}
                <div className="all_order_buttons_div">
                  <Link
                    to={`/admin/order/${data._id}`}
                    className="all_order_order_view_button"
                  >
                    View Order
                  </Link>
                  <div
                    className="all_order_order_update_button"
                    onClick={() => handleOpenPopup(data._id)}
                  >
                    {" "}
                    Update Order{" "}
                  </div>
                </div>
                
              </div>
              
            ))}
          </div>
        )}
      </div>
      {selectedOrderId && (
        <UpdateOrderPopup orderId={selectedOrderId} onClose={handleClose} />
      )}
    </div>
  );
}

export default AllOrder;
