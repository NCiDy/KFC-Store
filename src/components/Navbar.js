import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import account from "../assets/account.png";
import giohang from "../assets/giohang.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo"><Link to="/"><img src={logo} alt="logo" className="logo-img"/></Link></div>
      <ul>
        <li><Link to="/ThucDon" state={{ tab: 'COMBO 1 NGƯỜI' }}>Thực đơn</Link></li>
        <li><Link to="/ThucDon" state={{ tab: 'ƯU ĐÃI' }}>Khuyến mãi</Link></li>
        <li><Link to="/DichVu">Dịch vụ</Link></li>
        <li><Link to="/HeThong">Hệ thống cửa hàng</Link></li>
      </ul>
      <div className="icons">
      <Link to="/DangNhap"><span>
          <img src={account} alt="account" className="account-img" />
        </span></Link>
        <span>
          <img src={giohang} alt="giohang" className="giohang-img" />
        </span>
      </div>
    </nav>
  );
}
