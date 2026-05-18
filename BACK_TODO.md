# BACK_TODO — Endpoints / champs à ajouter cote Keystone 6

> Maj 2026-05-18 (passe 2) : tous les items dashboard / tickets sont
> traités côté back. Reste les items externes (stores) + monitoring.

## ✅ Fait — Agrégations dashboard (extension adminStats)

| Query GraphQL                               | Remplace / ajout                          |
| ------------------------------------------- | ----------------------------------------- |
| `adminRevenueStats(from, to)`               | calcul JS sum(price/fees) sur 500 courses |
| `adminCoursesMetrics(from, to)`             | avg distance/duration/price/acceptance JS |
| `adminCoursesTrend(days)`                   | groupByDay sur 1000 courses fetched       |
| `adminUsersTrend(days)`                     | groupByDay sur 1000 users fetched         |
| `adminTicketsTrend(days)`                   | groupByDay sur 1000 tickets fetched       |
| `adminDriversAverageRating`                 | avg(averageRate) sur tous drivers fetched |
| `adminPendingDocumentsCount`                | boucle JS sur 200 drivers + 4 docs chacun |
| `adminDailyAggregates(days)`                | per-day revenue/fees/basket/distance      |
| `adminDocuments(type?, state?, take, skip)` | flatten 4 doc tables paginé serveur       |

## ✅ Fait — Modèles & features back

- [x] `TicketMessage` (thread support persisté) + relation
      `Ticket.messages`
- [x] `AdminLog` (audit log append-only, 7 actions tracées)
- [x] Push `sendTicketReply` + wrapper notification + hook
      afterOperation sur TicketMessage
- [x] Email `sendTicketReply` (template Mailjet `ticket-reply` EJS)
      branché en parallèle du push
- [x] `TicketMessage.attachment` (relationship File) + reuse de la
      route REST `/ks/api/files` pour upload
- [x] `*.previousPicture` (4 doc models) + snapshot dans resolveInput
      quand re-upload post-rejet
- [x] Endpoint REST `/ks/api/health` (ping DB pour Uptime Robot)
- [x] Migrations SQL idempotentes (CREATE IF NOT EXISTS + DO blocks
      pour les FK) appliquées DB locale, prod via `start:deploy`

---

## Restant

### A. Téléchargements stores (impact moyen, effort élevé)

- [ ] **iOS** : App Store Connect API (clé p8 + issuer/key ID) →
      route back `/api/stats/downloads/ios`
- [ ] **Android** : Google Play Developer API (Service Account avec
      accès Play Console) → route back `/api/stats/downloads/android`
- UI front prête (cards "À configurer" dans finance-page).

### B. Multi-roles admin (effort moyen)

- [ ] Transformer `User.isAdmin: boolean` en enum `role`
      (support / analytics / ops / super_admin) OU ajouter
      `permissions: [String]`.
- [ ] Refactor `accesses.ts` : helpers `hasRole("support")` etc.
- [ ] Migration data : tous les `isAdmin: true` → `role: "super_admin"`.

### C. Monitoring & qualité (effort faible chacun)

- [ ] **Sentry** : DSN env var + wrapper `init` au boot Keystone.
- [ ] Push notif inverse : quand user répond dans son thread → push
      web admin (cf web push API + Service Worker côté admin).

### D. Mobile (post-V2)

- [ ] Push `expo-image-picker` → POST /ks/api/files → connect.id
      dans la mutation createTicketMessage (côté mobile, dans
      l'écran ticket detail).
- [ ] Tests Bruno : couvrir les nouvelles queries adminStats +
      adminDocuments + flow TicketMessage (currently bruno/ ne sait
      pas tester un user admin).

---

## Priorité suggérée

| #        | Item                       | Impact                      | Effort |
| -------- | -------------------------- | --------------------------- | ------ |
| C.Sentry | Monitoring d'erreurs prod  | **Haut** — invisible sinon  | S      |
| B        | Multi-roles admin          | **Haut** — risque ops sinon | M      |
| A        | Téléchargements stores     | Moyen — feature visible     | L      |
| D        | Mobile attachments / Bruno | Faible — confort            | M      |
