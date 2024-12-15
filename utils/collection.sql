-- Tabel users: menyimpan data pengguna, mitra, dan admin
CREATE TABLE users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'mitra', 'pengguna')) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel categories: kategori jasa
CREATE TABLE categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel services: daftar jasa yang ditawarkan oleh mitra
CREATE TABLE services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price_min DECIMAL(10, 2) NOT NULL,
    price_max DECIMAL(10, 2) NOT NULL,
    category_id UUID REFERENCES categories (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel mitra_profiles: profil mitra
CREATE TABLE mitra_profiles (
    id UUID PRIMARY KEY REFERENCES users (id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(15) UNIQUE,
    address TEXT,
    rating DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel mitra_services: hubungan banyak-ke-banyak antara mitra dan jasa
CREATE TABLE mitra_services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mitra_id UUID REFERENCES mitra_profiles (id) ON DELETE CASCADE,
    service_id UUID REFERENCES services (id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    custom_price DECIMAL(10, 2), -- Harga khusus yang ditetapkan mitra
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (mitra_id, service_id) -- Setiap kombinasi mitra dan jasa harus unik
);

-- Tabel orders: data permintaan jasa oleh pengguna
CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users (id) ON DELETE CASCADE,
    service_id UUID REFERENCES services (id) ON DELETE CASCADE,
    mitra_id UUID REFERENCES mitra_profiles (id) ON DELETE SET NULL,
    status VARCHAR(20) CHECK (status IN ('requested', 'in_progress', 'completed', 'cancelled')) NOT NULL DEFAULT 'requested',
    scheduled_at TIMESTAMP NOT NULL,
    total_price DECIMAL(10, 2),
    payment_status VARCHAR(20) CHECK (payment_status IN ('pending', 'paid', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabel payments: pelacakan pembayaran
CREATE TABLE payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_date TIMESTAMP,
    status VARCHAR(20) CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabel reviews: ulasan dari pengguna untuk mitra
CREATE TABLE reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabel activity_logs: log aktivitas untuk auditing
CREATE TABLE activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users (id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Menambahkan beberapa indeks untuk optimasi
CREATE INDEX idx_users_role ON users (role);
CREATE INDEX idx_categories_name ON categories (name);
CREATE INDEX idx_services_category_id ON services (category_id);
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_payment_status ON orders (payment_status);
CREATE INDEX idx_reviews_order_id ON reviews (order_id);
CREATE INDEX idx_activity_logs_user_id ON activity_logs (user_id);
CREATE INDEX idx_mitra_services_mitra_id ON mitra_services (mitra_id);
CREATE INDEX idx_mitra_services_service_id ON mitra_services (service_id);
