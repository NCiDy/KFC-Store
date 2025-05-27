import React from "react";
import "./ThanhToan.css";

const data = [
  { moTa: "Cải xanh", soTien: "1.000.000đ", maDon: "C65", ngayDat: "6/3/22" },
  { moTa: "Khoai tây", soTien: "500.000đ", maDon: "K45", ngayDat: "12/2/22" },
  { moTa: "Cánh gà", soTien: "2.500.000đ", maDon: "C46", ngayDat: "4/19/23" },
  { moTa: "Pepsi", soTien: "1.500.000đ", maDon: "P04", ngayDat: "1/2/23" },
  { moTa: "Đùi gà", soTien: "3.000.000đ", maDon: "D87", ngayDat: "9/4/23" },
  { moTa: "Rong biển", soTien: "700.000đ", maDon: "R09", ngayDat: "6/3/22" },
  { moTa: "Gạo", soTien: "1.000.000đ", maDon: "G34", ngayDat: "12/2/22" },
  { moTa: "Bắp cải", soTien: "475.000đ", maDon: "B32", ngayDat: "4/19/23" },
  { moTa: "Cafe", soTien: "4.000.000đ", maDon: "C12", ngayDat: "1/2/23" },
];

const ThanhToan = () => {
  return (
    <div className="thanhtoan-container">
      <div className="thanhtoan-header">
        <h3>Chi tiết</h3>
        <span>258</span>
      </div>
      <hr></hr>
      <table className="thanhtoan-table">
        <thead>
          <tr>
            <th></th>
            <th>Mô tả</th>
            <th>Thanh toán bằng</th>
            <th>Số tiền</th>
            <th>Mã đơn</th>
            <th>Ngày đặt</th>
            <th>Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td><input type="radio" /></td>
              <td>{item.moTa}</td>
              <td>Paypal</td>
              <td>{item.soTien}</td>
              <td>{item.maDon}</td>
              <td>{item.ngayDat}</td>
              <td><span className="dot">•••</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThanhToan;
