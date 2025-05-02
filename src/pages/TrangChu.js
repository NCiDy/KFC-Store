import React, { useRef, useEffect } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
import "./TrangChu.css";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import banner4 from "../assets/banner4.png";
import banner5 from "../assets/banner5.png";
import banner6 from "../assets/banner6.png";
import banner7 from "../assets/banner7.png";
import batdaudathang from "../assets/batdaudathang.png";
import gocphai from "../assets/gocphai.png";
import gocphaiphu from "../assets/gocphaiphu.png";


export default function TrangChu() {
  const scrollRef = useRef(null);
  const banners = [banner1, banner2, banner3, banner4, banner5, banner6, banner7];

  // Kéo bằng chuột
  useEffect(() => {
    const el = scrollRef.current;
    let isDown = false;
    let startX, scrollLeft;

    const down = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const move = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    const upLeave = () => {
      isDown = false;
      el.style.cursor = "grab";
    };

    el.addEventListener("mousedown", down);
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseup", upLeave);
    el.addEventListener("mouseleave", upLeave);

    return () => {
      el.removeEventListener("mousedown", down);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseup", upLeave);
      el.removeEventListener("mouseleave", upLeave);
    };
  }, []);

  // Tính toán bo góc dựa trên vị trí so với trung tâm
  useEffect(() => {
    const container = scrollRef.current;
  
    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const images = container.querySelectorAll("img");
  
      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imageCenter = rect.left + rect.width / 2;
        const distance = imageCenter - centerX;
        const maxRotation = 45; // độ xoay tối đa
        const maxDistance = containerRect.width / 2;
  
        const rotation = (distance / maxDistance) * maxRotation;

        // Giảm góc xoay nếu cần, và giới hạn góc xoay nhỏ nhất (không quá gắt)
        const clampedRotation = Math.max(Math.min(rotation, maxRotation), -maxRotation);

        // Tăng độ scale ở giữa, giảm nhẹ ở hai bên
        const scale = 1 - Math.min(Math.abs(distance) / maxDistance, 1) * 0.2;

        img.style.transform = `rotateY(${clampedRotation}deg) scale(${scale})`;
      });
    };
  
    container.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();
  
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  

  return (
    <div>
      {/* <Navbar /> */}
      <section className="hero">
        <p>We Don’t Just Serve Fried Chicken</p>
        <p>We Serve The Kind Of Moments That Make You Smile, Crave, And Share</p>

        <div className="banners-scroll" ref={scrollRef}>
          {banners.map((src, index) => (
            <img key={index} src={src} alt={`banner ${index}`} />
          ))}
        </div>
        <img src={batdaudathang} alt="batdaudathang" className="batdaudathang"/>
        <div className="banner-mask top-mask"></div>
        <div className="banner-mask bottom-mask"></div>
        <button className="order-btn">Bắt đầu đặt hàng</button>
      </section>
      <img src={gocphaiphu} alt="gocphaiphu" className="gocphaiphu"/>
      <img src={gocphai} alt="gocphai" className="gocphai"/>
      {/* <Footer /> */}
    </div>
  );
}
