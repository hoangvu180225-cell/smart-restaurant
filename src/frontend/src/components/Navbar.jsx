import React, { useState, useEffect } from 'react';
import { Calendar, User, Globe, ChevronRight } from 'lucide-react';

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`nav-header ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logotype */}
        <a href="#" className="brand-logo">
          <svg width="28" height="32" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 2L28 9.5V24.5L15 32L2 24.5V9.5L15 2Z" stroke="#A38348" strokeWidth="1.5" />
            <path d="M15 7L23 11.5V20.5L15 25L7 20.5V11.5L15 7Z" stroke="#A38348" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="15" cy="16" r="3" fill="#A38348" />
          </svg>
          <span className="brand-text">SmartRestaurant</span>
        </a>

        {/* Navigation links */}
        <nav className="nav-links">
          <a href="#story" className="nav-link">Giới Thiệu</a>
          <a href="#menu" className="nav-link">Thực Đơn</a>
          <a href="#spaces" className="nav-link">Không Gian</a>
          <a href="#floor-plans" className="nav-link">Sơ Đồ Phòng</a>
          <a href="#dat-ban" className="nav-link">Đặt Bàn</a>
        </nav>

        {/* Guest actions */}
        <div className="nav-actions">
          <button className="btn-lang" title="Đổi ngôn ngữ">
            <Globe size={15} />
            <span>VIE</span>
          </button>
          <a href="#login" className="btn-login">
            <User size={15} />
            <span>Đăng nhập</span>
          </a>
          <button onClick={onBookClick} className="btn-reserve-nav">
            <span>ĐẶT BÀN</span>
          </button>
        </div>
      </div>
    </header>
  );
}

