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

Kiến trúc thông tin (Information Architecture - IA) tổ chức các tuyến điều hướng, phân cấp vận hành và luồng màn hình trên 3 môi trường tương tác độc lập: Cổng đặt bàn cho khách, Ứng dụng POS di động cho nhân viên phục vụ, và Bảng điều khiển quản lý tập trung cho quản lý/thu ngân.

### 2.1 Kiến Trúc Thông Tin (Sitemap & Phân Cấp Màn Hình)

```mermaid
graph TD
    Root["Hệ Thống SmartRestaurant"]

    %% CỔNG KHÁCH HÀNG
    subgraph CP["1. Cổng Khách Hàng (Web / Mobile Browser)"]
        CP_Home["Trang chủ & Không gian nhà hàng"]
        CP_Auth["Đăng nhập / Đăng ký Hội viên (Tùy chọn)"]
        CP_Menu["Thực đơn công khai<br/><i>Danh mục, Giá bán, Nhãn ăn kiêng</i>"]
        CP_Booking["Quy trình Đặt bàn"]
        CP_Slot["Chọn Ngày, Khung giờ & Số lượng khách<br/><i>Giới hạn thời gian dùng bữa</i>"]
        CP_Map["Chọn Khu vực mong muốn<br/><i>Phòng VIP, Sảnh chính, Sân vườn</i>"]
        CP_Deposit["Thanh toán Tiền cọc linh hoạt<br/><i>Áp dụng nhóm đông (>= 6 người) hoặc VIP</i>"]
        CP_Confirm["Xác nhận Đơn đặt bàn (Trạng thái: PENDING)"]
        CP_Lookup["Tra cứu Đơn & Tự hủy đặt bàn"]
        
        CP_Home --> CP_Auth
        CP_Home --> CP_Menu
        CP_Home --> CP_Booking
        CP_Booking --> CP_Slot --> CP_Map --> CP_Deposit --> CP_Confirm
        CP_Home --> CP_Lookup
    end

    %% POS DI ĐỘNG PHỤC VỤ
    subgraph WP["2. Ứng Dụng POS Phục Vụ (Smartphone Web App)"]
        WP_Auth["Đăng nhập mã PIN / Mật khẩu nhân viên"]
        WP_Floor["Sơ đồ lưới bàn di động<br/><i>Chỉ báo 4 màu trạng thái thời gian thực</i>"]
        WP_Table["Phiếu gọi món của bàn đang phục vụ"]
        WP_Catalog["Danh mục món & Tìm kiếm nhanh"]
        WP_ItemModal["Tăng giảm số lượng & Ghi chú khẩu vị gửi bếp"]
        WP_Cancel["Hủy món ăn linh hoạt<br/><i>Bắt buộc chọn lý do + Tự động ghi Log</i>"]
        WP_Actions["Điều phối tại bàn<br/><i>Chuyển bàn · Yêu cầu dọn dẹp</i>"]

        WP_Auth --> WP_Floor
        WP_Floor --> WP_Table
        WP_Table --> WP_Catalog --> WP_ItemModal
        WP_Table --> WP_Cancel
        WP_Table --> WP_Actions
    end

    %% BẢNG ĐIỀU KHIỂN QUẢN LÝ / THU NGÂN
    subgraph MD["3. Bảng Điều Khiển Quản Lý & Thu Ngân (Tablet / Desktop)"]
        MD_Auth["Đăng nhập Quản lý & Xác thực JWT"]
        MD_Kpi["Dashboard Ca trực thời gian thực<br/><i>Doanh thu, Tỷ lệ xoay bàn, Công suất lấp đầy</i>"]
        MD_Floor["Sơ đồ mặt bằng 2D trực quan<br/><i>Kéo thả bố trí bàn & Quản lý bàn chờ dọn</i>"]
        MD_Reservations["Điều phối Đặt bàn & Ghép chỗ<br/><i>Duyệt đơn PENDING, Gán bàn tối ưu, Chốt CONFIRMED</i>"]
        MD_Menu["Quản trị Menu, Phụ thu VIP & Quy tắc cọc"]
        MD_Checkout["Quầy Thu ngân & Thanh toán<br/><i>Pre-bill, Cấn trừ cọc, Điểm thưởng, In hóa đơn nhiệt PDF</i>"]
        MD_Audit["Bảng điều khiển Nhật ký kiểm toán chống gian lận"]
        MD_Users["Quản lý Tài khoản, Phân quyền & Hội viên"]

        MD_Auth --> MD_Kpi
        MD_Kpi --> MD_Floor
        MD_Kpi --> MD_Reservations
        MD_Kpi --> MD_Menu
        MD_Kpi --> MD_Checkout
        MD_Kpi --> MD_Audit
        MD_Kpi --> MD_Users
    end

    Root --> CP
    Root --> WP
    Root --> MD
```

