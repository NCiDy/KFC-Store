// File: DangNhap.js
import React, { useState } from "react";
import "./DangNhapAD.css";
import bgLeft from "../assets/bg-left.png";
import logoKFC from "../assets/logo.png";
import MixAccount from "../assets/mixaccount.png";
import { Link } from "react-router-dom";

const DangNhap = () => {
  // State để lưu giá trị của chức vụ, email, và mật khẩu
  const [chucvu, setChucvu] = useState("");
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");

  // Hàm xử lý khi thay đổi chức vụ
  const handleChucvuChange = (event) => {
    const value = event.target.value;
    setChucvu(value);

    if (value === "quanly") {
      setEmail("quanlykfc@gmail.com");
      setMatKhau("quanly123");
    } else if (value === "thungan") {
      setEmail("thungankfc@gmail.com");
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
          <img src={bgLeft} alt="promo" className="dangnhap-bg" />
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
              <option value="thungan">Thu ngân</option>
              <option value="kho">Kho</option>
            </select>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" value={email} readOnly />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" value={matKhau} readOnly />
          </div>
          <Link to="/AdminDashboard" className="link-signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;
