import React, { useState, useEffect } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import SachModel from "../../../models/SachModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnh";
import DinhDangSo from "../../utils/DinhDangSo";
import renderRating from "../../utils/XepHangSao";
import NguoiDungModel from "../../../models/NguoiDungModel";

interface NguoiDungPropsInterface {
    nguoiDung: NguoiDungModel;
}
const NguoiDung: React.FC<NguoiDungPropsInterface> = (props) => {
    const ngaySinh = props.nguoiDung.ngaySinh ? props.nguoiDung.ngaySinh.toLocaleDateString() : 'Ngày sinh không có';
    const avatar = props.nguoiDung.avatar ?? 'Đường dẫn avatar không có';

    return (
        <tr>
            <td>
                <img
                    src={avatar}
                    alt={props.nguoiDung.avatar}
                    style={{ height: '100px' }}
                />
            </td>
            <td>{props.nguoiDung.maNguoiDung}</td>
            <td>{props.nguoiDung.hoDem}</td>
            <td>{props.nguoiDung.ten}</td>
            <td>{props.nguoiDung.gioiTinh}</td>
            <td>{ngaySinh}</td>
            <td>{props.nguoiDung.diaChiGiaoHang}</td>
            <td>{props.nguoiDung.diaChiMuaHang}</td>
            <td>{props.nguoiDung.soDienThoai}</td>
            <td>{props.nguoiDung.email}</td>
            <td>{props.nguoiDung.tenDangNhap}</td>
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
export default NguoiDung;