-- =============================================================================
-- SMARTRESTAURANT — DATABASE SCHEMA (PostgreSQL)
-- Architecture: Role-based access, Audit triggers & Dynamic deposit policies
-- =============================================================================

-- 1. BẢNG PHÂN QUYỀN & TÀI KHOẢN (Authentication & RBAC)
CREATE TYPE user_role AS ENUM ('ADMIN', 'MANAGER', 'CASHIER', 'WAITER', 'CUSTOMER');

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'CUSTOMER',
    loyalty_points INT DEFAULT 0 CHECK (loyalty_points >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 2. BẢNG CHI NHÁNH & KHU VỰC / PHÒNG (Hierarchy: Branch -> Area -> Table)
CREATE TABLE branches (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE areas (
    id BIGSERIAL PRIMARY KEY,
    branch_id BIGINT NOT NULL REFERENCES branches(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL, -- 'Sảnh Chính', 'Sân Vườn Terrace', 'Phòng VIP Royal'
    is_vip BOOLEAN DEFAULT FALSE,
    surcharge_rate NUMERIC(5,2) DEFAULT 0.00, -- Phụ thu % nếu là phòng VIP (ví dụ: 10.00%)
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. BẢNG BÀN ĂN & MÁY TRẠNG THÁI (Table State Machine)
CREATE TYPE table_status AS ENUM ('AVAILABLE', 'RESERVED', 'OCCUPIED', 'DIRTY');

CREATE TABLE tables (
    id BIGSERIAL PRIMARY KEY,
    area_id BIGINT NOT NULL REFERENCES areas(id) ON DELETE CASCADE,
    table_number VARCHAR(20) NOT NULL, -- 'Bàn 01', 'Bàn VIP 01'
    capacity INT NOT NULL CHECK (capacity > 0),
    coord_x INT DEFAULT 0, -- Tọa độ vẽ sơ đồ 2D
    coord_y INT DEFAULT 0,
    status table_status DEFAULT 'AVAILABLE',
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(area_id, table_number)
);

-- 4. BẢNG THỰC ĐƠN & DANH MỤC (Menu & Pricing)
CREATE TABLE menu_categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    display_order INT DEFAULT 0
);

CREATE TABLE menu_items (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES menu_categories(id),
    name VARCHAR(150) NOT NULL,
    price NUMERIC(12,2) NOT NULL CHECK (price >= 0),
    cost_price NUMERIC(12,2) DEFAULT 0,
    unit VARCHAR(20) DEFAULT 'Phần',
    image_url TEXT,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    deleted_at TIMESTAMPTZ -- Soft delete
);

-- 5. BẢNG ĐẶT BÀN TRƯỚC (Customer Portal & Dispatch)
CREATE TYPE reservation_status AS ENUM ('PENDING', 'CONFIRMED', 'SEATED', 'CANCELLED');

CREATE TABLE reservations (
    id BIGSERIAL PRIMARY KEY,
    booking_code VARCHAR(20) UNIQUE NOT NULL, -- 'BK-8921'
    customer_id BIGINT REFERENCES users(id), -- NULL nếu là Guest Checkout
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(100),
    guest_count INT NOT NULL CHECK (guest_count > 0),
    area_id BIGINT REFERENCES areas(id),
    assigned_table_id BIGINT REFERENCES tables(id), -- Null khi PENDING, gắn khi CONFIRMED
    reservation_time TIMESTAMPTZ NOT NULL,
    deposit_amount NUMERIC(12,2) DEFAULT 0.00,
    status reservation_status DEFAULT 'PENDING',
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservation_preorders (
    id BIGSERIAL PRIMARY KEY,
    reservation_id BIGINT NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
    menu_item_id BIGINT NOT NULL REFERENCES menu_items(id),
    quantity INT NOT NULL CHECK (quantity > 0)
);

-- 6. BẢNG ORDER PHỤC VỤ TẠI BÀN (Floor Mobile POS)
CREATE TYPE order_status AS ENUM ('SERVING', 'PAID', 'CANCELLED');

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    table_id BIGINT NOT NULL REFERENCES tables(id),
    waiter_id BIGINT NOT NULL REFERENCES users(id),
    reservation_id BIGINT REFERENCES reservations(id),
    status order_status DEFAULT 'SERVING',
    opened_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    closed_at TIMESTAMPTZ
);

CREATE TYPE item_status AS ENUM ('WAITING', 'COOKING', 'SERVED', 'CANCELLED');

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id BIGINT NOT NULL REFERENCES menu_items(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(12,2) NOT NULL,
    taste_notes TEXT, -- 'Không hành', 'Ít cay'
    status item_status DEFAULT 'WAITING',
    cancel_reason TEXT,
    cancelled_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. BẢNG HÓA ĐƠN & THU NGÂN (Billing & Invoicing)
CREATE TABLE invoices (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT UNIQUE NOT NULL REFERENCES orders(id),
    cashier_id BIGINT NOT NULL REFERENCES users(id),
    subtotal_amount NUMERIC(12,2) NOT NULL,
    vip_surcharge NUMERIC(12,2) DEFAULT 0.00,
    deposit_deducted NUMERIC(12,2) DEFAULT 0.00,
    discount_amount NUMERIC(12,2) DEFAULT 0.00,
    tax_vat NUMERIC(12,2) DEFAULT 0.00,
    final_amount NUMERIC(12,2) NOT NULL,
    payment_method VARCHAR(50) DEFAULT 'CASH', -- 'CASH', 'CREDIT_CARD', 'VIETQR'
    paid_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. NHẬT KÝ KIỂM TOÁN CHỐNG GIAN LẬN (Anti-Fraud Audit Trail)
CREATE TABLE audit_logs (
    id BIGSERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id BIGINT NOT NULL,
    action_type VARCHAR(20) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
    performed_by BIGINT REFERENCES users(id),
    reason TEXT,
    old_data JSONB,
    new_data JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 9. POSTGRESQL TRIGGER: TỰ ĐỘNG GHI NHẬN HỦY MÓN
CREATE OR REPLACE FUNCTION audit_order_item_cancel()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.status <> 'CANCELLED' AND NEW.status = 'CANCELLED') THEN
        INSERT INTO audit_logs (table_name, record_id, action_type, performed_by, reason, old_data, new_data)
        VALUES (
            'order_items',
            NEW.id,
            'CANCEL_ITEM',
            NEW.cancelled_by,
            NEW.cancel_reason,
            row_to_json(OLD)::jsonb,
            row_to_json(NEW)::jsonb
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_cancel_item
AFTER UPDATE ON order_items
FOR EACH ROW EXECUTE FUNCTION audit_order_item_cancel();
