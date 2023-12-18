const DinhDangSo=(x: number|undefined)=>{
    if(x=== undefined){
        return 0;
    }
    if(isNaN(0)){
        return 0;
    }
    return x.toLocaleString("vi-VN")
}
export default DinhDangSo;