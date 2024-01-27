import React, { useState, useEffect } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import SachModel from "../../../models/SachModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnh";
import DinhDangSo from "../../utils/DinhDangSo";
import renderRating from "../../utils/XepHangSao";

interface SachPropsInterface {
    sach: SachModel;
}
const Sach: React.FC<SachPropsInterface> = (props) => {
    const maSach: number = props.sach.maSach;
    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
            hinhAnhData => {
                setDanhSachAnh(hinhAnhData);
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
    console.log(danhSachAnh[0]);

    let duLieuAnh: string = "";
    if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
        duLieuAnh = danhSachAnh[0].duLieuAnh;
    }

    return (
        <tr>
            <td>
                <img
                    src={duLieuAnh}
                    alt={props.sach.tenSach}
                    style={{ height: '100px' }}
                />
            </td>
            <td>{props.sach.tenSach}</td>
            <td>{props.sach.tenTacGia}</td>
            <td>{props.sach.moTa}</td>
            <td>
                <div className="price">
                    <span className="original-price">
                        <del>{DinhDangSo(props.sach.giaNiemYet ? props.sach.giaNiemYet : 0)} đ</del>
                    </span>
                    <span className="discounted-price">
                        <strong>{DinhDangSo(props.sach.giaNiemYet ? props.sach.giaNiemYet : 0)} đ</strong>
                    </span>
                </div>
            </td>
            <td>{props.sach.soLuong}</td>
            <td>{props.sach.phanTramGiamGia}</td>
            <td>{renderRating(props.sach.trungBinhXepHang ? props.sach.trungBinhXepHang : 0)}</td>
            <td>
                <a href="#" className="btn btn-secondary me-2">
                    <i className="fas fa-edit"></i> Edit
                </a>
                <button className="btn btn-danger">
                    <i className="fas fa-trash-alt"></i> Delete
                </button>
            </td>
        </tr>
    );
}
export default Sach;