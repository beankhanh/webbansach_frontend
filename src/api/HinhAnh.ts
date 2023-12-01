import React from "react";
import { my_request } from "./request";
import BookApi from "./api";
import HinhAnhModel from "../layouts/models/HinhAnhModel";

async function layAnh(duongDan:string): Promise<HinhAnhModel[]> {
    const ketQua: HinhAnhModel[]=[];

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
export async function layToanBoAnhCuaMotSach(maSach:number): Promise<HinhAnhModel[]> {
        //Xác định endpoint
        const duongDan: string =`http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;
        return layAnh(duongDan);
}
export async function lay1AnhCuaMotSach(maSach:number): Promise<HinhAnhModel[]> {
    //const Paginations  = new Pagination('0','1','maHinhAnh','asc');
    //Xác định endpoint
    const duongDan: string =`http://localhost:8080/sach/${maSach}/danhSachHinhAnh?sort=maHinhAnh,asc&page=0&size=1`;
    return layAnh(duongDan);
}