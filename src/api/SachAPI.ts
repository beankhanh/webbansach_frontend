import React from "react";
import SachModel from "../layouts/models/SachModel";
import { my_request } from "./request";
import BookApi from "./api";
import Pagination from "../layouts/models/Pagination";

 async function laySach(duongDan:string): Promise<SachModel[]> {
    const ketQua: SachModel[]=[];

    // gọi phương thức request
    const response = await my_request(duongDan);
    //lấy ra json
    const responseData = response._embedded.saches;
    console.log(responseData);
    for(const key in responseData){
        ketQua.push(
            {
                maSach: responseData[key].maSach,
                tenSach: responseData[key].tenSach,
                giaBan: responseData[key].giaBan,
                giaNiemYet: responseData[key].giaNiemYet,
                moTa: responseData[key].moTa,
                soLuong: responseData[key].soLuong,
                tenTacGia: responseData[key].tenTacGia,
                trungBinhXepHang: responseData[key].trungBinhXepHang,
            }
        );
    }

    return ketQua;
}

export async function layToanBoSach(): Promise<SachModel[]> {
    const paginations  = new Pagination('','','maSach','desc');
    //Xác định endpoint
    const duongDan: string =`${BookApi}?${paginations.toQueryString()}`;
    return laySach(duongDan);
    
}
export async function lay3SachMoi(): Promise<SachModel[]> {
    const paginations  = new Pagination('0','3','maSach','desc');
    //Xác định endpoint
    const duongDan: string =`${BookApi}?${paginations.toQueryString()}`;
    return laySach(duongDan);
    
}
