CREATE TABLE IF NOT EXISTS sites (
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    address    TEXT,
    city       VARCHAR(100),
    status     VARCHAR(50)  NOT NULL DEFAULT 'active',
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

INSERT INTO sites (name, address, city, status)
SELECT 'Central Tower', '12 Abay Ave', 'Almaty', 'active'
WHERE NOT EXISTS (SELECT 1 FROM sites);
