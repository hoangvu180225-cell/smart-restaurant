# 06 — Tiêu Chí Nghiệm Thu (Acceptance Criteria)

> **Dự án:** SmartRestaurant — Hệ Thống Tự Động Hóa Vận Hành Đặt Bàn AI, QR Self-Ordering & POS Di Động  
> **Phiên bản:** 2.0.0 — Full Automation & AI-Driven Architecture  
> **Tài liệu:** Bảng Tiêu Chí Nghiệm Thu Theo Chuẩn Given-When-Then (Gherkin BDD)  

---

## 1. AC-01: AI Chatbot Tư Vấn & Đặt Bàn Ưu Tiên Mềm

* **Kịch bản 1: Chatbot tư vấn món ăn và gợi ý khung giờ vắng**
  * **Given:** Khách hàng truy cập trang chủ và mở cửa sổ AI Chatbot.
  * **When:** Khách nhắn: *"Tôi muốn tổ chức sinh nhật cho 6 người vào tối Thứ 7, thích không gian ngoài trời và đồ nướng"*.
  * **Then:** AI phân tích dữ liệu, phản hồi gợi ý: Khu Sân Vườn Terrace, Set Menu BBQ Premium 6 người, và gợi ý khung giờ 18:30 (ít ồn ào hơn 19:30), đồng thời đính kèm nút "Đặt Bàn Theo Gợi Ý Này".

* **Kịch bản 2: Đăng ký vị trí ưu tiên mềm (Soft Preference)**
  * **Given:** Khách hàng điền thông tin đặt bàn cho nhóm 4 người tại Sảnh Chính, chọn vị trí ưu tiên *"Bàn gần cửa kính"*.
  * **When:** Nhấn nút "Xác Nhận Đặt Bàn".
  * **Then:** Hệ thống ghi nhận `preferred_area_id`, xuất vé điện tử trạng thái `PENDING` kèm thông báo: *"Nhà hàng đã ghi nhận nguyện vọng bàn gần cửa kính. Vị trí chính thức sẽ được AI tối ưu và gửi qua SMS trước giờ hẹn 60 phút"*.

---

## 2. AC-02: Cọc Tự Động VietQR & AI Phân Bổ Bàn Tối Ưu

* **Kịch bản 1: Cọc tự động đoàn đông ($\ge 6$ người)**
  * **Given:** Khách hàng đặt bàn cho 8 người.
  * **When:** Nhấn xác nhận đặt bàn.
  * **Then:** Hệ thống tự động tính mức cọc bắt buộc $500.000\text{ ₫}$, hiển thị mã VietQR động với nội dung chuyển khoản chứa mã `BK-xxxx`. Đơn được giữ ở trạng thái `PENDING_ALLOCATION` trong 30 phút.

* **Kịch bản 2: Thuật toán AI phân bổ bàn tự động**
  * **Given:** Có đơn đặt bàn đã thanh toán cọc lúc 19:00 tại Sảnh Chính.
  * **When:** Đến mốc 18:00 (trước giờ hẹn 60 phút), tiến trình AI Allocation Engine chạy.
  * **Then:** AI tìm kiếm các bàn phù hợp, gán bàn `T1-04`, sinh mã **Host OTP (ví dụ: `7294`)**, chuyển đơn sang `CONFIRMED`, bàn trên sơ đồ 2D chuyển sang màu vàng 🟡 `RESERVED`, và tự động gửi SMS thông báo mã bàn kèm Host OTP cho khách.

---

## 3. AC-03: Quét QR Tại Bàn & Xác Thực Host OTP Bảo Mật

* **Kịch bản 1: Chủ bàn (Host) quét QR và nhập đúng Host OTP**
  * **Given:** Bàn `T1-04` đang ở trạng thái 🟡 `RESERVED` dành cho khách `BK-8921`.
  * **When:** Khách đến bàn, dùng camera quét mã QR trên bàn và nhập đúng mã Host OTP `7294`.
  * **Then:** Hệ thống tạo bản ghi `table_sessions` với trạng thái `ACTIVE`, chuyển bàn trên sơ đồ 2D sang màu đỏ 🔴 `OCCUPIED`, và mở giao diện Giỏ Hàng Nhóm.

* **Kịch bản 2: Người lạ hoặc khách bàn bên quét trộm QR mà không có OTP**
  * **Given:** Bàn `T1-04` đang mở phiên hoặc đang chờ khách.
  * **When:** Một người dùng khác quét mã QR của bàn `T1-04` nhưng nhập sai OTP quá 3 lần.
  * **Then:** Hệ thống khóa quyền truy cập của thiết bị đó trong 15 phút, hiển thị thông báo lỗi `401 Unauthorized: Mã OTP bàn không chính xác` và không cho phép xem/thêm món.

---

## 4. AC-04: Khách Vãng Lai Check-in Tự Động (Walk-in Instant Session)

* **Kịch bản 1: Khách vãng lai ngồi vào bàn trống không vướng lịch hẹn**
  * **Given:** Bàn `T2-02` đang ở trạng thái 🟢 `AVAILABLE` và không có bất kỳ lịch hẹn nào trong vòng 90 phút tới.
  * **When:** Khách vãng lai quét mã QR trên bàn và nhập số điện thoại cá nhân.
  * **Then:** Hệ thống tự động kích hoạt phiên `table_sessions` mới (`is_walkin = true`), sinh mã OTP hiển thị ngay trên màn hình, bàn chuyển sang 🔴 `OCCUPIED` và đưa khách vào menu gọi món ngay lập tức.

