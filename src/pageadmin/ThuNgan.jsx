import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import logo from '../assets/logo.png'; 
import OrderManager from './OrderManager';
import ThanhToan from './ThanhToan';

const AdminDashboard = () => {
  const navigate = useNavigate(); // hook điều hướng
  const [selectedMenu, setSelectedMenu] = useState('Tổng quan');
  const [selectedTab, setSelectedTab] = useState('Hôm nay');

  const menuIcons = ['📊','🧾'];
  const menuItems = ['Thanh toán','Đơn hàng'];

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="logo">
        <img src={logo} alt="KFC" className="kfc-logo" />
          <span className='kfc'>KFC</span>
        </div>
        <nav className="menu">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`menu-item ${selectedMenu === item ? 'active' : ''}`}
              onClick={() => setSelectedMenu(item)}
            >
              <span className="icon">{menuIcons[idx]}</span>
              <span className="label">{item}</span>
            </button>
          ))}
        </nav>  
        <button
          className="menu-item logout"
          onClick={() => navigate('/DangNhap')}
        >
          <span className="icon">🚪</span>
          <span className="label">Đăng xuất</span>
        </button>
      </aside>

      <main className="main">
        <div className="cl-header">
          <h1>Bảng {selectedMenu}</h1>
          <button className="download-btn">⬇️ Download</button>
        </div>

        {selectedMenu === 'Thanh toán' && <ThanhToan />}
        {selectedMenu === 'Đơn hàng' && <OrderManager />}

        {selectedMenu !== 'Tổng quan' && !menuItems.includes(selectedMenu) && (
          <div className="placeholder">
            Nội dung cho mục "{selectedMenu}" đang được phát triển...
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
