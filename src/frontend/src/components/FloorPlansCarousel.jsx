import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Users, Layers, Sparkles } from 'lucide-react';

const FLOOR_PLANS = [
  {
    id: 'main-hall',
    title: 'Main Dining Hall',
    specs: '80 covers · 5 table arrangements · Open seating',
    bgColor: '#F8FAFC',
    borderColor: '#E3E8ED',
    description: 'Sơ đồ đại sảnh thông thoáng với các dãy bàn ăn đôi và bàn gia đình được bố trí phân luồng khoa học.',
    details: [
      { label: 'Sức chứa tối đa', val: '80 khách' },
      { label: 'Loại bàn', val: 'Bàn 2 - 4 - 6 - 8 người' },
      { label: 'Tiện ích', val: 'Âm thanh vòm, Máy lạnh trung tâm' }
    ],
    // Visual schematic drawing
    renderSchematic: () => (
      <svg viewBox="0 0 500 260" className="floorplan-svg">
        <rect x="10" y="10" width="480" height="240" rx="10" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Entrance */}
        <path d="M220 250 L280 250" stroke="#0F172A" strokeWidth="4" />
        <text x="250" y="244" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">LỐI VÀO CHÍNH</text>

        {/* Bar Counter at top */}
        <rect x="40" y="25" width="420" height="35" rx="4" fill="#E2E8F0" stroke="#94A3B8" />
        <text x="250" y="47" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="600">QUẦY PHA CHẾ & BẾP MỞ (OPEN BAR & KITCHEN)</text>

        {/* Row 1 Tables */}
        <rect x="60" y="85" width="70" height="40" rx="6" fill="#F1F5F9" stroke="#94A3B8" />
        <text x="95" y="109" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600">BÀN 01 (4P)</text>
        
        <rect x="160" y="85" width="70" height="40" rx="6" fill="#F1F5F9" stroke="#94A3B8" />
        <text x="195" y="109" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600">BÀN 02 (4P)</text>

        <rect x="270" y="85" width="70" height="40" rx="6" fill="#F1F5F9" stroke="#94A3B8" />
        <text x="305" y="109" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600">BÀN 03 (4P)</text>

        <rect x="370" y="85" width="70" height="40" rx="6" fill="#F1F5F9" stroke="#94A3B8" />
        <text x="405" y="109" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600">BÀN 04 (4P)</text>

        {/* Row 2 Tables */}
        <rect x="60" y="150" width="100" height="50" rx="6" fill="#F1F5F9" stroke="#94A3B8" />
        <text x="110" y="180" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600">BÀN DÀI 05 (8P)</text>

        <circle cx="230" cy="175" r="28" fill="#F8FAFC" stroke="#A38348" strokeWidth="2" />
        <text x="230" y="179" textAnchor="middle" fill="#A38348" fontSize="10" fontWeight="bold">VIP ROUND</text>

        <circle cx="310" cy="175" r="28" fill="#F8FAFC" stroke="#A38348" strokeWidth="2" />
        <text x="310" y="179" textAnchor="middle" fill="#A38348" fontSize="10" fontWeight="bold">VIP ROUND</text>

        <rect x="370" y="150" width="70" height="50" rx="6" fill="#F1F5F9" stroke="#94A3B8" />
        <text x="405" y="180" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="600">BÀN 06 (6P)</text>
      </svg>
    )
  },
  {
    id: 'garden-terrace',
    title: 'Open-air Garden Terrace',
    specs: '36 covers · Round tables · Al fresco dining',
    bgColor: '#EEF5EE',
    borderColor: '#C6DEC6',
    description: 'Sân vườn ngoài trời với các bàn tròn đan xen giữa các tán cây xanh mát và hồ cảnh quan.',
    details: [
      { label: 'Sức chứa tối đa', val: '36 khách' },
      { label: 'Loại bàn', val: 'Bàn tròn ngoài trời 4 - 6 người' },
      { label: 'Tiện ích', val: 'Mái che xếp linh hoạt, Quạt sương' }
    ],
    renderSchematic: () => (
      <svg viewBox="0 0 500 260" className="floorplan-svg">
        <rect x="10" y="10" width="480" height="240" rx="10" fill="#F4F8F4" stroke="#86EFAC" strokeWidth="2" />
        
        {/* Garden Pond */}
        <ellipse cx="250" cy="55" rx="140" ry="25" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
        <text x="250" y="60" textAnchor="middle" fill="#0284C7" fontSize="10" fontWeight="600">HỒ NƯỚC CẢNH QUAN & THÁC NƯỚC NHỎ</text>

        {/* Round Garden Tables */}
        <g transform="translate(60, 110)">
          <circle cx="40" cy="30" r="30" fill="#FFFFFF" stroke="#22C55E" strokeWidth="1.5" />
          <text x="40" y="34" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold">SÂN VƯỜN 01</text>
        </g>

        <g transform="translate(180, 110)">
          <circle cx="40" cy="30" r="30" fill="#FFFFFF" stroke="#22C55E" strokeWidth="1.5" />
          <text x="40" y="34" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold">SÂN VƯỜN 02</text>
        </g>

        <g transform="translate(300, 110)">
          <circle cx="40" cy="30" r="30" fill="#FFFFFF" stroke="#22C55E" strokeWidth="1.5" />
          <text x="40" y="34" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="bold">SÂN VƯỜN 03</text>
        </g>

        <rect x="80" y="195" width="340" height="30" rx="15" fill="#E2E8F0" stroke="#94A3B8" />
        <text x="250" y="214" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="600">LỐI DẠO CỎ & TIỂU CẢNH ĐÈN LỒNG CHIẾU SÁNG</text>
      </svg>
    )
  },
  {
    id: 'private-salon',
    title: 'Private Salon',
    specs: '16 covers · Banquet table · Exclusive hire',
    bgColor: '#F5F0F8',
    borderColor: '#D8C7E5',
    description: 'Phòng khánh tiết độc bản với bàn banquet gỗ lớn, hệ thống âm thanh riêng và màn hình trình chiếu.',
    details: [
      { label: 'Sức chứa tối đa', val: '16 khách' },
      { label: 'Loại bàn', val: 'Bàn tiệc nguyên khối dài 16 ghế' },
      { label: 'Tiện ích', val: 'Màn hình 85", Mic không dây, Rèm tự động' }
    ],
    renderSchematic: () => (
      <svg viewBox="0 0 500 260" className="floorplan-svg">
        <rect x="30" y="10" width="440" height="240" rx="12" fill="#FAF5FF" stroke="#C084FC" strokeWidth="2" />
        
        {/* Long Banquet Table */}
        <rect x="90" y="80" width="320" height="90" rx="12" fill="#FFFFFF" stroke="#7E22CE" strokeWidth="2" />
        <text x="250" y="130" textAnchor="middle" fill="#6B21A8" fontSize="13" fontWeight="bold">BÀN TIỆC HOÀNG GIA (16 SEATS)</text>

        {/* Chairs representation */}
        <text x="250" y="70" textAnchor="middle" fill="#A855F7" fontSize="10">8 Ghế Bành Sang Trọng (Dãy Trên)</text>
        <text x="250" y="195" textAnchor="middle" fill="#A855F7" fontSize="10">8 Ghế Bành Sang Trọng (Dãy Dưới)</text>

        {/* Screen & Service Bar */}
        <rect x="50" y="105" width="20" height="45" rx="4" fill="#9333EA" />
        <text x="45" y="98" fill="#581C87" fontSize="8" fontWeight="600">DISPLAY</text>

        <rect x="430" y="100" width="25" height="55" rx="4" fill="#E9D5FF" stroke="#A855F7" />
        <text x="442" y="132" textAnchor="middle" transform="rotate(90 442 132)" fill="#581C87" fontSize="8" fontWeight="bold">WINE CELLAR</text>
      </svg>
    )
  },
  {
    id: 'vip-lounge',
    title: 'VIP Lounge',
    specs: '12 covers · Lounge seating · Bar access · Private hire',
    bgColor: '#FDF5E6',
    borderColor: '#EBD4B0',
    description: 'Không gian tiếp khách đỉnh cao kết hợp sofa êm ái, quầy cocktail bar riêng và ban công ngắm phố.',
    details: [
      { label: 'Sức chứa tối đa', val: '12 khách' },
      { label: 'Loại bàn', val: 'Cụm Sofa da cao cấp & Bàn đá Marble' },
      { label: 'Tiện ích', val: 'Bartender riêng, Cigar lounge view panorama' }
    ],
    renderSchematic: () => (
      <svg viewBox="0 0 500 260" className="floorplan-svg">
        <rect x="10" y="10" width="480" height="240" rx="12" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
        
        {/* Private Cocktail Bar */}
        <rect x="340" y="40" width="130" height="180" rx="8" fill="#FEF3C7" stroke="#D97706" />
        <text x="405" y="135" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">PRIVATE BAR &</text>
        <text x="405" y="152" textAnchor="middle" fill="#92400E" fontSize="11" fontWeight="bold">COCKTAIL STATION</text>

        {/* Sofa Arrangement 1 */}
        <rect x="40" y="45" width="260" height="75" rx="10" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
        <text x="170" y="88" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="bold">CỤM SOFA MARBLE A (6 CHỖ)</text>

        {/* Sofa Arrangement 2 */}
        <rect x="40" y="145" width="260" height="75" rx="10" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
        <text x="170" y="188" textAnchor="middle" fill="#78350F" fontSize="12" fontWeight="bold">CỤM SOFA MARBLE B (6 CHỖ)</text>
      </svg>
    )
  }
];

