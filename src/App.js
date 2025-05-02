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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/ThucDon" element={<ThucDon />} />
        <Route path="/DichVu" element={<DichVu />} />
        <Route path="/HeThong" element={<HeThong />} />
        <Route path="/DangNhap" element={<DangNhap />} />
        <Route path="/DangNhapAD" element={<DangNhapAD />} />
        <Route path="/DangKy" element={<DangKy />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
