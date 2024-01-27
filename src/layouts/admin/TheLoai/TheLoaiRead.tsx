import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { layToanBoNguoiDung } from "../../../api/NguoiDungAPI";
import TheLoaiModel from "../../../models/TheLoaiModel";
import TheLoai from "./TheLoai";
import { layToanBoTheLoaiSach } from "../../../api/TheLoai";
const TheLoaiRead: React.FC = () => {
    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);


    useEffect(() => {
        layToanBoTheLoaiSach().then(
            kq => {
                setDanhSachTheLoai(kq);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
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
        <div className="container">
            <div className="row mt-4">
                <div className="col">
                    <div className="col">
                        <Link to={`/admin/sach/them-the-loai`} className="btn btn-primary">
                            Thêm Thể loại
                        </Link>
                    </div>
                </div>
                {/* Hiển thị phần thead ở đây */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã thể loại</th>
                            <th scope="col">Tên thể loại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {danhSachTheLoai.map((theLoai) => (
                            <TheLoai key={theLoai.maTheLoai} theLoai={theLoai} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default TheLoaiRead;

