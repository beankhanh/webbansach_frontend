class NguoiDungModel {
    maNguoiDung: number;
    ngaySinh?: Date;
    diaChiGiaoHang?: number;
    diaChiMuaHang?: number;
    email?: string;
    ten?: string;
    hoDem?: string;
    gioiTinh?: string;
    matKhau?: number;
    soDienThoai?: number;
    tenDangNhap?: string;
    avatar?: string
    constructor(
        maNguoiDung: number,
        ngaySinh?: Date,
        diaChiGiaoHang?: number,
        diaChiMuaHang?: number,
        email?: string,
        ten?: string,
        hoDem?: string,
        gioiTinh?: string,
        matKhau?: number,
        soDienThoai?: number,
        tenDangNhap?: string,
        avatar?: string,
    ) {
        this.maNguoiDung = maNguoiDung;
        this.ngaySinh = ngaySinh;
        this.diaChiGiaoHang = diaChiGiaoHang;
        this.diaChiMuaHang = diaChiMuaHang;
        this.email = email;
        this.ten = ten;
        this.hoDem = hoDem;
        this.gioiTinh = gioiTinh;
        this.matKhau = matKhau;
        this.soDienThoai = soDienThoai;
        this.tenDangNhap = tenDangNhap;
        this.avatar = avatar;
    }

}
export default NguoiDungModel;