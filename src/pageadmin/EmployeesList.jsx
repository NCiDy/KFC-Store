import React, { useState, useEffect } from 'react';
import axios from 'axios';
import avatar from '../assets/avaNV.jpg'; 
import './CustomerList.css';

const EmployeesList = () => {
  const [allEmployee, setAllEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(res => {
        setAllEmployee(res.data);
      })
      .catch(err => {
        console.error('Lỗi khi tải danh sách nhân viên:', err);
      });
  }, []);


  const handleDeactivateNV = async (employeesId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${employeesId}/deactivate`, {
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
      setAllEmployee((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp.id === employeesId ? { ...emp, trangthaiNV: emp.trangthaiNV === 'Ngưng hoạt động' ? 'Đang hoạt động' : 'Ngưng hoạt động' } : emp
        )
      );
      // Kiểm tra xem dữ liệu đã được cập nhật chưa
      console.log("Updated Customers:", allEmployee); // Đây là nơi bạn kiểm tra
  
    } catch (error) {
      console.error('Error during deactivation:', error);
    }
  };

  // Lọc nhân viên theo từ khóa tìm kiếm
  const filteredEmployee = allEmployee.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang
  const totalPages = Math.ceil(filteredEmployee.length / itemsPerPage);
  const currentEmployee = filteredEmployee.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <th className="cl-table-header">Ngày vào làm</th>
              <th className="cl-table-header">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployee.map((emp) => (
              <tr key={emp.id} className={`cl-table-row ${emp.trangthaiNV === 'Ngưng hoạt động' ? 'cl-deactivated' : ''}`}>
                <td className="cl-table-cell">{emp.id}</td>
                <td className="cl-table-cell">
                  <img className="cl-avatar-img" src={avatar} alt={emp.name} />
                </td>
                <td className="cl-table-cell">{emp.name}</td>
                <td className="cl-table-cell">{emp.phone}</td>
                <td className="cl-table-cell">{emp.dateTime}</td>
                <td className="cl-table-cell">
                  <button className="cl-btn-view">View</button>
                  <button className="cl-btn-deactivate" onClick={() => handleDeactivateNV(emp.id)}>
                      {emp.trangthaiNV === 'Ngưng hoạt động' ? 'Activate' : 'Deactivate'}
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

export default EmployeesList;
