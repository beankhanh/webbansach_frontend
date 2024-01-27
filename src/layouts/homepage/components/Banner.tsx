import React from "react";
function Banner() {
    return (
        <div className="p-2 mb-2 bg-dark">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div >
                    <h3 className="display fw-5">Một quyển sách hay là đời sống xương máu quý giá <br />của một tinh thần ướp hương và cất kín cho mai sau</h3>
                    <p>J.Milton</p>
                    <button className="btn btn-primary btn-lg text-dark float-end">Khám phá sách tại VKBOOK</button>
                </div>

            </div>
        </div>
    );
}
export default Banner;