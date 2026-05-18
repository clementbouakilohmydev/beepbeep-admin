# TODO — beeepbeep-admin

> Maj 2026-05-18 (passe 2) : 12 items prioritaires de la liste 1/2/3/4/
> 7/8/9/10/11/14/16/17 traités en autonomie. Reste les items P5/6/12/
> 13/15 (multi-roles, push web admin, Sentry, tests E2E, downloads
> stores) listés en bas.

## Restant

### Auth / sécurité

- [ ] **Multi-roles admin** (#6) — actuellement tout admin a tous les
      droits. Ajouter un enum `role` (support/analytics/ops/super_admin)
      ou `permissions: [String]` sur User, refactorer accesses.ts.
- [ ] **Sentry / monitoring d'erreurs** (#15) — admin + mobile + back.
      Setup DSN env vars + wrapper d'erreurs.

### UX

- [ ] **Notifications push admin web** (#12) — quand un nouveau ticket
      arrive, push web → notif système. Web Push API + Service Worker.
- [ ] **Tests E2E Playwright** (#13) — au minimum smoke test
      "login → dashboard charge sans erreur".
- [ ] **Téléchargements iOS / Android** (#5) — App Store Connect API +
      Google Play Console API. Voir BACK_TODO.

### Mobile (V2)

- [ ] Pièces jointes côté user sur TicketMessage (mobile picker
      expo-image-picker → POST /ks/api/files → connect.id).
- [ ] Push notif quand le user répond dans son thread → admin web.

---

## Fait ✅

### 2026-05-18 (passe 2 — items 1/2/3/4/7/8/9/10/11/14/16/17)

- [x] **#1** Email Mailjet sur réponse ticket (template
      `emails/ticket-reply` + sendTicketReply email + wiring dans
      TicketMessage.afterOperation, push ET email en parallèle)
- [x] **#2** `adminDocuments(type?, state?, take, skip)` côté back +
      `documents-page` admin paginée serveur (suppression du fetch 200
      drivers + flatten JS, code mort `lib/documents.ts` supprimé)
- [x] **#3** Migration TicketMessage en prod : `start:deploy` script
      back applique auto au prochain rebuild (aucune action manuelle)
- [x] **#4** Écrans mobile `/dashboard/profile/tickets` (liste + thread
      détail + form reply) + lien profil + ticket_reply route mise à
      jour pour pointer vers /tickets/[id]
- [x] **#7** Code-splitting admin via React.lazy + Suspense (7 pages
      lourdes lazy-loaded, bundle main 1198 → 939 kB / -22%)
- [x] **#8** Audit log : nouveau model `AdminLog` + utilitaire
      `logAdminAction` + hooks afterOperation sur 4 documents + User
      (enabled toggle) + Ticket (solved toggle) + TicketMessage (admin
      reply). Append-only, lecture admin-only
- [x] **#9** Pièces jointes optionnelles sur TicketMessage (back:
      attachment field + migration; admin: upload helper + form picker + display image inline/PDF link)
- [x] **#10** Diff visuel docs : `previousPicture` snapshot sur les 4
      doc models quand re-upload post-rejet; preview modale admin en
      grille 2-cols (ancien rejeté vs nouveau en attente)
- [x] **#11** Email custom depuis fiche user : bouton "Envoyer un
      email" dans `user-sheet-header` qui réutilise `SendMessageDialog`
- [x] **#14** Polling 30s sur les KPIs dashboard mouvants (tickets
      counts, users counts, pending docs, courses counts, courses by
      period)
- [x] **#16** Pre-commit hook husky + lint-staged sur admin et mobile
      (eslint --fix + prettier sur admin, eslint --fix sur mobile)
- [x] **#17** Endpoint `/ks/api/health` non-auth qui ping la DB (200
      ok / 503 dégradé + uptime) pour Uptime Robot / sonde Docker

### 2026-05-18 (passe 1 — KPIs + tickets V1)

- [x] Extension back `adminStats` : 7 queries agrégées
- [x] Dashboard, finance, performance, charts migrés vers adminStats
- [x] Modèle `TicketMessage` + UI thread admin
- [x] Push notif `ticket_reply` au user
- [x] Bugs `picture/avatar?.url` → `.uri`
- [x] CSV export utilisateurs
- [x] `typecheck` script fixé (tsc -b)

### Antérieur

Voir git log pour le détail des passes V1 (dashboard, users, documents
basique, tickets V0 email-only).
