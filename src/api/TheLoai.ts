import React from "react";
import { my_request } from "./request";
import TheLoaiModel from "../models/TheLoaiModel";


async function layTheLoai(duongDan: string): Promise<TheLoaiModel[]> {
    const ketQua: TheLoaiModel[] = [];

    // gọi phương thức request
    const response = await my_request(duongDan);
    //lấy ra json
    const responseData = response._embedded.theLoais;
    console.log(responseData);
    for (const key in responseData) {
        ketQua.push(
            {
                maTheLoai: responseData[key].maTheLoai,
                tenTheLoai: responseData[key].tenTheLoai,
            }
        );
    }

    return ketQua;
}
export async function layToanBoTheLoaiSach(): Promise<TheLoaiModel[]> {
    //Xác định endpoint
    const duongDan: string = ` http://localhost:8080/the-loai?sort=tenTheLoai`;
    return layTheLoai(duongDan);
}
export async function layTheLoaiTheoMaSach(maSach: number): Promise<TheLoaiModel[]> {
    //Xác định endpoint
    const duongDan: string = ` http://localhost:8080/the-loai/${maSach}/danhsachtheloai`;
    return layTheLoai(duongDan);
}