import React, { ChangeEvent, useEffect, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { Link, NavLink } from "react-router-dom";
import TheLoaiModel from "../../models/TheLoaiModel";
import { layToanBoTheLoaiSach } from "../../api/TheLoai";
import { jwtDecode } from "jwt-decode";
import DangNhap from "../user/DangNhap";
import { useNavigate } from 'react-router-dom';
interface NavbarProps {
    tuKhoaTimKiem: string;
    setTuKhoaTimKiem: (tuKhoa: string) => void;
}
const Navbar: React.FC<NavbarProps> = (props) => {
    const [tuKhoaTamThoi, setTuKhoaTamThoi] = useState('');

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTuKhoaTamThoi(e.target.value);
    }

    const handleSearch = () => {
        props.setTuKhoaTimKiem(tuKhoaTamThoi);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Kiểm tra nếu phím nhấn là Enter (keyCode 13), thực hiện tìm kiếm
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleLogout = () => {
        // Thực hiện các bước cần thiết để logout, có thể làm clear token, đặt lại state, chuyển hướng trang, vv.
        localStorage.removeItem('token');
        setUsername(null);
        // Các bước khác nếu cần
    };

    //Lấy ra danh sách các thể loại
    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const navigate = useNavigate();

    //Kiểm tra và hiển thị tên đang nhập tai khoản
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        layToanBoTheLoaiSach().then(
            theLoaiData => {
                setDanhSachTheLoai(theLoaiData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
        const token = localStorage.getItem('token');
        if (token) {
            const userData = jwtDecode(token);
            console.log(userData);
            if (userData) {
                setUsername(userData.sub + '');
            }
        }

    }, []// chỉ gọi 1 lần
    )

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }
    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>
        );
    }



    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">
                    <Link to={`/`}>
                        <img src="..\..\..\image\books\Logo.png" alt="LOGO" style={{ width: 50 }} />
                    </Link>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link dropdown" aria-current="page" href="#">
                                <Link to={`/`}>
                                    Trang chủ
                                </Link>
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                            <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Thể loại sách
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                {danhSachTheLoai.map((theLoai) => (
                                    <li className="dropdown-item" key={theLoai.maTheLoai}>
                                        <Link to={`/${theLoai.maTheLoai}`}>
                                            {theLoai.tenTheLoai}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Quy định bán hàng
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <li><a className="dropdown-item" href="#">Quy định 1</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 2</a></li>
                                <li><a className="dropdown-item" href="#">Quy định 3</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" >Liên hệ</a>
                        </li>
                    </ul>
                    {/*Tìm kiếm */}
                    <div className="d-flex" >
                        <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={onSearchInputChange} value={tuKhoaTamThoi} onKeyDown={handleKeyDown} />
                        <button className="btn btn-outline-success" type="button" onClick={handleSearch}>
                            <Search />
                        </button>
                    </div>
                    {/* biểu tượng giỏ hàng */}
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </li>
                    </ul>

                    {/* Biểu tượng đăng nhập */}
                    <ul className="navbar-nav me-1">
                        <li className="nav-item">
                            {username ? (
                                <div className="nav-link">
                                    <i className="fas fa-user"></i>
                                    <div>
                                        {username}
                                        <button className="btn btn-link" onClick={() => { handleLogout(); }}>
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#dangNhapModal">
                                    <i className="fas fa-user"></i>
                                    <div>
                                        Login
                                    </div>
                                </a>
                            )}
                        </li>
                    </ul>
                    {/* ... Modal for Login */}
                    <div className="modal fade" id="dangNhapModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-dismiss={username ? "modal" : ""}>
                        <div className="modal-dialog">
                            <DangNhap setName={setUsername} />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;