* **Kịch bản 2: Khách vãng lai quét bàn trống nhưng sắp có lịch hẹn**
  * **Given:** Bàn `T2-03` đang trống nhưng đã có lịch hẹn của đoàn khác đến sau 35 phút nữa.
  * **When:** Khách vãng lai quét mã QR bàn `T2-03`.
  * **Then:** Hệ thống từ chối mở phiên, hiển thị thông báo: *"Bàn này đã có khách đặt trước lúc 19:30. Vui lòng chuyển sang bàn T2-05 hoặc liên hệ nhân viên để được hướng dẫn"*.

---

## 5. AC-05: Quản Lý Vòng Đời Món Ăn & Quy Tắc Hủy Món Phân Tầng

* **Kịch bản 1: Khách hàng tự hủy món đang ở trạng thái PENDING**
  * **Given:** Khách vừa gửi order đĩa "Súp Bào Ngư", món đang ở trạng thái 🟡 `PENDING` trên màn hình Web App của khách (bếp chưa bấm nhận).
  * **When:** Khách bấm nút "Hủy món" và chọn lý do "Muốn đổi món khác".
  * **Then:** Hệ thống cập nhật `item_status = 'CANCELLED'`, loại món khỏi hóa đơn tạm tính, Trigger CSDL tự động ghi log với `actor_type: 'GUEST'`, và thẻ món trên màn hình KDS trạm bếp tự động biến mất.

* **Kịch bản 2: Khách cố gắng tự hủy món khi bếp đã nhận nấu (COOKING)**
  * **Given:** Đầu bếp tại trạm KDS đã chạm vào đĩa "Thăn Bò Wagyu A5", món chuyển sang trạng thái 🔵 `COOKING`.
  * **When:** Khách hàng nhìn vào Web App.
  * **Then:** Nút "Hủy món" bị vô hiệu hóa hoàn toàn (disabled), thay bằng nút "Gọi nhân viên hỗ trợ". Nếu client cố tình bypass gửi API hủy trực tiếp, Trigger CSDL PostgreSQL chặn lại với mã lỗi `45001: Món ăn đang chế biến, chỉ nhân viên mới có quyền can thiệp`.

* **Kịch bản 3: Nhân viên can thiệp hủy món COOKING theo yêu cầu của khách**
  * **Given:** Khách hàng bấm chuông nhờ hủy món đang `COOKING`.
  * **When:** Nhân viên đến xác minh với bếp rằng chảo thịt chưa bắt đầu nướng $\rightarrow$ Nhân viên mở Staff App, nhập mã PIN nhân viên và nhập lý do *"Khách đổi ý, bếp chưa bắt đầu chế biến"* $\rightarrow$ Bấm xác nhận hủy.
  * **Then:** Hệ thống cho phép cập nhật `item_status = 'CANCELLED'`, ghi log kiểm toán với `actor_type: 'STAFF'` kèm ID của nhân viên phục vụ.

---

## 6. AC-06: Chuông Gọi Phục Vụ Thông Minh (Smart Service Call)

* **Kịch bản 1: Khách bấm chuông xin thêm đá và khăn lạnh**
  * **Given:** Khách hàng đang trong phiên ăn tại bàn `VIP-02`.
  * **When:** Khách bấm nút "Gọi Phục Vụ" $\rightarrow$ Chọn mục "🧊 Thêm đá / Khăn lạnh".
  * **Then:** Hệ thống tạo bản ghi trong `service_calls`, điện thoại của nhân viên phụ trách khu vực VIP rung chuông và hiện pop-up: *"Bàn VIP-02 yêu cầu: Thêm đá / Khăn lạnh"*.

---

## 7. AC-07: Tự Thanh Toán Tại Bàn (Pay-at-Table & E-Invoice)

* **Kịch bản 1: Khách hàng tự thanh toán tại bàn thành công**
  * **Given:** Khách tại bàn `VIP-01` dùng bữa xong, tổng tiền món ăn là $2.000.000\text{ ₫}$, phụ thu VIP $10\%$ là $200.000\text{ ₫}$, tiền cọc đã đóng trước là $500.000\text{ ₫}$, thuế VAT 8% tính trên chênh lệch.
  * **When:** Khách bấm "Thanh Toán Tại Bàn".
  * **Then:** Bảng kê điện tử hiển thị dòng khấu trừ 100% tiền cọc (`- 500.000 ₫`), sinh mã VietQR động với số tiền chính xác còn lại. Khách quét app ngân hàng chuyển khoản $\rightarrow$ Webhook nhận tiền thành công $\rightarrow$ Đơn đóng `PAID`, e-receipt gửi vào email khách, bàn lập tức chuyển sang màu xám ⚫ `DIRTY` trên sơ đồ 2D.

---

## 8. AC-08: Tự Động Phạt Cọc & Nhả Bàn Khi Quá Giờ Hẹn (No-Show)

* **Kịch bản 1: Khách vắng mặt quá 20 phút**
  * **Given:** Khách có lịch đặt bàn lúc 19:00 (đã cọc 500.000 ₫), bàn đang ở trạng thái 🟡 `RESERVED`.
  * **When:** Đến 19:15 chưa thấy khách quét QR check-in $\rightarrow$ Hệ thống gửi tin nhắn cảnh báo: *"Quý khách có 5 phút để check-in trước khi bàn bị hủy"*. Đến 19:20 vẫn không có check-in.
  * **Then:** Tiến trình tự động chuyển trạng thái đơn sang `NO_SHOW`, chuyển tiền cọc sang `FORFEITED` (giữ lại 100%), tự động giải phóng bàn về 🟢 `AVAILABLE` để đón khách vãng lai, và ghi log kiểm toán hành vi tự động của hệ thống.
