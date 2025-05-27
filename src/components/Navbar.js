import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";
import account from "../assets/account.png";
import giohang from "../assets/giohang.png";
import { Link} from "react-router-dom";


export default function Navbar() {
  const [userName, setUserName] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false); 

  useEffect(() => {
    fetch('/check-session', {
      method: 'GET',
      credentials: 'include' 
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        console.log('Session Data:', data); 
        if (data.ho_ten) {
          setUserName(data.ho_ten); 
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      }); 
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Logout successful:', data);
        setUserName(null);
        window.location.href = '/'; 
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.querySelector('.user-dropdown');
      if (dropdown && !dropdown.contains(event.target)) {
        setShowDropdown(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-img" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/ThucDon" state={{ tab: 'COMBO 1 NGƯỜI' }}>Thực đơn</Link>
        </li>
        <li>
          <Link to="/ThucDon" state={{ tab: 'ƯU ĐÃI' }}>Khuyến mãi</Link>
        </li>
        <li><Link to="/DichVu">Dịch vụ</Link></li>
        <li><Link to="/HeThong">Hệ thống cửa hàng</Link></li>
      </ul>
      <div className="icons">
        {userName ? (
           <div className="user-dropdown">
           <span className="user-name1" onClick={() => setShowDropdown(!showDropdown)}>
             {userName} <span className="arrow-down">▼</span>
           </span>
           {showDropdown && (
             <div className="dropdown-menu">
               <Link to="/CapNhatThongTin">Cập nhật thông tin</Link>
               <button onClick={handleLogout}>Đăng xuất</button>
             </div>
           )}
         </div>
         
        ) : (
          <Link to="/DangNhap">
            <span>
              <img src={account} alt="account" className="account-img" />
            </span>
          </Link>
        )}
        <Link to="/GioHang">
          <span>
            <img src={giohang} alt="giohang" className="giohang-img" />
          </span>
        </Link>
      </div>
    </nav>
  );
}
