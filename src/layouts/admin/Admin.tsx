import { ReactElement, useEffect } from "react";
import { Link } from "react-router-dom";


interface AdminProps {
    children: ReactElement
    setIsInAdminPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Admin: React.FC<AdminProps> = ({ children, setIsInAdminPage }) => {

    useEffect(() => {
        setIsInAdminPage(true);
        // Cleanup function để đảm bảo rằng giá trị chỉ được cập nhật một lần
        return () => {
            setIsInAdminPage(false);
        };
    }, [setIsInAdminPage]);

    return (
        <div>
            <div>
                <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">VK Dashboard</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Dashboard</a>
                                </li>
                            </ul>
                            <ul className="navbar-nav me-1">
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="row" style={{ marginTop: '56px', marginLeft: 0, height: '100vh', width: '100%' }}>
                        <div className="col-md-3 " style={{ background: '#4f5d73', marginLeft: 0 }}>
                            <ul className='' style={{ listStyleType: 'none', height: '100%', marginTop: '56px' }}>
                                <li>
                                    <Link to={`/admin/nguoi-dung`}>
                                        <span><h6>Người dùng</h6></span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/admin/sach`}>
                                        <span><h6>Sách</h6></span>
                                    </Link>
                                </li>
                                <li>
                                    <span>Hình ảnh</span>
                                </li>
                                <li>
                                    <Link to={`/admin/the-loai`}>
                                        <span><h6>Thể loại</h6></span>
                                    </Link>
                                </li>
                                <li>
                                    <span>Đơn hàng</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-9">
                            {children}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )

}

export default Admin;