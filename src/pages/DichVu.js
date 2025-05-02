import React from 'react';
import Black from "../components/Black";
import './DichVu.css';
import DichVuimg from '../assets/DichVu.png'
import invite from '../assets/invite.png'
import party from '../assets/party-hat.png'
import decor from '../assets/decor.png'
import balloons from '../assets/balloons.png'
import gift from '../assets/gift.png'

const DichVu = () => {
  return (
    <div>
    <Black/>
        <div className="dichvu-container">
            <header className="dichvu-header">
                <h1 className="title-left">ĐẶT TIỆC</h1>
                <nav className="nav-center">
                <ul>
                    <li className="active">TỔ CHỨC TIỆC</li>
                    <li>ĐƠN LỚN GIÁ HỜI</li>
                </ul>
                </nav>
            </header>

        <section className="dichvu-hero">
            <h3>BUỔI TIỆC KHÓ QUÊN CÙNG NHỮNG MÓN NGON TỪ KFC</h3>
            <p>Chúng tôi sẵn sàng phục vụ mọi buổi tiệc của bạn.</p>
            <img
            src= {DichVuimg}
            alt="Tổ chức tiệc KFC"
            className="dichvu-image"
            />
        </section>

        <section className="dichvu-services">
            <div className="service-item">
            <img src={invite} alt="Thiệp mời" />
            </div>
            <div className="service-item">
            <img src={party} alt="Nón tiệc sinh nhật" />
            </div>
            <div className="service-item">
            <img src={decor} alt="Trang trí tiệc" />
            </div>
            <div className="service-item">
            <img src={balloons} alt="Bong bóng" />
            </div>
            <div className="service-item">
            <img src={gift} alt="Quà tặng khách mời" />
            </div>
        </section>

        <div className="dichvu-button">
            <button>ĐẶT NGAY!</button>
        </div>
        </div>
    </div>
  );
};

export default DichVu;