export default function FloorPlansCarousel({ onSelectRoomForBooking }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? FLOOR_PLANS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === prev.length - 1 ? 0 : prev + 1));
  };

  const activePlan = FLOOR_PLANS[currentIndex];

  return (
    <section className="floorplans-section" id="floor-plans">
      <div className="floorplans-container">
        {/* Section Heading */}
        <div className="floorplans-header">
          <div className="section-label">
            <span className="accent-line"></span>
            <span className="label-text">EXPLORE OUR SPACES</span>
          </div>

          <h2 className="floorplans-title">Room Floor Plans</h2>
          <p className="floorplans-subtitle">
            Choose your ideal setting. Each space is thoughtfully designed for comfort, privacy and memorable dining.
          </p>
        </div>

        {/* Interactive Floor Plan Viewer Card */}
        <div className="floorplan-card" style={{ borderColor: activePlan.borderColor }}>
          {/* Top Info Bar */}
          <div className="floorplan-card-header">
            <div className="card-header-left">
              <span className="room-indicator">Phòng {currentIndex + 1} / {FLOOR_PLANS.length}</span>
              <h3 className="room-title">{activePlan.title}</h3>
              <p className="room-specs">{activePlan.specs}</p>
            </div>

            <button 
              onClick={() => onSelectRoomForBooking && onSelectRoomForBooking(activePlan.title)}
              className="btn-book-this-room"
            >
              <Sparkles size={14} />
              <span>Đặt chỗ tại phòng này</span>
            </button>
          </div>

          {/* Diagram Canvas */}
          <div className="floorplan-canvas" style={{ backgroundColor: activePlan.bgColor }}>
            <div className="canvas-wrapper">
              {activePlan.renderSchematic()}
            </div>
          </div>

          {/* Bottom Details Footer */}
          <div className="floorplan-card-footer">
            <div className="floorplan-desc">
              <p>{activePlan.description}</p>
            </div>

            <div className="floorplan-quick-stats">
              {activePlan.details.map((item, idx) => (
                <div key={idx} className="stat-pill">
                  <span className="stat-label">{item.label}:</span>
                  <span className="stat-value">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="carousel-nav-bar">
          {/* Pagination Indicators */}
          <div className="pagination-indicators">
            {FLOOR_PLANS.map((plan, i) => (
              <button
                key={plan.id}
                onClick={() => setCurrentIndex(i)}
                className={`dot-pill ${i === currentIndex ? 'active' : ''}`}
                title={plan.title}
              >
                <span className="dot-number">0{i + 1}</span>
                <span className="dot-name">{plan.title}</span>
              </button>
            ))}
          </div>

          {/* Arrow Controls */}
          <div className="arrow-controls">
            <button onClick={prevSlide} className="btn-arrow" aria-label="Phòng trước">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="btn-arrow active" aria-label="Phòng tiếp theo">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

