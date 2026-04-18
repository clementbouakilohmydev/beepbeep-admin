# Audit — beeepbeep-admin

> Date : 2026-04-18 (v4 — audit final production-ready)
> Build : 0 erreurs | Lint : 0 erreurs, 17 warnings (`!` assertions)
> Total : 95 fichiers TS/TSX | ~13 600 lignes

---

## 1. Stack

| Technologie | Version |
|---|---|
| React | 19.2.4 + React Compiler |
| TypeScript | 5.9.3 (`strict: true`) |
| Vite | 7.2.4 |
| TanStack React Query | 5.90.21 |
| React Router | 7.13.1 |
| TailwindCSS | 4.1.17 + shadcn/ui 4.0.0 |
| Recharts | via shadcn chart |
| ESLint | 9.39.1 (strict) + React Compiler + TanStack Query plugins |

---

## 2. Tout ce qui est propre

| Categorie | Detail |
|-----------|--------|
| **Build & Lint** | 0 erreurs build, 0 erreurs lint (strict), 17 warnings `!` |
| **React 19** | React Compiler actif, zero `useMemo`/`useCallback`/`useEffect`-derivation manuels |
| **TypeScript** | `strict: true`, `noUnusedLocals`, `noUnusedParameters`, parsers type-safe |
| **DRY** | `StatCard` partage, `groupByDay` partage, `statistics.ts`, `usePagedSearchParams` hook |
| **Constants** | `SESSION_TOKEN_KEY`, `PAGE_SIZE`, `LOCALE`, `CHART_DAYS`, `MAX_RATING`, `ORDER_BY_NEWEST`, `DOCUMENT_LABELS`, `DOCUMENT_TYPES`, parsers type-safe |
| **Architecture** | Organisation par feature, barrel global supprime, barrels par feature, `shared/` pour composants reutilisables |
| **Securite** | XSS sanitise, API_URL via env var, ErrorBoundary global, invalidation ciblee |
| **UX** | Loading (skeletons), empty states, error states avec retry, confirmation dialogs, toasts |
| **Responsive** | Mobile-first, sheets full-screen, tables overflow + colonnes cachees, grids adaptatifs, breakpoint aligne Tailwind |
| **Formatting** | `formatDate`, `formatCurrency`, `getUserDisplay` centralises dans `lib/format.ts` |
| **Tooling** | ESLint strict + React Compiler + TanStack Query plugins, Prettier + Tailwind, GraphQL Codegen |

---

## 3. Corrections appliquees (total)

| Ref | Correction |
|-----|------------|
| P01 | Barrel global `components/index.ts` supprime |
| P02 | `DOCUMENT_LABELS` / `DocumentType` centralises |
| P03 | Hook `usePagedSearchParams` extrait (DRY tickets + users) |
| P04 | Invalidation ciblee au login (`GetAuthenticatedItem`) |
| P09 | `useEffect` + `eslint-disable` supprimes, reset dans handlers |
| P10 | `user-detail-sheet.tsx` decoupe en 6 sous-composants |
| P11 | Logique metier extraite dans `lib/statistics.ts` |
| P12 | `useMemo`/`useCallback` supprimes (React Compiler) |
| P14 | Optimistic updates types avec `GetTicketsQuery`/`GetTicketQuery` |
| P15 | `ORDER_BY_NEWEST` centralise |
| P16 | Guard `json.data` dans le fetcher GraphQL |
| P17 | `ErrorBoundary` global avec fallback UI |
| P18 | Etats empty dans toutes les tables |
| P20 | `credentials: "include"` supprime |
| P21 | `@tanstack/eslint-plugin-query` installe |
| P22 | ESLint passe a `strict` |
| P23 | Dead code `api/send-email.ts` supprime + dossier `api/` |
| P24 | Images dupliquees `src/assets/` supprimees |
| P25 | Parsers type-safe sur tous les search params |
| P26 | API_URL via `import.meta.env.VITE_API_URL` |
| P27 | `next-themes` desinstalle |
| P28 | `PAGE_SIZE` centralise dans constants |
| P29 | `LOCALE` centralise + `formatCurrency` dans `lib/format.ts` |
| P30 | `ErrorState` component + etats error sur toutes les pages |
| P31 | Breakpoint mobile aligne sur 640px (Tailwind `sm:`) |
| — | `CHART_DAYS` centralise (plus de magic number 29) |
| — | `DOCUMENT_TYPES` utilise dans documents-page |
| — | `groupByDay` partage entre 3 charts |
| — | `StatCard` partage entre 4 pages |
| — | Faille XSS corrigee dans send-message-dialog |

---

## 4. Points restants (non bloquants)

### `as never` (3 occurrences) — limitation codegen

| Fichier | Ligne | Raison |
|---------|-------|--------|
| `src/hooks/use-update-document.ts` | 60, 63 | Les mutations codegen generent des types incomplets pour les variables |
| `src/components/providers/auth-provider.tsx` | 28 | `endSession` attend des types non correspondants |

**Impact** : nul en runtime (les valeurs sont correctes). Corrigeable en ajustant la config codegen (`inputMaybeValue` ou types wrapper).

### `!` non-null assertions (17 warnings)

Tous dans des contextes ou le `null` est deja filtre par une condition parente (ex: `user.drivingLicense` verifie avant `user.drivingLicense!.id`). Le strict ESLint les flag en `warn` — acceptable.

### Token localStorage (P19)

Le session token est dans `localStorage`. Migration vers cookies `httpOnly` depend du backend Keystone. Documente dans `BACK_TODO.md`.

### Mutation query keys (P06)

Les invalidations utilisent des strings (`["GetTickets"]`) au lieu des factories codegen. Fonctionne mais moins type-safe. Les factories sont disponibles via `exposeQueryKeys: true` dans le codegen.

---

## 5. Documentation du projet

| Fichier | Contenu | A jour |
|---------|---------|--------|
| `AUDIT.md` | Cet audit | :white_check_mark: |
| `BACK_TODO.md` | 15 items backend (aggregations, charts, revenus, telechargements) | :white_check_mark: |
| `TODO.md` | Checklist features (frontend done, backend pending) | :white_check_mark: |
| `.env` | `VITE_API_URL`, `RESEND_API_KEY`, email config | :white_check_mark: |
