import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const renderRating = (diem: number) => {
    const stars = [];
    
    // Lặp qua 5 sao
    for (let i = 1; i <= 5; i++) {
        // Kiểm tra xem i có nhỏ hơn hoặc bằng phần nguyên của diem không
        if (i <= Math.floor(diem)) {
            stars.push(<StarFill className="text-warning"  />);
        } else {
            // Nếu i lớn hơn phần nguyên của diem, kiểm tra phần thập phân
            if (i - 0.5 === diem) {
                stars.push(<StarHalf className="text-warning"  />);
            } else {
                stars.push(<Star className="text-secondary"  />);
            }
        }
    }
    
    return stars;
}
export default renderRating