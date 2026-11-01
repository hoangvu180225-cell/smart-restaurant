import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top 4 Columns */}
        <div className="footer-columns">
          {/* Col 1: Brand & Story */}
          <div className="footer-col brand-col">
            <div className="footer-brand">
              <svg width="24" height="28" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 2L28 9.5V24.5L15 32L2 24.5V9.5L15 2Z" stroke="#A38348" strokeWidth="1.5" />
                <path d="M15 7L23 11.5V20.5L15 25L7 20.5V11.5L15 7Z" stroke="#A38348" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="15" cy="16" r="3" fill="#A38348" />
              </svg>
              <span className="brand-name">SmartRestaurant</span>
            </div>
            <p className="footer-bio">
              Chắt lọc tinh hoa ẩm thực Việt qua lăng kính đương đại. Mang đến trải nghiệm đặt bàn tinh tế, 
              không gian phòng tiệc sang trọng và phong cách phục vụ tận tâm.
            </p>
          </div>

          {/* Col 2: Service Hours */}
          <div className="footer-col">
            <h4 className="footer-heading">Giờ Phục Vụ</h4>
            <div className="hours-block">
              <div className="hour-row">
                <span className="day">Thứ Hai - Thứ Sáu</span>
                <span className="time">11:30 - 14:00<br />18:00 - 22:30</span>
              </div>
              <div className="hour-row">
                <span className="day">Thứ Bảy & Chủ Nhật</span>
                <span className="time">11:00 - 14:30<br />17:30 - 23:00</span>
              </div>
            </div>
          </div>

          {/* Col 3: Branches */}
          <div className="footer-col">
            <h4 className="footer-heading">Địa Điểm</h4>
            <ul className="footer-list">
              <li>
                <MapPin size={14} className="icon" />
                <span>Chi nhánh 1: 88 Đồng Khởi, Bến Nghé, Quận 1, TP. HCM</span>
              </li>
              <li>
                <MapPin size={14} className="icon" />
                <span>Chi nhánh 2: 12 Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Liên Hệ & Đặt Tiệc</h4>
            <ul className="footer-list">
              <li>
                <Phone size={14} className="icon" />
                <span>Hotline: 1900 8888 · 0912 345 678</span>
              </li>
              <li>
                <Mail size={14} className="icon" />
                <span>Email: concierge@smartrestaurant.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Legal & Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} SmartRestaurant. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#terms">Điều khoản dịch vụ</a>
            <span className="sep">·</span>
            <a href="#privacy">Chính sách bảo mật</a>
            <span className="sep">·</span>
            <a href="#safety">Tiêu chuẩn an toàn vệ sinh</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

