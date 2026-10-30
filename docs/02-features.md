# 02 — Danh Mục Tính Năng Chi Tiết (Feature Specifications)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Phiên bản:** 1.0.0 — Production Readiness  
> **Tài liệu:** Bảng Đặc Tả Tính Năng Toàn Diện Hệ Thống  

---

## 1. Bản Đồ Miền Tính Năng (Feature Domain Map)

Hệ thống SmartRestaurant phân bổ các tính năng nghiệp vụ thành 8 miền chức năng chính:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        SMARTRESTAURANT FEATURES                        │
├─────────────────────┬──────────────────────────┬───────────────────────┤
│ F01: Đặt Bàn 1-Page │ F02: Sơ Đồ Bàn 2D Thực Tế│ F03: Mobile Waiter POS│
├─────────────────────┼──────────────────────────┼───────────────────────┤
│ F04: Điều Phối Cọc  │ F05: Pre-Bill & Thu Ngân │ F06: Menu & Bảng Giá  │
├─────────────────────┼──────────────────────────┼───────────────────────┤
│ F07: Dashboard KPI  │ F08: Audit Log Bất Biến  │                       │
└─────────────────────┴──────────────────────────┴───────────────────────┘
```

---

## 2. Chi Tiết Từng Miền Tính Năng

### F01 — Phân Hệ Đặt Bàn Trực Tuyến 1-Page (Customer Booking Portal)
* **Trải nghiệm 1-Page liền mạch:** Thiết kế theo phong cách Contemporary Luxury, cuộn mượt giữa các phần: Giới thiệu $\rightarrow$ Thực đơn tinh tuyển $\rightarrow$ Không gian phòng $\rightarrow$ Phiếu đặt bàn.
* **Đặt bàn linh hoạt 2 chế độ:**
  * *Khách vãng lai:* Đặt bàn nhanh không cần tạo tài khoản, chỉ cần Tên, Số điện thoại, Giờ hẹn và Số lượng khách.
  * *Hội viên:* Đăng nhập tài khoản để tích lũy điểm thưởng (Loyalty Points) sau khi thanh toán hóa đơn.
* **Chọn trước món ăn (Pre-order):** Khách có thể chọn trước các món đặc sản hoặc set menu ngay khi gửi phiếu đặt bàn.
* **Xuất vé đặt chỗ PENDING:** Hệ thống cấp mã booking duy nhất (ví dụ: `BK-8921`) và gửi thông báo xác nhận qua SMS/Email.

### F02 — Sơ Đồ Mặt Bằng Kiến Trúc 2D (Architectural 2D Floor Plan)
* **Tái hiện vị trí thực tế:** Hiển thị tọa độ chính xác của từng bàn trong các khu vực: Sảnh Chính Tầng 1, Sân Vườn Terrace Tầng 2, Khu Phòng Tiệc VIP.
* **Máy trạng thái 4 màu thời gian thực:**
  * 🟢 **AVAILABLE (Trống):** Sẵn sàng tiếp nhận khách mới.
  * 🟡 **RESERVED (Đã đặt / Đã cọc):** Đã có khách đặt trước sắp đến trong vòng 60 phút.
  * 🔴 **OCCUPIED (Đang ăn):** Bàn đang có khách ngồi dùng bữa, hiển thị số tiền tạm tính hiện tại.
  * ⚫ **DIRTY (Chờ dọn):** Khách đã thanh toán rời đi, bàn đang chờ nhân viên dọn dẹp và khử trùng.
* **Hai chế độ hiển thị:** Chuyển đổi linh hoạt giữa *Chế độ Vận hành Trực tuyến* (Live Colored Status) và *Chế độ Phác thảo Bản vẽ Kiến trúc* (B&W Architectural Sketch Mode).

### F03 — POS Phục Vụ Di Động (Mobile Waiter POS)
* **Thiết kế công thái học 1 tay (Thumb-zone):** Toàn bộ nút chọn danh mục, tăng/giảm số lượng và xác nhận order được bố trí ở nửa dưới màn hình điện thoại.
* **Mở bàn & Gửi order nhanh:** Nhân viên chạm chọn bàn trống để mở bàn (`OCCUPIED`), chọn món trong tích tắc và gửi thẳng xuống bếp.
* **Ghi chú khẩu vị chuyên biệt:** Hỗ trợ nhập nhanh các tùy chỉnh khẩu vị cho từng món (`Không hành`, `Ít cay`, `Nướng chín vừa`).
* **Hủy món linh hoạt kèm lý do bắt buộc:** Nhân viên có quyền hủy món ngay tại bàn khi khách đổi ý; bắt buộc chọn lý do từ danh mục hoặc nhập tay; hệ thống tự động lưu vết vào nhật ký kiểm toán.

### F04 — Điều Phối Đặt Bàn & Quy Tắc Cọc Thông Minh (Reservations Dispatch)
* **Hàng đợi đơn PENDING:** Quản lý theo dõi danh sách các đoàn khách đã gửi phiếu đặt bàn đang chờ duyệt.
* **Quy tắc đặt cọc tự động:**
  * Nhóm nhỏ ($\le 4$ khách): Miễn phí cọc giữ chỗ.
  * Đoàn đông ($\ge 6$ khách) hoặc đặt phòng VIP: Bắt buộc đặt cọc cố định (ví dụ 500.000 ₫) và cung cấp mã chuyển khoản VietQR tự động.
* **Chính sách ghép bàn / Đổi bàn:** Hỗ trợ gán và gộp nhiều bàn trống liền kề để đón tiếp đoàn khách đông người trước khi chuyển trạng thái sang `CONFIRMED`.

### F05 — Bảng Kê Tạm Tính & Quầy Thu Ngân (Billing & Cashier Register)
* **Bảng kê xem trước (Pre-bill):**
  * Tự động tính: $\text{Tổng thanh toán} = \text{Tiền món} + \text{Phụ thu VIP} - \text{Tiền cọc đã nộp} + \text{Thuế VAT 8\%}$.
  * Cho phép khách kiểm tra kỹ danh sách món ăn và số tiền cọc đã được khấu trừ 100% trước khi quẹt thẻ hoặc thanh toán.
* **Đa dạng hình thức thanh toán:** Tiền mặt, Thẻ tín dụng/ghi nợ, Chuyển khoản QR ngân hàng (VietQR).
* **In hóa đơn nhiệt chuẩn 80mm:** Tự động định dạng hóa đơn nhiệt và chuyển trạng thái bàn sang `DIRTY` sau khi thanh toán thành công.

### F06 — Quản Lý Thực Đơn & Giá Bán (Menu Management)
* **Phân cấp danh mục khoa học:** Khai vị, Món chính, Món nướng, Tráng miệng, Đồ uống & Rượu vang.
* **Bật / Tắt trạng thái hết món tức thì:** Quản lý có thể chuyển trạng thái món sang hết hàng chỉ bằng 1 cú chạm khi bếp báo thiếu nguyên liệu.
* **Cơ chế Soft-Delete:** Ẩn món không còn phục vụ nhưng giữ nguyên khóa ngoại để bảo toàn toàn vẹn lịch sử hóa đơn kế toán.

### F07 — Dashboard Điều Hành Ca Trực (Executive KPI Dashboard)
* **Thẻ Doanh thu tổng hợp nền trắng:** Cho phép xem nhanh doanh thu theo Ngày, Tuần, Tháng kèm biểu đồ cột tích hợp hiển thị phân bổ theo khung giờ và các ngày trong tuần.
* **Biểu đồ tròn tỉ lệ doanh thu phòng:** Thể hiện trực quan mức độ đóng góp doanh thu giữa Sảnh Chính, Sân Vườn và Phòng VIP.
* **Bố cục song song 3/4 & 1/4:** Hàng chờ khách đặt bàn sắp tới (chiếm 3/4) đặt ngang hàng với Bảng xếp hạng món bán chạy tinh gọn (chiếm 1/4).

### F08 — Nhật Ký Kiểm Toán Chống Gian Lận (Immutable Audit Trail)
* **Trigger cơ sở dữ liệu độc lập:** Mọi hành vi nhạy cảm (hủy món, chuyển bàn, chỉnh sửa hóa đơn, hoàn cọc) đều được kích hoạt tự động ở tầng PostgreSQL Trigger `trg_audit_cancel_item`.
* **Dữ liệu kiểm toán toàn diện:** Lưu giữ ID nhân viên thực hiện, thời gian chính xác, dữ liệu trước/sau dạng JSONB và lý do thao tác bắt buộc.
* **Tính bất biến (Immutability):** Cấm hoàn toàn quyền `UPDATE` và `DELETE` trên bảng `audit_logs`.
