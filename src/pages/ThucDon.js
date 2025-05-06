import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Black from "../components/Black";
import './ThucDon.css';


// Import các hình ảnh
import combo1 from "../assets/combo1.png";
import combo2 from "../assets/combo2.png";
import combo3 from "../assets/combo3.png";
import combonhom2 from "../assets/combonhom2.png";
import combonhom3 from "../assets/combonhom3.png";
import combonhom4 from "../assets/combonhom4.png";
import combonhom5 from "../assets/combonhom5.png";
import combonhom6 from "../assets/combonhom6.png";
import garan1 from "../assets/garan1.png";
import garan2 from "../assets/garan2.png";
import gquay3 from "../assets/gquay3.png";
import bur1 from "../assets/bur1.png";
import miy from "../assets/miy.png";
import comga from "../assets/comga.png";
import khoaitayvua from "../assets/khoaitayvua.png";
import khoaitaylon from "../assets/khoaitaylon.png";
import snackga from "../assets/snackga.png";
import pepsivua from "../assets/pepsivua.png";
import lipton from "../assets/lipton.png";
import cacao from "../assets/cacao.png";
import defaultImage from "../assets/combo.png";

// Danh sách ánh xạ tên hình ảnh trong cơ sở dữ liệu với các import
const imageMap = {
    "combo1.png": combo1,
    "combo2.png": combo2,
    "combo3.png": combo3,
    "combonhom2.png" : combonhom2,
    "combonhom3.png" : combonhom3,
    "combonhom4.png" : combonhom4,
    "combonhom5.png" : combonhom5,
    "combonhom6.png" : combonhom6,
    "garan1.png": garan1,
    "garan2.png": garan2,
    "gquay3.png": gquay3,
    "bur1.png": bur1,
    "miy.png": miy,
    "comga.png": comga,
    "khoaitayvua.png": khoaitayvua,
    "khoaitaylon.png": khoaitaylon,
    "snackga.png": snackga,
    "pepsivua.png": pepsivua,
    "lipton.png": lipton,
    "cacao.png": cacao,
};

// Ánh xạ giữa tên category hiển thị và mã danh mục trong cơ sở dữ liệu
const categoryMap = {
  'ƯU ĐÃI': 'UUDAI',
  'COMBO 1 NGƯỜI': 'COMBO1',
  'COMBO NHÓM': 'COMBONHOM',
  'GÀ RÁN - GÀ QUAY': 'GARAN',
  'BURGER - CƠM - MÌ Ý': 'BURGERMI',
  'THỨC ĂN NHẸ': 'SNACK',
  'THỨC UỐNG VÀ TRÁNG MIỆNG': 'DRINK',
};

const categories = [
  'ƯU ĐÃI',
  'COMBO 1 NGƯỜI',
  'COMBO NHÓM',
  'GÀ RÁN - GÀ QUAY',
  'BURGER - CƠM - MÌ Ý',
  'THỨC ĂN NHẸ',
  'THỨC UỐNG VÀ TRÁNG MIỆNG'
];

export default function ThucDon() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('COMBO 1 NGƯỜI');
    const [currentCombos, setCurrentCombos] = useState([]);

    useEffect(() => {
        if (location.state?.tab) {
            setActiveTab(location.state.tab);
        }
    }, [location.state]);

    useEffect(() => {
        const categoryCode = categoryMap[activeTab];
        fetch(`http://localhost:5000/get_products/${categoryCode}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); 
            
                const formattedCombos = data.map((product) => {
                    const imageName = product.hinh_anh.split('/').pop(); 
                    return {
                        name: product.ten_san_pham,
                        price: `${product.gia}`,
                        desc: product.mo_ta,
                        img: imageMap[imageName] || product.hinh_anh || defaultImage, 
                    };
                });
            
                setCurrentCombos(formattedCombos);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, [activeTab]);

    return (
        <div>
            <Black />
            {/* Tabs */}
            <div className="tabs">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`tab-button ${activeTab === cat ? 'active' : ''}`}
                        onClick={() => setActiveTab(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Danh sách combo */}
            <div className="combo-section">
                <h2 className="combo-title">{activeTab}</h2>
                <div className="combo-grid">
                    {currentCombos.map((combo, index) => (
                        <div key={index} className="combo-card">
                            <img src={combo.img} alt={combo.name} />
                            <h3>{combo.name}</h3>
                            <p className="gia">{combo.price}</p>
                            <p className="combo-desc">{combo.desc}</p>
                            <button className="add-button">Thêm</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
