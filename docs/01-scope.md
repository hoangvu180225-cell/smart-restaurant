# 01 — Phạm Vi Dự Án & Bối Cảnh Nghiệp Vụ (Project Scope)

> **Dự án:** SmartRestaurant — Hệ Thống Tự Động Hóa Vận Hành Đặt Bàn AI, QR Self-Ordering & POS Di Động  
> **Phiên bản:** 2.0.0 — Full Automation & AI-Driven Architecture  
> **Tài liệu:** Đặc tả Phạm vi Nghiệp vụ & Ranh giới Hệ thống Tự Động Hóa Toàn Diện  

---

## 1. Bối Cảnh Thực Tế & Nỗi Đau Vận Hành (Problem Statement)

Tại các nhà hàng ẩm thực đương đại quy mô vừa đến lớn, quy trình phục vụ truyền thống dựa vào nhân sự đang bộc lộ 4 điểm nghẽn nghiêm trọng:

1. **Điểm nghẽn Đặt bàn & Lãng phí Công suất Sàn:**
   * Khách đặt bàn qua hotline/sổ sách dẫn đến trùng lịch (*double-booking*) vào khung giờ cao điểm (12:00–13:30 và 19:00–21:00).
   * Tỷ lệ khách bỏ hẹn (*no-show*) lên tới $20\text{--}30\%$ do thiếu cơ chế xác thực đặt cọc tự động đối với đoàn đông và phòng VIP.
   * Quản lý xếp bàn thủ công mang tính cảm tính, dẫn đến hiện tượng lãng phí diện tích (ví dụ: xếp 2 khách ngồi bàn 6 người, trong khi đoàn 6 khách đến sau lại không có chỗ).

2. **Điểm nghẽn Gọi món & Áp lực Bồi bàn Giờ Cao Điểm:**
   * Nhân viên phục vụ phải di chuyển liên tục giữa bàn ăn và quầy bếp để ghi order giấy, trung bình mất 7–10 phút cho mỗi lượt gọi món.
   * Sai sót ghi chú khẩu vị quan trọng (`Dị ứng hải sản`, `Không cay`, `Ăn chay`) gây hư hỏng nguyên liệu và giảm mức độ hài lòng của khách.
   * Khách hàng muốn gọi thêm món hoặc theo dõi tiến độ món ăn phải ngóng chờ nhân viên, gây ức chế trong giờ cao điểm.

3. **Điểm nghẽn Hủy món & Nguy cơ Gian lận Tiền mặt:**
   * Quy trình hủy món phức tạp: khách đổi ý phải gọi bồi bàn $\rightarrow$ bồi bàn chạy vào bếp hỏi $\rightarrow$ chạy ra quầy thu ngân xin quyền hủy.
   * Khi thanh toán tiền mặt, nhân viên có thể cấu kết tự ý hủy món sau khi khách đã dùng bữa để chiếm đoạt tiền nếu thiếu cơ chế kiểm toán bất biến ở tầng cơ sở dữ liệu.

4. **Điểm nghẽn Thanh toán & Tốc độ Xoay vòng Bàn:**
   * Sau khi ăn xong, khách phải chờ xin bill $\rightarrow$ thu ngân in pre-bill giấy $\rightarrow$ mang lại bàn kiểm tra $\rightarrow$ mang thẻ/tiền mặt về quầy $\rightarrow$ mang hóa đơn lại bàn. Quy trình mất từ 8–15 phút/bàn, làm giảm mạnh tốc độ quay vòng bàn (*Table Turnover Rate*).

---

## 2. Giải Pháp Toàn Diện: SmartRestaurant 2.0 (End-to-End Automation)

