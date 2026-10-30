import React from 'react';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>SmartRestaurant</h1>
        <p>Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động</p>
      </header>

      <main className="app-main">
        <div className="feature-cards-grid">
          <div className="card">
            <h3>1. Cổng Khách Hàng (Customer Portal)</h3>
            <p>Trải nghiệm đặt bàn 1-page đương đại, chọn phòng VIP & thanh toán cọc.</p>
          </div>
          <div className="card">
            <h3>2. POS Di Động (Floor Waiter)</h3>
            <p>Gọi món tại bàn tối ưu thao tác 1 tay, hủy món nhanh có lý do & audit log.</p>
          </div>
          <div className="card">
            <h3>3. Điều Hành & Thu Ngân (Manager Console)</h3>
            <p>Sơ đồ mặt bằng 2D, duyệt gộp bàn đơn PENDING, cấn trừ cọc và in hóa đơn.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
