import React from "react";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import List from "./product/List";
function Homepage(){
    return(
        <div>
            <Banner/>
            <Carousel/>
            <List/>
        </div>
    );
}
export default Homepage;