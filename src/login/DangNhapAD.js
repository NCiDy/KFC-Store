// File: DangNhap.js
import React from "react";
import "./DangNhapAD.css";
import bgLeft from "../assets/bg-left.png";
import logoKFC from "../assets/logo.png";
import googleIcon from "../assets/google-icon.png";
import appleIcon from "../assets/apple-icon.png";
import MixAccount from "../assets/mixaccount.png";
import { Link } from "react-router-dom";

const DangNhap = () => {
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
            <select id="chucvu" defaultValue="" aria-label="Chọn chức vụ">
                <option value="" disabled>Chọn chức vụ</option>
                <option value="quanly">Quản lý</option>
                <option value="thungan">Thu ngân</option>
                <option value="kho">Kho</option>
            </select>
            </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email" />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>
          <button className="btn-signin">Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;
