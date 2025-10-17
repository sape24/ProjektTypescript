# Praktisk Laboration (Projektuppgift)

## Bedömning
Jag har fokuserat på grundkraven i detta projekt.

## Beskrivning
En webbapplikation skapad i Angular som hämtar mittuniversitetets kurser från en JSON-fil och presenterar den i tabellformat.
Applikationen består av två undersidor en för att visa kurser och en för ramschemat.

Applikationen gör det möjligt för användaren att:
- Visa kurskod, kursnamn, poäng, ämne och kursplan
- Sortera kolumner med hjälp av klick
- Söka/filtrera kurser som uppdateras automatiskt via sökfunktion
- Filtrering med hjälp av en selectbox för ämnen
- Lägga till kurser i ramschemat med hjälp av localstorage
- Förhindra dubletter i ramschemat
- Ta bort kurser ur ramschemat
- Visa totalt antal kurser och total mängd poäng i ramschemat

---

## Tekniker
- **TypeScript**
- **Angular**
- **Signals och computed**
- **HttpClient**
- **Observable**
- **CSS**
- **HTML**
- **LocalStorage**
- **Angular Material**

---

## Konstruktion av lösningen

### 1. **Service**
- `CourseData` 
    Hämtar kursdata från miun_courses.json med HttpClient
    Returnerar ett `Observable<Course[]>` till komponenten
- `Ramschema`
    Hanterar localStorage lagringen av användarens valda kurser
    Innehåller metoder för att lägga till, ta bort och läsa sparade kurser.

---

### 2. **Model**
- `Courses` interfacet definierar struktur för kursdata:
    - `courseCode`
    - `subjectCode`
    - `level`
    - `progression`
    - `courseName`
    - `points`
    - `institutionCode`
    - `subject`
    - `syllabus`

---

### 3. **Komponenter**
- `CourseList` komponenten ansvarar för att:
    - Visar kurslistan i tabellformat
    - Innehåller sökfält, sortering, filtrera ämnen och knapp för att lägga till kurser i ramschema
    - Data hanteras med signal() och computed() för automatisk uppdatering

- `RamschemaComponent` komponenten ansvarar för att:
    - Visar användarens valda kurser
    - Räknar ut totala högskolepoäng med computed()
    - Låter användaren ta bort kurser vilket uppdateras i localstorage direkt

- `Header` komponenten ansvarar för att:
    - Navigationskomponent med meny för desktop och mobil.
---

### 4. **Tabeller och funktionalitet**

- Kurser visas i tabellform och kan sorteras genom klick på kolumn rubriker
- Sökfältet filtrerar result beroende på sökinput
- Select fältet visar endast kurser inom valt ämne
- Antalet filtrerade kurser visas dynamiskt
- I ramschemat visas både antal valda kurser och totala antal poäng
