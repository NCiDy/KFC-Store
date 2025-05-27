import React, { useState } from 'react';
import './capnhatthongtin.css';
import avatar from '../assets/avatar.png';
import dg1 from '../assets/combo1.png';
import dg2 from '../assets/combo2.png';
import gg from '../assets/gg.png';



function CapNhatThongTin() {
  const [selectedTab, setSelectedTab] = useState('danhgia');

  return (
    <div className="container">
      {/* Dòng 1 */}
      <div className="row">
        <div className="left-top">
          <img src={avatar} alt="Avatar" className="main-avatar" />
        </div>
        <div className="user-info-right-top">
            <h2 className="user-name">Nguyễn Văn An</h2>
            
            <div className="user-details-columns">
                <div className="info-column">
                <p className="user"><span className="icon">📞</span> Số điện thoại: 0123456789</p>
                <p className="user"><span className="icon">✉️</span> Email: namnguyen@example.com</p>
                </div>
                <div className="info-column">
                <p className="user"><span className="icon">🎂</span> Ngày sinh: 01/01/2000</p>
                <p className="user"><span className="icon">🏠</span> Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p>
                </div>
            </div>
        </div>


      </div>

      {/* Dòng 2 */}
      <div className="row">
        <div className="left-bottom">
          <button
            className={`menu-btn ${selectedTab === 'danhgia' ? 'active' : ''}`}
            onClick={() => setSelectedTab('danhgia')}
          >
            Đánh giá
          </button>
          <button
            className={`menu-btn ${selectedTab === 'magiamgia' ? 'active' : ''}`}
            onClick={() => setSelectedTab('magiamgia')}
          >
            Mã giảm giá
          </button>
          <button
            className={`menu-btn ${selectedTab === 'lichsu' ? 'active' : ''}`}
            onClick={() => setSelectedTab('lichsu')}
          >
            Lịch sử đơn hàng
          </button>
        </div>

        <div className="right-bottom">
          {selectedTab === 'danhgia' && (
            <div className="reviews">
              <div className="review-card">
                <div className="review-header">
                  <img src={avatar} className="review-avatar" alt="avatar" />
                  <span>Nguyễn Văn An</span>
                  <div className="stars">★★★★★</div>
                </div>
                <p className="review-text">Món này thật sự rất ngon, sẽ ăn những lần sau nữa</p>
                <div className="review-images">
                  <img src={dg1} alt="food" />
                  <img src={dg2} alt="food" />
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'magiamgia' && (
            <div className="reviewsgg">
                <img src={gg} alt="giam giá" />
                <img src={gg} alt="giam giá" />
                <img src={gg} alt="giam giá" />
            </div>
          )}

          {selectedTab === 'lichsu' && (
            <div className="reviews">
            <div className="review-card">
              <div className="review-headergg">
                <span>Mã đơn: HD001</span>
                <span>Ngày: 14/04/2025
                    <button className="reorder-btn">Đặt lại</button>
                </span>
                <span>Món: Gà rán, CocaCola
                
                </span>
                <span>Tổng: 75.000đ</span>
              </div>
              
            </div>

            <div className="review-card">
              <div className="review-headergg">
                <span>Mã đơn: HD001</span>
                <span>Ngày: 15/05/2025
                    <button className="reorder-btn">Đặt lại</button>
                </span>
                <span>Món: Gà rán, Mì, Coca
                </span>
                <span>Tổng: 99.000đ</span>
              </div>
              
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CapNhatThongTin;
