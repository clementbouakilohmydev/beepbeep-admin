# BACK_TODO — Endpoints / champs a ajouter cote Keystone 6

## Performance — Metriques agrégées

Actuellement, les metriques suivantes sont calculees **cote client** en fetchant jusqu'a 500/1000 courses. Cette approche ne scale pas et devrait etre migree vers des champs computed ou des routes custom cote backend.

### 1. Distance moyenne par course

- **Actuel** : fetch 500 courses completed, calcul `sum(distance) / count` cote client
- **Ideal** : champ computed `averageCourseDistance` ou route custom `GET /api/stats/courses`
- **Fichiers front concernes** : `src/components/performance/courses-metrics.tsx`, `src/pages/dashboard-page.tsx`

### 2. Temps moyen d'acceptation

- **Actuel** : fetch 500 courses, calcul `avg(startDatetimeUtc - createdAt)` cote client
- **Ideal** : champ computed `averageAcceptanceTime` (en secondes)
- **Fichiers front concernes** : `src/components/performance/courses-metrics.tsx`, `src/pages/dashboard-page.tsx`

### 3. Duree moyenne d'une course

- **Actuel** : fetch 500 courses, calcul `avg(duration)` cote client
- **Ideal** : champ computed `averageCourseDuration`
- **Fichiers front concernes** : `src/components/performance/courses-metrics.tsx`

### 4. Prix moyen d'une course

- **Actuel** : fetch 500 courses, calcul `avg(price)` cote client
- **Ideal** : champ computed `averageCoursePrice`
- **Fichiers front concernes** : `src/components/performance/courses-metrics.tsx`

### 5. Note moyenne conducteurs

- **Actuel** : fetch tous les conducteurs, calcul `avg(averageRate)` cote client
- **Ideal** : champ computed `averageDriverRating` ou route custom
- **Fichiers front concernes** : `src/pages/dashboard-page.tsx`

---

## Performance — Groupement temporel (charts)

### 6. Courses par jour (trend)

- **Actuel** : fetch 1000 courses recentes, groupement par jour cote client via `groupByDay()`
- **Ideal** : route custom `GET /api/stats/courses/trend?days=30` retournant `[{ date: "2026-04-18", count: 12 }, ...]`
- **Raison** : Keystone 6 n'expose pas de `groupBy` natif en GraphQL
- **Fichiers front concernes** : `src/components/performance/courses-trend-chart.tsx`, `src/components/dashboard/courses-chart.tsx`

### 7. Inscriptions par jour (trend)

- **Actuel** : fetch 1000 users recents, groupement par jour cote client
- **Ideal** : route custom `GET /api/stats/users/trend?days=30`
- **Fichiers front concernes** : `src/components/dashboard/registration-chart.tsx`

---

## Revenus (non implemente cote front)

### 8. Chiffre d'affaires (CA)

- **Besoin** : CA par jour / semaine / mois / annee
- **Schema actuel** : `Course.price` et `Course.fees` existent, `Payment` type existe mais pas d'aggregation
- **Ideal** : route custom `GET /api/stats/revenue` retournant `{ today, week, month, year, total }`
- **Blocage** : pas de champ agrege ni de route custom actuellement

### 9. Panier moyen

- **Besoin** : prix moyen d'une course (deja fait cote client en P4, mais idéalement serveur)
- **Ideal** : inclure dans la route revenue

---

## Documents — Comptage

### 10. Documents en attente (count)

- **Actuel** : fetch 200 conducteurs + boucle sur 4 types de documents cote client
- **Ideal** : query custom ou champ computed `pendingDocumentsCount`
- **Fichiers front concernes** : `src/pages/dashboard-page.tsx`

---

## Finances — Revenus & CA

### 11. CA agrege par periode

- **Actuel** : calcul cote client sur 500 courses completed (`sum(price)` filtre par date)
- **Limite** : ne couvre que les 500 dernieres courses, pas exhaustif
- **Ideal** : route custom `GET /api/stats/revenue` retournant `{ today, week, month, year, total }` en aggregeant `Course.price` sur toutes les courses completed
- **Fichiers front concernes** : `src/pages/finance-page.tsx`

### 12. Commissions agregees

- **Actuel** : calcul cote client `sum(fees)` sur 500 courses
- **Ideal** : inclure dans la route revenue `{ fees: { today, week, month, year, total } }`
- **Fichiers front concernes** : `src/pages/finance-page.tsx`

### 13. Panier moyen

- **Actuel** : calcul cote client `avg(price)` sur 500 courses completed
- **Ideal** : champ dans la route revenue `{ averageBasket }`
- **Fichiers front concernes** : `src/pages/finance-page.tsx`, `src/components/performance/courses-metrics.tsx`

---

## Externe — Telechargements app

### 14. Telechargements iOS (App Store Connect)

- **Besoin** : nombre de telechargements jour/semaine/mois/total
- **Solution** : integrer l'API App Store Connect (https://developer.apple.com/documentation/appstoreconnectapi)
  - Necessite : clé API App Store Connect (p8), issuer ID, key ID
  - Endpoint : `GET /v1/salesReports` ou Analytics Reports
  - A exposer via une route backend custom `GET /api/stats/downloads/ios`
- **Fichiers front concernes** : `src/pages/finance-page.tsx` (placeholder "A configurer" en place)

### 15. Telechargements Android (Google Play Console)

- **Besoin** : nombre de telechargements jour/semaine/mois/total
- **Solution** : integrer l'API Google Play Developer (https://developers.google.com/android-publisher)
  - Necessite : Service Account avec acces a la Play Console
  - Endpoint : Reports API (`GET /stats/installs`)
  - A exposer via une route backend custom `GET /api/stats/downloads/android`
- **Fichiers front concernes** : `src/pages/finance-page.tsx` (placeholder "A configurer" en place)

---

## Priorite suggeree

| # | Item | Impact | Effort |
|---|------|--------|--------|
| 11-12 | CA & commissions agreges | **Critique** — donnees financieres tronquees a 500 courses | Moyen |
| 6 | Courses trend (groupBy jour) | Haut — supprime le fetch de 1000 courses | Moyen |
| 7 | Users trend (groupBy jour) | Haut — supprime le fetch de 1000 users | Moyen |
| 1-4 | Metriques agregees courses | Moyen — supprime le fetch de 500 courses | Faible |
| 13 | Panier moyen serveur | Faible — deja calcule client-side | Faible |
| 5 | Note moyenne conducteurs | Faible — fetch leger | Faible |
| 10 | Documents pending count | Faible — fetch modere | Faible |
| 14-15 | Telechargements stores | Moyen — feature nouvelle, API externe | Eleve |
