# SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động

SmartRestaurant là hệ thống đặt bàn linh hoạt và POS gọi món di động dành cho các nhà hàng hiện đại, giúp tinh gọn quy trình vận hành hàng ngày, tối ưu hóa công suất phục vụ và mang lại trải nghiệm ẩm thực vượt trội cho thực khách. Hệ thống tích hợp liền mạch giữa sơ đồ mặt bằng thời gian thực, cơ chế đặt bàn linh hoạt (Khách vãng lai & Hội viên tích điểm), bảng điều phối và xác nhận chỗ ngồi của quản lý, quy tắc đặt cọc thông minh cho nhóm đông/phòng VIP, gọi món cơ động trên smartphone kèm quyền hủy món nhanh cho nhân viên, hóa đơn đối soát cọc chống gian lận và cơ chế ghi log kiểm toán tự động trong cơ sở dữ liệu.

---

## 1. Yêu Cầu Nghiệp Vụ — Use Cases, INVEST Stories và Tiêu Chí Chấp Nhận (Acceptance Criteria)

Tập yêu cầu định nghĩa các mục tiêu SmartRestaurant cần đạt được, giá trị vận hành mang lại và các tiêu chí nghiệm thu có thể kiểm chứng được trong dịch vụ hàng ngày. Toàn bộ yêu cầu chức năng được cấu trúc thành các ca sử dụng (Use Cases), kiểm chứng theo tiêu chí INVEST và phân định ranh giới theo ma trận phân quyền dựa trên vai trò (RBAC).

### 1.1 Sơ Đồ Tư Duy Sản Phẩm (Product Mind Map)

![SmartRestaurant Mindmap](./docs/mindmap.png)

---

### 1.2 Ca Sử Dụng (Use Cases)

#### 1.2.1 Danh Mục Ca Sử Dụng (Use Case Catalog)

Phạm vi hệ thống được cụ thể hóa thành 18 ca sử dụng thuộc 8 miền chức năng, bám sát các nghiệp vụ thực tế trong nhà hàng:

