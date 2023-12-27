import React, { useState } from "react";
function DangKyNguoiDung() {
    const [tenDangNhap, setTenDangNhap] = useState('');
    const [email, setEmail] = useState('');
    const [hoDem, setHoDem] = useState('');
    const [ten, setTen] = useState('');
    const [soDienThoai, setSoDienThoai] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauNhapLai, setMatKhauNhapLai] = useState('');
    const [gioiTinh, setGioiTinh] = useState('');


    const [errorTenDangNhap, setErrorTenDangNhap] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorMatKhau, setErrorMatKhau] = useState("");
    const [errorMatKhauLapLai, setErrorMatKhauLapLai] = useState("");
    const [thongBao, setThongBao] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        // Clear any previous error messages
        setErrorTenDangNhap('');
        setErrorEmail('');
        setErrorMatKhau('');
        setErrorMatKhauLapLai('');

        // Tránh click liên tục
        e.preventDefault();

        // Kiểm tra các điều kiện và gán kết quả vào biến
        const isTenDangNhapValid = !await kiemTraTenDangNhapDaTonTai(tenDangNhap);
        const isEmailValid = !await kiemTraEmailTonTai(email);
        const isMatKhauValid = !kiemTraMatKhauTonTai(matKhau);
        const isMatKhauLapLaiValid = !kiemTraMatKhauNhapLaiTonTai(matKhauNhapLai);

        // Kiểm tra tất cả các điều kiện
        if (isTenDangNhapValid && isEmailValid && isMatKhauValid && isMatKhauLapLaiValid) {
            try {
                const url = 'http://localhost:8080/tai-khoan/dang-ky';

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({
                        tenDangNhap: tenDangNhap,
                        email: email,
                        matKhau: matKhau,
                        hoDem: hoDem,
                        ten: ten,
                        soDienThoai: soDienThoai,
                        gioiTinh: gioiTinh
                    })
                }
                );

                if (response.ok) {
                    setThongBao("Đăng ký thành công, vui lòng kiểm tra email để kích hoạt!");
                } else {
                    console.log(response.json());
                    setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
                }
            } catch (error) {
                setThongBao("Đã xảy ra lỗi trong quá trình đăng ký tài khoản.")
            }
        }
    }
    //Kiem tra ten dang nhap
    const kiemTraTenDangNhapDaTonTai = async (tenDangNhap: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByTenDangNhap?tenDangNhap=${tenDangNhap}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === `true`) {
                setErrorTenDangNhap("Tên đăng nhập đã tồn tại!")
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra tên đăng nhập:", error);
            return false;
        }
    }
    const handleTenDangNhapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị
        setTenDangNhap(e.target.value)
        //Kiểm tra
        setErrorTenDangNhap('');
        //Kiểm tra sự tồn tại
        return kiemTraTenDangNhapDaTonTai(e.target.value);
    }
    //Kiem tra email
    const kiemTraEmailTonTai = async (email: string) => {
        const url = `http://localhost:8080/nguoi-dung/search/existsByEmail?email=${email}`;
        try {
            const response = await fetch(url);
            const data = await response.text();
            if (data === `true`) {
                setErrorEmail("Email đã tồn tại!")
                return true;
            }
            return false;
        } catch (error) {
            console.error("Lỗi khi kiểm tra email:", error);
            return false;
        }
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị
        setEmail(e.target.value)
        //Kiểm tra
        setErrorEmail('');
        //Kiểm tra sự tồn tại
        return kiemTraEmailTonTai(e.target.value);
    }
    //Kiem tra mat khau
    const kiemTraMatKhauTonTai = (matKhau: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(matKhau)) {
            setErrorMatKhau("Mật khẩu phải có ít nhất 8 ký tự và bao gồm ít nhất 1 ký tự đặc biệt (!@#$%^&*)");
            return true;
        } else {
            setErrorMatKhau(""); // Mật khẩu hợp lệ
            return false;
        }
    }
    const handleMatKhauChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị
        setMatKhau(e.target.value)
        //Kiểm tra
        setErrorMatKhau('');
        //Kiểm tra sự tồn tại
        return kiemTraMatKhauTonTai(e.target.value);
    }
    //Kiem tra mat khau nhap lai
    const kiemTraMatKhauNhapLaiTonTai = (matKhauNhapLai: string) => {
        if (matKhauNhapLai !== matKhau) {
            setErrorMatKhauLapLai("Mật khẩu không trùng");
            return true;
        } else {
            setErrorMatKhau(""); // Mật khẩu trùng khớp
            return false;
        }
    }
    const handleMatKhauNhapLaiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Thay đổi giá trị
        setMatKhauNhapLai(e.target.value)
        //Kiểm tra
        setErrorMatKhauLapLai('')
        //Kiểm tra sự tồn tại
        return kiemTraMatKhauNhapLaiTonTai(e.target.value);
    }
    return (
        <div className="container">
            <h1 className="mt-5 text-center">Đăng ký</h1>
            <div className="mb-3 col-md-6 col-12 mx-auto">
                <form onSubmit={handleSubmit} className="form">
                    <div className="mb-3">
                        <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
                        <input
                            type="text"
                            id="tenDangNhap"
                            className="form-control"
                            value={tenDangNhap}
                            onChange={handleTenDangNhapChange}
                        />
                        <div style={{ color: "red" }}>{errorTenDangNhap}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div style={{ color: "red" }}>{errorEmail}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            id="matKhau"
                            className="form-control"
                            value={matKhau}
                            onChange={handleMatKhauChange}
                        />
                        <div style={{ color: "red" }}>{errorMatKhau}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="matKhauNhapLai" className="form-label">Mật khẩu nhập lại</label>
                        <input
                            type="password"
                            id="matKhauNhapLai"
                            className="form-control"
                            value={matKhauNhapLai}
                            onChange={handleMatKhauNhapLaiChange}
                        />
                        <div style={{ color: "red" }}>{errorMatKhauLapLai}</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hoDem" className="form-label">Họ đệm</label>
                        <input
                            type="text"
                            id="hoDem"
                            className="form-control"
                            value={hoDem}
                            onChange={(e) => setHoDem(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="ten" className="form-label">Tên</label>
                        <input
                            type="text"
                            id="ten"
                            className="form-control"
                            value={ten}
                            onChange={(e) => setTen(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="soDienThoai" className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            id="soDienThoai"
                            className="form-control"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gioiTinh" className="form-label">Giới tính</label>
                        <input
                            type="text"
                            id="gioiTinh"
                            className="form-control"
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary">Đăng Ký</button>
                        <div style={{ color: "green" }}>{thongBao}</div>

                    </div>
                </form>
            </div>
        </div>
    );
}
export default DangKyNguoiDung;