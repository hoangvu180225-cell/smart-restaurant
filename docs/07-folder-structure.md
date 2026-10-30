# 07 — Cấu Trúc Thư Mục Dự Án (Project Folder Structure)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Phiên bản:** 1.0.0 — Production Readiness  
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
│   │   ├── Homepage.png
│   │   ├── Menu.png
│   │   ├── Room.png
│   │   ├── Book_Ticket.png
│   │   ├── Mobile_Waiter_POS.png
│   │   ├── Dashboard.png
│   │   └── Table_Map.png
│   ├── requirements/                     # Tài liệu yêu cầu chi tiết & quy tắc nghiệp vụ
│   ├── traceability/                     # Ma trận truy vết yêu cầu (RTM Matrix)
│   ├── 01-scope.md                       # Phạm vi dự án & Nỗi đau vận hành
│   ├── 02-features.md                    # Danh mục tính năng chi tiết
│   ├── 03-use-cases.md                   # 18 Ca sử dụng & Use Case Diagram
│   ├── 04-information-architecture.md    # Kiến trúc thông tin & Tuyến đường UI
│   ├── 05-data-model.md                  # Mô hình thực thể & Máy trạng thái bàn
│   ├── 06-acceptance-criteria.md         # Tiêu chí nghiệm thu (Given-When-Then)
│   ├── 07-folder-structure.md            # Tài liệu cấu trúc thư mục này
│   ├── 08-invest-requirements.md         # 18 User Stories chuẩn INVEST
│   ├── 09-step-7-readiness.md            # Kế hoạch bàn giao & Sẵn sàng triển khai
│   ├── DATABASE.md                       # Tài liệu cơ sở dữ liệu chi tiết
│   └── mindmap.png                       # Sơ đồ tư duy sản phẩm tổng quan
│
├── src/                                  # Mã nguồn chính thức của hệ thống
│   ├── frontend/                         # Cổng Web & Mobile App (React 18 + Vite)
│   │   ├── index.html                    # File HTML gốc
│   │   ├── package.json                  # Dependencies: react, react-dom, lucide-react
│   │   ├── vite.config.js                # Cấu hình máy chủ phát triển Vite
│   │   └── src/
│   │       ├── main.jsx                  # Điểm khởi chạy React DOM
│   │       ├── App.jsx                   # Component điều hướng chính
│   │       ├── index.css                 # Hệ thống Design Tokens & CSS toàn cục
│   │       ├── components/               # Các UI components tái sử dụng (Button, Modal, Card)
│   │       └── features/                 # Modular Domain Features:
│   │           ├── booking-portal/       # Trải nghiệm 1-Page cho khách hàng
│   │           ├── floor-map-2d/         # Sơ đồ mặt bằng kiến trúc 2D
│   │           ├── mobile-waiter-pos/    # POS di động 1 tay cho bồi bàn
│   │           ├── manager-dashboard/    # Dashboard KPI điều hành ca trực
│   │           └── cashier-billing/      # Quầy thu ngân & Bảng kê Pre-bill
│   │
│   ├── backend/                          # Máy chủ dịch vụ (Node.js 20 LTS + Express 4)
│   │   ├── server.js                     # Điểm khởi chạy HTTP Server (Cổng 5000)
│   │   ├── package.json                  # Dependencies: express, pg, jsonwebtoken, bcryptjs, cors
│   │   ├── .env.example                  # Mẫu biến môi trường (PORT, DATABASE_URL, JWT_SECRET)
│   │   └── src/
│   │       ├── app.js                    # Cấu hình Express app, Middleware & Routes
│   │       ├── controllers/              # Tầng điều hướng (Auth, Table, Order, Bill, Audit)
│   │       ├── services/                 # Tầng nghiệp vụ (State Engine, Deposit Engine, Billing)
│   │       ├── db/                       # Tầng kết nối CSDL (pg connection pool)
│   │       └── middleware/               # Xác thực JWT Bearer, Phân quyền RBAC, Error Handler
│   │
│   └── database/                         # Kịch bản cơ sở dữ liệu (PostgreSQL 16)
│       ├── schema.sql                    # Kịch bản DDL 11 bảng, ENUMs & Triggers kiểm toán
│       └── sample_data.sql               # Dữ liệu mẫu khởi tạo: phòng bàn, thực đơn, tài khoản
│
├── prototype/                            # Bản mẫu tương tác tĩnh (Rapid UX Prototyping)
│   ├── dashboard.html                    # Giao diện dashboard HTML tương tác cao
│   ├── dashboard.css                     # Bố cục CSS chuẩn mực theo từng tab
│   └── dashboard.js                      # Logic tương tác: chuyển tab, đổi kỳ doanh thu, sơ đồ bàn
│
├── .gitignore                            # Quy tắc loại trừ tệp nhạy cảm & prototype
└── Readme.md                             # Tài liệu tổng quan dự án cấp cao nhất
```

---

## 2. Quy Chuẩn Đặt Tên & Tổ Chức Mã Nguồn (Naming Conventions)

1. **Thư mục & Tệp tin:**
   * Tên thư mục: Chữ thường ngăn cách bằng dấu gạch ngang (`kebab-case`, ví dụ: `mobile-waiter-pos`, `cashier-billing`).
   * Tệp Component React: `PascalCase.jsx` (ví dụ: `TableFloorMap.jsx`, `ReservationTicket.jsx`).
   * Tệp Module Javascript/Helper: `camelCase.js` (ví dụ: `apiClient.js`, `formatCurrency.js`).
   * Tệp Kịch bản SQL: `snake_case.sql` (ví dụ: `schema.sql`, `sample_data.sql`).

2. **Kiến trúc Modular Domain:**
   Mỗi tính năng trong `src/frontend/src/features/` được đóng gói tự chủ gồm: component giao diện, hook quản lý trạng thái nội bộ và tệp gọi API chuyên biệt, tránh việc phụ thuộc chéo làm rối mã nguồn.