| Mã UC | Tên Ca Sử Dụng | Miền Chức Năng | Tác Nhân Chính | Quy Tắc Vận Hành Trọng Yếu |
| :--- | :--- | :--- | :--- | :--- |
| **UC01** | Đăng nhập & Phiên làm việc | Xác thực & Phân quyền | Nhân viên & Khách hội viên | Hỗ trợ phân quyền nhân viên qua token và tài khoản hội viên tích điểm. |
| **UC02** | Đăng xuất & Kết thúc phiên | Xác thực & Phân quyền | Nhân viên & Khách hội viên | Xóa phiên làm việc phía client trên cả desktop, tablet và mobile. |
| **UC03** | Xem Sơ đồ bàn & Trạng thái sàn | Đặt bàn & Trạng thái sàn | Khách hàng, Phục vụ, Quản lý, Admin | Theo dõi trực tiếp 4 trạng thái màu (`AVAILABLE`, `RESERVED`, `OCCUPIED`, `DIRTY`). |
| **UC04** | Tìm kiếm & Gửi yêu cầu đặt bàn | Đặt bàn & Trạng thái sàn | Khách hàng (Vãng lai/Hội viên), Quản lý | Cho phép đặt nhanh không cần đăng nhập; giới hạn thời gian dùng bữa; cọc linh hoạt cho đoàn đông ($\ge 6$ người) hoặc phòng VIP. |
| **UC05** | Duyệt, Gán lại bàn & Hủy đặt bàn | Đặt bàn & Trạng thái sàn | Quản lý, Khách hàng | Quản lý kiểm tra và ghép/chuyển bàn để xếp chỗ đoàn đông trước khi xác nhận; khách có thể tự hủy theo chính sách hoàn cọc. |
| **UC06** | Gọi món qua Ứng dụng di động | POS Phục vụ di động | Nhân viên phục vụ | Tìm kiếm món chạm tối ưu, bộ tăng giảm số lượng và ghi chú gửi bếp (`Không hành`, `Ít cay`). |
| **UC07** | Chuyển bàn & Gộp bàn | POS Phục vụ di động | Quản lý, Admin | Điều chuyển đơn bàn đang ăn theo nhu cầu thay đổi chỗ ngồi của khách. |
| **UC08** | Hủy món kèm chính sách kiểm toán | POS Phục vụ di động | Bất kỳ nhân viên nào | **Hủy món linh hoạt:** Nhân viên có thể hủy món ngay; bắt buộc chọn lý do hủy và hệ thống tự động ghi nhật ký kiểm toán. |
| **UC09** | Xem trước Bảng kê thanh toán | Hóa đơn & Thu ngân | Thu ngân, Quản lý, Khách hàng | Bảng kê chi tiết gồm tiền món, phụ thu VIP, trừ tiền cọc đã trả, điểm tích lũy và thuế VAT. |
| **UC10** | Chốt thanh toán & In hóa đơn | Hóa đơn & Thu ngân | Thu ngân, Quản lý | Đóng phiên order, chuyển bàn sang trạng thái chờ dọn (`DIRTY`), cộng điểm hội viên và in hóa đơn nhiệt dạng PDF. |
| **UC11** | Quản lý Thực đơn & Danh mục | Quản lý Thực đơn & Giá | Quản lý, Admin | Phân loại danh mục, CRUD món ăn và hỗ trợ xóa mềm (*soft-delete*) để bảo toàn lịch sử hóa đơn. |
| **UC12** | Cập nhật Giá, Phụ thu VIP & Quy tắc cọc | Quản lý Thực đơn & Giá | Quản lý, Admin | Thiết lập giá món, tỷ lệ phụ thu phòng VIP, ngưỡng tiền cọc và bật/tắt trạng thái hết món tức thì. |
| **UC13** | Xem KPI Doanh thu & Đơn hàng ngày | Báo cáo & Phân tích | Quản lý, Admin | Dashboard ca trực thời gian thực: doanh thu gộp, số lượng khách phục vụ và số bàn đang hoạt động. |
| **UC14** | Xem Xu hướng Công suất & Doanh số | Báo cáo & Phân tích | Quản lý, Admin | Biểu đồ lịch sử theo ca/ngày/tháng, tốc độ xoay vòng bàn và hiệu suất sử dụng diện tích. |
| **UC15** | Xem Top Món ăn Bán chạy | Báo cáo & Phân tích | Quản lý, Admin | Xếp hạng số lượng bán ra giúp bếp chuẩn bị nguyên liệu và tối ưu nhập hàng. |
| **UC16** | Tự động Kích hoạt Ghi log Kiểm toán | Nhật ký Kiểm toán Hoạt động | Hệ thống (Trigger DB Tự động) | Trigger PostgreSQL tự động lưu lại các sự kiện nhạy cảm (hủy món, chuyển bàn, chỉnh sửa hóa đơn). |
| **UC17** | Tra cứu Nhật ký Kiểm toán Nhạy cảm | Nhật ký Kiểm toán Hoạt động | Quản lý, Admin | Màn hình tra cứu tuân thủ có bộ lọc: người thực hiện, thời gian, dữ liệu trước/sau và lý do thao tác. |
| **UC18** | Quản lý Tài khoản Nhân viên & Hồ sơ | Quản lý Người dùng | Admin (Toàn bộ), Nhân viên & Khách (Hồ sơ) | Vòng đời tài khoản nhân viên, gán quyền RBAC, quản lý hồ sơ tích điểm và đặt lại mật khẩu. |

#### 1.2.2 Sơ Đồ Ca Sử Dụng (Use Case Diagram)

```mermaid
flowchart TB
    subgraph roles["Tác Nhân (Actors)"]
        direction LR
        admin(["Quản trị viên (Admin)"])
        manager(["Quản lý / Thu ngân"])
        waiter(["Nhân viên phục vụ (Mobile POS)"])
        customer(["Khách hàng (Vãng lai / Hội viên)"])
    end

    subgraph system["SmartRestaurant — Ranh Giới Hệ Thống"]
        direction LR
        adminCases["<b>Quản trị viên (Admin)</b><br/><br/>UC01 Đăng nhập · UC02 Đăng xuất<br/>UC03 Xem Sơ đồ bàn thời gian thực<br/>UC11–12 Quản lý Menu, Giá bán & Quy tắc cọc<br/>UC05 Duyệt / Gán bàn / Hủy đơn đặt bàn<br/>UC07 Chuyển bàn / Gộp bàn<br/>UC08 Hủy món kèm lý do bắt buộc<br/>UC09 Xem trước Bill · UC10 Chốt thanh toán<br/>UC13–15 Xem Báo cáo KPI & Doanh thu<br/>UC16–17 Tra cứu Nhật ký kiểm toán nhạy cảm<br/>UC18 Quản trị tài khoản & phân quyền"]
        managerCases["<b>Quản lý Nhà hàng / Thu ngân</b><br/><br/>UC01 Đăng nhập · UC02 Đăng xuất<br/>UC03 Xem Sơ đồ bàn thời gian thực<br/>UC05 Duyệt / Gán bàn / Hủy đơn đặt bàn<br/>UC11–12 Quản lý Menu, Giá bán & Quy tắc cọc<br/>UC07 Chuyển bàn / Gộp bàn<br/>UC08 Hủy món kèm lý do bắt buộc<br/>UC09 Xem trước Bill · UC10 Chốt thanh toán<br/>UC13–15 Xem Báo cáo KPI & Doanh thu<br/>UC16–17 Tra cứu Nhật ký kiểm toán nhạy cảm<br/>UC18 Quản lý thông tin cá nhân"]
        waiterCases["<b>Nhân viên phục vụ (Mobile POS)</b><br/><br/>UC01 Đăng nhập · UC02 Đăng xuất<br/>UC03 Xem Trạng thái bàn trên sơ đồ sàn<br/>UC06 Mở bàn & Gọi món qua Mobile App<br/><b>UC08 Hủy bất kỳ món nào (Kèm lý do)</b><br/>UC18 Quản lý thông tin cá nhân"]
        customerCases["<b>Khách hàng (Vãng lai / Hội viên)</b><br/><br/>UC01 Đăng nhập Hội viên (Tùy chọn) · UC02 Đăng xuất<br/>UC03 Xem Bàn trống trên sơ đồ sàn<br/>UC04 Đặt bàn trực tuyến (Đặt cọc linh hoạt)<br/>UC05 Tra cứu đơn & Tự hủy đặt bàn (Theo quy tắc hoàn cọc)<br/>UC09 Xem Hóa đơn tạm tính & Điểm tích lũy"]
    end

    admin --> adminCases
    manager --> managerCases
    waiter --> waiterCases
    customer --> customerCases

    classDef actor fill:#666,color:#fff,stroke:#333
    classDef primary fill:#1168bd,color:#fff,stroke:#0b4f9e
    classDef standard fill:#3a7bd5,color:#fff,stroke:#245fa8
    class admin,manager,waiter,customer actor
    class adminCases,managerCases primary
    class waiterCases,customerCases standard
    style roles fill:#fff,stroke:#bbb,stroke-dasharray:5 5
    style system fill:#f8fbff,stroke:#1168bd,stroke-dasharray:5 5
```

---

### 1.3 Tiêu Chuẩn INVEST Cho Yêu Cầu Nghiệp Vụ

Tập backlog phiên bản V1 ánh xạ 18 ca sử dụng thành 18 User Stories sẵn sàng cho phát triển. Mỗi câu chuyện người dùng đều được thẩm định theo tiêu chí INVEST:

