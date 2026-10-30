# 08 — Đặc Tả Yêu Cầu Theo Tiêu Chuẩn INVEST (INVEST User Stories)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Phiên bản:** 1.0.0 — Production Readiness  
> **Tài liệu:** Danh Mục 18 User Stories & Đánh Giá Tiêu Chuẩn INVEST  

---

## 1. Phương Pháp Luận INVEST Trong SmartRestaurant

Toàn bộ 18 câu chuyện người dùng (User Stories) của dự án đều được tinh lọc và kiểm thử nghiêm ngặt theo 6 tiêu chí của phương pháp Agile INVEST:

| Tiêu chí | Ý Nghĩa Trong Dự Án SmartRestaurant |
| :--- | :--- |
| **Independent (Độc lập)** | Mỗi User Story có thể được phát triển và bàn giao độc lập, không tạo nút thắt kỹ thuật chặn đứng các luồng khác. |
| **Negotiable (Thương lượng được)** | Các tham số vận hành (như ngưỡng khách cần cọc $\ge 6$ người, tỷ lệ phụ thu VIP $10\%$, thời gian hết hạn cọc 30 phút) có thể dễ dàng điều chỉnh trong cấu hình. |
| **Valuable (Có giá trị)** | Mang lại giá trị vận hành trực tiếp cho nhà hàng: giảm $100\%$ lỗi trùng bàn, rút ngắn $70\%$ thời gian ghi order, chống thất thoát gian lận tiền mặt. |
| **Estimable (Ước lượng được)** | Phạm vi công việc của từng Story được định lượng rõ ràng từ API, Schema CSDL, Giao diện đến Kiểm thử. |
| **Small (Đủ nhỏ)** | Mỗi Story gói gọn trong 1 sprint phát triển (tối đa 2–3 ngày làm việc của lập trình viên). |
| **Testable (Kiểm thử được)** | Mọi Story đều có tiêu chí chấp nhận cụ thể (Acceptance Criteria) với kết quả mong đợi có thể tự động hóa hoặc kiểm thử thủ công. |

---

## 2. Danh Mục 18 User Stories Chi Tiết

```text
US01–US02: Quản lý Phiên & Xác thực RBAC (Đăng nhập, Đăng xuất, Phân quyền JWT)
US03:      Sơ đồ Mặt bằng Thời gian thực (Live 4-State Floor Map)
US04–US06: Đặt bàn Trực tuyến 1-Page (Gửi phiếu PENDING, Cọc đoàn đông/VIP, Pre-order món)
US07–US09: Quản lý Thực đơn & Bảng giá (CRUD món, Đổi trạng thái còn/hết, Soft-delete)
US10–US12: POS Phục vụ Di động (Mở bàn, Chọn món chạm 1 tay, Gửi ghi chú bếp)
US13–US14: Điều chuyển bàn & Hủy món an toàn (Chuyển/Gộp bàn, Hủy món kèm lý do bắt buộc)
US15–US16: Hóa đơn & Thu ngân (Bảng kê Pre-bill, Khấu trừ 100% tiền cọc, In hóa đơn nhiệt)
US17:      Dashboard Điều hành Ca trực (Thẻ doanh thu trắng, Biểu đồ cột/tròn, Hàng chờ 3/4 & BXH 1/4)
US18:      Nhật ký Kiểm toán & Truy vết gian lận (PostgreSQL Trigger, Bảng audit_logs bất biến)
```

### Chi Tiết Từng User Story:

#### Nhóm 1: Xác thực & Quản trị phiên (US01 – US02)
* **US01:** Là nhân viên hoặc khách hội viên, tôi muốn đăng nhập bằng tài khoản để được phân đúng quyền hạn vận hành và tích lũy điểm thưởng.
* **US02:** Là người dùng đã đăng nhập, tôi muốn đăng xuất an toàn để kết thúc phiên làm việc và bảo mật dữ liệu trên thiết bị.

#### Nhóm 2: Sơ đồ mặt bằng kiến trúc 2D (US03)
* **US03:** Là quản lý hoặc phục vụ, tôi muốn quan sát sơ đồ bàn 2D theo từng phòng với 4 màu trạng thái (`AVAILABLE`, `RESERVED`, `OCCUPIED`, `DIRTY`) để nắm bắt tình hình chỗ ngồi tại sàn.

#### Nhóm 3: Đặt bàn trực tuyến & Quản lý cọc (US04 – US06)
* **US04:** Là khách hàng vãng lai, tôi muốn đặt bàn nhanh trên trang 1-Page chỉ với thông tin liên hệ để nhận mã phiếu `BK-xxxx` trạng thái `PENDING`.
* **US05:** Là khách đặt cho đoàn đông ($\ge 6$ người) hoặc phòng VIP, tôi muốn hệ thống tính tiền cọc tự động và cung cấp mã QR chuyển khoản để giữ chỗ chắc chắn.
* **US06:** Là khách hàng đặt bàn trước, tôi muốn chọn sẵn các món ăn (Pre-order) để khi đến nơi nhà hàng có thể phục vụ ngay mà không phải chờ đợi.