SmartRestaurant 2.0 là hệ sinh thái tự động hóa vận hành nhà hàng khép kín, ứng dụng AI để tối ưu hóa công suất lấp đầy và trao quyền tự phục vụ (Self-Service) trọn vẹn cho thực khách:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                   HỆ THỐNG TỰ ĐỘNG HÓA SMARTRESTAURANT 2.0                             │
├─────────────────────────┬────────────────────────────┬─────────────────────────────────┤
│  1. CỔNG KHÁCH HÀNG AI  │ 2. QR ORDER & PAY-AT-TABLE │  3. KDS BẾP & STAFF CONCIERGE   │
│  (Customer Experience)  │    (Dine-in Automation)    │       (Kitchen & Service)       │
├─────────────────────────┼────────────────────────────┼─────────────────────────────────┤
│ • AI Chatbot tư vấn     │ • Quét QR tại bàn          │ • Màn hình trạm bếp KDS 1-chạm  │
│ • Chọn vị trí ưu tiên   │ • Host OTP bảo mật session │ • Cập nhật COOKING/READY realtime│
│ • Cọc VietQR đoàn đông  │ • Giỏ hàng nhóm thời gian  │ • Staff App: Hỗ trợ ngoại lệ,   │
│ • AI tự động xếp bàn    │   thực (Group Cart)        │   chuông gọi phục vụ thông minh │
│ • Push thông báo bàn    │ • Khách tự hủy món PENDING │ • Báo dọn bàn DIRTY tự động     │
│   và OTP xác nhận       │ • Pay-at-table trừ 100% cọc│ • Dashboard KPI & Trigger Audit │
└─────────────────────────┴────────────────────────────┴─────────────────────────────────┘
```

---

## 3. Ranh Giới Hệ Thống (System Boundaries)

### 3.1 Các Hạng Mục Nằm Trong Phạm Vi (In-Scope — Phiên Bản 2.0)
* **AI Reservation & Chatbot Assistant:** Khách trò chuyện với AI để được tư vấn thực đơn, chọn khung giờ lý tưởng và đăng ký vị trí ưu tiên mềm (Soft Preference).
* **AI Table Allocation Engine:** Thuật toán tối ưu hóa phân bổ bàn tự động dựa trên quy mô nhóm khách, tỷ lệ lấp đầy sàn và giảm thiểu khoảng trống công suất; tự động xuất thông báo bàn chính thức kèm mã **Host OTP**.
* **Scan-to-Order với Host OTP Security:** Khách đến bàn quét mã QR, nhập Host OTP để mở phiên; hỗ trợ nhiều thiết bị cùng bàn tham gia Giỏ hàng chung (Group Cart), duy nhất Host có quyền chốt gửi bếp.
* **Theo dõi vòng đời món & Khách tự hủy món:** Khách theo dõi tiến độ món trực tiếp (`PENDING` $\rightarrow$ `COOKING` $\rightarrow$ `READY`); khách có quyền tự hủy món ngay lập tức khi món còn ở `PENDING`.
* **Kitchen Display System (KDS):** Màn hình trạm bếp 1-chạm cho đầu bếp nhận order, chuyển món sang `COOKING` (khóa nút tự hủy của khách) và báo `READY` để lên món.
* **Pay-at-Table & Auto Receipt:** Khách tự kiểm tra bảng kê điện tử tại bàn, tự động cấn trừ 100% tiền cọc đã đóng, thanh toán qua mã VietQR động/Cổng thanh toán và nhận e-receipt.
* **Walk-in Instant Check-in:** Khách vãng lai quét QR tại bàn trống `AVAILABLE` để nhận OTP và mở phiên tức thì nếu bàn không vướng lịch đặt trước.
* **Auto-Release on No-Show:** Tiến trình tự động cảnh báo sau 15 phút trễ hẹn và tự động phạt cọc, giải phóng bàn sau 20 phút vắng mặt.
* **Staff Concierge App:** Ứng dụng hỗ trợ nhân viên nhận cuộc gọi phục vụ thông minh, can thiệp hỗ trợ hủy món đang nấu, và nhận lệnh dọn bàn `DIRTY`.
* **Executive Dashboard & Immutable Audit Trail:** Dashboard theo dõi doanh thu, tỷ lệ tự phục vụ; PostgreSQL Trigger ghi vết kiểm toán bất biến cho mọi hành động của Nhân viên lẫn Khách hàng.

### 3.2 Các Hạng Mục Nằm Ngoài Phạm Vi (Out-of-Scope — Dự Kiến Bản Tiếp Theo)
* Quản lý định lượng vi mô kho nguyên vật liệu đến từng gram thực phẩm (*Bếp tự kiểm kê theo ca*).
* Tích hợp máy quẹt thẻ vật lý chuyên dụng EDC ngân hàng (*Thanh toán qua QR động, thẻ trực tuyến hoặc tiền mặt tại quầy khi có ngoại lệ*).
* Quản lý chấm công, bảng lương chi tiết của nhân sự nhà hàng.

---

## 4. Các Nhóm Tác Nhân Hệ Thống (Target Actors)

| Tác Nhân | Thiết Bị Truy Cập | Vai Trò & Hành Vi Chính Trong Hệ Thống |
| :--- | :--- | :--- |
| **Khách Hàng (Customer / Guest)** | Smartphone cá nhân | Chat với AI tư vấn, đặt bàn & cọc VietQR, quét QR tại bàn mở phiên bằng OTP, thêm món vào Giỏ hàng chung, tự hủy món `PENDING`, bấm chuông gọi phục vụ, tự thanh toán tại bàn. |
| **Chủ Bàn (Host Customer)** | Smartphone cá nhân | Người trực tiếp đặt bàn, nắm giữ mã Host OTP, có quyền duyệt và bấm gửi đơn từ Giỏ hàng chung xuống bếp. |
| **Đầu Bếp (Kitchen / Bar Chef)** | Tablet chuyên dụng trạm bếp (KDS) | Tiếp nhận thẻ order, chạm 1-chạm xác nhận nấu (`COOKING`), chạm hoàn thành (`READY`) để báo bồi bàn ra món. |
| **Nhân Viên Phục Vụ (Staff Concierge)** | Smartphone / Tablet mini | Tiếp nhận thông báo gọi phục vụ thông minh, hỗ trợ khách lớn tuổi order hộ, can thiệp xử lý hủy món đang nấu, xác nhận hoàn tất dọn bàn `DIRTY` $\rightarrow$ `AVAILABLE`. |
| **Quản Lý Nhà Hàng (Manager)** | Desktop PC / Tablet Widescreen | Giám sát sơ đồ bàn 2D thời gian thực, xem dashboard hiệu quả xếp bàn của AI, theo dõi doanh thu và tra cứu nhật ký kiểm toán. |
| **Quản Trị Viên (Admin)** | Desktop Admin Console | Quản trị tài khoản, phân quyền RBAC, cập nhật menu, cấu hình ngưỡng tiền cọc và quy tắc thuật toán AI. |
| **Tác Nhân Tự Động (AI & System Cron)** | Nền tảng Backend / Microservices | AI Chatbot tư vấn, Thuật toán AI phân bổ bàn tự động, Tiến trình Cron tự động hủy đơn No-show và nhả bàn. |
