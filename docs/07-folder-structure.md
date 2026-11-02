# 07 — Cấu Trúc Thư Mục Dự Án (Project Folder Structure)

> **Dự án:** SmartRestaurant — Hệ Thống Tự Động Hóa Vận Hành Đặt Bàn AI, QR Self-Ordering & POS Di Động  
> **Phiên bản:** 2.0.0 — Full Automation & AI-Driven Architecture  
> **Tài liệu:** Quy Chuẩn Tổ Chức Thư Mục Mã Nguồn & Tài Liệu Kỹ Thuật  

---

## 1. Cấu Trúc Toàn Bộ Dự Án (High-Level Directory Tree)

```text
restaurant-manager/
├── docs/                                 # Toàn bộ tài liệu kỹ thuật & tài nguyên thiết kế
│   ├── api/                              # Đặc tả API (OpenAPI 3.0 / Swagger YAML)
│   │   └── openapi.yaml
│   ├── architecture/                     # Tài liệu kiến trúc C4 & lược đồ DBML
│   │   └── schema.dbml
│   ├── images/                           # Thư viện ảnh chụp màn hình UI thực tế
│   │   ├── Homepage.png                  # Cổng khách hàng 1-Page
│   │   ├── Menu.png                      # Thực đơn tinh tuyển
│   │   ├── Room.png                      # Không gian phòng tiệc
│   │   ├── Book_Ticket.png               # Vé đặt bàn điện tử & mã Host OTP
│   │   ├── Mobile_Waiter_POS.png         # Giao diện gọi món di động
│   │   ├── Dashboard.png                 # Executive Dashboard & AI KPI
│   │   └── Table_Map.png                 # Sơ đồ mặt bằng 2D thời gian thực
│   ├── requirements/                     # Tài liệu yêu cầu chi tiết & quy tắc nghiệp vụ
│   │   └── business-rules.md             # 11 Quy tắc nghiệp vụ tự động hóa khép kín
│   ├── traceability/                     # Ma trận truy vết yêu cầu (RTM Matrix)
│   │   └── rtm.md                        # Ánh xạ 20 User Stories & 21 Use Cases
│   ├── 01-scope.md                       # Phạm vi dự án, Nỗi đau vận hành & Ranh giới
│   ├── 02-features.md                    # Đặc tả chi tiết 10 miền tính năng tự động hóa
│   ├── 03-use-cases.md                   # 21 Ca sử dụng & Sơ đồ Use Case toàn diện
│   ├── 04-information-architecture.md    # Kiến trúc thông tin & UX Flow 5 phân hệ
│   ├── 05-data-model.md                  # Mô hình thực thể & Máy trạng thái tự động
│   ├── 06-acceptance-criteria.md         # Tiêu chí nghiệm thu BDD (Given-When-Then)
│   ├── 07-folder-structure.md            # Tài liệu cấu trúc thư mục này
│   ├── 08-invest-requirements.md         # 20 User Stories chuẩn Agile INVEST
│   ├── 09-step-7-readiness.md            # Kế hoạch bàn giao & Lộ trình 4 chặng
│   ├── DATABASE.md                       # Từ điển dữ liệu CSDL PostgreSQL 16 & Triggers
│   └── mindmap.png                       # Sơ đồ tư duy sản phẩm tổng quan
│
├── src/                                  # Mã nguồn chính thức của hệ thống
│   ├── frontend/                         # Cổng Web & Mobile App (React 18 + Vite)
│   │   ├── index.html                    # File HTML gốc
│   │   ├── package.json                  # Dependencies: react, vite, lucide-react, socket.io-client
│   │   ├── vite.config.js                # Cấu hình máy chủ phát triển Vite
│   │   └── src/
│   │       ├── main.jsx                  # Điểm khởi chạy React DOM
│   │       ├── App.jsx                   # Component điều hướng chính
│   │       ├── index.css                 # Hệ thống Design Tokens & CSS toàn cục
│   │       ├── components/               # Các UI components tái sử dụng (Button, Modal, Card, QRScanner)
│   │       └── features/                 # Modular Domain Features:
│   │           ├── booking-portal/       # Trải nghiệm 1-Page & AI Chatbot tư vấn cho khách
│   │           ├── scan-to-order/        # Khách quét QR, Host OTP, Giỏ hàng nhóm & Theo dõi món
│   │           ├── pay-at-table/         # Khách tự thanh toán tại bàn (Pre-bill, trừ 100% cọc, VietQR)
│   │           ├── kitchen-kds/          # Màn hình trạm bếp 1-chạm (COOKING / READY)
│   │           ├── staff-concierge/      # Trợ lý phục vụ: Chuông gọi phục vụ thông minh & Dọn bàn DIRTY
│   │           ├── floor-map-2d/         # Sơ đồ mặt bằng kiến trúc 2D (4 trạng thái màu realtime)
│   │           └── manager-dashboard/    # Dashboard KPI điều hành ca trực & AI Metrics
│   │
│   ├── backend/                          # Máy chủ dịch vụ (Node.js 20 LTS + Express 4)
│   │   ├── server.js                     # Điểm khởi chạy HTTP Server & WebSocket
│   │   ├── package.json                  # Dependencies: express, pg, socket.io, jsonwebtoken, bcryptjs
│   │   ├── .env.example                  # Mẫu biến môi trường (PORT, DATABASE_URL, JWT_SECRET, AI_API_KEY)
│   │   └── src/
│   │       ├── config/                   # Cấu hình kết nối CSDL PostgreSQL & Socket.io
│   │       ├── controllers/              # Điều phối logic nghiệp vụ:
│   │       │   ├── authController.js     # Xác thực JWT & phân quyền RBAC
│   │       │   ├── chatbotController.js  # Tích hợp AI Chatbot tư vấn thực đơn
│   │       │   ├── reservationController.js # Đặt bàn, cọc VietQR & quản lý vé BK-xxxx
│   │       │   ├── sessionController.js  # Quản lý phiên bàn `table_sessions` & xác thực Host OTP
│   │       │   ├── orderController.js    # Giỏ hàng nhóm, gửi bếp & khách tự hủy món PENDING
│   │       │   ├── kdsController.js      # Trạm bếp KDS cập nhật COOKING / READY
│   │       │   ├── serviceCallController.js # Chuông gọi phục vụ thông minh
│   │       │   ├── paymentController.js  # Pay-at-table, webhook VietQR & xuất e-receipt
│   │       │   ├── floorMapController.js # Sơ đồ bàn 2D & chuyển màu trạng thái sàn
│   │       │   ├── dashboardController.js# Thống kê doanh thu, tỷ lệ tự phục vụ & tốc độ ra món
│   │       │   └── auditController.js    # Tra cứu nhật ký kiểm toán bất biến
│   │       ├── workers/                  # Tiến trình nền tự động (Background Jobs):
│   │       │   ├── aiTableAllocator.js   # Thuật toán AI phân bổ bàn tối ưu lấp đầy
│   │       │   └── noShowReleaser.js     # Cron job tự động phạt cọc & nhả bàn khi quá 20 phút
│   │       ├── middlewares/              # Kiểm soát bảo mật, Auth Token, Session OTP Validator
│   │       └── routes/                   # Khai báo tuyến đường RESTful API v1
│   │
│   └── database/                         # Kịch bản cơ sở dữ liệu PostgreSQL
│       ├── schema.sql                    # Kịch bản DDL tạo 13 bảng & 10 ENUM types
│       ├── triggers.sql                  # Triggers ràng buộc hủy món COOKING & Audit Log bất biến
│       └── sample_data.sql               # Dữ liệu hạt giống (Seed Data) phòng bàn và thực đơn
│
└── Readme.md                             # Tài liệu tổng quan dự án chính thức
```
