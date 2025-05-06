import React, { useState } from 'react';
import './OrderManager.css';

const sampleOrders = [
  {
    id: 'DH001',
    customer: 'Nguyễn Văn A',
    phone: '0909123456',
    date: '2025-05-01',
    status: 'Chờ xác nhận',
    total: 120000,
  },
  {
    id: 'DH002',
    customer: 'Trần Thị B',
    phone: '0909988776',
    date: '2025-05-02',
    status: 'Đang giao',
    total: 89000,
  },
  // ... thêm đơn hàng khác
];

const OrderManager = () => {
  const [orders, setOrders] = useState(sampleOrders);
  const [search, setSearch] = useState('');

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(search.toLowerCase()) ||
    order.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="om-container">
      <input
        type="text"
        placeholder="Tìm kiếm theo tên khách hoặc mã đơn..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="om-search-input"
      />

      <table className="om-order-table">
        <thead>
          <tr>
            <th className="om-table-header">Mã đơn</th>
            <th className="om-table-header">Khách hàng</th>
            <th className="om-table-header">SĐT</th>
            <th className="om-table-header">Ngày</th>
            <th className="om-table-header">Tổng tiền</th>
            <th className="om-table-header">Trạng thái</th>
            <th className="om-table-header">Cập nhật</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} className="om-table-row">
              <td className="om-table-cell">{order.id}</td>
              <td className="om-table-cell">{order.customer}</td>
              <td className="om-table-cell">{order.phone}</td>
              <td className="om-table-cell">{order.date}</td>
              <td className="om-table-cell">{order.total.toLocaleString()}đ</td>
              <td className="om-table-cell">{order.status}</td>
              <td className="om-table-cell">
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.id, e.target.value)}
                  className="om-status-select"
                >
                  <option>Chờ xác nhận</option>
                  <option>Đang giao</option>
                  <option>Hoàn tất</option>
                  <option>Đã hủy</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManager;
