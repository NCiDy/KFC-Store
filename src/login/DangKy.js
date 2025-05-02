// File: DangNhap.js
import React from "react";
import "./DangKy.css";
import bgLeft from "../assets/bg-left.png";
import logoKFC from "../assets/logo.png";
import newTag from "../assets/new-tag.png";
import combo from "../assets/combo.png";
import googleIcon from "../assets/google-icon.png";
import appleIcon from "../assets/apple-icon.png";

const DangKy = () => {
  return (
    <div className="dangnhap-container">
          <img src={logoKFC} alt="KFC Logo" className="logo-kfc" />
      <div className="dangnhap-wrapper">
        <div className="dangnhap-left">
          <img src={bgLeft} alt="promo" className="dangnhap-bg" />
        </div>
        <div className="dangnhap-right">
          <h2>WELCOME TO KFC</h2>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Nhập email" />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" />
          </div>
          <button className="btn-signin">Register</button>
          <div className="or-divider">OR</div>
          <div className="social-login">
            <img src={googleIcon} alt="Google" />
            <img src={appleIcon} alt="Apple" />
          </div>
        </div>
      </div>
      <img src={newTag} alt="new tag" className="img-new-tag" />
      <img src={combo} alt="combo" className="img-combo" />
      <div className="combo-price">CHỈ VỚI <span> : 150.000₫</span></div>
    </div>
  );
};

export default DangKy;
