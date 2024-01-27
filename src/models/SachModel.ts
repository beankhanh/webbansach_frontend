class SachModel {
    maSach: number;
    tenSach?: string;
    giaBan?: number;
    giaNiemYet?: number;
    moTa?: string;
    soLuong?: number;
    tenTacGia?: string;
    trungBinhXepHang?: number;
    phanTramGiamGia?: number;
    isbn?: number;

    constructor(
        maSach: number,
        tenSach?: string,
        giaBan?: number,
        giaNiemYet?: number,
        moTa?: string,
        soLuong?: number,
        tenTacGia?: string,
        trungBinhXepHang?: number,
        phanTramGiamGia?: number,
        isbn?: number,
    ) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.giaBan = giaBan;
        this.giaNiemYet = giaNiemYet;
        this.moTa = moTa;
        this.soLuong = soLuong;
        this.tenTacGia = tenTacGia;
        this.trungBinhXepHang = trungBinhXepHang;
        this.phanTramGiamGia = phanTramGiamGia;
        this.isbn = isbn;
    }
}
export default SachModel;