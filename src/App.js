import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrangChu from "./pages/TrangChu";
import ThucDon from "./pages/ThucDon";
import DichVu from "./pages/DichVu";
import HeThong from "./pages/HeThong";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DangNhap from "./login/DangNhap";
import DangNhapAD from "./login/DangNhapAD";
import DangKy from "./login/DangKy";
import Admin from "./pageadmin/AdminDashboard";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <Routes>
        {/* Các Route thông thường với Navbar và Footer */}
        <Route path="/" element={<><Navbar /><TrangChu /><Footer /></>} />
        <Route path="/ThucDon" element={<><Navbar /><ThucDon /><Footer /></>} />
        <Route path="/DichVu" element={<><Navbar /><DichVu /><Footer /></>} />
        <Route path="/HeThong" element={<><Navbar /><HeThong /><Footer /></>} />
        <Route path="/DangNhap" element={<DangNhap />} />
        <Route path="/DangNhapAD" element={<DangNhapAD />} />
        <Route path="/DangKy" element={<DangKy />} />
        <Route path="/GioHang" element={<><Navbar /><Cart /><Footer /></>} />
        
        {/* Trang Admin không có Navbar và Footer */}
        <Route path="/AdminDashboard" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
