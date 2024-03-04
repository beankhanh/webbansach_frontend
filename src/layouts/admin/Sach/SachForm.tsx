import React, { FormEvent, useEffect, useState } from 'react';
import RequireAdmin from '../RequireAdmin';
import HinhAnhModel from '../../../models/HinhAnhModel';
import TheLoaiModel from '../../../models/TheLoaiModel';
import { layToanBoTheLoaiSach } from '../../../api/TheLoai';

const SachForm = ({ closeModal }: { closeModal?: any }) => {
    const [danhSachTheLoai, setDanhSachTheLoai] = useState<TheLoaiModel[]>([]);
    const [thumnail, setThumnail] = useState<File | null>(null);

    useEffect(() => {
        layToanBoTheLoaiSach().then(
            kq => {
                setDanhSachTheLoai(kq);
            }
        ).catch();
    }, []// chỉ gọi 1 lần
    )
    // Convert file to Base64
    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };
    const getBase64ForRelatedImg = async (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };
    const [sach, setSach] = useState({
        maSach: 0,
        tenSach: '',
        giaBan: 0,
        giaNiemYet: 0,
        moTa: '',
        soLuong: 0,
        tenTacGia: '',
        isbn: '',
        trungBinhXepHang: 0,
        phanTramGiamGia: 0,
        maTheLoai: [] as number[],
        icon: "",
        relatedImg: [] as string[],
    })
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const base64Avatar = thumnail ? await getBase64(thumnail) : null;
        //const base64RelatedImages = await Promise.all(sach.relatedImg.map(image => getBase64ForRelatedImg(image)));
        console.log({
            ...sach,
            icon: base64Avatar
        })
        fetch('http://localhost:8080/sachs/them-sach',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...sach,
                    icon: base64Avatar,
                    // relatedImg: base64RelatedImages,
                })
            }
        ).then((reponse) => {
            if (reponse.ok) {
                alert("Đã thêm sách thành công!");
                setSach({
                    maSach: 0,
                    tenSach: '',
                    giaBan: 0,
                    giaNiemYet: 0,
                    moTa: '',
                    soLuong: 0,
                    tenTacGia: '',
                    isbn: '',
                    trungBinhXepHang: 0,
                    phanTramGiamGia: 0,
                    maTheLoai: [] as number[],
                    icon: '',
                    relatedImg: [] as string[],
                })
                console.log("Dữ liệu sách:", sach);
            } else {
                alert("Gặp lỗi trong quá trình thêm sách!");
            }
        })
        closeModal();
    }
    //gán giá trị ảnh ngoài truyền thumnail 
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            setThumnail(file);
        }
    };
    const handleRelatedImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            // Convert each file to base64
            const base64Images = await Promise.all(files.map(file => getBase64ForRelatedImg(file)));

            // Update state with an array of base64-encoded images
            setSach({
                ...sach,
                relatedImg: base64Images.filter(Boolean) as string[],
            });
        }
    };
    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"></h5>
                        <button type="button" className="close" onClick={closeModal}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='container row d-flex align-items-center justify-content-center'>
                            <div className=''>
                                <h1>THÊM SÁCH</h1>
                                <form onSubmit={handleSubmit} className='form'>
                                    <input
                                        type='hidden'
                                        id='maSach'
                                        value={sach.maSach}
                                    />

                                    <label htmlFor='tenSach'>Tên sách</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={sach.tenSach}
                                        onChange={(e) => setSach({ ...sach, tenSach: e.target.value })}
                                        required
                                    />

                                    <label htmlFor='giaBan'>Giá bán</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        value={sach.giaBan}
                                        onChange={(e) => setSach({ ...sach, giaBan: parseFloat(e.target.value) })}
                                        required
                                    />

                                    <label htmlFor='giaNiemYet'>Giá niêm yết</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        value={sach.giaNiemYet}
                                        onChange={(e) => setSach({ ...sach, giaNiemYet: parseFloat(e.target.value) })}
                                        required
                                    />

                                    <label htmlFor='soLuong'>số Lượng</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        value={sach.soLuong}
                                        onChange={(e) => setSach({ ...sach, soLuong: parseInt(e.target.value) })}
                                        required
                                    />

                                    <label htmlFor='tenSach'>Tên tác giả</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={sach.tenTacGia}
                                        onChange={(e) => setSach({ ...sach, tenTacGia: e.target.value })}
                                        required
                                    />

                                    <label htmlFor='moTa'>Mô tả</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={sach.moTa}
                                        onChange={(e) => setSach({ ...sach, moTa: e.target.value })}
                                        required
                                    />

                                    <label htmlFor='isbn'>ISBN</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={sach.isbn}
                                        onChange={(e) => setSach({ ...sach, isbn: e.target.value })}
                                        required
                                    />
                                    <label htmlFor='phanTramGiamGia'>Phần trăm giảm giá</label>
                                    <input
                                        className='form-control'
                                        type='number'
                                        value={sach.phanTramGiamGia}
                                        onChange={(e) => setSach({ ...sach, phanTramGiamGia: parseFloat(e.target.value) })}
                                        required
                                    />
                                    <label htmlFor='theLoai'>Thể loại</label>
                                    <select
                                        className='form-control'
                                        multiple
                                        value={sach.maTheLoai.map(String)}
                                        onChange={(e) => {
                                            const selectedValues = Array.from(e.target.selectedOptions, (option) => Number(option.value));
                                            setSach({ ...sach, maTheLoai: selectedValues });
                                        }}
                                        required
                                    >
                                        {danhSachTheLoai.map((theLoai) => (
                                            <option key={theLoai.maTheLoai} value={String(theLoai.maTheLoai)}>
                                                {theLoai.tenTheLoai}
                                            </option>
                                        ))}
                                    </select>
                                    <label htmlFor='icon'>Icon</label>
                                    <input
                                        className='form-control'
                                        type='file'

                                        accept='image/*'
                                        onChange={handleAvatarChange}
                                        required
                                    />
                                    <label htmlFor='relatedImg'>Các ảnh khác</label>
                                    <input
                                        className='form-control'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleRelatedImgChange}
                                        multiple  // Allow multiple file selection
                                    />
                                    <button type='submit' className='btn btn-success mt-2'>Lưu</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
const SachForm_Admin = RequireAdmin(SachForm);
export default SachForm;