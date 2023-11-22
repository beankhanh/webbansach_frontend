import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import DanhSachSanPham from "./product/DanhSachSanPham";
function Homepage(){
    return(
        <div>
            <Banner/>
            <Carousel/>
            <DanhSachSanPham/>
        </div>
    );
}
export default Homepage;