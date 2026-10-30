# 01 — Phạm Vi Dự Án & Bối Cảnh Nghiệp Vụ (Project Scope)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Phiên bản:** 1.0.0 — Production Readiness  
> **Tài liệu:** Đặc tả Phạm vi Nghiệp vụ & Ranh giới Hệ thống  

---

## 1. Bối Cảnh Thực Tế & Nỗi Đau Vận Hành (Problem Statement)

Tại các nhà hàng ẩm thực đương đại và quy mô vừa đến lớn, quy trình phục vụ truyền thống đang gặp phải 4 điểm nghẽn nghiêm trọng:

1. **Đặt bàn thủ công qua điện thoại / sổ sách:**
   * Dễ dẫn đến việc trùng lặp bàn (*double-booking*) vào các khung giờ cao điểm (12:00–13:30 và 19:00–20:30).
   * Không thể kiểm soát chính xác vị trí bàn cụ thể theo sở thích của thực khách (ví dụ: khách muốn ngồi bàn cạnh cửa kính ở Sảnh Chính hoặc phòng VIP riêng tư).
   * Tỷ lệ khách bỏ hẹn (*no-show*) cao do thiếu cơ chế xác thực đặt cọc tự động đối với các đoàn đông hoặc đặt phòng tiệc VIP.

2. **Gọi món chậm trễ & Sai lệch khẩu vị:**
   * Nhân viên phục vụ ghi chép order bằng giấy, phải di chuyển quãng đường dài qua lại giữa khu vực bàn và quầy thu ngân/bếp để nhập lại.
   * Dễ thất thoát thông tin ghi chú khẩu vị quan trọng của khách hàng (`Không hành`, `Ít cay`, `Dị ứng hải sản`).

3. **Nguy cơ gian lận tiền mặt & Thiếu tính minh bạch:**
   * Bồi bàn hoặc thu ngân có thể tự ý hủy món sau khi khách đã dùng bữa và thanh toán tiền mặt để bỏ túi riêng nếu quy trình hủy món không gắn liền với cơ chế kiểm toán bất biến.
   * Thất thoát tiền cọc khi khách hủy hẹn mà không có chính sách cấn trừ tự động trên hóa đơn cuối cùng.

4. **Quản lý phân tán, thiếu dữ liệu thời gian thực:**
   * Quản lý ca không nắm được tức thời bàn nào đang có khách ngồi, bàn nào đã cọc sắp đến trong 30 phút tới, bàn nào ăn xong đang chờ dọn vệ sinh để xoay vòng lượt khách tiếp theo.

---

## 2. Giải Pháp Toàn Diện: SmartRestaurant