#### Nhóm 4: Quản lý thực đơn & Bảng giá (US07 – US09)
* **US07:** Là quản lý, tôi muốn duyệt xem danh mục món ăn theo cấu trúc phân cấp khoa học để dễ dàng quản trị giá bán.
* **US08:** Là quản lý, tôi muốn bật/tắt trạng thái hết hàng tức thì chỉ bằng một cú chạm khi bếp thông báo hết nguyên liệu.
* **US09:** Là quản trị viên, tôi muốn cấu hình tỷ lệ phụ thu phòng tiệc VIP để hệ thống tự động cộng vào hóa đơn thanh toán.

#### Nhóm 5: POS phục vụ di động tại bàn (US10 – US12)
* **US10:** Là nhân viên phục vụ, tôi muốn mở bàn trực tiếp trên smartphone bằng giao diện chạm 1 tay để tiếp nhận khách vãng lai vào bàn.
* **US11:** Là nhân viên phục vụ, tôi muốn chọn món và tăng giảm số lượng nhanh chóng để bắn order xuống bếp trong vài giây.
* **US12:** Là nhân viên phục vụ, tôi muốn thêm ghi chú khẩu vị riêng biệt cho từng món để bếp chế biến đúng theo yêu cầu đặc biệt của khách.

#### Nhóm 6: Điều chuyển bàn & Hủy món an toàn (US13 – US14)
* **US13:** Là quản lý, tôi muốn chuyển bàn hoặc gộp nhiều bàn cho đoàn khách phát sinh thêm người mà không làm mất danh sách món đã gọi.
* **US14:** Là nhân viên phục vụ, tôi muốn **có quyền hủy món ăn ngay lập tức** khi khách đổi ý; bắt buộc phải chọn lý do hủy để hệ thống tự động lưu vết kiểm toán.

#### Nhóm 7: Thanh toán, Khấu trừ cọc & Xuất bill (US15 – US16)
* **US15:** Là thu ngân, tôi muốn mở Bảng kê xem trước (Pre-bill) để kiểm tra đối soát, tự động khấu trừ $100\%$ tiền cọc đã nộp, cộng phụ thu VIP và tính $8\%$ VAT.
* **US16:** Là thu ngân, tôi muốn chốt thanh toán (Tiền mặt/Thẻ/VietQR) và in hóa đơn nhiệt 80mm, đồng thời tự động chuyển bàn sang trạng thái chờ dọn (`DIRTY`).

#### Nhóm 8: Báo cáo & Kiểm toán bất biến (US17 – US18)
* **US17:** Là chủ nhà hàng / Quản lý ca, tôi muốn xem Dashboard tổng quan thời gian thực với thẻ doanh thu nền trắng, biểu đồ cột khung giờ, biểu đồ tròn tỉ lệ phòng, hàng chờ 3/4 và BXH 1/4 để đánh giá hiệu suất kinh doanh.
* **US18:** Là quản lý, tôi muốn tra cứu nhật ký kiểm toán bất biến do PostgreSQL Trigger tự động sinh ra để phát hiện kịp thời các hành vi gian lận tiền mặt.

---

## 3. Ma Trận Phân Quyền Theo Vai Trò (RBAC Matrix)

| Khả Năng Nghiệp Vụ | Admin | Manager / Thu ngân | Waiter (Phục vụ) | Customer (Khách) |
| :--- | :---: | :---: | :---: | :---: |
| **Xem Thực đơn công khai** | Toàn quyền | Toàn quyền | Toàn quyền | Chỉ xem |
| **Gửi phiếu Đặt bàn** | Toàn quyền | Toàn quyền | Bị chặn | Tự thực hiện |
| **Duyệt / Gán bàn đặt PENDING** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Xem Sơ đồ bàn 2D thời gian thực**| Toàn quyền | Toàn quyền | Xem trạng thái bàn | Chỉ xem bàn trống |
| **Mở bàn & Gọi món qua Mobile POS**| Toàn quyền | Toàn quyền | Thực hiện qua smartphone | Bị chặn |
| **Hủy món ăn đã gọi** | Toàn quyền (Cần lý do) | Toàn quyền (Cần lý do) | **Toàn quyền (Bắt buộc lý do + Trigger)** | Bị chặn |
| **Chuyển bàn / Gộp bàn** | Toàn quyền | Toàn quyền | Bị chặn (Cần quyền QL) | Bị chặn |
| **Lập Pre-bill (Khấu trừ cọc)** | Toàn quyền | Toàn quyền | Bị chặn | Xem bill của bàn mình |
| **Chốt thanh toán & In hóa đơn** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Xem Dashboard Doanh thu ca** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Tra cứu Nhật ký kiểm toán** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Quản trị Tài khoản Nhân viên** | Toàn quyền | Bị chặn | Bị chặn | Chỉ xem điểm tích lũy |
