import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, MapPin, CheckCircle, Sparkles, Send } from 'lucide-react';

export default function ReservationSection({ preselectedRoom, preselectedMenu }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '2',
    room: 'Main Dining Hall',
    menu: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (preselectedRoom) {
      setFormData((prev) => ({ ...prev, room: preselectedRoom }));
    }
  }, [preselectedRoom]);

  useEffect(() => {
    if (preselectedMenu) {
      setFormData((prev) => ({ ...prev, menu: preselectedMenu }));
    }
  }, [preselectedMenu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Vui lòng nhập Tên người đặt và Số điện thoại!');
      return;
    }
    const refCode = 'SR-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: new Date().toISOString().split('T')[0],
      time: '19:00',
      guests: '2',
      room: 'Main Dining Hall',
      menu: '',
      notes: ''
    });
  };

  return (
    <section className="reservation-ticket-section" id="dat-ban">
      <div className="reservation-container">
        {/* Reservation Header */}
        <div className="reservation-header">
          <h2 className="ticket-title">ĐẶT BÀN TẠI ĐÂY</h2>
          <p className="ticket-subtitle">
            Việc đặt bàn trước là khuyến khích để quý khách có trải nghiệm trọn vẹn nhất
          </p>
        </div>

        {/* Reservation Form Container */}
        <div className="reservation-form-container">
          <div className="form-header-line">
            <span className="form-legend">THÔNG TIN YÊU CẦU</span>
            <span className="form-legend-badge">Xác nhận trực tuyến 24/7</span>
          </div>

          {submitted ? (
            <div className="booking-success-box">
              <div className="success-icon-wrap">
                <CheckCircle size={48} color="#A38348" />
              </div>
              <h3 className="success-title">Đặt Chỗ Thành Công!</h3>
              <p className="success-subtitle">
                Cảm ơn Quý khách <strong>{formData.name}</strong>. Nhà hàng đã tiếp nhận thông tin đặt bàn của bạn.
              </p>

              <div className="voucher-card">
                <div className="voucher-row">
                  <span className="v-label">Mã đặt chỗ:</span>
                  <span className="v-code">{bookingRef}</span>
                </div>
                <div className="voucher-row">
                  <span className="v-label">Khu vực phòng:</span>
                  <span className="v-val">{formData.room}</span>
                </div>
                <div className="voucher-row">
                  <span className="v-label">Thời gian:</span>
                  <span className="v-val">{formData.time} · Ngày {formData.date}</span>
                </div>
                <div className="voucher-row">
                  <span className="v-label">Số lượng khách:</span>
                  <span className="v-val">{formData.guests} Người</span>
                </div>
                {formData.menu && (
                  <div className="voucher-row">
                    <span className="v-label">Thực đơn chọn trước:</span>
                    <span className="v-val highlight">{formData.menu}</span>
                  </div>
                )}
              </div>

              <p className="success-note">
                Đội ngũ chăm sóc khách hàng SmartRestaurant sẽ liên hệ lại qua số <strong>{formData.phone}</strong> trong vòng 15 phút để xác nhận chi tiết bàn tiệc.
              </p>

              <button onClick={resetForm} className="btn-new-booking">
                Tạo yêu cầu đặt bàn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reservation-form-body">
              <div className="fields-grid">
                {/* Field 1: Name */}
                <div className="form-field-group">
                  <label className="field-label">Tên người đặt (*)</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    required
                    className="field-input"
                  />
                </div>

                {/* Field 2: Phone */}
                <div className="form-field-group">
                  <label className="field-label">Số điện thoại (*)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0912 345 678"
                    required
                    className="field-input"
                  />
                </div>

                {/* Field 3: Email */}
                <div className="form-field-group">
                  <label className="field-label">Email (*)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    required
                    className="field-input"
                  />
                </div>

                {/* Field 4: Date */}
                <div className="form-field-group">
                  <label className="field-label">Ngày đặt bàn (*)</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="field-input"
                  />
                </div>

                {/* Field 5: Time */}
                <div className="form-field-group">
                  <label className="field-label">Giờ đặt bàn (*)</label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="field-input select"
                  >
                    <optgroup label="Khung giờ Trưa (Lunch)">
                      <option value="11:30">11:30</option>
                      <option value="12:00">12:00</option>
                      <option value="12:30">12:30</option>
                      <option value="13:00">13:00</option>
                    </optgroup>
                    <optgroup label="Khung giờ Tối (Dinner)">
                      <option value="18:00">18:00</option>
                      <option value="18:30">18:30</option>
                      <option value="19:00">19:00 (Cao điểm)</option>
                      <option value="19:30">19:30</option>
                      <option value="20:00">20:00</option>
                      <option value="20:30">20:30</option>
                    </optgroup>
                  </select>
                </div>

                {/* Field 6: Guests */}
                <div className="form-field-group">
                  <label className="field-label">Số lượng người (*)</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="field-input select"
                  >
                    <option value="1">1 Khách (Bàn đơn)</option>
                    <option value="2">2 Khách (Bàn đôi)</option>
                    <option value="3-4">3 - 4 Khách (Bàn gia đình nhỏ)</option>
                    <option value="5-8">5 - 8 Khách (Bàn gia đình lớn)</option>
                    <option value="9-16">9 - 16 Khách (Phòng riêng)</option>
                    <option value="16+">Trên 16 Khách (Tiệc trọn gói)</option>
                  </select>
                </div>

                {/* Field 7: Dining Area */}
                <div className="form-field-group full-width">
                  <label className="field-label">Khu vực phòng mong muốn (*)</label>
                  <select
                    name="room"
                    value={formData.room}
                    onChange={handleChange}
                    className="field-input select"
                  >
                    <option value="Main Dining Hall">Đại Sảnh (Main Dining Hall - Không gian mở sôi động)</option>
                    <option value="Open-air Garden Terrace">Sân Vườn (Garden Terrace - Thoáng mát ngoài trời)</option>
                    <option value="Private Salon">Phòng Khánh Tiết (Private Salon - Cách âm biệt lập)</option>
                    <option value="VIP Lounge">VIP Lounge (Thượng lưu, Bar riêng & Quản gia)</option>
                  </select>
                </div>

                {/* Field 8: Preselected Menu & Special Notes */}
                <div className="form-field-group full-width">
                  <label className="field-label">Yêu cầu đặc biệt / Set Menu chọn trước</label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes || (formData.menu ? `Đã chọn: ${formData.menu}` : '')}
                    onChange={handleChange}
                    placeholder="VD: Dị ứng hải sản, bàn cạnh cửa sổ, kỷ niệm ngày cưới..."
                    className="field-input"
                  />
                </div>
              </div>

              {/* Submit Row */}
              <div className="form-submit-row">
                <button type="submit" className="btn-submit-reservation">
                  <Sparkles size={16} />
                  <span>XÁC NHẬN ĐẶT CHỖ</span>
                </button>
                <span className="submit-caption">
                  Xác nhận ngay · Miễn phí đặt chỗ · Đổi lịch linh hoạt
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

