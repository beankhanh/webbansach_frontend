import React from "react";
import NguoiDungModel from "../models/NguoiDungModel";
import { my_request } from "./request";

async function layNguoiDung(duongDan: string): Promise<NguoiDungModel[]> {
    const ketQua: NguoiDungModel[] = [];

    // gọi phương thức request
    const response = await my_request(duongDan);
    //lấy ra json
    const responseData = response._embedded.nguoiDungs;
    console.log(responseData);
    for (const key in responseData) {
        ketQua.push(
            {
                maNguoiDung: responseData[key].maNguoiDung,
                ngaySinh: responseData[key].ngaySinh,
                diaChiGiaoHang: responseData[key].diaChiGiaoHang,
                diaChiMuaHang: responseData[key].diaChiMuaHang,
                email: responseData[key].email,
                ten: responseData[key].ten,
                hoDem: responseData[key].hoDem,
                gioiTinh: responseData[key].gioiTinh,
                matKhau: responseData[key].matKhau,
                soDienThoai: responseData[key].soDienThoai,
                tenDangNhap: responseData[key].tenDangNhap,
                avatar: responseData[key].avatar,
            }
        );
    }

    return ketQua;
}
export async function layToanBoNguoiDung(): Promise<NguoiDungModel[]> {
    //Xác định endpoint
    const duongDan: string = `http://localhost:8080/nguoi-dung?sort=maNguoiDung`;
    return layNguoiDung(duongDan);
}