import React from 'react';
import { Sparkles, Users, Wine, ShieldCheck, ArrowRight } from 'lucide-react';

const SPACES = [
  {
    id: 'main-hall',
    title: 'Main Dining Hall',
    sub: 'Đại sảnh ẩm thực đương đại',
    capacity: '80 khách · Bàn 2 - 8 người',
    desc: 'Không gian mở thanh lịch với trần cao đón sáng tự nhiên, điểm xuyết ánh đèn vàng ấm áp và âm nhạc thính phòng nhẹ nhàng.',
    image: '/assets/hero_ambience.jpg',
    features: ['Ánh sáng ambient 2700K', 'Bố trí linh hoạt', 'Phù hợp gặp gỡ bạn bè']
  },
  {
    id: 'garden-terrace',
    title: 'Open-air Garden Terrace',
    sub: 'Sân vườn ngoài trời lãng mạn',
    capacity: '36 khách · Bàn tròn sân vườn',
    desc: 'Tận hưởng gió mát và không gian thiên nhiên với rặng cây xanh mướt, hoàn hảo cho những buổi tối hẹn hò lãng mạn hoặc tiệc gia đình.',
    image: '/assets/rice_terrace_hero.jpg',
    features: ['Không gian mở ngoài trời', 'Hồ cảnh quan & hoa tươi', 'Bầu không khí thư thái']
  },
  {
    id: 'vip-lounge',
    title: 'Private Salon & VIP Lounge',
    sub: 'Phòng tiệc thượng lưu biệt lập',
    capacity: '12 - 16 khách · Bàn tiệc dài & Sofa',
    desc: 'Được thiết kế cách âm riêng biệt với tủ bảo quản rượu vang cá nhân, bàn tiệc gỗ nguyên khối và đội ngũ Butler phục vụ chuyên biệt.',
    image: '/assets/vip_dining.jpg',
    features: ['Cách âm tiêu chuẩn 45dB', 'Quản gia riêng (Butler)', 'Menu thiết kế riêng theo yêu cầu']
  }
];

export default function DiningSpaces({ onSelectSpace }) {
  return (
    <section className="dining-spaces-section" id="spaces">
      <div className="spaces-container">
        {/* Section Header */}
        <div className="spaces-header">
          <div className="section-label center">
            <span className="accent-line"></span>
            <span className="label-text">DINING SPACES & VIP EXPERIENCE</span>
            <span className="accent-line"></span>
          </div>

          <h2 className="spaces-title">Không Gian Thưởng Tiệc Đương Đại</h2>
          <p className="spaces-subtitle">
            An intimate dinner, an open-air evening or a celebration all your own.
          </p>
        </div>

        {/* 3 Spaces Cards */}
        <div className="spaces-grid">
          {SPACES.map((space) => (
            <div key={space.id} className="space-card">
              <div className="space-img-wrapper">
                <img src={space.image} alt={space.title} className="space-img" />
                <div className="space-capacity-tag">
                  <Users size={13} />
                  <span>{space.capacity}</span>
                </div>
              </div>

              <div className="space-body">
                <span className="space-sub">{space.sub}</span>
                <h3 className="space-name">{space.title}</h3>
                <p className="space-desc">{space.desc}</p>

                <div className="space-features">
                  {space.features.map((feat, i) => (
                    <span key={i} className="feat-chip">
                      <ShieldCheck size={12} color="#A38348" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>

                <div className="space-card-action">
                  <button 
                    onClick={() => onSelectSpace && onSelectSpace(space.title)}
                    className="btn-select-space"
                  >
                    <span>Xem sơ đồ & Đặt phòng</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Private Dining Enquiry Banner */}
        <div className="private-enquiry-banner">
          <Sparkles size={20} color="#A38348" className="sparkle-icon" />
          <p className="enquiry-text">
            Quý khách đang chuẩn bị cho sự kiện kỷ niệm hoặc tiệc riêng tư đặc biệt?{' '}
            <a href="#dat-ban" className="enquiry-link">
              Liên hệ đặt phòng VIP ngay với Quản Lý Nhà Hàng &gt;
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

