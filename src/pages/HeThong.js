import React, { useState, useRef, useEffect } from 'react';
import './HeThong.css';

const kfcAddresses = [
  'KFC Nguyễn Trãi, Quận 1, TP.HCM',
  'KFC Cộng Hòa, Tân Bình, TP.HCM',
  'KFC Trần Hưng Đạo, Quận 5, TP.HCM',
  'KFC Lê Văn Việt, Thủ Đức, TP.HCM',
  'KFC Nguyễn Thị Minh Khai, Quận 3, TP.HCM',
  'KFC Hà Nội Tower, Hoàn Kiếm, Hà Nội',
  'KFC Láng Hạ, Đống Đa, Hà Nội',
  'KFC Vincom Long Biên, Hà Nội',
  'KFC Nguyễn Văn Linh, Đà Nẵng',
  'KFC Bạch Đằng, Đà Nẵng',
  'KFC Nha Trang Center, Khánh Hòa',
  'KFC Cần Thơ Center Mall, Cần Thơ',
];

const HeThong = () => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mapSrc, setMapSrc] = useState(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.21169708272!2d106.70175557427801!3d10.794185058904716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d0608271db%3A0xc40db4531469da08!2sKFC%20Vietnam!5e0!3m2!1svi!2s!4v1714663950000!5m2!1svi!2s'
  );

  const wrapperRef = useRef(null);

  const handleFocus = () => {
    setSuggestions(kfcAddresses);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setAddress(value);
    if (value.trim() === '') {
      setSuggestions(kfcAddresses);
    } else {
      const filtered = kfcAddresses.filter((addr) =>
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (selectedAddress) => {
    setAddress(selectedAddress);
    const encodedAddress = encodeURIComponent(selectedAddress);
    setMapSrc(`https://www.google.com/maps?q=${encodedAddress}&output=embed`);
    setSuggestions([]);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (address.trim() !== '') {
      const encodedAddress = encodeURIComponent(address);
      setMapSrc(`https://www.google.com/maps?q=${encodedAddress}&output=embed`);
      setSuggestions([]);
    }
  };

  return (
    <div className="hethong-container" ref={wrapperRef}>
      <h2>Hệ Thống Cửa Hàng</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="input-address"
        />
        <button onClick={handleSearch} className="button-search">
          Tìm kiếm
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((addr, index) => (
              <li key={index} onClick={() => handleSuggestionClick(addr)}>
                {addr}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="map-container">
        <iframe
          title="Google Map"
          src={mapSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default HeThong;