| Tiêu chí | Ý nghĩa trong hệ thống SmartRestaurant |
| :--- | :--- |
| **Independent (Độc lập)** | Mỗi User Story mang lại một năng lực nghiệp vụ riêng biệt, tránh phụ thuộc kỹ thuật chéo giữa các luồng vận hành khác nhau. |
| **Negotiable (Thương lượng được)** | Chi tiết cài đặt (giới hạn giờ ăn, cổng thanh toán cọc) có thể tinh chỉnh linh hoạt trong khi các quy tắc nghiệp vụ cốt lõi vẫn được giữ vững. |
| **Valuable (Có giá trị)** | Mang lại giá trị vận hành trực tiếp: xếp bàn nhanh cho khách vãng lai, giảm tình trạng khách bỏ hẹn (*no-show*), hủy món linh hoạt và ngăn chặn thất thoát gian lận. |
| **Estimable (Ước lượng được)** | Các vai trò, tham số đầu vào, trigger cơ sở dữ liệu, máy chuyển trạng thái và các kịch bản ngoại lệ đều được quy chuẩn hóa rõ ràng. |
| **Small (Đủ nhỏ)** | Mỗi Story gói gọn một khả năng chính, được chia nhỏ thành các tác vụ API, Cơ sở dữ liệu, Giao diện và Kiểm thử. |
| **Testable (Kiểm thử được)** | Mỗi Story đều có tiêu chí chấp nhận cụ thể (Acceptance Criteria), kiểm tra được tính hợp lệ dữ liệu, quyền truy cập và dữ liệu ghi log kiểm toán. |

```text
US01–US02   Xác thực tài khoản, phiên làm việc hội viên và kiểm soát truy cập
US03–US05   Đặt bàn linh hoạt, quản lý xếp/ghép bàn và hủy đặt bàn
US06–US08   POS phục vụ di động, chuyển/gộp bàn và nhân viên hủy món nhanh
US09–US10   Xuất hóa đơn, cấn trừ cọc, tích điểm thưởng và hoàn tất thanh toán
US11–US12   Quản lý thực đơn, phân loại danh mục và cấu hình quy tắc đặt cọc
US13–US15   Dashboard điều hành, phân tích công suất bàn và xu hướng bán hàng
US16–US17   Ghi nhận nhật ký kiểm toán và báo cáo chống gian lận
US18        Quản trị người dùng, phân quyền nhân viên và hồ sơ hội viên
```

Các tính năng nổi bật đã được định lượng rõ ràng:
* **Đặt bàn 2 chế độ:** Khách vãng lai đặt chỗ nhanh chỉ với thông tin liên hệ cơ bản; khách hội viên đăng nhập để tích lũy điểm sau khi thanh toán.
* **Điều phối & Xác nhận chỗ ngồi:** Đơn đặt bàn mới vào hệ thống ở trạng thái `PENDING`, giúp quản lý dễ dàng sắp xếp, gộp bàn cho các đoàn khách lớn trước khi chốt duyệt (`CONFIRMED`).
* **Quy tắc cọc & Hủy bàn:** Nhóm nhỏ ($\le 4$ khách) không cần cọc; nhóm đông hoặc đặt phòng VIP yêu cầu đặt cọc giữ chỗ, được cấn trừ toàn bộ vào hóa đơn hoặc hoàn lại nếu hủy trước hạn quy định.

---

### 1.4 Ma Trận Phân Quyền Theo Vai Trò (RBAC Matrix)

Hệ thống thiết lập ranh giới quyền hạn chặt chẽ giữa 4 vai trò người dùng, đảm bảo sự linh hoạt tối đa khi phục vụ khách mà vẫn bảo toàn tính toàn vẹn và minh bạch của dữ liệu:

