import React, { useState } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom"; 
import combo1 from '../assets/combo1.png';
import combo2 from '../assets/combo2.png'; 
import visa from '../assets/visa.png';
import rupay from '../assets/rupay.png';    
import mastercard from '../assets/master.png';
import { FaTrashAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa"; // ✅ Tick icon

const Cart = () => {
  const initialItems = [
    {
      id: 1,
      name: "Combo Gà Rán 1",
      desc: "1 phần Burger Gà Yo (cay)/1 phần Burger Gà Yo (không cay)",
      price: 55000,
      quantity: 1,
      image: combo1,
    },
    {
      id: 2,
      name: "Combo Gà Rán 2",
      desc: "2 Miếng Gà + 1 Khoai Tây Chiên / 1 Khoai Tây Nghiền & Bắp Cải Trộn + 1 Pepsi (lớn)",
      price: 89000,
      quantity: 1,
      image: combo2,
    },
    {
      id: 3,
      name: "Combo Phile Gà Quay",
      desc: "1 Phi-Lê Gà Quay Flava + 1 Salad Hạt + 1 Lipton (lớn)",
      price: 84000,
      quantity: 1,
      image: combo1,
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [showSuccess, setShowSuccess] = useState(false); // ✅ Thêm state để hiển thị modal

  const updateQuantity = (id, type) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return {
          ...item,
          quantity: newQty > 1 ? newQty : 1,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 25000;
  const total = subtotal + shipping;

  const handleConfirmOrder = () => {
    setShowSuccess(true); // ✅ Hiện thông báo
  };

  const closeSuccess = () => {
    setShowSuccess(false); // ✅ Ẩn thông báo
  };

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h2 className="giohangh2">Giỏ hàng</h2>
        <p className="soluonggh">Bạn có {items.length} sản phẩm trong giỏ hàng</p>
        {items.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />

            <div className="item-details">
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
            </div>

            <div className="item-quantity">
              <span className="quantity">{item.quantity}</span>
              <div className="arrows">
                <button className="arrow-btn" onClick={() => updateQuantity(item.id, "inc")}>▲</button>
                <button className="arrow-btn" onClick={() => updateQuantity(item.id, "dec")}>▼</button>
              </div>
            </div>

            <div className="item-price-delete">
              <span className="price">{(item.price * item.quantity).toLocaleString()}₫</span>
              <FaTrashAlt className="delete-icon" />
            </div>
          </div>
        ))}
      </div>

      <div className="cart-right">
        <h3 className="thanhtoanh3">THANH TOÁN</h3>
        <p><strong className="pptt">Phương thức thanh toán</strong></p>
        <div className="payment-methods">
          <p className="kfc-pay">KFC Pay</p>

          <div className="payment-option">
            <label>
              <input type="radio" name="payment" defaultChecked /> Thanh toán khi nhận hàng
            </label>
          </div>

          <div className="payment-option">
            <label>
              <input type="radio" name="payment" /> Thanh toán bằng thẻ
            </label>
          </div>

          <div className="card-icons">
            <button className="card-btn"><img src={mastercard} alt="MasterCard" /></button>
            <button className="card-btn"><img src={visa} alt="Visa" /></button>
            <button className="card-btn"><img src={rupay} alt="RuPay" /></button>
          </div>
        </div>

        <div className="summary">
          <p>Tạm tính: <span>{subtotal.toLocaleString()}₫</span></p><br />
          <p>Vận chuyển: <span>{shipping.toLocaleString()}₫</span></p><br />
          <p>Áp dụng mã giảm giá: <span>...................</span></p><br />
          <hr /><br />
          <p className="total">Tổng cộng (Đã bao gồm thuế): <span>{total.toLocaleString()}₫</span></p><br />
        </div>

        <div className="confirm-section">
          <strong className="thanhtien">{total.toLocaleString()}₫</strong>
          <button className="confirm-btn" onClick={handleConfirmOrder}>Xác nhận đơn hàng</button>
        </div>
      </div>

      {/* ✅ Modal thông báo thành công */}
      {showSuccess && (
        <div className="overlay" onClick={() => window.location.href = '/'}>
          <div className="success-box">
            <FaCheckCircle className="tick-icon" />
            <h3 className="dathangthanhcong">Đặt hàng thành công!</h3>
            <p>Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
