import React, { useState, useEffect } from 'react';
import avatar from '../assets/avatar.png'; 
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:5000/api/customers')
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error('Failed to load customers:', err));
  }, []);

  const filteredCustomers = customers.filter((cust) =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const currentCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDeactivate = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${customerId}/deactivate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to deactivate');
      }
  
      const data = await response.json();
      console.log(data.message);
  
      // Cập nhật trạng thái mới từ backend và tự động render lại giao diện
      setCustomers((prevCustomers) =>
        prevCustomers.map((cust) =>
          cust.id === customerId ? { ...cust, trangthai: cust.trangthai === 'Ngưng hoạt động' ? 'Đang hoạt động' : 'Ngưng hoạt động' } : cust
        )
      );
      // Kiểm tra xem dữ liệu đã được cập nhật chưa
      console.log("Updated Customers:", customers); // Đây là nơi bạn kiểm tra
  
    } catch (error) {
      console.error('Error during deactivation:', error);
    }
  };

  return (
    <div className="cl-container-unique">
      <div className="cl-search-bar-section">
        <div className="cl-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>
      </div>

      <div className="cl-table-section">
        <table className="cl-customer-table">
          <thead>
            <tr>
              <th className="cl-table-header">ID</th>
              <th className="cl-table-header">Ảnh</th>
              <th className="cl-table-header">Họ & Tên</th>
              <th className="cl-table-header">Số điện thoại</th>
              <th className="cl-table-header">Email</th>
              <th className="cl-table-header">Ngày & Giờ</th>
              <th className="cl-table-header">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((cust) => (
              <tr key={cust.id} className={`cl-table-row ${cust.trangthai === 'Ngưng hoạt động' ? 'cl-deactivated' : ''}`}>
                <td className="cl-table-cell">{cust.id}</td>
                <td className="cl-table-cell">
                  <img className="cl-avatar-img" src={avatar} alt={cust.name} />
                </td>
                <td className="cl-table-cell">{cust.name}</td>
                <td className="cl-table-cell">{cust.phone}</td>
                <td className="cl-table-cell">{cust.email}</td>
                <td className="cl-table-cell">{cust.dateTime}</td>
                <td className="cl-table-cell">
                    <button
                        className="cl-btn-view"
                        onClick={() => window.location.href = '/Capnhatthongtin'}
                      >
                        View
                    </button>
                    <button className="cl-btn-deactivate" onClick={() => handleDeactivate(cust.id)}>
                      {cust.trangthai === 'Ngưng hoạt động' ? 'Activate' : 'Deactivate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cl-pagination-section">
        <button
          className="cl-pagination-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="cl-pagination-text">Page {currentPage} of {totalPages}</span>
        <button
          className="cl-pagination-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerList;
