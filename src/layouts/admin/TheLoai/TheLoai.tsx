import React, { useState, useEffect } from "react";
import HinhAnhModel from "../../../models/HinhAnhModel";
import SachModel from "../../../models/SachModel";
import { layToanBoAnhCuaMotSach } from "../../../api/HinhAnh";
import DinhDangSo from "../../utils/DinhDangSo";
import renderRating from "../../utils/XepHangSao";
import NguoiDungModel from "../../../models/NguoiDungModel";
import TheLoaiModel from "../../../models/TheLoaiModel";

interface TheLoaiPropsInterface {
    theLoai: TheLoaiModel;
}
const TheLoai: React.FC<TheLoaiPropsInterface> = (props) => {

    return (
        <tr>
            <td>{props.theLoai.maTheLoai}</td>
            <td>{props.theLoai.tenTheLoai}</td>
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
export default TheLoai;