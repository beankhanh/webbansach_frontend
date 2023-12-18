import React, { useState, useEffect } from "react";
import SachModel from "../../../models/SachModel";
import { useParams } from "react-router-dom";
import { laySachTheoMaSach } from "../../../api/SachAPI";
import HinhAnhSanPham from "./components/HinhAnhSanPham";
import DanhGiaSanPham from "./components/DanhGiaSanPham";
import renderRating from "../../utils/XepHangSao";
import DinhDangSo from "../../utils/DinhDangSo";


const ChiTietSanPham: React.FC=()=>{

    const {maSach}= useParams(); 
    let maSachNumber= 0;
    try {
        maSachNumber= parseInt(maSach+'');
    } catch (error) {
        maSachNumber=0;
        console.error('Error:',error);
    }
    if(Number.isNaN(maSachNumber))
    maSachNumber=0;

    const [sach, setSach]= useState<SachModel|null>(null);
    const [dangTaiDuLieu, setDangTaiDuLieu]= useState(true);
    const [baoLoi, setBaoLoi]= useState(null);
    const [soLuong, setSoLuong]= useState(1);

    const tangSoLuong =()=>{
        const soLuongTonKho =(sach && sach.soLuong?sach.soLuong:0);
        if(soLuong<soLuongTonKho){
            setSoLuong(soLuong+1)
        }
    }
    const giamSoLuong =()=>{
        if(soLuong>2){
            setSoLuong(soLuong-1)
        }
    }

    const handleSoLuongChange =( event: React.ChangeEvent<HTMLInputElement>)=>{
        const soLuongMoi = parseInt(event.target.value);
        const soLuongTonKho =(sach && sach.soLuong?sach.soLuong:0);
        if(!isNaN(soLuongMoi)&& soLuongMoi>=1 && soLuongMoi<=soLuongTonKho){
            setSoLuong(soLuongMoi);
        }
    }

    const handleMuaNgay = () => {

    }
    const handleThemVaoGioHang = () => {

    }
    useEffect(()=>{
        laySachTheoMaSach(maSachNumber).then((sach)=>{
            setSach(sach);
            setDangTaiDuLieu(false)
        }

        ).catch((error)=>{
            setBaoLoi(error.message);
            setDangTaiDuLieu(false);
        }
        )
    },[maSach]
    )
    
    if(dangTaiDuLieu){
        return(
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }
    if(baoLoi){
        return(
            <div>
                <h1>Gặp lỗi : {baoLoi}</h1>
            </div>
        );
    }
    if (!sach) {
        return (
            <div>
                <h1>Sách không tồn tại!</h1>
            </div>
        );
    }
    return(
        <div className="container">
            <div className="row mt-4 mb-4"> 
                <div className="col-4">
                    <HinhAnhSanPham maSach={maSachNumber}></HinhAnhSanPham>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-8">
                            <h1>
                                {sach.tenSach}
                            </h1>
                            <h4>
                                {renderRating(sach.trungBinhXepHang?sach.trungBinhXepHang:0)}
                            </h4>
                            <h4>
                                {DinhDangSo(sach.giaBan?sach.giaBan:0)} đ
                            </h4>
                            <hr/>
                            <div dangerouslySetInnerHTML={{__html:(sach.moTa+'')}}/>
                                <hr/>
                        </div>
                        <div className="col-4">
                            <div>
                                <div className="mb-2">
                                    Số Lượng
                                </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-outlinr-secondary me-2" onClick={giamSoLuong}>-</button>
                                    <input className="form-control text-center" type="number" value={soLuong} onChange={handleSoLuongChange} ></input>
                                    <button className="btn btn-outlinr-secondary ms-2" onClick={tangSoLuong}>+</button>
                                </div>
                                <div>
                                    {
                                        sach.giaBan&&(
                                            <div className="mt-2 text-center">
                                                    Số tiền tạm tính <br/>
                                                    <h4>{DinhDangSo(soLuong*sach.giaBan)} đ</h4>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="button" className="btn btn-danger mt-3" onClick={handleMuaNgay}>Mua ngay</button>
                                    <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4 mb-4"> 
            <DanhGiaSanPham maSach={maSachNumber} />
            </div>


        </div>
    );
}
export default ChiTietSanPham;

