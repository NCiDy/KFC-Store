import React, { useState, useEffect } from 'react';
import './MenuList.css';
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

const categories = [
  { id: 'COMBO1', name: 'Combo 1 người' },
  { id: 'COMBONHOM', name: 'Combo nhóm' },
  { id: 'GARAN', name: 'Gà rán - Gà quay' },
  { id: 'BURGERMI', name: 'Burger - Cơm - Mì Ý' },
  { id: 'SNACK', name: 'Thức ăn nhẹ' },
  { id: 'DRINK', name: 'Thức uống' },
];

const MenuList = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);

  // Function to fetch all products
  const fetchAllProducts = () => {
    fetch("http://localhost:5000/get_products")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Error fetching products:', data);
          setProducts([]);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  // Function to fetch products based on category
  const fetchProductsByCategory = (category) => {
    fetch(`http://localhost:5000/get_products/${category}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Error fetching products:', data);
          setProducts([]);
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  useEffect(() => {
    // Load all products when the component mounts
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    } else {
      fetchAllProducts(); // Load all products when no category is selected
    }
  }, [selectedCategory]);

  const filteredProducts = products.filter((product) =>
    product.ten_san_pham.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-list-container">
      {/* Tìm kiếm */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Danh mục */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat.id);  // Fetch products when category changes
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Sản phẩm */}
      <div className="product-grid">
        {filteredProducts.map((product) => {
          // Cắt chuỗi để lấy tên ảnh
          const imageName = product.hinh_anh ? product.hinh_anh.split('/').pop() : null;
   
          return (
            <div className="product-card" key={product.id}>
              <div className="product-info">
                <h4>{product.ten_san_pham}</h4>
                <p>{product.mo_ta}</p>
                <strong>{product.gia.toLocaleString()}đ</strong>
              </div>
              <div className="product-image">
                <img
                  src={imageMap[imageName] || defaultImage}
                  alt={product.ten_san_pham}
                  className="product-img"
                />
                <button className="add-btn">+</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuList;
