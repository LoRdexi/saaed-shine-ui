
# Saaed (ساعد) — Mobile-Styled Charity Web App

A right-to-left Arabic charity app prototype, designed to look and feel like a native mobile app inside any phone browser. Built with React + Tailwind, mock data only, simulated donations, and a live-updating transparency feed.

## Design language
- **Colors**: Navy `#064789` (primary), Navy secondary `#427aa1`, White `#ebf2fa` (background surfaces), Light Green `#A5be00` (accents/CTA highlights), Black `#555555`, Text gray `#888888`, Border `#edf1f5`. Mapped into the Tailwind design tokens as HSL semantic variables.
- **Font**: Alexandria (loaded from Google Fonts), full RTL layout, Arabic copy throughout.
- **Mobile-first frame**: Max-width phone container centered on desktop, full-bleed on mobile, with persistent bottom tab bar.

## Screens

### 1. Splash / Onboarding (entry)
- Saaed logo wordmark, short tagline ("نتبرع معًا، نساعد بثقة")
- Two CTAs: تسجيل الدخول / إنشاء حساب

### 2. Auth (تسجيل الدخول / إنشاء حساب)
- Tabbed login + signup (mock — any input proceeds)
- Phone or email + password fields, "متابعة كزائر" link

### 3. Home (الرئيسية)
- Greeting + user avatar
- Hero card: **التبرع للصندوق العام** with quick-amount chips (10, 50, 100, 500 ريال) and "تبرع الآن" button
- Stats row: إجمالي المتبرعين، إجمالي التبرعات، حالات تم دعمها
- "حالات عاجلة" horizontal carousel (3–4 featured cases)
- Shortcut to Cases and Transparency screens

### 4. Cases list (الحالات المحتاجة)
- Filter chips (الكل / طبية / تعليمية / أسرية / إغاثة)
- Vertical list of case cards: image, title, short description, progress bar (raised vs. goal), "تبرع" button
- Tapping a case opens a detail sheet with full story, gallery, progress, and donation amount selector → simulated success toast + confetti, then the donation appears in the transparency feed.

### 5. Transparency — Live feed (الشفافية)
- Stock-ticker style screen: header with a pulsing "مباشر" indicator and live counter (إجمالي التبرعات اليوم)
- Continuously updating list of recent donations: `اسم المتبرع (مُخفي/كامل) — المبلغ — اسم الحالة — منذ ثوانٍ`
- New entries animate in at the top (slide + subtle green flash), older ones shift down — feels like a live exchange board
- Auto-generated mock donations every 2–4 seconds + any donation the user makes is injected instantly
- Toggle: عرض الكل / تبرعاتي

### 6. Profile (الملف الشخصي)
- User info, سجل تبرعاتي, تسجيل الخروج

## Navigation
Bottom tab bar (RTL): الرئيسية · الحالات · الشفافية · حسابي. Auth and case-detail are stacked routes outside the tab bar.

## Mock data & state
- Seed list of ~8 cases with images, categories, goals, raised amounts
- In-memory store (Zustand or React context) for donations + live feed; a background interval simulates other users donating to make the transparency screen feel alive
- Donation flow updates: case progress, total stats on Home, and the live feed — everything stays in sync in real time

## Out of scope (this iteration)
Real authentication, real payments, persistent backend. Easy to add later via Lovable Cloud + Stripe.