| Khả Năng Nghiệp Vụ | Administrator | Quản lý / Thu ngân | Nhân viên phục vụ | Khách hàng (Vãng lai / Hội viên) |
| :--- | :---: | :---: | :---: | :---: |
| **Xem Thực đơn công khai** | Toàn quyền | Toàn quyền | Toàn quyền | Chỉ xem |
| **Gửi đơn Đặt bàn** | Toàn quyền | Toàn quyền | Bị chặn | Tự thực hiện (Vãng lai hoặc Đăng nhập) |
| **Duyệt / Ghép / Gán bàn đặt** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Hủy đơn đặt & Hoàn tiền cọc** | Toàn quyền | Duyệt & Xử lý vắng mặt | Bị chặn | Tự hủy (Trước hạn quy định) |
| **Xem Sơ đồ bàn thời gian thực** | Toàn quyền | Toàn quyền | Xem trạng thái bàn & dọn dẹp | Chỉ xem bàn trống khi đặt chỗ |
| **Mở bàn phục vụ tại chỗ** | Toàn quyền | Toàn quyền | Thực hiện qua Smartphone POS | Bị chặn |
| **Gọi thêm / Điều chỉnh món ăn** | Toàn quyền | Toàn quyền | Thao tác trên bàn đang ăn | Bị chặn |
| **Hủy món ăn đã gọi** | Toàn quyền (Cần lý do) | Toàn quyền (Cần lý do) | **Bất kỳ nhân viên nào (Cần lý do + Tự ghi log)** | Bị chặn |
| **Chuyển bàn / Gộp bàn ăn** | Toàn quyền | Toàn quyền | Bị chặn (Cần quyền Quản lý) | Bị chặn |
| **Xem trước Hóa đơn (Cấn trừ cọc)** | Toàn quyền | Toàn quyền | Bị chặn | Xem bảng kê của bàn mình |
| **Thanh toán & In hóa đơn nhiệt** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **CRUD Menu, Giá & Quy tắc cọc** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Tra cứu Nhật ký kiểm toán** | Toàn quyền | Toàn quyền | Bị chặn | Bị chặn |
| **Quản trị Tài khoản Nhân viên** | Toàn quyền | Bị chặn | Bị chặn | Xem thông tin & điểm của mình |

> **Chính sách bảo mật:** Mọi thao tác nhạy cảm có rủi ro thất thoát (hủy món ăn, chuyển bàn, hoàn cọc, giảm giá) đều kích hoạt cơ chế trigger tự động của PostgreSQL để lưu lại: Mã người thực hiện, thời gian chính xác, dữ liệu trước/sau và lý do nghiệp vụ bắt buộc.

---

## 2. Kiến Trúc Thông Tin & Thiết Kế Giao Diện UI/UX

Kiến trúc thông tin (Information Architecture - IA) của SmartRestaurant tổ chức trải nghiệm người dùng theo 3 phân hệ chuyên biệt: **Cổng Khách Hàng (Website 1-Page Đương Đại)**, **POS Di Động Phục Vụ (Smartphone 1 Tay)**, và **Bảng Điều Khiển Quản Lý & Thu Ngân (Desktop/Tablet Console)**.

---

### 2.1 Kiến Trúc Thông Tin (Sitemap & Luồng Trải Nghiệm 1-Page)

Phân hệ Khách hàng được thiết kế theo trải nghiệm **1-Page Cuộn Mượt Mà (Single-Page Smooth Scroll — Cảm hứng từ Khuê Restaurant)**, tích hợp toàn bộ hành trình ẩm thực từ Giới thiệu $\rightarrow$ Khám phá Thực đơn $\rightarrow$ Không gian phòng $\rightarrow$ Phiếu Đặt Bàn (Booking Ticket).

