import React from 'react';
import './InventoryView.css';

const inventoryData = [
  { name: 'Thịt bò', category: 'Thịt tươi sống', unit: 'Kg', stock: 10, expiry: '18/04/2025', warning: 'Sắp hết hạn' },
  { name: 'Ức gà', category: 'Thịt tươi sống', unit: 'Kg', stock: 4, expiry: '25/04/2025', warning: 'Sắp hết hạn' },
  { name: 'Khoai tây', category: 'Rau củ', unit: 'Kg', stock: 7, expiry: '30/04/2025', warning: '' },
  { name: 'Rau xà lách', category: 'Rau củ', unit: 'Kg', stock: 1, expiry: '19/04/2025', warning: 'Sắp hết hạn' },
  { name: 'Bánh mì burger', category: 'Nguyên liệu bánh', unit: 'Cái', stock: 40, expiry: '20/04/2025', warning: 'Sắp hết hạn' },
  { name: 'Phô mai lát', category: 'Nguyên liệu bánh', unit: 'Gói', stock: 5, expiry: '21/04/2025', warning: 'Sắp hết hạn' },
  { name: 'Dầu ăn', category: 'Gia vị', unit: 'Lít', stock: 3, expiry: '01/06/2025', warning: 'Sắp hết hạn' },
  { name: 'Trà sữa nền', category: 'Nguyên liệu thức uống', unit: 'Lít', stock: 2, expiry: '20/04/2025', warning: 'Sắp hết hạn' },
  { name: 'Pepsi', category: 'Thức uống', unit: 'Thùng', stock: 8, expiry: '16/04/2027', warning: '' },
  { name: 'Cocacola', category: 'Thức uống', unit: 'Thùng', stock: 7, expiry: '19/05/2027', warning: '' },
  { name: 'Cốc nhựa', category: 'Vật tư bao bì', unit: 'Cái', stock: 300, expiry: '', warning: '' },
];

const InventoryView = () => {
  return (
    <div className="inventory-container">
      <div className="header-bar">
        <input className="search-box" type="text" placeholder="Tìm theo tên hoặc danh mục..." />
        <h2 className="title">DANH SÁCH THỰC PHẨM TRONG KHO</h2>
        <button className="add-button">Thêm nguyên liệu</button>
      </div>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Danh mục</th>
            <th>Đơn vị</th>
            <th>Tồn kho</th>
            <th>Hạn sử dụng</th>
            <th>Cảnh báo</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item, index) => (
            <tr key={index} className={item.warning ? 'warning-row' : ''}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.unit}</td>
              <td>{String(item.stock).padStart(2, '0')}</td>
              <td>{item.expiry || '----------------'}</td>
              <td className="warning-text">
                {item.warning && (<span>⚠️ <span className="red">{item.warning}</span></span> || '----------------')}
              </td>
              <td>
                <button className="edit-btn">Chỉnh sửa</button>
                {item.warning && <button className="order-btn">Nhập hàng</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryView;