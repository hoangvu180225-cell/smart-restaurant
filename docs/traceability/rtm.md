# Ma Trận Truy Vết Yêu Cầu (Requirements Traceability Matrix - RTM)

> **Dự án:** SmartRestaurant — Hệ Thống Tự Động Hóa Vận Hành Đặt Bàn AI, QR Self-Ordering & POS Di Động  
> **Phiên bản:** 2.0.0 — Full Automation & AI-Driven Architecture  
> **Tài liệu:** Bảng Ánh Xạ Toàn Diện Giữa Yêu Cầu, Ca Sử Dụng, Giao Diện, API & Kiểm Thử  

---

| User Story | Ca Sử Dụng | Màn Hình Giao Diện | Thành Phần Backend / Worker | Bảng Cơ Sở Dữ Liệu | Tiêu Chí Nghiệm Thu |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US01–US02** | UC01, UC02 | Đăng nhập Nhân sự & Hội viên | `AuthController`, `AuthService` | `users` | AC-01: Login JWT & RBAC 5 roles |
| **US03** | UC01 | AI Chatbot Widget trên Web 1-Page | `AiChatbotController`, `RecommendationEngine` | `menu_items`, `areas`, `tables` | AC-01: Chatbot tư vấn món & giờ vắng |
| **US04–US05** | UC02, UC03 | Form Đặt Bàn & Vé Điện Tử `BK-xxxx` | `ReservationController`, `DepositEngine` | `reservations` | AC-01, AC-02: Ưu tiên mềm & Cọc VietQR |
| **US06–US07** | UC04, UC15 | AI Allocation Monitor & Thông báo | `AiAllocationWorker`, `NoShowCronJob` | `reservations`, `tables`, `audit_logs` | AC-02, AC-08: AI xếp chỗ & Phạt No-show |
| **US08–US10** | UC05, UC06, UC16 | Màn hình Quét QR Bàn & Nhập Host OTP | `SessionController`, `FloorMapController` | `table_sessions`, `tables` | AC-03, AC-04: Host OTP & Walk-in check-in |
| **US11–US12** | UC07, UC08 | Phòng Giỏ Hàng Nhóm (Group Cart Room) | `CartWebSocketHandler`, `OrderService` | `orders`, `order_items` | AC-04: Giỏ hàng nhóm & Host duyệt gửi bếp |
| **US13–US14** | UC09, UC17 | Màn hình Trạm Bếp KDS 1-Chạm | `KitchenKdsController`, `StationDispatcher` | `order_items` | AC-05: KDS trạm bếp COOKING / READY |
| **US15** | UC10 | Nút "Hủy món" PENDING trên Web Khách | `CustomerOrderController`, PostgreSQL Trigger | `order_items`, `audit_logs` | AC-05: Khách tự hủy món PENDING |
| **US16** | UC11, UC12 | Chuông Gọi Phục Vụ Thông Minh | `ServiceCallController`, `StaffWebSocket` | `service_calls`, `audit_logs` | AC-06: Chuông hỗ trợ & Hủy món COOKING |
| **US17** | UC13 | Pay-at-Table: Pre-bill Trừ Cọc & VietQR | `PaymentController`, `VietQrWebhookHandler` | `invoices`, `orders`, `tables` | AC-07: Tự thanh toán tại bàn & E-Receipt |
| **US18** | UC14 | Staff Concierge: Danh sách dọn bàn | `StaffController`, `TableStateEngine` | `tables`, `audit_logs` | AC-07: Dọn bàn DIRTY ➔ AVAILABLE |
| **US19** | UC18 | Executive Dashboard (Doanh thu & AI KPI)| `DashboardController`, `AnalyticsEngine` | Toàn bộ các bảng | AC-08: KPI doanh thu & Tỷ lệ tự phục vụ |
| **US20** | UC19, UC20 | Tra cứu Nhật ký Kiểm toán Bất biến | `AuditController`, PostgreSQL Triggers | `audit_logs` | AC-09: Trigger CSDL chống gian lận |
