# 📱 Cenol App – Aplikacja Mobilna dla Platformy Ogłoszeniowej

**Oficjalna aplikacja mobilna dla Cenol.pl** – centrum ogłoszeń lokalnych.

Projekt to natywna aplikacja na Androida i iOS zbudowana w **React Native + Expo**, która opakowuje responsywną stronę internetową w wygodny, szybki i funkcjonalny wrapper.

---

## 🎯 O projekcie

Cenol to platforma ogłoszeniowa typu „ogłoszenia lokalne”. Aplikacja mobilna zapewnia użytkownikom lepsze doświadczenie niż zwykła przeglądarka – szybsze ładowanie, powiadomienia systemowe, obsługa przycisku „wstecz”, splash screen oraz automatyczne wykrywanie braku internetu.

Projekt pokazuje praktyczne zastosowanie **WebView** w aplikacjach produkcyjnych oraz umiejętność budowania solidnych wrapperów mobilnych.

**Link do strony:** [https://cenol.pl](https://cenol.pl)

---

## ✨ Główne funkcjonalności

- **WebView zoptymalizowany** pod stronę cenol.pl
- **Splash Screen** z logo (3-sekundowy)
- **Obsługa przycisku wstecz** (hardware back button)
- **Wykrywanie braku połączenia internetowego** z alertem i opcją ponownego załadowania
- **Loader podczas ładowania strony**
- **Automatyczne zarządzanie stanem nawigacji**
- **Przygotowanie pod publikację** w Google Play i App Store (EAS Build)

---

## 🛠 Technologie

| Technologia                    | Zastosowanie                              |
|-------------------------------|-------------------------------------------|
| **Framework**                 | React Native + Expo (~53)                |
| **WebView**                   | react-native-webview                     |
| **Nawigacja / Back Button**   | React Native BackHandler                 |
| **Stan sieci**                | @react-native-community/netinfo          |
| **Safe Area**                 | react-native-safe-area-context           |
| **Build & Deployment**        | EAS (Expo Application Services)          |
| **Język**                     | JavaScript                               |

---

## 📸 Kluczowe ekrany

- Splash Screen z logo Cenol
- Główny WebView z pełną stroną cenol.pl
- Ekran błędu braku internetu z przyciskiem „Spróbuj ponownie”

---

## 🚀 Jak uruchomić lokalnie

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/Gho2st/cenol-app.git
cd cenol-app

# 2. Zainstaluj zależności
npm install

# 3. Uruchom aplikację
npm start
# lub
expo start
