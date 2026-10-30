-- =============================================================================
-- SMARTRESTAURANT — SEED DATA (Mẫu dữ liệu khởi tạo)
-- =============================================================================

-- 1. TÀI KHOẢN MẪU (Mật khẩu mặc định: 'password123')
INSERT INTO users (username, password_hash, full_name, phone, role, loyalty_points) VALUES
('admin', '$2b$10$abcdefghijklmnopqrstuvw1234567890', 'Nguyễn Hoàng Admin', '0901000001', 'ADMIN', 0),
('manager1', '$2b$10$abcdefghijklmnopqrstuvw1234567890', 'Trần Văn Quản Lý', '0901000002', 'MANAGER', 0),
('cashier1', '$2b$10$abcdefghijklmnopqrstuvw1234567890', 'Lê Thị Thu Ngân', '0901000003', 'CASHIER', 0),
('waiter1', '$2b$10$abcdefghijklmnopqrstuvw1234567890', 'Phạm Minh Phục Vụ', '0901000004', 'WAITER', 0),
('customer1', '$2b$10$abcdefghijklmnopqrstuvw1234567890', 'Vũ Quốc Khách VIP', '0909999888', 'CUSTOMER', 250);

-- 2. CHI NHÁNH & KHU VỰC
INSERT INTO branches (name, address, phone) VALUES
('SmartRestaurant — Chi Nhánh Q.1 Flagship', '128 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM', '1900888999');

INSERT INTO areas (branch_id, name, is_vip, surcharge_rate) VALUES
(1, 'Sảnh Chính Hoàng Gia', FALSE, 0.00),
(1, 'Sân Vườn Terrace Ngoài Trời', FALSE, 0.00),
(1, 'Phòng Tiệc VIP Royal Cellar', TRUE, 10.00);

-- 3. BÀN ĂN & TỌA ĐỘ 2D
INSERT INTO tables (area_id, table_number, capacity, coord_x, coord_y, status) VALUES
-- Sảnh chính
(1, 'Bàn 01', 2, 50, 100, 'AVAILABLE'),
(1, 'Bàn 02', 2, 150, 100, 'AVAILABLE'),
(1, 'Bàn 03', 4, 250, 100, 'OCCUPIED'),
(1, 'Bàn 04', 4, 350, 100, 'OCCUPIED'),
(1, 'Bàn 05', 6, 100, 250, 'RESERVED'),
(1, 'Bàn 06', 8, 250, 250, 'DIRTY'),

-- Sân vườn
(2, 'Bàn Vườn 01', 4, 50, 100, 'AVAILABLE'),
(2, 'Bàn Vườn 02', 4, 150, 100, 'AVAILABLE'),
(2, 'Bàn Vườn 03', 6, 250, 100, 'AVAILABLE'),

-- Phòng VIP
(3, 'VIP Room A (Royal)', 12, 100, 100, 'RESERVED'),
(3, 'VIP Room B (Cellar)', 8, 300, 100, 'AVAILABLE');

-- 4. DANH MỤC THỰC ĐƠN
INSERT INTO menu_categories (name, display_order) VALUES
('Set Menu Trứ Danh', 1),
('Món Khai Vị', 2),
('Món Chính Đương Đại', 3),
('Hầm Rượu Vang & Đồ Uống', 4);

-- 5. MÓN ĂN
INSERT INTO menu_items (category_id, name, price, cost_price, unit, description) VALUES
(1, 'Khởi Set Menu (Cá chẽm sốt khế & Vị đồng quê)', 790000, 320000, 'Khách', 'Set menu 5 món tinh tế lấy cảm hứng từ mùa vụ đồng bằng.'),
(1, 'Giao Set Menu (Bò Wagyu Úc nướng than hồng)', 950000, 410000, 'Khách', 'Bò Wagyu kết hợp gia vị rừng Tây Bắc và sốt nấm Truffle đen.'),
(1, 'Thịnh Set Menu (Tôm hùm Alaska & Bào ngư)', 1250000, 550000, 'Khách', 'Đại tiệc hải vị đỉnh cao dành cho các buổi tiệc trọng đại.'),
(2, 'Gỏi Ngó Sen Tai Heo Giòn', 185000, 60000, 'Đĩa', 'Ngó sen tươi giòn, rau thơm làng Trà Quế và nước mắm chua ngọt.'),
(3, 'Thăn Bò Wagyu Úc Truffle', 1250000, 600000, 'Phần', '250g Wagyu thượng hạng nướng chín vừa ăn kèm măng tây tươi.'),
(3, 'Tôm Hùm Alaska Đút Lò Phô Mai Pháp', 980000, 450000, 'Con', 'Tôm tươi nướng lò với phô mai Gruyère béo ngậy.'),
(4, 'Château Margaux Grand Cru 2018', 2450000, 1600000, 'Chai', 'Vang đỏ Bordeaux hảo hạng, hương hoa mọng và gỗ sồi.'),
(4, 'Sommelier Wine Pairing (4 Glasses)', 650000, 280000, 'Set', 'Tuyển tập 4 ly rượu vang phối hợp đồng điệu với từng món.');
