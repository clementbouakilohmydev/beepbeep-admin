# TODO — beeepbeep-admin

## Backend requis (API indisponible pour le moment)

### Courses — Vérification des états

- [ ] Vérifier les valeurs réelles de `state` des courses (`pending`, `in_progress`, `completed`, `cancelled`) quand l'API sera de nouveau opérationnelle
- [ ] Ajuster les filtres dans `GetCoursesCounts` (`src/gql/operations.ts`) si les valeurs diffèrent

### Courses — Métriques à migrer côté back

- [ ] **Distance moyenne par course** — Actuellement calculée côté client (fetch des 500 dernières courses). Créer une route custom / champ computed côté back (`src/gql/operations.ts`, `src/pages/dashboard-page.tsx`)
- [ ] **Temps moyen d'acceptation d'une course** — Idem, calculé côté client. Migrer vers une route back dédiée
- [ ] **Note moyenne des conducteurs** — Actuellement calculée côté client. Idéalement exposer un champ agrégé côté back (`src/pages/dashboard-page.tsx`)

### Revenus

- [ ] **CA** (jour / semaine / mois / année) — Nécessite une route back ou un champ agrégé sur les paiements
- [ ] **Panier moyen d'une course** — Idem, nécessite agrégation côté back

## Externe (hors scope back)

- [ ] **Nombre de téléchargements de l'app** — À récupérer via AppStoreConnect / Google Play Console (pas d'API interne)

## Fait ✅

### Dashboard

- [x] Cards tickets (à traiter / traités)
- [x] Cards utilisateurs inscriptions (jour / semaine / mois / total)
- [x] Cards passagers / conducteurs / note moyenne conducteurs
- [x] Card documents à valider (lien vers `/documents`)
- [x] Cards courses par statut (en cours / en attente / terminées / annulées)
- [x] Cards courses par période (jour / semaine / mois / année / total)
- [x] Distance moyenne par course (calcul client-side en attendant le back)
- [x] Temps moyen d'acceptation (calcul client-side en attendant le back)

### Utilisateurs

- [x] Page `/users` avec tableau, filtres (tous / passagers / conducteurs), recherche, pagination
- [x] Colonne "Documents" dans le tableau avec indicateur documents en attente pour les conducteurs
- [x] Page `/users/:id` — détail utilisateur complet (infos, avatar, véhicule, documents, avis)
- [x] Blocage / déblocage utilisateur avec confirmation
- [x] Validation / rejet des documents conducteur avec preview image
- [x] Sidebar : item "Utilisateurs"

### Documents

- [x] Page `/documents` — liste tous les documents conducteurs avec filtres par état
- [x] Actions : valider, rejeter, prévisualiser l'image
- [x] Sidebar : item "Documents"

### DRY / Refactoring

- [x] `getDateWheres()` extrait dans `src/lib/date.ts` (supprimé duplication dashboard / users)
- [x] `getDateBoundaries()` ajouté pour les courses (avec `yearISO`)
- [x] `UserStatusBadge` — composant réutilisable (supprimé duplication table / détail)
- [x] `useUpdateDocument` hook — factorise les 4 mutations documents identiques
- [x] Popover barrel export ajouté dans `src/components/ui/index.ts`

### Routing & Navigation

- [x] Routes : `/users`, `/users/:id`, `/documents`
- [x] Sidebar : Dashboard, Tickets, Utilisateurs, Documents
