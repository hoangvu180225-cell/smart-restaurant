# 02 — Danh Mục Tính Năng Chi Tiết (Feature Specifications)

> **Dự án:** SmartRestaurant — Hệ Thống Tự Động Hóa Vận Hành Đặt Bàn AI, QR Self-Ordering & POS Di Động  
> **Phiên bản:** 2.0.0 — Full Automation & AI-Driven Architecture  
> **Tài liệu:** Bảng Đặc Tả Chi Tiết 10 Miền Tính Năng Tự Động Hóa  

---

## 1. Bản Đồ Miền Tính Năng (Feature Domain Map)

Hệ thống SmartRestaurant 2.0 phân bổ các năng lực vận hành thành 10 miền chức năng tự động hóa khép kín:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SMARTRESTAURANT 2.0 FEATURE DOMAINS                             │
├──────────────────────────┬─────────────────────────────┬───────────────────────────────┤
│ F01: AI Booking Chatbot  │ F02: AI Table Allocator     │ F03: Scan-to-Order & Host OTP │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ F04: Group Cart & Tracking│ F05: Kitchen Display (KDS) │ F06: Pay-at-Table & E-Invoice │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ F07: Staff Concierge App │ F08: 2D Floor & Auto-Release│ F09: Dynamic Menu & Pricing   │
├──────────────────────────┼─────────────────────────────┼───────────────────────────────┤
│ F10: KPI & Immutable Audit│                            │                               │
└──────────────────────────┴─────────────────────────────┴───────────────────────────────┘
```

---

## 2. Chi Tiết Từng Miền Tính Năng

### F01 — Cổng Đặt Bàn Trực Tuyến Tích Hợp AI Chatbot Tư Vấn
* **Giao diện Contemporary Luxury 1-Page:** Thực khách lướt xem không gian kiến trúc, menu tinh tuyển và tương tác với AI Assistant.
* **AI Chatbot tư vấn thông minh:** Hỗ trợ thực khách qua hội thoại tự nhiên:
  * Gợi ý set menu theo số lượng người, sở thích ẩm thực hoặc mức ngân sách.
  * Phân tích khung giờ vắng để gợi ý khách đặt bàn nhằm có trải nghiệm riêng tư nhất.
  * Hướng dẫn chọn khu vực phù hợp (lãng mạn ở Sân Vườn Terrace, sôi động tại Sảnh Chính, hoặc tiếp khách tại Phòng VIP).
* **Đăng ký vị trí ưu tiên mềm (Soft Preference):** Khách chọn khu vực hoặc loại bàn mong muốn (ví dụ: bàn gần cửa kính), hệ thống lưu nhận dạng ưu tiên để thuật toán AI xếp chỗ.
* **Cọc tự động VietQR:** Đoàn đông ($\ge 6$ người) hoặc phòng VIP tự động sinh mã VietQR động để khách cọc giữ chỗ $500.000\text{ ₫}$.
* **Xuất vé điện tử kèm Host OTP:** Xác nhận phiếu đặt bàn `BK-xxxx`, hiển thị mã **Host OTP (4 số)** trực tiếp trên màn hình và gửi sao lưu qua SMS/Email.

---

### F02 — AI Table Allocation Engine (Bộ Não Tối Ưu Xếp Chỗ)
* **Thuật toán tối ưu hóa công suất lấp đầy:** Giải bài toán phân bổ không gian và thời gian (Bin Packing & Constraint Optimization) dựa trên:
  * Số lượng khách thực tế của từng đoàn.
  * Vị trí ưu tiên mềm của khách.
  * Khoảng thời gian xoay vòng bàn trung bình (90–120 phút/lượt).
* **Ngăn chặn lãng phí diện tích:** Tự động ngăn chặn việc gán nhóm 2 người vào bàn 6 chỗ khi khung giờ đó có tiềm năng đón đoàn đông.
* **Ghép bàn ảo tự động:** Nhận diện và gộp các bàn 2 hoặc bàn 4 liền kề thành bàn tiệc lớn khi có đoàn 8–16 khách.
* **Tự động chốt và thông báo:** 60 phút trước giờ hẹn, AI chốt mã bàn chính thức (ví dụ: `T1-Bàn 04`) và push thông báo SMS/Zalo/Email kèm vị trí dẫn đường cho khách.

---

### F03 — Scan-to-Order & Bảo Mật Phiên Bàn Bằng Host OTP
* **Mã QR động/tĩnh tại từng bàn:** Khách đến bàn dùng camera điện thoại quét mã QR để mở trực tiếp Web App gọi món (không cần cài app).
* **Cơ chế xác thực Host OTP (Anti-tamper & Anti-spoofing):**
  * Yêu cầu nhập mã **Host OTP** đã được cấp trên vé đặt bàn.
  * Ngăn chặn triệt để tình trạng khách bàn bên cạnh quét trộm QR hoặc người ngoài quét mã order phá hoại.
* **Walk-in Instant Check-in (Khách vãng lai):**
  * Khách vào bàn trống 🟢 `AVAILABLE` quét QR $\rightarrow$ Hệ thống kiểm tra nếu bàn không vướng lịch hẹn trong 90 phút tới $\rightarrow$ Khách nhập SĐT, hệ thống kích hoạt phiên tại chỗ và sinh OTP tức thì.

---

### F04 — Giỏ Hàng Nhóm Thời Gian Thực & Quản Lý Vòng Đời Món Ăn
* **Collaborative Group Cart (Giỏ hàng nhóm):**
  * Tất cả thành viên tại bàn sau khi nhập đúng OTP đều có thể xem thực đơn và thêm món vào giỏ hàng chung trên thiết bị cá nhân (đồng bộ qua WebSocket).
  * **Quyền Host Duyệt:** Chỉ người đặt bàn (Host) mới có nút bấm gửi toàn bộ giỏ hàng xuống bếp để kiểm soát ngân sách.
* **Hiển thị trực quan vòng đời món ăn 4 bước:**
  * 🟡 `PENDING` (Đang chờ bếp nhận): Khách hàng có nút **"Hủy món"** trực tiếp. Bấm hủy lập tức loại món khỏi hóa đơn và ghi log.
  * 🔵 `COOKING` (Bếp đang nấu): Hệ thống **khóa nút tự hủy**, thay thế bằng nút **"Gọi nhân viên hỗ trợ"**.
  * 🟢 `READY` (Món đã nấu xong): Bếp chuẩn bị chuyển món ra bàn.
  * ⚪ `SERVED` (Món đã lên bàn): Trạng thái hoàn tất dùng bữa.

---

### F05 — Kitchen Display System (Màn Hình Bếp / Bar 1-Chạm)
* **Giao diện trạm bếp KDS chuyên dụng:** Hiển thị trên máy tính bảng hoặc màn hình chuyên dụng tại Bếp Nóng, Bếp Nguội và Quầy Bar.
* **Nhóm món theo trạm chế biến:** Đơn order từ bàn tự động phân tách: đồ uống sang Bar, khai vị sang Bếp Nguội, món nướng/xào sang Bếp Nóng.
* **Thao tác 1-chạm tối giản cho đầu bếp:**
  * Chạm 1: Đổi trạng thái món từ `PENDING` sang `COOKING` (đồng thời kích hoạt khóa nút hủy của khách trên toàn hệ thống).
  * Chạm 2: Đổi trạng thái sang `READY` $\rightarrow$ Phát chuông và đẩy thông báo cho nhân viên chạy bàn mang ra.
* **Thời gian cảnh báo đĩa trễ:** Đĩa món chờ quá 15 phút tự động nhấp nháy đỏ để đầu bếp ưu tiên xử lý.

---

### F06 — Pay-at-Table & Tự Động Đối Soát Hóa Đơn Điện Tử
* **Bảng kê xem trước điện tử (Live Pre-bill):**
  * Hiển thị chi tiết danh sách món đã phục vụ, phụ thu phòng VIP (nếu có), thuế VAT 8%.
  * **Tự động cấn trừ 100% tiền cọc:** Dòng tiền cọc đã đóng trước đó hiển thị rõ ràng (`- 500.000 ₫`), khách chỉ cần thanh toán số tiền chênh lệch còn lại.
* **Thanh toán tức thì không cần đợi thu ngân:**
  * Khách chọn thanh toán bằng VietQR động (đúng số tiền và nội dung) hoặc thẻ ngân hàng/ví điện tử.
  * Cổng thanh toán trả Webhook xác nhận thành công $\rightarrow$ Hệ thống tự động đóng đơn `PAID`.
  * Xuất e-receipt gửi qua SMS/Email hoặc tải PDF về điện thoại.
* **Tự động chuyển bàn ⚫ DIRTY:** Ngay khi thanh toán thành công, bàn trên sơ đồ 2D lập tức chuyển sang trạng thái chờ dọn và đẩy thông báo cho đội ngũ phục vụ.

---

### F07 — Staff Concierge App & Chuông Gọi Phục Vụ Thông Minh
* **Tái định vị nhân viên thành "Trợ lý hỗ trợ khách hàng":** Giải phóng nhân viên khỏi việc bấm order thủ công, tập trung 100% vào chất lượng chăm sóc.
* **Smart Call Bell (Chuông gọi phục vụ phân loại):**
  * Khách bấm gọi hỗ trợ trên Web App theo các nhu cầu định sẵn:
    * 🛑 *Hỗ trợ hủy/đổi món đang nấu* $\rightarrow$ Nhân viên đến kiểm tra với bếp.
    * 🧊 *Thêm đá, gia vị, khăn lạnh, đổi chén đĩa*.
    * 🙋 *Khách lớn tuổi nhờ nhân viên gọi món hộ qua Staff App*.
* **Task Dọn dẹp bàn tự động:** Nhân viên nhận danh sách các bàn ⚫ `DIRTY` cần dọn; sau khi vệ sinh bàn xong, nhân viên chạm nút "Đã dọn xong" $\rightarrow$ Bàn lập tức hồi sinh về 🟢 `AVAILABLE`.

---

### F08 — Sơ Đồ Mặt Bằng 2D & Tự Động Hóa Vòng Đời Bàn
* **Bản đồ 2D thời gian thực:** Trực quan hóa tọa độ các bàn tại Sảnh Chính, Sân Vườn và Phòng VIP với 4 màu trạng thái (`AVAILABLE`, `RESERVED`, `OCCUPIED`, `DIRTY`).
* **Auto-Release on No-Show:** Tiến trình chạy ngầm quét các đơn `RESERVED`:
  * Quá giờ hẹn 15 phút chưa check-in $\rightarrow$ Tự động gửi tin nhắn cảnh báo đếm ngược 5 phút.
  * Quá 20 phút $\rightarrow$ Tự động hủy đơn, phạt 100% cọc và chuyển bàn về `AVAILABLE` đón khách mới.

---

### F09 — Quản Lý Thực Đơn & Giá Bán (Dynamic Menu Management)
* **Bật/Tắt hết hàng tức thì:** Đầu bếp hoặc quản lý chạm 1 nút để báo hết món khi hết nguyên liệu $\rightarrow$ Web App của khách lập tức hiển thị nhãn `HẾT HÀNG`, chặn thêm vào giỏ.
* **Cơ chế Soft-Delete:** Ẩn món khỏi menu nhưng giữ nguyên khóa ngoại trong CSDL để bảo đảm toàn vẹn lịch sử hóa đơn kế toán.
* **Cấu hình bảng giá linh hoạt:** Điều chỉnh giá món, tỷ lệ phụ thu phòng VIP và chính sách đặt cọc theo khung giờ/ngày lễ.

---

### F10 — Executive Dashboard & Nhật Ký Kiểm Toán Bất Biến
* **Dashboard điều hành thông minh:**
  * Theo dõi doanh thu theo thời gian thực (Ngày, Tuần, Tháng).
  * Chỉ số tự động hóa: Tỷ lệ khách tự quét QR order (Self-service rate), thời gian ra món trung bình của bếp, tốc độ quay vòng bàn.
  * Tỷ lệ đóng góp doanh thu giữa Sảnh Chính, Sân Vườn và VIP Room.
* **Immutable Audit Trail (PostgreSQL Trigger):**
  * Tự động ghi vết mọi hành vi nhạy cảm của cả Nhân viên (`STAFF`) lẫn Khách hàng (`GUEST`): khách tự hủy món `PENDING`, nhân viên can thiệp hủy món `COOKING`, hoàn cọc, chuyển bàn.
  * Cấm hoàn toàn quyền `UPDATE` và `DELETE` trên bảng `audit_logs`.
