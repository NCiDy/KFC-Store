// File: DangNhap.js
import React, { useState } from "react";
import "./DangNhapAD.css";
import roemo from "../assets/Romeo.png";
import logoKFC from "../assets/logo.png";
import MixAccount from "../assets/mixaccount.png";
import { Link } from "react-router-dom";
// import InventoryView from './InventoryView';

const DangNhap = () => {
  // State để lưu giá trị của chức vụ, email, và mật khẩu
  const [chucvu, setChucvu] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // Hàm xử lý khi thay đổi chức vụ
  const handleChucvuChange = (event) => {
    const value = event.target.value;
    setChucvu(value);

    if (value === "quanly") {
      setEmail("quanlykfc@gmail.com");
      setMatKhau("quanly123");
    } else if (value === "thungan") {
      setEmail("banhangkfc@gmail.com");
      setMatKhau("thungan123");
    } else if (value === "kho") {
      setEmail("kho234kfc@gmail.com");
      setMatKhau("kho123");
    } else {
      setEmail("");
      setMatKhau("");
    }
  };

  return (
    <div className="dangnhap-container">
      <img src={logoKFC} alt="KFC Logo" className="logo-kfc" />
      <div className="dangnhap-wrapper">
        <div className="dangnhap-left">
          <img src={roemo} alt="promo" className="dangnhap-bg" />
        </div>
        <div className="dangnhap-right">
          <Link to="/DangNhap" className="link-mix-bg">
            <img src={MixAccount} alt="Mix" className="Mix-bg" />
          </Link>
          <h2>WELCOME TO KFC</h2>
          <div className="input-group">
            <label htmlFor="chucvu">Chức vụ</label>
            <select
              id="chucvu"
              value={chucvu}
              onChange={handleChucvuChange}
              aria-label="Chọn chức vụ"
            >
              <option value="" disabled>Chọn chức vụ</option>
              <option value="quanly">Quản lý</option>
              <option value="thungan">Bán hàng</option>
              <option value="kho">Kho</option>
            </select>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} readOnly />
          </div>
          <div className="input-group">
      <label>Mật khẩu</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={matKhau}
          readOnly
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{
            marginLeft: '8px',
            padding: '4px 8px',
            cursor: 'pointer'
          }}
        >
          {showPassword ? 'Ẩn' : 'Hiện'}
        </button>
      </div>
    </div>
          <Link
            to={
              chucvu === "quanly"
                ? "/AdminDashboard"
                : chucvu === "kho"
                ? "/InventoryView"
                : chucvu === "thungan"
                ? "/ThuNgan"
                : "#"
            }
            className="link-signin"
            onClick={(e) => {
              if (chucvu !== "quanly" && chucvu !== "kho" && chucvu !== "thungan") {
                e.preventDefault(); // Ngăn chuyển trang nếu chức vụ không hợp lệ
                alert("Vui lòng chọn chức vụ hợp lệ.");
              }
            }}
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;
