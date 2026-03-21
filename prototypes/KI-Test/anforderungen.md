# Anforderungen: Website „Purple Noise"

## 1. Ziel der Website
Die Website dient als zentrale Online-Präsenz des Chors „Purple Noise“. Ziel ist es, Informationen bereitzustellen, neue Mitglieder zu gewinnen, Konzertbesucher zu informieren und eine einfache Kontaktaufnahme zu ermöglichen.

---

## 2. Technische Rahmenbedingungen
- Framework: Astro
- Styling: Tailwind CSS
- Architektur: Single Page Application (SPA)
- Responsives Design (Mobile First)
- Gute Performance (insbesondere Ladezeiten für Bilder)

---

## 3. Designanforderungen
### 3.1 Farbkonzept
- Primärfarben:
  - Schwarz
  - Lila
  - Gelb
- Einsatz:
  - Hintergrund: überwiegend schwarz/dunkel
  - Akzente: Lila
  - Call-to-Action / Highlights: Gelb

### 3.2 Typografie
- Moderne, gut lesbare Schriftarten
- Klare Hierarchie (Headlines, Subheadlines, Fließtext)

### 3.3 Layout
- Klare, minimalistische Struktur
- Große visuelle Elemente (Bilder)
- Weiche Übergänge zwischen Sektionen (Scrolling, Animationen)

---

## 4. Seitenstruktur (Single Page)

### 4.1 Hero-Bereich (Start)
- Vollbild-Fotokarussell
- Automatischer Bildwechsel
- Optionale manuelle Navigation (Dots / Pfeile)
- Overlay mit Titel „Purple Noise“ und ggf. kurzem Slogan

---

### 4.2 Navigationskonzept
- Position: oben rechts
- Element: Logo als klickbarer Button
- Verhalten:
  - Klick öffnet ein Dropdown-/Overlay-Menü
  - Menü enthält Links zu den einzelnen Sektionen
  - Sanftes Scrollen zu Zielsektionen

#### Menüpunkte:
- Start
- Konzerte
- Proben
- Kontakt

---

### 4.3 Abschnitt: Konzerte
- Liste kommender Konzerte
- Pro Konzert:
  - Datum
  - Ort
  - Beschreibung
- Optional:
  - Vergangene Konzerte (separater Bereich oder ausklappbar)

---

### 4.4 Abschnitt: Probetermine
- Übersicht regelmäßiger Proben
- Inhalte:
  - Wochentag / Uhrzeit
  - Ort
  - Hinweise für neue Mitglieder

---

### 4.5 Abschnitt: Kontakt
- Kontaktmöglichkeiten:
  - E-Mail
  - Optional: Telefonnummer
  - Optional: Social Media Links
- Kontaktformular (optional):
  - Name
  - E-Mail
  - Nachricht

---

## 5. Interaktion & UX
- Smooth Scrolling zwischen Sektionen
- Hover-Effekte für Buttons und Links
- Animierte Übergänge (z. B. Fade-In beim Scrollen)
- Mobile Navigation als Overlay-Menü

---

## 6. Performance & Optimierung
- Optimierte Bilder (z. B. WebP)
- Lazy Loading für Bilder im Karussell
- Minimierung von CSS/JS

---

## 7. Erweiterbarkeit
- Einfache Pflege der Konzertdaten (z. B. über JSON oder CMS)
- Modularer Aufbau der Komponenten (Astro Components)

---

## 8. Optionale Features
- Integration eines Event-Kalenders
- Newsletter-Anmeldung
- Audio-/Video-Integration (z. B. Choraufnahmen)

---

## 9. Abnahmekriterien
- Website ist vollständig responsiv
- Alle Navigationselemente funktionieren
- Alle Sektionen sind korrekt erreichbar
- Ladezeiten sind performant (< 3 Sekunden initial)
- Design entspricht Farb- und Layoutvorgaben

---

## 10. Offene Punkte
- Finale Inhalte (Texte, Bilder)
- Logo-Datei
- Hosting-Umgebung
- Domainname

