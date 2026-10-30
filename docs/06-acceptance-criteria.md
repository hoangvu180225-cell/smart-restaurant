# 06 — Tiêu Chí Nghiệm Thu (Acceptance Criteria)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Phiên bản:** 1.0.0 — Production Readiness  
> **Tài liệu:** Bảng Tiêu Chí Nghiệm Thu Theo Chuẩn Given-When-Then (Gherkin)  

---

## 1. AC-01: Xác Thực Tài Khoản & Phân Quyền (RBAC)

* **Kịch bản 1: Đăng nhập thành công với vai trò Quản lý**
  * **Given:** Người dùng truy cập hệ thống tại `/admin` với tài khoản có vai trò `MANAGER`.
  * **When:** Nhập đúng `username` và `password`, sau đó nhấn nút "Đăng Nhập".
  * **Then:** Hệ thống trả về mã HTTP `200 OK`, đính kèm mã JWT Token hợp lệ trong 24 giờ và điều hướng người dùng trực tiếp vào Dashboard Tổng Quan.

* **Kịch bản 2: Nhân viên phục vụ cố gắng truy cập trang Cấu hình Admin**
  * **Given:** Bồi bàn đã đăng nhập thành công với vai trò `WAITER`.
  * **When:** Cố gắng gửi yêu cầu tới các API cấu hình giá (`/api/v1/menu/items`) hoặc mở URL Admin.
  * **Then:** Hệ thống chặn yêu cầu với mã lỗi HTTP `403 Forbidden` và ghi thông báo vi phạm quyền hạn.

---

## 2. AC-02: Đặt Bàn 1-Page & Quy Tắc Cọc Thông Minh

* **Kịch bản 1: Nhóm nhỏ ($\le 4$ người) đặt bàn thông thường**
  * **Given:** Khách hàng điền phiếu đặt bàn tại `/#dat-ban` với số lượng khách là 4 người tại Sảnh Chính.
  * **When:** Nhấn nút "ĐẶT NGAY".
  * **Then:** Hệ thống xuất phiếu đặt bàn trạng thái `PENDING`, tiền cọc yêu cầu `deposit_amount = 0`, sinh mã `BK-xxxx` và không yêu cầu thanh toán cọc.

* **Kịch bản 2: Đoàn đông ($\ge 6$ người) hoặc đặt phòng VIP**
  * **Given:** Khách hàng điền phiếu đặt bàn với số lượng khách là 8 người hoặc chọn Khu Phòng VIP Royal.
  * **When:** Nhấn nút "ĐẶT NGAY".
  * **Then:** Hệ thống tự động tính mức cọc bắt buộc $500.000\text{ ₫}$, hiển thị mã chuyển khoản VietQR kèm thông báo: *"Đơn đặt bàn của quý khách đang ở trạng thái PENDING. Vui lòng hoàn tất cọc trong 30 phút để giữ chỗ"*.

---

## 3. AC-03: Sơ Đồ Bàn 2D & Máy Trạng Thái 4 Màu

* **Kịch bản 1: Trực quan hóa mặt bằng theo khu vực**
  * **Given:** Quản lý đang mở tab "Sơ Đồ Mặt Bằng 2D".
  * **When:** Nhấn chọn chuyển giữa các phòng: "Sảnh Chính T1 (5 bàn)", "Sân Vườn T2 (4 bàn)", "Phòng VIP (2 phòng)".
  * **Then:** Hệ thống vẽ lại chính xác vị trí bàn theo tọa độ `coord_x, coord_y` của phòng tương ứng, hiển thị đúng màu trạng thái: Xanh (Trống), Cam (Đã cọc), Đỏ (Đang ăn), Xám (Chờ dọn).

---

## 4. AC-04: Gọi Món Di Động Trên Smartphone (Mobile POS)

* **Kịch bản 1: Bồi bàn mở bàn và gọi món**
  * **Given:** Bàn `T1-Bàn 2` đang ở trạng thái `AVAILABLE`.
  * **When:** Nhân viên phục vụ bấm chọn bàn trên smartphone $\rightarrow$ Mở bàn $\rightarrow$ Chọn món "Thăn Bò Wagyu A5" số lượng 2 $\rightarrow$ Nhập ghi chú "Ít cay" $\rightarrow$ Bấm "Gửi Bếp".
  * **Then:** Bàn lập tức chuyển sang màu đỏ `OCCUPIED`, các món được lưu vào `order_items` với trạng thái `WAITING`, và thời gian mở bàn được ghi nhận chính xác.

