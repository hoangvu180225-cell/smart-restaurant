import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onBookClick }) {
  return (
    <section className="hero-editorial" id="story">
      <div className="hero-container">
        {/* Left Column: Welcome Editorial */}
        <div className="hero-welcome">
          <div className="section-label">
            <span className="accent-line"></span>
            <span className="label-text">Contemporary Vietnamese Dining</span>
          </div>

          <h1 className="hero-headline">
            Nơi Ẩm Thực Đương Đại <br />
            <em>Gặp Gỡ Bản Sắc Việt</em>
          </h1>

          <p className="hero-description">
            Tại SmartRestaurant, ẩm thực Việt được chắt lọc qua tinh thần đương đại, 
            nơi mùa màng, nguyên liệu bản địa và ký ức đời thường trở thành nguồn cảm hứng. 
            Gần gũi trong gốc rễ, tinh tế trong cách kể, chúng tôi mở ra một trải nghiệm 
            dining ấm áp, sang trọng và giàu bản sắc.
          </p>

          <div className="hero-cta-group">
            <button onClick={onBookClick} className="btn-hero-primary">
              <span>ĐẶT BÀN TẠI ĐÂY</span>
              <ArrowRight size={16} />
            </button>
            <a href="#menu" className="btn-hero-secondary">
              <span>Khám Phá Thực Đơn</span>
            </a>
          </div>

          <div className="hero-badges">
            <div className="badge-item">
              <span className="badge-val">4</span>
              <span className="badge-lbl">Không Gian Tiệc Riêng</span>
            </div>
            <div className="badge-divider"></div>
            <div className="badge-item">
              <span className="badge-val">100%</span>
              <span className="badge-lbl">Nguyên Liệu Bản Địa Cao Cấp</span>
            </div>
            <div className="badge-divider"></div>
            <div className="badge-item">
              <span className="badge-val">VIP</span>
              <span className="badge-lbl">Dịch Vụ Quản Gia Riêng</span>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Photo Collage */}
        <div className="hero-visual">
          <div className="visual-card visual-card-main">
            <img 
              src="/assets/rice_terrace_hero.jpg" 
              alt="SmartRestaurant Interior Ambience" 
              className="visual-img"
            />
            <div className="visual-caption">
              <span>Không gian phòng tiệc đương đại</span>
            </div>
          </div>

          <div className="visual-card visual-card-sub">
            <img 
              src="/assets/plated_seabass.jpg" 
              alt="Signature Contemporary Culinary" 
              className="visual-img"
            />
            <div className="visual-tag">
              <Sparkles size={14} color="#A38348" />
              <span>Signature Dish</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

