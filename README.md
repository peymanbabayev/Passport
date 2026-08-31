# 🪪 Pasport Reyestri (Passport Registry)

> **Şəxsiyyət və pasport məlumatlarının mərkəzləşdirilmiş, real-time qeydiyyatı və sürətli axtarış paneli.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-passport--reyster.vercel.app-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://passport-reyster.vercel.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase_Firestore-v9-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

---

## 🌐 Canlı Keçid (Live Preview)
Layihəni birbaşa brauzerdə sınaqdan keçirmək üçün daxil olun:  
👉 **[https://passport-reyster.vercel.app](https://passport-reyster.vercel.app/)**

---

## ✨ Əsas Xüsusiyyətlər

- 🌓 **İşıqlı və Tünd Mövzu (Theme Switcher)**: Göz yormayan dərin gecə mavisi və təravətli parlaq işıqlı rejim arasında tək kliklə keçid (seçim `localStorage`-də yadda saxlanılır).
- ⚡ **Real-time & 0ms Gecikmə (Optimistic Updates)**: Firestore `onSnapshot` canlı əlaqəsi sayəsində əlavə etmə, redaktə və silmə zamanı heç bir səhifə donması və ya təkrar yüklənmə (reload flicker) olmur.
- 📊 **Canlı Statistika Göstəriciləri (Dashboard KPI)**: Cəmi qeydiyyat, kişi və qadın pasportları üzrə real-time sayğac kartları.
- 🎨 **Dinamik Qradiyent Avatarlar**: Hər bir şəxsin adı və soyadına uyğun fərdiləşdirilmiş zövqlü rəngli avatarlar.
- 🔍 **Canlı Axtarış və Süzgəc**: Ad, soyad və ata adı üzrə anlıq axtarış, təmizləmə düyməsi (`✕`) və tapılan qeydlərin sayğacı.
- 📱 **Tam Responsiv Dizayn**: Həm geniş masaüstü ekranlar (1280px 2-sütunlu dashboard), həm də mobil cihazlar üçün adaptiv quruluş.

---

## 🛠 Texnologiyalar

- **Frontend**: React 18 (Create React App), Vanilla CSS (Müasir Design System, Glassmorphism, CSS Variables)
- **Şrift**: Google Fonts — Plus Jakarta Sans
- **Database & Backend**: Firebase Firestore (Modular v9 SDK)
- **Deployment**: Vercel
- **Testlər**: Jest & React Testing Library

---

## 🚀 Yerli Mühitdə Başlamaq (Local Setup)

1. **Repozitoriyanı klonlayın:**
   ```bash
   git clone https://github.com/peymanbabayev/Passport.git
   cd Passport
   ```

2. **Asılılıqları quraşdırın:**
   ```bash
   npm install
   ```

3. **Firebase `.env` faylını yaradın:**
   `.env.example` faylını `.env` adı ilə kopyalayın və Firebase açarlarınızı daxil edin:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. **Tətbiqi işə salın:**
   ```bash
   npm start
   ```
   Brauzerinizdə [http://localhost:3000](http://localhost:3000) ünvanına daxil olun.

---

## 📜 Skriptlər

| Əmr | Təsvir |
| --- | --- |
| `npm start` | Yerli inkişaf serverini işə salır (`localhost:3000`) |
| `npm test` | Vahid testləri icra edir |
| `npm run build` | İstehsal üçün optimallaşdırılmış `build/` qovluğunu yaradır |
| `npm run lint` | ESLint sintaksis və keyfiyyət yoxlamasını aparır |