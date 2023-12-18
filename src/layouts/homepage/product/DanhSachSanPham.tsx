import React, { useState, useEffect } from "react";
import SachModel from "../../../models/SachModel";
import SachProps from "./components/SachProps";
import { layToanBoSach, timKiemSach } from "../../../api/SachAPI";
import { PhanTrang } from "../../utils/PhanTrang";
interface DanhSachSanPhamProps{
    tuKhoaTimKiem:string;
    maTheLoai:number
}

function DanhSachSanPham({tuKhoaTimKiem, maTheLoai}:DanhSachSanPhamProps){
    const [danhSachQuyenSach, setDanhSachQuyenSach]= useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu]= useState(true);
    const [baoLoi, setBaoLoi]= useState(null);
    const [trangHienTai, setTrangHienTai]=useState(1);
    const [tongSoTrang, setTongSoTrang] = useState(0);
    const [tongSoSach, setTongSoSach]=useState(0);
    
    useEffect(()=>{
        if(tuKhoaTimKiem===''&&maTheLoai==0){
        layToanBoSach(trangHienTai-1).then(
            kq=>{
                setDanhSachQuyenSach(kq.ketQua);
                setTongSoTrang(kq.tongSoTrang);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error=>{
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
        }else{
            timKiemSach(tuKhoaTimKiem, maTheLoai).then(
                kq=>{
                    setDanhSachQuyenSach(kq.ketQua);
                    setTongSoTrang(kq.tongSoTrang);
                    setDangTaiDuLieu(false);
                }
            ).catch(
                error=>{
                    setDangTaiDuLieu(false);
                    setBaoLoi(error.message);
                }
            );
        }
    },[trangHienTai,tuKhoaTimKiem,maTheLoai]// chỉ gọi 1 lần
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
    const phanTrang=(trang:number)=>{
        setTrangHienTai(trang);
    }
    
    return(
        <div className="container">
            <div className="row mt-4">
                
                {
                    danhSachQuyenSach.map((sach)=>
                        <SachProps key={sach.maSach} sach={sach}/>
                    )
                }
            </div>
            <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
        </div>
    );
}
export default DanhSachSanPham;

