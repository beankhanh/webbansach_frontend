import React, { useState } from 'react';
import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/homepage/product/ChiTietSanPham';
import DangKyNguoiDung from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';
import DangNhap from './layouts/user/DangNhap';
import Test from './layouts/user/Test';
import SachForm from './layouts/admin/Sach/SachForm';
import Admin from './layouts/admin/Admin';
import SachRead from './layouts/admin/Sach/SachRead';
import RequireAdmin from './layouts/admin/RequireAdmin';
import NguoiDungRead from './layouts/admin/NguoiDung/NguoiDungRead';
import TheLoaiRead from './layouts/admin/TheLoai/TheLoaiRead';
const SachForm_Admin = RequireAdmin(Admin);
const App = () => {
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');
  const [isInAdminPage, setIsInAdminPage] = useState(false);

  return (
    <BrowserRouter>
      {!isInAdminPage && <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />}
      <Routes>
        {/* Routes cho người dùng */}
        <Route path='/' element={<Homepage tuKhoaTimKiem={tuKhoaTimKiem} />} />
        <Route path='/about' element={<About />} />
        <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
        <Route path='/dangKy' element={<DangKyNguoiDung />} />
        <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
        <Route path='/dang-nhap' element={<DangNhap />} />
        <Route path='/test' element={<Test />} />
        <Route path='/:maTheLoai' element={<Homepage tuKhoaTimKiem={tuKhoaTimKiem} />} />
        <Route path='/admin/sach' element={<Admin setIsInAdminPage={setIsInAdminPage} children={<SachRead />} />} />
        <Route path='/admin/sach/them-sach' element={<Admin setIsInAdminPage={setIsInAdminPage} children={<SachForm />} />} />
        <Route path='/admin' element={<Admin setIsInAdminPage={setIsInAdminPage} children={<></>} />} />
        <Route path='/admin/nguoi-dung' element={<Admin setIsInAdminPage={setIsInAdminPage} children={<NguoiDungRead />} />} />
        <Route path='/admin/the-loai' element={<Admin setIsInAdminPage={setIsInAdminPage} children={<TheLoaiRead />} />} />
      </Routes>

      {!isInAdminPage && <Footer />}
    </BrowserRouter>
  );
};

export default App;