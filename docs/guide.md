saya berencana membuat platform panggilin -> platform ini penyedia jasa seperti :
- jasa tukang
- jasa pungut sampah
- jasa kebersihan
- dll

konsepnya akan ada mitra dan pencari jasa.
-saya sudah mempunyai collection db nya cek disini ->
fitur :
- saya berencana akan menggunakan xendit juga untuk payment gateway nya.
- fitur realtime chat
- fitur pencarian, dll nanti akan diterapkan

Database :
- saya akan menggunakan supabase, saya sudah init project di supabase, 
- coba berikan saran struktur project yang scalable.

Strtur project :
panggilin-mobile/
├── app/                    # Expo Router directory
│   ├── (auth)/            # Auth group routes
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (start)/
│   │   └── index.tsx
│   │   └── _layout.tsx
│   ├── (app)/             # Main app group routes
│   │   ├── (customer)/    # Customer routes
│   │   │   ├── home.tsx
│   │   │   ├── search.tsx
│   │   │   ├── orders/
│   │   │   │   └── index.tsx
│   │   │   |   └── _layout.tsx
│   │   │   |   └── [id].tsx
│   │   │   └── _layout.tsx
│   │   │
│   │   ├── (mitra)/      # Mitra routes
│   │   │   ├── dashboard.tsx
│   │   │   ├── services/
│   │   │   └── _layout.tsx
│   │   │
│   │   └── _layout.tsx
│   │
│   ├── _layout.tsx        # Root layout
│   └── index.tsx          # Entry point
│
├── src/
│   ├── api/               # API integration
│   │   ├── supabase.ts
│   │   └── xendit.ts
│   │
│   ├── components/        # Shared components
│   │   ├── ui/           # UI components
│   │   └── features/     # Feature components
│   │
│   ├── hooks/            # Custom hooks
│   │   ├── useSupabase.ts
│   │   └── useAuth.ts
│   │
│   ├── providers/        # Context providers
│   │   ├── auth.tsx
│   │   └── supabase.tsx
│   │
│   └── utils/           # Utilities
│
├── assets/              # Static assets
└── config/             # Environment config