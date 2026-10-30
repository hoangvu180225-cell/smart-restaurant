# Ma Trận Truy Vết Yêu Cầu (Requirements Traceability Matrix - RTM)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Tài liệu:** Bảng Ánh Xạ Giữa Yêu Cầu, Ca Sử Dụng, Thiết Kế & Kiểm Thử  

---

| User Story | Ca Sử Dụng | Màn Hình Giao Diện | Thành Phần Backend API | Bảng Cơ Sở Dữ Liệu | Tiêu Chí Nghiệm Thu |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US01–US02** | UC01, UC02 | Đăng nhập Modal | `AuthController`, `AuthService` | `users` | AC-01: Login, JWT, RBAC |
| **US03** | UC03 | Sơ đồ bàn 2D (`Table_Map.png`) | `FloorMapController`, `TableStateEngine` | `areas`, `tables` | AC-03: Sơ đồ bàn 4 màu |
| **US04–US06** | UC04, UC05 | Cổng 1-Page (`Book_Ticket.png`) | `ReservationController`, `DepositEngine` | `reservations`, `preorders` | AC-02: Đặt bàn cọc $\ge 6$ khách |
| **US07–US09** | UC12, UC13 | Quản lý Thực đơn (`Menu.png`) | `MenuController`, `PricingEngine` | `menu_categories`, `menu_items` | AC-02: Bật tắt món, phụ thu VIP |
| **US10–US12** | UC06, UC07 | Mobile Waiter POS (`Mobile_Waiter_POS.png`) | `OrderPosController`, `OrderService` | `orders`, `order_items` | AC-04: Mở bàn, gọi món 1 tay |
| **US13–US14** | UC08 | Nút hủy món có lý do | `OrderPosController`, PostgreSQL Trigger | `order_items`, `audit_logs` | AC-05: Hủy món + Trigger log |
| **US15–US16** | UC09, UC10 | Pre-Bill & Thu ngân | `BillingController`, `BillingEngine` | `invoices`, `tables` | AC-06: Trừ 100% cọc, in bill |
| **US17** | UC14, UC15 | Executive Dashboard (`Dashboard.png`) | `DashboardController`, `AnalyticsService`| Toàn bộ bảng dữ liệu | AC-07: Thẻ trắng, cột/tròn, 3/4 & 1/4 |
| **US18** | UC16, UC17 | Nhật ký kiểm toán | `AuditController`, `AuditLogger` | `audit_logs` | AC-05, AC-07: Truy vết gian lận |