```mermaid
graph TD
    Root["Hệ Thống SmartRestaurant"]

    %% CỔNG KHÁCH HÀNG 1-PAGE
    subgraph CP["1. Cổng Khách Hàng (Website 1-Page Đương Đại)"]
        direction TB
        CP_Nav["Header Cố Định: Logo · Menu · Nút 'ĐẶT BÀN' (Cuộn nhanh)"]
        CP_Hero["1. Khởi Đầu & Giới Thiệu (Hero, Triết lý ẩm thực)"]
        CP_Menu["2. Thực Đơn Tinh Tuyển (Set Menu & À la carte)"]
        CP_Spaces["3. Không Gian Ẩm Thực (Sảnh chính, Sân vườn, Phòng VIP)"]
        CP_Ticket["4. Phiếu Đặt Bàn (Form tối giản gạch chân & Xuất vé PENDING)"]

        CP_Nav -.-> CP_Ticket
        CP_Hero --> CP_Menu --> CP_Spaces --> CP_Ticket
    end

    %% POS DI ĐỘNG PHỤC VỤ
    subgraph WP["2. Ứng Dụng POS Phục Vụ (Smartphone Web App)"]
        WP_Auth["Đăng nhập mã PIN nhân viên"]
        WP_Floor["Sơ đồ lưới bàn di động (Trạng thái màu thời gian thực)"]
        WP_Table["Phiếu gọi món bàn đang phục vụ"]
        WP_Thumb["Thao tác 1 tay: Tìm món, tăng giảm số lượng & ghi chú bếp"]
        WP_Cancel["Hủy món ăn linh hoạt (Chọn lý do bắt buộc + Tự ghi log kiểm toán)"]

        WP_Auth --> WP_Floor --> WP_Table --> WP_Thumb
        WP_Table --> WP_Cancel
    end

    %% BẢNG ĐIỀU KHIỂN QUẢN LÝ / THU NGÂN
    subgraph MD["3. Bảng Điều Khiển Quản Lý & Thu Ngân (Tablet / Desktop)"]
        MD_Auth["Đăng nhập Quản lý & Xác thực JWT"]
        MD_Kpi["Dashboard Ca trực thời gian thực (Doanh thu, Công suất bàn)"]
        MD_Floor["Sơ đồ mặt bằng 2D (Kéo thả bố trí bàn & Quản lý bàn dọn)"]
        MD_Dispatch["Điều phối Đặt bàn (Duyệt đơn PENDING, Gán/Ghép bàn)"]
        MD_Billing["Quầy Thu ngân (Pre-bill, Cấn trừ cọc, In hóa đơn nhiệt)"]
        MD_Audit["Bảng điều khiển Nhật ký kiểm toán chống gian lận"]

        MD_Auth --> MD_Kpi
        MD_Kpi --> MD_Floor
        MD_Kpi --> MD_Dispatch
        MD_Kpi --> MD_Billing
        MD_Kpi --> MD_Audit
    end

    Root --> CP
    Root --> WP
    Root --> MD
```

#### Bảng Ánh Xạ Tuyến Đường & Màn Hình Hệ Thống

| Định Danh View | Đường Dẫn Tuyến | Phân Hệ & Thiết Bị | Nhiệm Vụ Nghiệp Vụ Trọng Tâm |
| :--- | :--- | :--- | :--- |
| `VIEW-CP-01` | `/` *(Tất cả trong 1)* | Khách hàng (Web/Mobile) | Trang chủ trải nghiệm 1-page: Giới thiệu thương hiệu, Thực đơn, Không gian và Phiếu đặt bàn. |
| `VIEW-CP-02` | `/#menu` | Khách hàng (Web/Mobile) | Phần xem thực đơn theo phong cách Editorial Grid với khung viền và đường kẻ chỉ tinh tế. |
| `VIEW-CP-03` | `/#dat-ban` | Khách hàng (Web/Mobile) | Phiếu đặt bàn (Form gạch chân tối giản), tự động áp dụng quy tắc cọc cho đoàn $\ge 6$ người / phòng VIP. |
| `VIEW-WP-01` | `/pos/tables` | Phục vụ (Smartphone) | Lưới trạng thái bàn di động tối ưu chạm, hiển thị thời gian dùng bữa và bàn chờ dọn. |
| `VIEW-WP-02` | `/pos/order/:tableId` | Phục vụ (Smartphone) | Phiếu gọi món bàn đang ăn: thêm món, ghi chú gửi bếp, hủy món tức thì kèm lý do. |
| `VIEW-MD-01` | `/admin/dashboard` | Quản lý (Desktop/Tablet) | Báo cáo KPI điều hành: doanh thu trong ngày, tỷ lệ kín bàn, đơn chờ duyệt, món bán chạy. |
| `VIEW-MD-02` | `/admin/floor-map` | Quản lý (Desktop/Tablet) | Bản đồ không gian 2D: gộp bàn/chuyển bàn và ghi đè trạng thái. |
| `VIEW-MD-03` | `/admin/reservations`| Quản lý (Desktop/Tablet) | Bàn điều phối đặt bàn: duyệt các đơn `PENDING`, ghép bàn đón đoàn đông, xác nhận đơn. |
| `VIEW-MD-04` | `/admin/billing/:orderId`| Thu ngân (Desktop/Tablet)| Xem bảng kê tạm tính (Pre-bill), cấn trừ cọc, tích điểm hội viên, xuất hóa đơn nhiệt PDF. |
| `VIEW-MD-05` | `/admin/audit` | Quản lý (Desktop/Tablet) | Tra cứu nhật ký kiểm toán bất biến: theo dõi lịch sử hủy món, chuyển bàn, chiết khấu. |

