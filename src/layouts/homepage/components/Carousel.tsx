import React from "react";
function Carousel() {
    return (
        <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <div className="row align-items-center ">
                        <div className="col-5 text-center">
                            <img src={'./../../../image/books/1.jpg'} style={{ width: '150px' }} />
                        </div>
                        <div className="col-7 ">
                            <div className="carousel-caption d-none d-md-block text-dark">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item ">
                    <div className="row align-items-center ">
                        <div className="col-5 text-center">
                            <img src={'./../../../image/books/2.jpg'} style={{ width: '150px' }} />
                        </div>
                        <div className="col-7 ">
                            <div className="carousel-caption d-none d-md-block text-dark">
                                <h5>Second  slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item ">
                    <div className="row align-items-center ">
                        <div className="col-5 text-center">
                            <img src={'./../../../image/books/3.jpg'} style={{ width: '150px' }} />
                        </div>
                        <div className="col-7 ">
                            <div className="carousel-caption d-none d-md-block text-dark">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
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