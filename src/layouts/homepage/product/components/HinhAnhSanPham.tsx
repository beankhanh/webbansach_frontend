import React, { useState, useEffect } from "react";
import { layToanBoAnhCuaMotSach } from "../../../../api/HinhAnh";
import SachModel from "../../../../models/SachModel";
import { Link } from "react-router-dom";
import { couldStartTrivia } from "typescript";
import { Carousel } from "react-responsive-carousel";
import HinhAnhModel from "../../../../models/HinhAnhModel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import CSS cho carousel

interface HinhAnhSanPham {
    maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {

    const maSach: number = props.maSach;

    const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        layToanBoAnhCuaMotSach(maSach).then(
            danhSach => {
                setDanhSachAnh(danhSach);
                setDangTaiDuLieu(false);
            }
        ).catch(
            error => {
                setDangTaiDuLieu(false);
                setBaoLoi(error.message);
            }
        );
    }, [] // Chi goi mot lan
    )



    // console.log(danhSachAnh.length);

    if (dangTaiDuLieu) {
        return (
            <div>
                <h1>Đang tải dữ liệu</h1>
            </div>
        );
    }

    if (baoLoi) {
        return (
            <div>
                <h1>Gặp lỗi: {baoLoi}</h1>
            </div>
        );
    }

    return (
        <div className="row">
            <div className="col-12">
                <Carousel showArrows={true} showIndicators={true}>
                {
                    danhSachAnh.map((hinhAnh, index)=>(
                        <div key={index}>
                            <img src={hinhAnh.duLieuAnh} alt={`${hinhAnh.tenHinhAnh}`} style={{maxWidth:"250px"}}/>
                        </div>
                    ))
                }
                </Carousel>
            </div>
        </div>
    );
}
export default HinhAnhSanPham;