---

### 2.2 Wireframes & Thiết Kế Giao Diện Trực Quan (UI Showcase)

Dưới đây là các bản thiết kế giao diện thực tế của hệ thống được lưu trữ trong thư mục `docs/`:

#### 1. Cổng Khách Hàng — Trang Chủ & Giới Thiệu (Hero Section)
Thiết kế thanh lịch với hình ảnh ruộng bậc thang cinematic, triết lý ẩm thực đương đại và nút bấm cuộn mượt xuống phiếu đặt bàn:
![Trang Chủ & Giới Thiệu](./docs/Homepage.png)

#### 2. Cổng Khách Hàng — Thực Đơn Tinh Tuyển (Editorial Menu Grid)
Bố cục thực đơn tối giản với đường kẻ mảnh phân cách, khung hình thanh tao và giá niêm yết theo set:
![Thực Đơn Tinh Tuyển](./docs/Menu.png)

#### 3. Cổng Khách Hàng — Không Gian Nhà Hàng (Dining Spaces)
Giới thiệu các không gian thưởng thức: Sảnh chính hoàng gia, Sân vườn terrace và Phòng tiệc VIP khép kín:
![Không Gian Phòng](./docs/Room.png)

#### 4. Cổng Khách Hàng — Phiếu Đặt Bàn (Reservation Ticket)
Form đặt bàn dạng đường gạch chân tối giản (Border-bottom minimal), dễ điền và tự động tính cọc cho đoàn đông:
![Phiếu Đặt Bàn Tại Đây](./docs/Book_Ticket.png)

#### 5. Phân Hệ Phục Vụ — POS Gọi Món Di Động (Mobile Waiter POS)
Thiết kế tối ưu cho điện thoại thông minh, thao tác 1 tay (Thumb-zone), hiển thị bàn đang ăn và quyền hủy món nhanh:
![Mobile Waiter POS](./docs/Mobile_Waiter_POS.png)

---

### 2.3 Các Luồng Tương Tác Cốt Lõi (Core Interaction Flows)