#### Bảng Ánh Xạ Tuyến Đường & Màn Hình Hệ Thống

| Định Danh View | Đường Dẫn Tuyến | Vai Trò Hướng Đến | Nhiệm Vụ Nghiệp Vụ Trọng Tâm |
| :--- | :--- | :--- | :--- |
| `VIEW-CP-01` | `/` | Khách vãng lai | Giới thiệu nhà hàng, món ăn đặc trưng, lối vào đặt bàn và tra cứu. |
| `VIEW-CP-02` | `/menu` | Khách vãng lai | Xem toàn bộ thực đơn kèm bộ lọc danh mục và mô tả chi tiết món ăn. |
| `VIEW-CP-03` | `/reserve` | Khách vãng lai / Hội viên | Luồng đặt bàn từng bước (Đặt nhanh không cần tài khoản, chọn cọc nếu $\ge 6$ khách hoặc phòng VIP). |
| `VIEW-CP-04` | `/lookup` | Khách vãng lai / Hội viên | Tra cứu đơn bằng SĐT/Mã đơn kèm chức năng tự hủy và theo dõi hoàn cọc. |
| `VIEW-WP-01` | `/pos/tables` | Phục vụ bàn | Lưới danh sách bàn tối ưu cho điện thoại, hiển thị màu trạng thái và thời gian chờ dọn. |
| `VIEW-WP-02` | `/pos/order/:tableId` | Phục vụ bàn | Phiếu gọi món bàn đang ăn: thêm món, ghi chú gửi bếp, hủy món nhanh kèm lý do. |
| `VIEW-MD-01` | `/admin/dashboard` | Quản lý / Admin | Báo cáo KPI điều hành: doanh thu trong ngày, tỷ lệ kín bàn, món ăn bán chạy nhất. |
| `VIEW-MD-02` | `/admin/floor-map` | Quản lý / Admin | Quan sát mặt bằng không gian 2D, gộp bàn/chuyển bàn và ghi đè trạng thái. |
| `VIEW-MD-03` | `/admin/reservations`| Quản lý / Admin | Bàn điều phối đặt bàn: duyệt các đơn `PENDING`, ghép bàn đón đoàn đông, xác nhận đơn. |
| `VIEW-MD-04` | `/admin/menu` | Quản lý / Admin | Quản lý món ăn, bật tắt trạng thái hết món tức thì, cấu hình phụ thu VIP và ngưỡng cọc. |
| `VIEW-MD-05` | `/admin/billing/:orderId`| Thu ngân / Quản lý | Xem bảng kê tạm tính, cấn trừ cọc, áp dụng điểm hội viên, xuất hóa đơn nhiệt PDF. |
| `VIEW-MD-06` | `/admin/audit` | Quản lý / Admin | Tra cứu nhật ký kiểm toán bất biến: theo dõi lịch sử hủy món, chuyển bàn, chiết khấu. |

---

### 2.2 Các Luồng Tương Tác Cốt Lõi (Core Interaction Flows)

```mermaid
sequenceDiagram
    autonumber
    actor C as Khách hàng (Vãng lai/Hội viên)
    actor W as Nhân viên phục vụ
    actor M as Quản lý / Thu ngân
    participant UI as Giao diện Frontend
    participant API as Dịch vụ Backend
    participant DB as Cơ sở dữ liệu PostgreSQL

    Note over C,DB: Luồng 1: Đặt bàn linh hoạt, Thanh toán cọc & Điều phối xếp chỗ
    C->>UI: Chọn Ngày, Khu vực & Số lượng khách (Ví dụ: 8 người -> Yêu cầu cọc)
    alt Đặt nhanh (Guest Checkout)
        C->>UI: Nhập Tên, Số điện thoại và Ghi chú (Không cần mật khẩu)
    else Khách Hội viên
        C->>UI: Đăng nhập SĐT/Mật khẩu để tích điểm thưởng
    end
    C->>UI: Thanh toán tiền cọc (nếu áp dụng) & Gửi đơn đặt bàn
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

    Note over M,DB: Luồng 3: Thanh toán, Cấn trừ cọc & Tích lũy điểm hội viên
    M->>UI: Mở Bảng kê xem trước (Pre-bill) cho Bàn 3+4
    UI->>API: GET /api/v1/invoices/preview/order-12
    API->>DB: Tính toán: Tổng = Tiền món + Phụ thu VIP - Tiền cọc đã trả + 8% VAT
    API-->>UI: Trả về Bảng kê chi tiết
    M->>UI: Xác nhận hình thức thanh toán (Thẻ / Chuyển khoản QR / Tiền mặt)
    UI->>API: POST /api/v1/invoices/checkout
    API->>DB: Đóng đơn (PAID), Chuyển trạng thái bàn -> DIRTY, Cộng điểm thưởng hội viên
    API-->>UI: Xuất luồng file PDF hóa đơn nhiệt
    UI-->>M: In hóa đơn nhiệt & chuyển bàn sang hàng đợi dọn dẹp
```

