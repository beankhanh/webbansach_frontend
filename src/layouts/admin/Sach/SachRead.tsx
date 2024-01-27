import React, { useState, useEffect } from "react";
import SachModel from "../../../models/SachModel";
import { layToanBoSach, timKiemSach } from "../../../api/SachAPI";
import { PhanTrang } from "../../utils/PhanTrang";
import Sach from "./Sach";
import { Link } from "react-router-dom";
const SachRead: React.FC = () => {
    const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);
    const [trangHienTai, setTrangHienTai] = useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setTongSoSach] = useState(0);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        layToanBoSach(trangHienTai - 1).then(
            kq => {
                setDanhSachQuyenSach(kq.ketQua);
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [trangHienTai]// chỉ gọi 1 lần
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
    const phanTrang = (trang: number) => {
        setTrangHienTai(trang);
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col">
                    <div className="col">
                        <Link to={`/admin/sach/them-sach`} className="btn btn-primary">
                            Thêm Sách
                        </Link>
                    </div>
                </div>
                {/* Hiển thị phần thead ở đây */}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Tên Sách</th>
                            <th scope="col">Tên tác giả</th>
                            <th scope="col">Mô tả</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Phần trăm giảm giá</th>
                            <th scope="col">Đánh Giá</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {danhSachQuyenSach.map((sach) => (
                            <Sach key={sach.maSach} sach={sach} />
                        ))}
                    </tbody>
                </table>
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang} />
        </div>
    );
}
export default SachRead;

