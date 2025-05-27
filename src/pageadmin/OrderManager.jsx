import React, { useState } from 'react';
import './OrderManager.css';

import combo7 from "../assets/combo7.png";
import combo3 from "../assets/combo3.png";
import combonhom3 from "../assets/combonhom3.png";
import combonhom6 from "../assets/combonhom6.png";
import garan2 from "../assets/garan2.png";
import comga from "../assets/comga.png";
import pepsivua from "../assets/pepsivua.png";
import lipton from "../assets/lipton.png";
import cacao from "../assets/cacao.png";


const orders = [
  {
    id: 1,
    name: "Combo Phi-lê Gà Quay",
    desc: "1 Phi-Lê Gà Quay Flava + 1 Salad Hạt",
    qty: 1,
    price: "70.000đ",
    date: "6/3/25",
    img: combo3
  },
  {
    id: 2,
    name: "Combo Burger Phi-lê Gà Quay",
    desc: "1 Burger Flava + 1 Pepsi (lon)",
    qty: 4,
    price: "308.000đ",
    date: "6/3/25",
    img: combo7
  },
  {
    id: 3,
    name: "Combo Gà Rán 2",
    desc: "2 Miếng Gà + 1 Khoai Tây Chiên",
    qty: 2,
    price: "70.000đ",
    date: "6/3/25",
    img: garan2
  },
  {
    id: 4,
    name: "AARP",
    desc: "ACCESS CODE",
    qty: 1,
    price: "204.000đ",
    date: "6/3/25",
    img: combonhom6
  },
  {
    id: 5,
    name: "Box Meal Pasta Popcorn",
    desc: "1 Mì Ý Popcorn + 1 Miếng Gà + 1 Pepsi (lon)",
    qty: 1,
    price: "78.000đ",
    date: "6/3/25",
    img: combonhom3
  },
  {
    id: 6,
    name: "Combo Cơm Gà Teriyaki",
    desc: "1 Cơm Teriyaki + 1 Súp Rong Biển + 1 Pepsi (lon)",
    qty: 2,
    price: "138.000đ",
    date: "6/3/25",
    img: comga
  },
  {
    id: 7,
    name: "Trà đào",
    desc: "Trà đào",
    qty: 3,
    price: "72.000đ",
    date: "6/3/25",
    img: lipton
  },
  {
    id: 8,
    name: "Pepsi",
    desc: "Pepsi",
    qty: 5,
    price: "100.000đ",
    date: "6/3/25",
    img: pepsivua
  },
  {
    id: 9,
    name: "Socola sữa đá",
    desc: "Socola sữa đá",
    qty: 1,
    price: "25.000đ",
    date: "6/3/25",
    img: cacao
  }
];

const OrderManager = () => {
  const [openMenuId, setOpenMenuId] = useState(null);
  return (
    <>
      <div className="order-container">
        <h3>Trả sau <span>258</span></h3>
        <input type="text" placeholder="Search" className="search-box" />
        <table className="order-table">
          <thead>
            <tr>
              <th></th>
              <th>Món</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Ngày đặt hàng</th>
              <th>Tùy chọn</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td><input type="checkbox" /></td>
                <td className="product">
                  <img src={order.img} alt={order.name} />
                  <div>
                    <strong>{order.name}</strong>
                    <p>{order.desc}</p>
                  </div>
                </td>
                <td>{order.qty.toString().padStart(2, '0')}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
                <td className="menu-cell">
                  <span className="menu-toggle" onClick={() => setOpenMenuId(openMenuId === order.id ? null : order.id)}>...</span>
                  {openMenuId === order.id && (
                    <ul className="order-options">
                      <li>Đã xác nhận</li>
                      <li>Đang đóng gói</li>
                      <li>Đang vận chuyển</li>
                      <li>Đã giao hàng</li>
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Di chuyển ra ngoài order-container */}
      <div className="order-container">
        <div>Trả trước <span className='tratruoc'>  457</span></div>
      </div>
      <div className="order-container">
        <div>Hoàn thành <span className='tratruoc'>  182</span></div>
      </div>
    </>
  );
};

export default OrderManager;