SmartRestaurant là nền tảng quản lý đặt bàn và POS gọi món di động thế hệ mới, kết hợp liền mạch 3 phân hệ chuyên biệt:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      HỆ THỐNG SMARTRESTAURANT                         │
├──────────────────────┬─────────────────────────┬───────────────────────┤
│  1. CỔNG KHÁCH HÀNG  │  2. POS DI ĐỘNG PHỤC VỤ │ 3. BẢNG ĐIỀU KHIỂN QL │
│  (Customer Portal)   │   (Mobile Waiter POS)   │   (Manager Console)   │
├──────────────────────┼─────────────────────────┼───────────────────────┤
│ • Trải nghiệm 1-Page │ • Tối ưu 1 tay cảm ứng  │ • Sơ đồ mặt bằng 2D   │
│ • Thực đơn Editorial │ • Mở bàn & gọi món nhanh│ • Điều phối duyệt cọc │
│ • Phiếu đặt PENDING  │ • Ghi chú khẩu vị bếp   │ • Pre-bill cấn trừ cọc│
│ • Cọc tự động đoàn >=6│ • Hủy món linh hoạt có lý│ • Audit log chống gian│
│   hoặc phòng VIP     │   do + Tự kích trigger  │   lận trong CSDL      │
└──────────────────────┴─────────────────────────┴───────────────────────┘
```

---

## 3. Ranh Giới Hệ Thống (System Boundaries)

### 3.1 Các Hạng Mục Nằm Trong Phạm Vi (In-Scope — Phiên Bản V1)
* **Đặt bàn trực tuyến 1-Page:** Thực khách vãng lai và hội viên duyệt thực đơn, chọn khu vực/phòng, gửi phiếu đặt bàn sinh mã `BK-xxxx` trạng thái `PENDING`.
* **Chính sách đặt cọc động:** Nhóm nhỏ ($\le 4$ người) được đặt tự do không cọc; đoàn $\ge 6$ người hoặc phòng VIP tự động áp mức cọc giữ chỗ và liên kết cổng thanh toán VietQR/VNPay.
* **Sơ đồ mặt bằng kiến trúc 2D:** Trực quan hóa chính xác vị trí bàn thực tế tại Sảnh Chính T1, Sân Vườn Terrace T2 và Phòng VIP với máy trạng thái 4 màu (`AVAILABLE`, `RESERVED`, `OCCUPIED`, `DIRTY`).
* **POS gọi món di động 1 tay:** Giao diện bồi bàn trên smartphone cho phép mở bàn, bắn order xuống bếp trong vài giây, cập nhật trạng thái món.
* **Hủy món linh hoạt có kiểm toán:** Nhân viên có quyền hủy món ngay khi khách đổi ý, bắt buộc nhập lý do hủy; Database Trigger tự động lưu nhật ký bất biến vào `audit_logs`.
* **Hóa đơn & Đối soát cọc:** Kết xuất bảng kê tạm tính (Pre-bill), khấu trừ 100% tiền cọc đã thu trước đó, phụ thu phòng VIP, tính thuế VAT 8% và xuất hóa đơn nhiệt.
* **Dashboard điều hành ca trực:** Báo cáo thời gian thực về doanh thu (ngày/tuần/tháng), công suất bàn, khung giờ cao điểm và top món bán chạy.

### 3.2 Các Hạng Mục Nằm Ngoài Phạm Vi (Out-of-Scope — Dự Kiến V2)
* Quản lý kho nguyên vật liệu chi tiết và định lượng vi mô từng gram thực phẩm (*Bếp tự quản lý nguyên liệu ngoài hệ thống trong V1*).
* Tích hợp máy POS quẹt thẻ vật lý chuyên dụng (EDC) (*V1 hỗ trợ thanh toán qua mã chuyển khoản động VietQR, thẻ tín dụng thanh toán quầy và tiền mặt*).
* Quản lý chấm công và tính lương ca kíp cho nhân viên.

---

## 4. Các Nhóm Tác Nhân Chính (Target Actors)

| Tác Nhân | Thiết Bị Truy Cập | Mục Tiêu & Trách Nhiệm Vận Hành |
| :--- | :--- | :--- |
| **Khách Hàng (Customer)** | Smartphone / Laptop Web | Xem thực đơn cao cấp, tìm hiểu không gian phòng, đặt bàn trước kèm chọn món sớm (Pre-order) và thanh toán cọc giữ chỗ. |
| **Nhân Viên Phục Vụ (Waiter)** | Smartphone cá nhân / Tablet mini | Xem trạng thái bàn trống, mở bàn phục vụ tại chỗ, thao tác gọi món 1 tay, hủy món nhanh có lý do khi khách đổi ý. |
| **Quản Lý Nhà Hàng (Manager)** | Desktop PC / Tablet Widescreen | Duyệt phiếu đặt bàn `PENDING`, ghép bàn cho đoàn đông, giám sát sơ đồ bàn 2D, theo dõi dashboard doanh thu và tra cứu audit log. |
| **Thu Ngân (Cashier)** | Quầy thu ngân (PC / Tablet) | Mở bảng kê xem trước, cấn trừ cọc, in hóa đơn nhiệt 80mm và chuyển trạng thái bàn sang chờ dọn vệ sinh (`DIRTY`). |
| **Quản Trị Viên (Admin)** | Desktop Admin Console | Quản trị tài khoản nhân viên, phân quyền RBAC, cập nhật menu, điều chỉnh tỷ lệ phụ thu VIP và quy tắc tiền cọc. |
