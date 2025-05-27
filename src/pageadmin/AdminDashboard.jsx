import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import logo from '../assets/logo.png'; 
import CustomerList from './CustomerList';
import EmployeesList from './EmployeesList'; 
import MenuList from './MenuList';
import OrderManager from './OrderManager';
import InventoryView from './InventoryView';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate(); // hook điều hướng
  const [selectedMenu, setSelectedMenu] = useState('Tổng quan');
  const [selectedTab, setSelectedTab] = useState('Hôm nay');

  const tabs = ['Hôm nay', 'Hôm qua', 'Tuần', 'Tháng'];
  const menuIcons = ['📊', '👥', '🧾', '🍔', '🧑‍💼', '📦'];
  const menuItems = ['Tổng quan', 'Khách hàng', 'Đơn hàng', 'Thực đơn', 'Nhân viên', 'Kho hàng'];

  // Dummy chart data
  const chartDataToday = [
    { time: '8h', orders: 30, revenue: 1000000 },
    { time: '10h', orders: 50, revenue: 2000000 },
    { time: '12h', orders: 80, revenue: 3000000 },
    { time: '14h', orders: 60, revenue: 2500000 },
    { time: '16h', orders: 100, revenue: 4000000 },
  ];

  const chartDataYesterday = [
    { time: '8h', orders: 25, revenue: 900000 },
    { time: '10h', orders: 45, revenue: 1800000 },
    { time: '12h', orders: 70, revenue: 2900000 },
    { time: '14h', orders: 50, revenue: 2000000 },
    { time: '16h', orders: 95, revenue: 3900000 },
  ];

  const chartDataWeek = [
    { day: 'Thứ 2', orders: 230, revenue: 10000000 },
    { day: 'Thứ 3', orders: 240, revenue: 11000000 },
    { day: 'Thứ 4', orders: 260, revenue: 12000000 },
    { day: 'Thứ 5', orders: 310, revenue: 15000000 },
    { day: 'Thứ 6', orders: 300, revenue: 14000000 },
    { day: 'Thứ 7', orders: 280, revenue: 13000000 },
    { day: 'CN', orders: 240, revenue: 11000000 },
  ];

  const chartDataMonth = [
    { week: 'Tuần 1', orders: 1800, revenue: 74000000 },
    { week: 'Tuần 2', orders: 1900, revenue: 75000000 },
    { week: 'Tuần 3', orders: 1800, revenue: 74000000 },
    { week: 'Tuần 4', orders: 1820, revenue: 75000000 },
  ];

  const renderCharts = (data, xKey) => (
    <div className="charts">
      {/* Line Chart - Biểu đồ Số Đơn */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Số đơn" />
        </LineChart>
      </ResponsiveContainer>
  
      {/* Bar Chart - Biểu đồ Doanh Thu */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#82ca9d" name="Doanh thu (₫)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  

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

        {selectedMenu === 'Tổng quan' && (
          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`tab ${selectedTab === tab ? 'selected' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {selectedMenu === 'Tổng quan' && (
          <>
            {selectedTab === 'Hôm nay' && (
              <>
                <div className="stats-grid">
                  <div className="stat-box"><div className="label">Đơn hôm nay</div><div className="value">320</div></div>
                  <div className="stat-box"><div className="label">Doanh thu</div><div className="value">12.500.000₫</div></div>
                </div>
                {renderCharts(chartDataToday, 'time')}
              </>
            )}

            {selectedTab === 'Hôm qua' && (
              <>
                <div className="stats-grid">
                  <div className="stat-box"><div className="label">Đơn hôm qua</div><div className="value">285</div></div>
                  <div className="stat-box"><div className="label">Doanh thu</div><div className="value">11.200.000₫</div></div>
                </div>
                {renderCharts(chartDataYesterday, 'time')}
              </>
            )}

            {selectedTab === 'Tuần' && (
              <>
                <div className="stats-grid">
                  <div className="stat-box"><div className="label">Tổng đơn tuần</div><div className="value">1.860</div></div>
                  <div className="stat-box"><div className="label">Tổng doanh thu</div><div className="value">74.300.000₫</div></div>
                </div>
                {renderCharts(chartDataWeek, 'day')}
              </>
            )}

            {selectedTab === 'Tháng' && (
              <>
                <div className="stats-grid">
                  <div className="stat-box"><div className="label">Tổng đơn tháng</div><div className="value">7.320</div></div>
                  <div className="stat-box"><div className="label">Tổng doanh thu</div><div className="value">298.500.000₫</div></div>
                </div>
                {renderCharts(chartDataMonth, 'week')}
              </>
            )}
          </>
        )}

        {selectedMenu === 'Khách hàng' && <CustomerList />}
        {selectedMenu === 'Nhân viên' && <EmployeesList />}
        {selectedMenu === 'Thực đơn' && <MenuList />}
        {selectedMenu === 'Đơn hàng' && <OrderManager />}
        {selectedMenu === 'Kho hàng' && <InventoryView />}

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
