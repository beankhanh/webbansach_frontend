import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NguoiDungModel from "../../../models/NguoiDungModel";
import { layToanBoNguoiDung } from "../../../api/NguoiDungAPI";
import NguoiDung from "./NguoiDung";
const NguoiDungRead: React.FC = () => {
    const [danhSachNguoiDung, setDanhSachNguoiDung] = useState<NguoiDungModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);


    useEffect(() => {
        layToanBoNguoiDung().then(
            kq => {
                setDanhSachNguoiDung(kq);
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
    console.log(danhSachNguoiDung);
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
                        <Link to={`/admin/sach/them-nguoi-dung`} className="btn btn-primary">
                            Thêm Sách
                        </Link>
                    </div>
                </div>
                {/* Hiển thị phần thead ở đây */}
                <table className="table">
                    <thead>
                        <tr><th scope="col">Mã người dùng</th>
                            <th scope="col">Ảnh</th>
                            <th scope="col">Họ đệm</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Giới Tính</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Địa chỉ giao hàng</th>
                            <th scope="col">Địa chỉ mua hàng</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Email</th>
                            <th scope="col">Tên đăng nhập</th>
                        </tr>
                    </thead>
                    <tbody>
                        {danhSachNguoiDung.map((nguoiDung) => (
                            <NguoiDung key={nguoiDung.maNguoiDung} nguoiDung={nguoiDung} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default NguoiDungRead;

