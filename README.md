# Pasport reyestri

Şəxs məlumatlarını (ad, soyad, ata adı, doğum tarixi, cins) qeydə almaq üçün
React + Firebase Firestore tətbiqi.

## Texnologiyalar

- React 18 (Create React App)
- Firebase Firestore (`firebase` v9 modular SDK)
- Bulma (CSS)
- Jest + Testing Library

## Skriptlər

| Əmr | Təsvir |
| --- | --- |
| `npm start` | Dev server (http://localhost:3000) |
| `npm test` | Testləri watch rejimində işə salır |
| `npm run build` | `build/` qovluğuna production build |
| `npm run lint` | ESLint yoxlaması |

## Struktur

```
src/
  api/persons.js         Firestore CRUD əməliyyatları
  hooks/usePersons.js     Məlumat yükləmə + mutasiya hook-u
  lib/firebase.js         Firebase inisializasiyası (.env-dən)
  constants/person.js     Person modeli, sahələr, cins seçimləri
  utils/filterPersons.js  Axtarış süzgəci (+ test)
  components/
    PassportForm.js       Yaratma/redaktə üçün ortaq form (validasiya ilə)
    PassportCreator.js    Yeni pasport bloku
    PassportSearch.js     Axtarış sahəsi
    PassportList.js       Siyahı + loading/error/boş vəziyyətlər
    PassportShow.js       Bir kart: göstər / redaktə et / sil
  App.js                  Kompozisiya + axtarış state-i