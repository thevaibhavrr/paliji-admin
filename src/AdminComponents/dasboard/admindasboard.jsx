import React, { useEffect, useState } from "react";
import "../../adminCss/dashboard/adminDashboard.css";
import { makeApi } from "../../api/callApi";
import Loader from "../../components/loader/loader";
function Admindasboard() {
  const [dasboardData, setDasboardData] = useState(0);
  const [loading, setLoading] = useState(false);

  const getDasboardData = async () => {
    try {
        setLoading(true);

    const response = await makeApi("/api/get-dashboard", "GET");
    setDasboardData(response.data);
    } catch (error) {
      console.log(error);
    }finally{
        setLoading(false);
    }
  };
  useEffect(() => {
    getDasboardData();
  },[])
  return (
    <div>
          {loading ? (
        <Loader />
      ) : (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Total Users</h2>
          <p>{dasboardData?.totalUsers}</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Products</h2>
          <p>{dasboardData?.totalProducts}</p>
        </div>
        
        <div className="dashboard-card">
          <h2>Total Orders</h2>
          <p>{dasboardData?.totalOrders}</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Pending Orders</h2>
          <p>{dasboardData?.totalPandingOrders}</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Shipped Orders</h2>
          <p>{dasboardData?.totalShippedOrders}</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Delivered Orders</h2>
          <p>{dasboardData?.totalDeliveredOrders}</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Canceled Orders</h2>
          <p>{dasboardData?.totalCanceledOrders}</p>
        </div>
        <div className="dashboard-card">
          <h2>Total Returned Orders</h2>
          <p>{dasboardData?.totalReturnedOrders}</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default Admindasboard;
