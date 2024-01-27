import React from "react";
import { my_request } from "./request";
import BookApi from "./api";
import { error } from "console";
import SachModel from "../models/SachModel";
import Pagination from "../models/Pagination";
interface KetQuaInterface {
    ketQua: SachModel[];
    tongSoTrang: number;
    tongSoSach: number;
}

async function laySach(duongDan: string): Promise<KetQuaInterface> {
    const ketQua: SachModel[] = [];

    // gọi phương thức request
    const response = await my_request(duongDan);
    //lấy ra json
    const responseData = response._embedded.saches;
    console.log(responseData);
    //Lấy thong tin trang
    const tongSoTrang: number = response.page.totalPages;
    const tongSoSach: number = response.page.totalElements;
    for (const key in responseData) {
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
                phanTramGiamGia: responseData[key].phanTramGiamGia,
                isbn: responseData[key].isbn,
            }
        );
    }

    return { ketQua: ketQua, tongSoSach: tongSoTrang, tongSoTrang: tongSoTrang };
}


export async function layToanBoSach(trang: number): Promise<KetQuaInterface> {
    const paginations = new Pagination(trang, 8, 'maSach', 'desc');

    // Xác định endpoint
    const duongDan: string = `${BookApi}?${paginations.toQueryString()}`;
    //const duongDan: string = `http://localhost:8080/sach?sort=maSach,desc&size=8&page=${trang}`;
    return laySach(duongDan);
}

export async function lay4SachHotNhat(): Promise<KetQuaInterface> {
    const paginations = new Pagination(0, 4, 'trungBinhXepHang', 'desc');

    // Xác định endpoint
    const duongDan: string = `${BookApi}?${paginations.toQueryString()}`;
    // const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=4';
    return laySach(duongDan);
}

export async function lay3SachMoiNhat(): Promise<KetQuaInterface> {
    const paginations = new Pagination(0, 3, 'maSach', 'desc');

    // Xác định endpoint
    const duongDan: string = `${BookApi}?${paginations.toQueryString()}`;
    // const duongDan: string = 'http://localhost:8080/sach?sort=maSach,desc&page=0&size=3';
    return laySach(duongDan);
}
export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: Number): Promise<KetQuaInterface> {
    const paginations = new Pagination(0, 8, 'maSach', 'desc');
    // Xác định endpoint
    let duongDan: string = `${BookApi}?${paginations.toQueryString()}`;
    if (tuKhoaTimKiem !== '' && maTheLoai == 0) {
        duongDan = `${BookApi}/search/findByTenSachContaining?${paginations.toQueryString()}&tenSach=${tuKhoaTimKiem}`;
    } else if (tuKhoaTimKiem === '' && maTheLoai != 0) {
        duongDan = `${BookApi}/search/findByDanhSachTheLoai_MaTheLoai?${paginations.toQueryString()}&maTheLoai=${maTheLoai}`;
    } else if (tuKhoaTimKiem !== '' && maTheLoai != 0) {
        duongDan = `${BookApi}/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?${paginations.toQueryString()}&tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}`;
    }
    return laySach(duongDan);
}

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {
    let ketQua: SachModel;
    const duongDan = `${BookApi}/${maSach}`;

    try {
        // gọi phương thức request
        const response = await fetch(duongDan);
        if (!response.ok) {
            throw new Error('Gặp lỗi trong quá tring lấy API');
        }
        const sachData = await response.json();

        if (sachData) {
            return {
                maSach: sachData.maSach,
                tenSach: sachData.tenSach,
                giaBan: sachData.giaBan,
                giaNiemYet: sachData.giaNiemYet,
                moTa: sachData.moTa,
                soLuong: sachData.soLuong,
                tenTacGia: sachData.tenTacGia,
                trungBinhXepHang: sachData.trungBinhXepHang,
            }

        } else {
            throw new Error('Sách không tồn tại');
        }
    } catch (error) {
        console.error("Error", error);
        return null;
    }

}
