import React, { useState, useEffect } from "react";
import HinhAnhModel from "../../../../models/HinhAnhModel";
import { layToanBoAnhCuaMotSach } from "../../../../api/HinhAnh";
import SachModel from "../../../../models/SachModel";
import { Link } from "react-router-dom";
import renderRating from "../../../utils/XepHangSao";
import DinhDangSo from "../../../utils/DinhDangSo";

interface SachPropsInterface {
    sach:SachModel;
}
const SachProps: React.FC<SachPropsInterface> = (props) => {
    const maSach: number = props.sach.maSach;
    const [danhSachAnh, setDanhSachAnh]= useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu]= useState(true);
    const [baoLoi, setBaoLoi]= useState(null);
    
    useEffect(()=>{
        layToanBoAnhCuaMotSach(maSach).then(
            hinhAnhData=>{
                setDanhSachAnh(hinhAnhData);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error=>{
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );

    },[]// chỉ gọi 1 lần
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
    console.log(danhSachAnh[0]);

    let duLieuAnh:string="";
    if(danhSachAnh[0] && danhSachAnh[0].duLieuAnh){
        duLieuAnh=danhSachAnh[0].duLieuAnh;
    }

    return (
        <div className="col-md-3 mt-2">
            <div className="card">
                <Link to={`/sach/${props.sach.maSach}`}>
                <img
                    src={duLieuAnh}
                    className="card-img-top"
                    alt={props.sach.tenSach}
                    style={{ height: '200px' }}
                />
                </Link> 
                <div className="card-body">
                    <Link to={`/sach/${props.sach.maSach}`} style={{textDecoration:'none'}} >
                    <h5 className="card-title">{props.sach.tenSach}</h5>
                    </Link>
                    
                    </div>
                    <div className="price row">
                        <span className="original-price col-6 text-end">
                            <del> {DinhDangSo(props.sach.giaNiemYet?props.sach.giaNiemYet:0)} đ</del>
                        </span>
                        <span className="discounted-price col-6">
                            <strong>{DinhDangSo(props.sach.giaNiemYet?props.sach.giaNiemYet:0)} đ</strong>
                        </span>
                    </div>
                    <div className="row mt-2" role="group">
                        <div className="col-6">
                            {renderRating(props.sach.trungBinhXepHang?props.sach.trungBinhXepHang:0)}
                        </div>
                        <div className="col-6">
                            <a href="#" className="btn btn-secondary btn-block me-2">
                                <i className="fas fa-heart"></i>
                            </a>
                            <button className="btn btn-danger btn-block">
                                <i className="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}
export default SachProps;