# 08 — Đặc Tả Yêu Cầu Theo Tiêu Chuẩn INVEST (INVEST User Stories)

> **Dự án:** SmartRestaurant — Hệ Thống Tự Động Hóa Vận Hành Đặt Bàn AI, QR Self-Ordering & POS Di Động  
> **Phiên bản:** 2.0.0 — Full Automation & AI-Driven Architecture  
> **Tài liệu:** Danh Mục 20 User Stories & Đánh Giá Tiêu Chuẩn Agile INVEST  

---

## 1. Phương Pháp Luận INVEST Trong SmartRestaurant 2.0

Toàn bộ 20 User Stories của hệ thống được tinh lọc và thẩm định theo 6 tiêu chuẩn Agile INVEST:

| Tiêu chí | Ý Nghĩa Trong Dự Án SmartRestaurant 2.0 |
| :--- | :--- |
| **Independent (Độc lập)** | Từng User Story mang lại giá trị độc lập (ví dụ: Chatbot AI tư vấn có thể chạy độc lập với phân hệ Pay-at-table tại bàn). |
| **Negotiable (Thương lượng được)** | Các tham số thuật toán (thời gian báo trễ 15 phút, tỷ lệ phụ thu VIP 10%, tiền cọc 500k) có thể tinh chỉnh linh hoạt trong cấu hình. |
| **Valuable (Có giá trị)** | Mang lại giá trị vận hành trực tiếp: giảm 90% no-show, cắt giảm 70% thời gian chờ gọi món, chống 100% thất thoát hủy món ngầm. |
| **Estimable (Ước lượng được)** | Mỗi Story đều có định nghĩa kỹ thuật rõ ràng: OpenAPI endpoints, PostgreSQL Tables/Triggers, và Component giao diện. |
| **Small (Đủ nhỏ)** | Mỗi Story gói gọn trong phạm vi phát triển từ 1 đến 3 ngày làm việc của lập trình viên. |
| **Testable (Kiểm thử được)** | Đầy đủ kịch bản nghiệm thu Given-When-Then (Gherkin BDD) tương ứng trong tài liệu `06-acceptance-criteria.md`. |

---

## 2. Danh Mục 20 User Stories Chi Tiết

```text
US01–US02: Quản lý Phiên & Xác thực RBAC (Nhân viên, Khách hội viên, JWT)
US03–US05: AI Booking Chatbot, Đặt bàn ưu tiên mềm & Cọc tự động VietQR
US06–US07: AI Table Allocation Engine & Tự động phạt cọc / Nhả bàn khi No-Show
US08–US10: Quét QR tại bàn, Xác thực Host OTP & Khách vãng lai Check-in tức thì
US11–US12: Giỏ hàng nhóm thời gian thực (Group Cart) & Host duyệt gửi bếp
US13–US14: KDS Màn hình Bếp 1-chạm & Cập nhật vòng đời món (COOKING / READY)
US15–US16: Khách tự hủy món PENDING & Chuông gọi phục vụ thông minh (Hỗ trợ COOKING)
US17–US18: Pay-at-Table tự thanh toán tại bàn (Khấu trừ 100% cọc) & Dọn dẹp bàn DIRTY
US19–US20: Executive Dashboard KPI Tự Động Hóa & Nhật ký kiểm toán bất biến (PostgreSQL Trigger)
```

---

### Chi Tiết Từng User Story

#### Nhóm 1: Xác thực & Phân quyền RBAC (US01 – US02)
* **US01:** Là nhân viên nhà hàng (Admin, Manager, Staff, Chef), tôi muốn đăng nhập bằng tài khoản và mã PIN để được cấp JWT Token với quyền hạn RBAC tương ứng.
* **US02:** Là người dùng hệ thống, tôi muốn đăng xuất an toàn để xóa phiên làm việc và bảo vệ thông tin trên thiết bị.

#### Nhóm 2: Cổng Khách Hàng AI & Đặt Bàn Thông Minh (US03 – US05)
* **US03:** Là thực khách, tôi muốn trò chuyện với Chatbot AI trên web để nhận gợi ý món ăn, không gian phòng và khung giờ ít đông đúc nhất.
* **US04:** Là khách hàng, tôi muốn đăng ký đặt bàn và chọn "Vị trí ưu tiên mềm" (Soft Preference) để AI ưu tiên sắp xếp bàn theo sở thích của tôi.
* **US05:** Là khách đặt cho đoàn đông ($\ge 6$ người) hoặc phòng VIP, tôi muốn hệ thống tự động sinh mã VietQR cọc $500.000\text{ ₫}$ để tôi giữ chỗ chắc chắn.

