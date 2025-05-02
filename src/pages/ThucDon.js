import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Black from "../components/Black";
import './ThucDon.css';
import combo1 from "../assets/combo1.png";
import combo2 from "../assets/combo2.png";
import combo3 from "../assets/combo3.png";
import combo4 from "../assets/combo4.png";
import combo5 from "../assets/combo5.png";
import combo6 from "../assets/combo6.png";
import combo7 from "../assets/combo7.png";
import combo8 from "../assets/combo8.png";

const categories = [
  'ƯU ĐÃI',
  'COMBO 1 NGƯỜI',
  'COMBO NHÓM',
  'GÀ RÁN - GÀ QUAY',
  'BURGER - CƠM - MÌ Ý',
  'THỨC ĂN NHẸ',
  'THỨC UỐNG VÀ TRÁNG MIỆNG'
];

const combos = [
  {
    name: 'Combo Gà rán 1',
    price: '55.000đ',
    desc: '1 Miếng Gà + 1 Khoai Tây Chiên & Bắp Cải Trộn + 1 Pepsi (lon)',
    img: combo1
  },
  {
    name: 'Combo Gà rán 2',
    price: '89.000đ',
    desc: '2 Miếng Gà + 1 Khoai Tây Chiên & Bắp Cải Trộn + 1 Pepsi (lon)',
    img: combo2
  },
  {
    name: 'Combo Phi-lê Gà Quay',
    price: '84.000đ',
    desc: '1 Phi-Lê Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lon)',
    img: combo3
  },
  {
    name: 'Combo Gà quay',
    price: '117.000đ',
    desc: '1 Đùi Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lon)',
    img: combo4
  },
  {
    name: 'Combo Burger Tôm',
    price: '67.000đ',
    desc: '1 Burger Tôm + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lon)',
    img: combo5
  },
  {
    name: 'Combo Burger Zinger',
    price: '77.000đ',
    desc: '1 Burger Zinger + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lon)',
    img: combo6
  },
  {
    name: 'Combo Burger Phi-lê Gà Quay',
    price: '77.000đ',
    desc: '1 Burger Flava + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lon)',
    img: combo7
  },
  {
    name: 'Combo Mì Ý Gà Viên',
    price: '47.000đ',
    desc: '1 Mì Ý Popcorn + 1 Pepsi (lon)',
    img: combo8
  },
];

const combosNhom = [
  {
    name: 'Combo Gà rán 1',
    price: '55.000đ',
    desc: '1 Miếng Gà + 1 Khoai Tây Chiên & Bắp Cải Trộn + 1 Pepsi (lon)',
    img: combo1
  },
  {
    name: 'Combo Gà rán 2',
    price: '89.000đ',
    desc: '2 Miếng Gà + 1 Khoai Tây Chiên & Bắp Cải Trộn + 1 Pepsi (lon)',
    img: combo2
  },
  {
    name: 'Combo Phi-lê Gà Quay',
    price: '84.000đ',
    desc: '1 Phi-Lê Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lon)',
    img: combo3
  },
  {
    name: 'Combo Gà quay',
    price: '117.000đ',
    desc: '1 Đùi Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lon)',
    img: combo4
  },
  {
    name: 'Combo Burger Tôm',
    price: '67.000đ',
    desc: '1 Burger Tôm + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lon)',
    img: combo5
  },
  {
    name: 'Combo Burger Zinger',
    price: '77.000đ',
    desc: '1 Burger Zinger + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lon)',
    img: combo6
  },
  {
    name: 'Combo Burger Phi-lê Gà Quay',
    price: '77.000đ',
    desc: '1 Burger Flava + 1 Khoai Tây Chiên (vừa) + 1 Pepsi (lon)',
    img: combo7
  },
];
const combosUuDai = [
    {
      name: 'Combo Gà rán 1',
      price: '55.000đ',
      desc: '1 Miếng Gà + 1 Khoai Tây Chiên & Bắp Cải Trộn + 1 Pepsi (lon)',
      img: combo1
    },
    {
      name: 'Combo Gà rán 2',
      price: '89.000đ',
      desc: '2 Miếng Gà + 1 Khoai Tây Chiên & Bắp Cải Trộn + 1 Pepsi (lon)',
      img: combo2
    },
    {
      name: 'Combo Phi-lê Gà Quay',
      price: '84.000đ',
      desc: '1 Phi-Lê Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lon)',
      img: combo3
    },
    {
      name: 'Combo Gà quay',
      price: '117.000đ',
      desc: '1 Đùi Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lon)',
      img: combo4
    },
];

export default function ThucDon() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('COMBO 1 NGƯỜI');

    useEffect(() => {
    if (location.state?.tab) {
        setActiveTab(location.state.tab);
    }
    }, [location.state]);
    
  const [currentCombos, setCurrentCombos] = useState(combos); // Set default combo list

  useEffect(() => {
    if (activeTab === 'COMBO NHÓM') {
      setCurrentCombos(combosNhom); // Change combo list when switching to 'COMBO NHÓM'
    } 
    else if(activeTab === 'ƯU ĐÃI') {
        setCurrentCombos(combosUuDai); // Change combo list when switching to 'COMBO NHÓM'
    } else {
      setCurrentCombos(combos); // Revert back to default combos when switching to other tabs
    }
  }, [activeTab]); // Only run this when 'activeTab' changes

  return (
    <div>
      <Black/>
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
              <p className="combo-price">{combo.price}</p>
              <p className="combo-desc">{combo.desc}</p>
              <button className="add-button">Thêm</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
