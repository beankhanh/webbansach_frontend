import React from "react";
import { my_request } from "./request";
import HinhAnhModel from "../layouts/models/HinhAnhModel";

export async function layToanBoAnhCuaMotSach(maSach:number): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[]=[];

    //Xác định endpoint
    const duongDan: string = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
    // gọi phương thức request
    const response = await my_request(duongDan);
    //lấy ra json
    const responseData = response._embedded.hinhAnhs;
    console.log(responseData);
    for(const key in responseData){
        ketQua.push(
            {
                maHinhAnh: responseData[key].maHinhAnh,
                tenHinhAnh: responseData[key].tenHinhAnh,
                laIcon: responseData[key].laIcon,
                duongDan: responseData[key].duongDan,
                duLieuAnh: responseData[key].duLieuAnh,
            }
        );
    }

    return ketQua;
}