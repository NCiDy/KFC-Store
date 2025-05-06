import React, { useState } from "react";
import "./DangNhap.css";
import bgLeft from "../assets/bg-left.png";
import logoKFC from "../assets/logo.png";
import googleIcon from "../assets/google-icon.png";
import appleIcon from "../assets/apple-icon.png";
import MixAccount from "../assets/mixaccount.png";
import { Link, useNavigate } from "react-router-dom";

const DangNhap = () => {
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const navigate = useNavigate();  // Dùng useNavigate thay vì useHistory

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/dangnhap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mat_khau: matKhau }),
        credentials: 'include', 
      });
  
      const data = await response.json();
      
      if (response.ok) {
        alert(data.message);
        navigate(data.redirect);  
      } else {
        alert(data.error);  
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in.");
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
          <Link to="/DangNhapAD" className="link-mix-bg">
            <img src={MixAccount} alt="Mix" className="Mix-bg" />
          </Link>
          <h2>WELCOME TO KFC</h2>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button className="btn-signin" onClick={handleLogin}>Sign in</button>
          <div className="or-divider">OR</div>
          <div className="social-login">
            <img src={googleIcon} alt="Google" />
            <img src={appleIcon} alt="Apple" />
          </div>
          <p className="register-link">
            <Link to="/DangKy">
              Don’t have account? <span>Register Now</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;
