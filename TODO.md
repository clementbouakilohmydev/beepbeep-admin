# TODO — beeepbeep-admin

> Maj 2026-05-18 : grosse passe sur les KPIs (migration vers adminStats
> côté back), thread tickets persisté, export CSV users, fix du bug
> picture/avatar `.url` → `.uri`. Voir BACK_TODO.md pour le restant côté
> serveur.

## Restant

### Tickets

- [ ] Notifier le user (email + push) quand l'admin poste un message
      dans le thread (cf BACK_TODO #1)
- [ ] Pouvoir attacher une pièce jointe à un message (image / pdf)

### Documents

- [ ] Migrer `documents-page.tsx` vers une query `adminDocuments`
      paginée serveur (cf BACK_TODO #2) — actuellement tronqué aux
      200 derniers drivers
- [ ] Diff visuel entre un document fraîchement reuploadé et l'ancien
      (utile quand un driver renvoie une pièce après rejet)

### Utilisateurs

- [x] Export CSV (avec respect des filtres affichés) ✅ 2026-05-18
- [ ] Vue d'historique des actions admin sur un user (blocage,
      validation/rejet de doc) — nécessite un audit log côté back
- [ ] Pouvoir envoyer un email transactionnel custom depuis la fiche
      user (différent du ticket — par ex. relance documents manquants)

### Stores

- [ ] Téléchargements iOS / Android (cf BACK_TODO #3)

### Tech

- [ ] Code-splitting : le bundle dépasse 500 kB (recharts + react-router
      + tanstack-table). Split par route via React.lazy + Suspense.
- [ ] Multi-roles admin (support / analytics / ops / super-admin) —
      actuellement tout admin a tous les droits

---

## Fait ✅

### 2026-05-18 (passe KPIs + tickets thread)

- [x] Extension back `adminStats` : 7 queries agrégées (revenue, metrics,
      trends, daily, pending docs, drivers rating)
- [x] Dashboard, finance, performance, charts migrés vers adminStats
- [x] Suppression des fetchs client de 500-1000 rows + helpers
      `compute*(courses[])` devenus morts
- [x] Nouveau model Keystone `TicketMessage` (thread support persisté)
      + migration SQL + UI admin (`TicketThread` dans ticket-detail-sheet)
- [x] Bug `picture?.url`/`avatar?.url` → `.uri` (back expose `File.uri`)
- [x] Export CSV utilisateurs (filtres respectés, UTF-8 BOM pour Excel)
- [x] `typecheck` script fixé en `tsc -b` (sinon vide à cause des
      project references racine)

### Antérieur (cf git log)

Voir `git log --oneline --grep="feat\|fix"` pour le détail.