```mermaid
sequenceDiagram
    autonumber
    actor C as Khách hàng
    actor W as Nhân viên phục vụ
    actor M as Quản lý / Thu ngân
    participant UI as Giao diện Frontend
    participant API as Dịch vụ Backend
    participant DB as Cơ sở dữ liệu PostgreSQL

    Note over C,DB: Luồng 1: Đặt bàn 1-Page, Cọc & Điều phối xếp chỗ
    C->>UI: Điền Phiếu Đặt Bàn (Tên, SĐT, Ngày giờ, Đoàn 8 khách -> Yêu cầu cọc)
    C->>UI: Bấm "ĐẶT NGAY" -> Xuất phiếu đặt bàn
    UI->>API: POST /api/v1/reservations (Trạng thái: PENDING)
    API->>DB: Lưu đơn đặt bàn (PENDING) & sinh Mã đặt bàn BK-8921
    M->>UI: Mở Bảng điều phối đặt bàn -> Thấy đoàn 8 khách
    M->>UI: Ghép Bàn 03 + Bàn 04 -> Bấm "Xác nhận đặt bàn"
    UI->>API: PATCH /api/v1/reservations/BK-8921/confirm { assigned_tables: [3, 4] }
    API->>DB: Cập nhật trạng thái CONFIRMED & liên kết Bàn 3, 4
    API-->>UI: Thông báo xác nhận thành công tới Khách hàng (SMS/Email)

    Note over W,DB: Luồng 2: Gọi món qua Mobile POS & Nhân viên hủy món nhanh
    W->>UI: Chạm Bàn 05 -> Mở bàn phục vụ (Trạng thái -> OCCUPIED)
    W->>UI: Chọn Món + Ghi chú khẩu vị ("Ít cay") -> Gửi đơn xuống bếp
    UI->>API: POST /api/v1/orders/items
    API->>DB: Lưu các món ăn (Trạng thái: WAITING)
    Note over W,DB: Khách thay đổi ý định, muốn đổi món
    W->>UI: Bấm Hủy món Cá Hồi -> Chọn lý do ("Khách đổi ý")
    UI->>API: PATCH /api/v1/orders/items/45/cancel { reason: "Khách đổi ý" }
    API->>DB: Cập nhật trạng thái món -> CANCELLED
    DB-->>DB: PostgreSQL Trigger tự động kích hoạt -> Ghi bản ghi vào audit_logs
    API-->>UI: Xác nhận hủy món & tự động cập nhật lại tổng tiền tạm tính

    Note over M,DB: Luồng 3: Thanh toán, Cấn trừ cọc & Xuất hóa đơn
    M->>UI: Mở Bảng kê xem trước (Pre-bill) cho Bàn 3+4
    UI->>API: GET /api/v1/invoices/preview/order-12
    API->>DB: Tính toán: Tổng = Tiền món + Phụ thu VIP - Tiền cọc đã trả + 8% VAT
    API-->>UI: Trả về Bảng kê chi tiết
    M->>UI: Xác nhận hình thức thanh toán (Thẻ / Chuyển khoản QR / Tiền mặt)
    UI->>API: POST /api/v1/invoices/checkout
    API->>DB: Đóng đơn (PAID), Chuyển trạng thái bàn -> DIRTY
    API-->>UI: Xuất luồng file PDF hóa đơn nhiệt
    UI-->>M: In hóa đơn nhiệt & chuyển bàn sang hàng đợi dọn dẹp
```

---

### 2.4 Hệ Thống Thiết Kế & Quy Chuẩn Công Thái Học (UI Design & Ergonomics)

1. **Ngôn ngữ thiết kế tối giản (Minimalist Luxury Aesthetic):**
   * **Kiểu chữ:** Kết hợp giữa phông chữ có chân thanh lịch cổ điển (`Cormorant Garamond`, `Playfair Display`) cho tiêu đề và phông không chân sắc nét (`Plus Jakarta Sans`) cho nội dung và số liệu.
   * **Bảng màu:** Tông nền sáng kem trang nhã (`#FFFFFF` / `#FAF8F5`), tương phản cùng chữ đen than chì (`#1E1E1E`) và điểm xuyết sắc xanh olive / vàng đồng trầm (`#726B52`).
   * **Đường nét:** Đường kẻ chỉ mỏng nhẹ (`1px solid #E6E2DB`), loại bỏ các khối hộp viền dày cứng nhắc, tạo cảm giác nhẹ nhàng, tĩnh lặng.

2. **Nguyên lý công thái học theo từng thiết bị (Ergonomics by Form Factor):**
   * **Cổng Khách hàng (Desktop/Mobile Web):** Trải nghiệm 1-page liền mạch, không chuyển trang rườm rà. Nút đặt bàn ở đầu trang luôn sẵn sàng cuộn nhanh đến phiếu điền thông tin.
   * **POS Di động cho Phục vụ (Smartphone 1 tay):** Tối ưu hóa vùng ngón tay cái (Thumb-zone), các nút chọn danh mục và thao tác hủy món được bố trí ở nửa dưới màn hình để bồi bàn bấm nhanh khi đang di chuyển.
   * **Màn hình Quản lý & Thu ngân (Widescreen Tablet/Desktop):** Giao diện bảng điều khiển chia đôi (Split-screen) giúp vừa quan sát sơ đồ bàn 2D, vừa xử lý duyệt đơn đặt bàn `PENDING` và in hóa đơn thanh toán.