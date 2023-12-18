import React, { useEffect, useState } from "react";
import SachModel from "../../../models/SachModel";
import { lay3SachMoiNhat } from "../../../api/SachAPI";
import CarouselItem from "./CarouselItem";

const Carousel:React.FC=()=> {
    const [danhSach3Sach, setDanhSach3Sach] = useState<SachModel[]>([]);
    const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
    const [baoLoi, setBaoLoi] = useState(null);

    useEffect(() => {
        lay3SachMoiNhat().then(
            kq => {
                setDanhSach3Sach(kq.ketQua);
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
        <div id="carouselExampleCaptions" className="carousel slide" >
            <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                    <CarouselItem key={0} sach={danhSach3Sach[0]}/>
                </div>

                <div className="carousel-item " data-bs-interval="10000">
                    <CarouselItem key={1} sach={danhSach3Sach[1]}/>
                </div>
                <div className="carousel-item " data-bs-interval="10000">
                    <CarouselItem key={2} sach={danhSach3Sach[2]}/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden text-dark">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden text-dark">Next</span>
            </button>
            
        </div>

        
    );
}
export default Carousel;