---

## 5. AC-05: Hủy Món Nhanh Có Lý Do & Tự Động Kích Hoạt Database Trigger

* **Kịch bản 1: Bồi bàn hủy món khi khách đổi ý**
  * **Given:** Món "Cá Hồi Na Uy" của bàn `T1-Bàn 2` đang có trạng thái `WAITING`.
  * **When:** Nhân viên bấm nút "Hủy Món", chọn lý do "Khách đổi ý muốn chuyển sang món nướng", và xác nhận.
  * **Then:**
    1. Trạng thái món trong `order_items` chuyển ngay sang `CANCELLED`.
    2. Tổng tiền tạm tính của bàn tự động giảm đi đúng số tiền của món bị hủy.
    3. **Database Trigger:** PostgreSQL Trigger `trg_audit_cancel_item` lập tức tự động chèn 1 bản ghi vào bảng `audit_logs` gồm: `table_name = 'order_items'`, `action_type = 'CANCEL_ITEM'`, ID nhân viên hủy, lý do hủy và toàn bộ dữ liệu trước/sau dạng JSONB.

* **Kịch bản 2: Hủy món không nhập lý do**
  * **Given:** Nhân viên bấm hủy món nhưng để trống trường lý do.
  * **When:** Nhấn nút xác nhận hủy.
  * **Then:** Giao diện chặn lại, cảnh báo: *"Bắt buộc phải nhập lý do hủy món để phục vụ kiểm toán đối soát"* và không gửi request lên server.

---

## 6. AC-06: Pre-Bill Khấu Trừ 100% Cọc & In Hóa Đơn

* **Kịch bản 1: Lập bảng kê xem trước cho bàn đã cọc trước**
  * **Given:** Bàn VIP có đơn đặt cọc trước $500.000\text{ ₫}$, tổng tiền món dùng hết $2.450.000\text{ ₫}$, phụ thu phòng VIP $10\%$ là $245.000\text{ ₫}$.
  * **When:** Thu ngân bấm "Xem Pre-Bill".
  * **Then:** Bảng kê tính toán hiển thị rõ ràng:
    $$\text{Tổng phải trả} = 2.450.000 + 245.000 - 500.000\ (\text{Cọc}) + 175.600\ (\text{VAT 8\%}) = 2.370.600\text{ ₫}$$
    Số tiền cọc $500.000\text{ ₫}$ được khấu trừ $100\%$ không bị sót.

* **Kịch bản 2: Chốt thanh toán và chuyển bàn sang chờ dọn**
  * **Given:** Thu ngân đã thu đủ số tiền $2.370.600\text{ ₫}$ qua chuyển khoản VietQR.
  * **When:** Nhấn nút "Thanh Toán & In Bill".
  * **Then:** Đơn hàng đóng với trạng thái `PAID`, hóa đơn được lưu vào `invoices`, bàn chuyển sang màu xám `DIRTY` chờ dọn vệ sinh.

---

## 7. AC-07: Dashboard Tổng Quan Ca Trực

* **Kịch bản 1: Thẻ Doanh thu nền trắng và biểu đồ cột**
  * **Given:** Quản lý đang ở tab "Dashboard Tổng Quan".
  * **When:** Nhấn chọn qua lại giữa các nút kỳ: "Ngày", "Tuần", "Tháng".
  * **Then:**
    * Thẻ doanh thu giữ nguyên nền trắng sang trọng, số tiền tổng cập nhật tức thì.
    * Biểu đồ cột bên dưới tự động đổi các cột: theo giờ (11h–21h đối với Ngày), theo ngày (T2–CN đối với Tuần), theo tuần (Tuần 1–4 đối với Tháng).

* **Kịch bản 2: Bố cục song song 3/4 và 1/4**
  * **Given:** Màn hình máy tính / tablet của quản lý.
  * **When:** Quan sát hàng dưới cùng của Dashboard.
  * **Then:** Hàng chờ khách đặt bàn sắp tới chiếm đúng **3/4 chiều rộng**; Bảng xếp hạng món bán chạy chiếm đúng **1/4 chiều rộng** và chỉ hiển thị đúng 3 cột: `STT`, `Tên Món`, `SL`.
