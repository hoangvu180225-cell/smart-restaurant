# Quy Tắc Nghiệp Vụ Cốt Lõi (Business Rules)

> **Dự án:** SmartRestaurant — Hệ Thống Quản Lý Đặt Bàn & POS Gọi Món Di Động  
> **Tài liệu:** Bảng Tổng Hợp Quy Tắc Nghiệp Vụ Vận Hành  

---

| Mã Quy Tắc | Tên Quy Tắc Nghiệp Vụ | Mô Tả & Công Thức Tính | Hành Động Khi Vi Phạm |
| :--- | :--- | :--- | :--- |
| **BR-01** | Quy tắc đặt cọc đoàn đông | Nhóm từ 6 khách trở lên hoặc đặt phòng tiệc VIP bắt buộc đặt cọc giữ chỗ $500.000\text{ ₫}$. | Trạng thái giữ ở `PENDING`, không gán bàn chính thức cho đến khi cọc được xác nhận. |
| **BR-02** | Khấu trừ 100% tiền cọc | Toàn bộ tiền cọc đã thu trước đó được trừ $100\%$ vào hóa đơn cuối cùng trước khi tính thuế. | Bảng kê Pre-bill tự động hiển thị dòng âm cấn trừ cọc (`- 500.000 ₫`). |
| **BR-03** | Hủy món linh hoạt có kiểm toán | Bất kỳ nhân viên phục vụ nào cũng có thể hủy món đang chờ nấu; bắt buộc chọn hoặc nhập lý do hủy. | Giao diện chặn gửi request nếu lý do hủy bị bỏ trống. PostgreSQL Trigger tự động ghi vết `audit_logs`. |
| **BR-04** | Phụ thu phòng VIP | Bàn thuộc khu vực phòng VIP áp dụng tỷ lệ phụ thu cố định (ví dụ $10\%$) trên tổng tiền món ăn. | Tự động tính vào dòng phụ thu phòng VIP trên bảng kê tạm tính và hóa đơn. |
| **BR-05** | Máy trạng thái bàn 4 màu | Bàn chỉ có thể chuyển đổi tuần tự: `AVAILABLE` $\rightarrow$ `RESERVED` $\rightarrow$ `OCCUPIED` $\rightarrow$ `DIRTY` $\rightarrow$ `AVAILABLE`. | Không cho phép mở bàn nếu bàn đang ở trạng thái `DIRTY` chưa dọn. |