#### Nhóm 3: Bộ Não AI Xếp Bàn & Xử Lý No-Show (US06 – US07)
* **US06:** Là hệ thống AI, tôi muốn phân bổ bàn tự động trước giờ hẹn 60 phút nhằm tối đa hóa tỷ lệ lấp đầy sàn, ghép bàn cho đoàn đông và tự động gửi mã bàn kèm **Host OTP** cho khách qua SMS.
* **US07:** Là hệ thống tự động, tôi muốn tự động hủy đơn, phạt 100% tiền cọc và nhả bàn về `AVAILABLE` khi khách trễ hẹn quá 20 phút mà không quét QR check-in.

#### Nhóm 4: Check-in Bàn & Xác Thực Host OTP (US08 – US10)
* **US08:** Là chủ bàn (Host), tôi muốn quét mã QR trên bàn và nhập mã Host OTP để mở phiên `table_sessions` và bảo vệ bàn khỏi người ngoài quét trộm order bậy.
* **US09:** Là khách vãng lai, tôi muốn quét QR tại bàn trống 🟢 `AVAILABLE` để hệ thống tự kiểm tra lịch hẹn, mở phiên ăn tức thì và cấp OTP tại chỗ mà không cần lễ tân xếp thủ công.
* **US10:** Là quản lý, tôi muốn quan sát sơ đồ bàn 2D chuyển màu tức thì theo thời gian thực (`AVAILABLE` $\rightarrow$ `RESERVED` $\rightarrow$ `OCCUPIED` $\rightarrow$ `DIRTY`).

#### Nhóm 5: Giỏ Hàng Nhóm & Gửi Bếp (US11 – US12)
* **US11:** Là thành viên cùng bàn, tôi muốn nhập OTP để cùng bạn bè lướt menu và bỏ món vào Giỏ Hàng Chung thời gian thực trên điện thoại của mình.
* **US12:** Là chủ bàn (Host), tôi muốn duyệt lại tổng tiền giỏ hàng chung và bấm nút gửi toàn bộ món ăn xuống bếp để kiểm soát ngân sách bữa ăn.

#### Nhóm 6: Màn Hình Bếp KDS & Vòng Đời Món Ăn (US13 – US14)
* **US13:** Là đầu bếp, tôi muốn nhận order tự động phân theo trạm (Bếp Nóng, Bếp Nguội, Bar) trên màn hình KDS và chạm 1-chạm để chuyển trạng thái `COOKING`.
* **US14:** Là đầu bếp, tôi muốn chạm lần 2 để báo món đã hoàn thành `READY` để nhân viên phục vụ bưng ra bàn cho khách.

#### Nhóm 7: Hủy Món Phân Tầng & Chuông Gọi Phục Vụ Thông Minh (US15 – US16)
* **US15:** Là khách hàng, tôi muốn tự do bấm nút hủy món đang ở trạng thái `PENDING` (chưa nấu) để đổi món khác mà không cần gọi bồi bàn.
* **US16:** Là khách hàng, tôi muốn bấm chuông gọi phục vụ thông minh trên web để nhờ nhân viên hỗ trợ can thiệp khi muốn hủy món đang `COOKING` hoặc xin thêm đá/khăn lạnh.

#### Nhóm 8: Pay-at-Table & Xoay Vòng Bàn (US17 – US18)
* **US17:** Là khách hàng, tôi muốn tự xem bảng kê Pre-bill điện tử tại bàn (tự động cấn trừ 100% cọc) và quét mã VietQR thanh toán mà không cần chờ nhân viên mang bill.
* **US18:** Là nhân viên phục vụ, tôi muốn nhận danh sách các bàn ⚫ `DIRTY` sau khi khách tự thanh toán và chạm nút "Đã dọn xong" để đưa bàn về 🟢 `AVAILABLE` cho lượt khách tiếp theo.

#### Nhóm 9: Dashboard Điều Hành & Kiểm Toán Bất Biến (US19 – US20)
* **US19:** Là quản lý nhà hàng, tôi muốn theo dõi Dashboard ca trực hiển thị doanh thu, tỷ lệ khách tự phục vụ (Self-service rate) và thời gian ra món trung bình của bếp.
* **US20:** Là quản lý hoặc kiểm toán viên, tôi muốn tra cứu nhật ký kiểm toán bất biến do PostgreSQL Trigger tự động lưu vết để phát hiện các hành vi hủy món hoặc gian lận bất thường.
