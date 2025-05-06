// AdminLayout.js
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="admin-container">
    <div className="admin-sidebar">
      {/* Sidebar cho admin */}
    </div>
    <div className="admin-content">
      <Outlet />
    </div>
  </div>
);

export default AdminLayout;
