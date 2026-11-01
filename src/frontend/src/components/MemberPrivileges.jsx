import React from 'react';
import { Crown, Gift, Percent, ShieldCheck } from 'lucide-react';

export default function MemberPrivileges() {
  return (
    <section className="member-privileges-section">
      <div className="member-container">
        <div className="loyalty-card-wrapper">
          {/* Left: Invitation Details */}
          <div className="loyalty-content">
            <div className="member-tag">
              <Crown size={15} color="#A38348" />
              <span>SMARTRESTAURANT PRIVILEGE CLUB</span>
            </div>

            <h3 className="loyalty-title">
              Đặc Quyền Thượng Lưu Dành Cho Hội Viên
            </h3>

            <p className="loyalty-desc">
              Gia nhập câu lạc bộ thực khách tinh hoa để tận hưởng những trải nghiệm ẩm thực độc bản, 
              ưu tiên chọn bàn view đẹp nhất và nhận các món quà tri ân thượng hạng từ Bếp trưởng.
            </p>

            <div className="perks-list">
              <div className="perk-item">
                <Percent size={18} color="#A38348" />
                <span>Tích lũy 10% giá trị hóa đơn cho mỗi lần thưởng tiệc</span>
              </div>
              <div className="perk-item">
                <Gift size={18} color="#A38348" />
                <span>Tặng 01 chai vang thượng hạng cho tiệc sinh nhật tại Phòng VIP</span>
              </div>
              <div className="perk-item">
                <ShieldCheck size={18} color="#A38348" />
                <span>Ưu tiên giữ chỗ 100% trong các dịp Lễ, Tết và khung giờ cao điểm</span>
              </div>
            </div>
          </div>

          {/* Right: Gold Privilege Card */}
          <div className="privilege-card-preview">
            <div className="gold-card">
              <div className="card-top">
                <span className="card-brand">SmartRestaurant</span>
                <Crown size={22} color="#A38348" />
              </div>

              <div className="card-chip">
                <div className="chip-gold"></div>
              </div>

              <div className="card-bottom">
                <div className="card-holder">
                  <span className="lbl">MEMBER STATUS</span>
                  <span className="val">BLACK DIAMOND VIP</span>
                </div>
                <div className="card-exp">
                  <span className="lbl">VALID THRU</span>
                  <span className="val">12/28</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