---

### 2.3 Hệ Thống Thiết Kế Giao Diện & Quy Chuẩn Thẩm Mỹ (UI Design System)

Ngôn ngữ thị giác cân bằng giữa sự ấm cúng, sang trọng của không gian ẩm thực cao cấp và tốc độ thao tác chuẩn xác, nhanh chóng trong môi trường nhà hàng:

* **Typography (Kiểu chữ & Số liệu):** Sử dụng phông chữ không chân hiện đại, rõ nét (`Plus Jakarta Sans` hoặc `Inter`), kết hợp cùng định dạng số dạng bảng tính (`font-variant-numeric: tabular-nums`) giúp các cột số tiền, hóa đơn và thời gian luôn thẳng hàng, dễ đọc lướt.
* **Kiến trúc bề mặt & Tương phản ánh sáng:**
  * **Hỗ trợ Giao diện Tối (Dark Mode):** Nền than chì dịu mắt (`#0F172A` / `#1E293B`) dành cho nhân viên phục vụ trong không gian ẩm thực ánh sáng trầm, tránh gây lóa mắt khách và giảm mỏi mắt nhân viên.
  * **Giao diện Sáng mặc định (Light Mode):** Bề mặt tương phản sắc nét (`#FFFFFF` / `#F8FAFC`) với đổ bóng tinh tế dành cho quầy thu ngân và máy tính quản lý ban ngày.
* **Bộ Mã Màu Trạng Thái Bàn Thời Gian Thực (Semantic Table State):**

| Trạng Thái Bàn | Tên Màu | Mã Màu Hex | Ý Nghĩa Vận Hành Trên Sàn |
| :--- | :--- | :--- | :--- |
| **AVAILABLE** | Xanh Ngọc Bích | `#22C55E` | Bàn trống, đã dọn sạch và khử trùng; sẵn sàng đón khách vãng lai. |
| **RESERVED** | Vàng Hổ Phách | `#F59E0B` | Bàn đã có khách đặt trước sắp đến; khóa không nhận khách vãng lai. |
| **OCCUPIED** | Đỏ San Hô | `#EF4444` | Bàn đang có khách ăn; các món ăn đang được phục vụ hoặc chế biến. |
| **DIRTY / CLEANING**| Xám Tro | `#64748B` | Khách đã thanh toán xong; bàn đang chờ dọn dẹp trước khi chuyển lại bàn trống. |

---

### 2.4 Nguyên Lý Công Thái Học Theo Từng Thiết Bị (Ergonomics UX)

1. **Cổng Khách Hàng (Website Responsive trên Mobile & Desktop):**
   * **Trải nghiệm không rào cản:** Khách có thể hoàn tất đặt bàn chỉ trong 1 phút bằng Tên + SĐT mà không bị ép tạo tài khoản; chỉ khách muốn tích lũy điểm mới cần đăng nhập.
   * **Tự tra cứu tiện lợi:** Trang tra cứu giúp khách xem tiến độ duyệt đơn, kiểm tra bàn được xếp hoặc chủ động hủy đặt chỗ theo chính sách hoàn cọc tự động.

2. **Ứng Dụng POS Phục Vụ (Giao Diện Smartphone Thao Tác 1 Tay):**
   * **Linh hoạt tối đa:** Bất kỳ bồi bàn nào cũng có thể mở bàn, thêm món hoặc hủy món nhầm ngay lập tức thông qua các nút chọn lý do nhanh (*"Khách đổi ý"*, *"Bếp hết món"*, *"Bấm nhầm số lượng"*) mà không cần gọi quản lý, hệ thống tự động ghi nhật ký kiểm toán.
   * **Tối ưu vùng ngón cái (Thumb-Zone):** Tất cả các nút bấm có tần suất dùng cao nhất ("Thêm món", "Gửi vào bếp", "Hủy món") được bố trí nằm trọn ở **40% nửa dưới màn hình**.

3. **Màn Hình Quản Lý & Thu Ngân (Tablet / Desktop Màn Hình Rộng):**
   * **Bàn điều phối xếp chỗ trực quan:** Cho phép quản lý ghép bàn hoặc đổi chỗ linh hoạt trên bản đồ để sẵn sàng đón đoàn khách đông bất ngờ trước khi bấm duyệt đặt bàn.
   * **Giám sát chống thất thoát tự động:** Cho phép nhân viên chủ động thao tác để phục vụ khách nhanh nhất, nhưng mọi hành động đều được lưu vết kiểm toán bất biến (*Audit Trail*) vào cơ sở dữ liệu để đối soát cuối ca.