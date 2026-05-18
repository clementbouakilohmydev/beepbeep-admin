# BACK_TODO — Endpoints / champs à ajouter cote Keystone 6

> Maj 2026-05-18 : la majorité des items ci-dessous a été migrée vers
> l'extension GraphQL `adminStats` (cf back/api/src/extensions/adminStats.ts).
> Le fichier liste désormais les items **restants** + un récap historique.

## ✅ Fait — Agrégations dashboard (extension adminStats)

Ces queries existent désormais côté back, admin-only (isAdmin guard) :

| Query GraphQL | Remplace |
|---|---|
| `adminRevenueStats(from, to)` | calcul JS sum(price/fees) sur 500 courses |
| `adminCoursesMetrics(from, to)` | avg distance/duration/price/acceptance JS |
| `adminCoursesTrend(days)` | groupByDay sur 1000 courses fetched |
| `adminUsersTrend(days)` | groupByDay sur 1000 users fetched |
| `adminDriversAverageRating` | avg(averageRate) sur tous drivers fetched |
| `adminPendingDocumentsCount` | boucle JS sur 200 drivers + 4 docs chacun |
| `adminDailyAggregates(days)` | per-day revenue/fees/basket/distance — sert 3 charts |

Front migrés : `dashboard-page.tsx`, `performance-page.tsx`, `finance-page.tsx`,
`courses-chart.tsx`, `registration-chart.tsx`, `courses-trend-chart.tsx`,
`revenue-chart.tsx`, `avg-basket-chart.tsx`, `avg-distance-chart.tsx`.

---

## Restant

### 1. Documents — liste paginée serveur

- **Actuel** : `DocumentsPage` (admin/src/pages/documents-page.tsx) fetche
  les 200 derniers drivers + flatten les 4 docs côté client. Filtres
  (`all/pending/processing/verified`) appliqués en JS.
- **Limite** : tronqué aux 200 derniers drivers (~800 docs max). Manque
  les drivers plus anciens si la base grossit.
- **Ideal** : nouvelle query `adminDocuments(state, take, skip)` côté
  back qui agrège DrivingLicense + Insurance + Certificate +
  RegistrationDocument avec leur user attaché, paginée et filtrée
  côté serveur. Probablement une union type GraphQL ou un type plat
  `AdminDocument { id, type, state, user, picture, createdAt }`.
- **Effort** : Moyen (M) — 1 extension + UI à recâbler côté admin.

### 2. Tickets — trend par jour

- **Actuel** : `tickets-trend-chart.tsx` consomme `useGetRecentTicketsQuery`
  → fetch 1000 tickets et groupByDay côté client. Volume tickets faible
  donc OK en l'état.
- **Ideal** : exposer `adminTicketsTrend(days)` dans adminStats. Trivial
  une fois le pattern d'adminCoursesTrend en place (généraliser sur
  n'importe quelle table avec un createdAt).
- **Effort** : Faible (S).

### 3. Téléchargements stores

- **iOS** : App Store Connect API (clé p8 + issuer/key ID) → route back
  `/api/stats/downloads/ios`
- **Android** : Google Play Developer API (Service Account avec accès
  Play Console) → route back `/api/stats/downloads/android`
- **UI** : `finance-page.tsx` a déjà 2 cards placeholder "À configurer".
- **Effort** : Élevé (L) — feature externe, dépendances API + secrets.

### 4. Notifications email côté admin pour les nouveaux TicketMessage

- **Actuel** : quand l'admin poste un message dans le thread d'un ticket
  (TicketMessage côté back), le user n'est pas notifié — il faut qu'il
  ouvre l'app pour le voir.
- **Ideal** : hook `afterOperation` sur TicketMessage qui envoie un
  email Mailjet au ticket.user.email quand `author.isAdmin == true`
  (et inversement, push notif au admin si user reply).
- **Effort** : Faible (S).

### 5. Notifications push mobile pour les TicketMessage

- Idem ci-dessus mais via Expo Push (cf services/push.ts). Le push type
  `ticket_message` devra être routé dans mobile/lib/notification-routing.ts
  pour ouvrir l'écran ticket correspondant.
- **Effort** : Faible-Moyen (S/M).

---

## Priorité suggérée

| # | Item | Impact | Effort |
|---|------|--------|--------|
| 1 | Notifs email/push sur TicketMessage | **Haut** — sans ça le thread reste invisible côté user | S/M |
| 2 | `adminDocuments` paginée serveur | Moyen — déverrouille la croissance > 200 drivers | M |
| 3 | `adminTicketsTrend` | Faible — cosmétique | S |
| 4 | Téléchargements iOS/Android | Moyen — feature visible mais 0 user impact métier | L |
