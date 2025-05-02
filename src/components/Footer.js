import React from "react";
import "./Footer.css";
import download from "../assets/download.png";
import bocongthuong from "../assets/bocongthuong.png";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>Danh Mục Món Ăn</h4>
          <ul>
            <li>Món Mới</li>
            <li>Combo 1 Người</li>
            <li>Combo Nhóm</li>
            <li>Gà Rán - Gà Quay</li>
            <li>Burger - Cơm - Mì Ý</li>
            <li>Thức Ăn Nhẹ</li>
            <li>Thức Uống & Tráng Miệng</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Về KFC</h4>
          <ul>
            <li>Câu Chuyện Của Chúng Tôi</li>
            <li>Tin Khuyến Mãi</li>
            <li>Tin tức KFC</li>
            <li>Tuyển dụng</li>
            <li>Đặt tiệc Sinh nhật</li>
            <li>Đơn Lớn Giá Hời</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Liên hệ KFC</h4>
          <ul>
            <li>Theo dõi đơn hàng</li>
            <li>Hệ Thống Nhà Hàng</li>
            <li>Liên hệ KFC</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Chính sách</h4>
          <ul>
            <li>Chính sách hoạt động</li>
            <li>Chính sách và quy định</li>
            <li>Chính sách bảo mật thông tin</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Download App</h4>
          <div className="app-links">
            <img src={download} alt="download" />
          </div>
        </div>
      </div>

      <div className="footer-middle">
        <p>© 2023 KFC Vietnam</p>
        <div className="social-icons">
          <FaFacebookF />
          <FaInstagram />
          <FaYoutube />
          <FaTwitter />
        </div>
      </div>

      <div className="footer-bottom">
        <h4>CÔNG TY LIÊN DOANH TNHH KFC VIỆT NAM</h4>
        <p>
          Số 292 Bà Triệu, P. Lê Đại Hành, Q. Hai Bà Trưng, TP. Hà Nội.<br />
          Điện thoại: (028) 38489828<br />
          Email: lienhe@kfcvietnam.com.vn<br />
          Mã số thuế: 0100773885<br />
          Ngày cấp: 29/10/1998 - Nơi cấp: Cục Thuế Thành Phố Hà Nội
          <img
          className="bo-cong-thuong" src={bocongthuong}
          alt="Đã thông báo Bộ Công Thương"
        />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
