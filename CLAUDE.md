# admin — Dashboard d'administration

> Repo GitLab : `custom-admin`

> Repo GitLab : `custom-admin`

Dashboard interne BeepBeepCity (gestion users, drivers, tickets, documents, finance, performance). Voir `../CLAUDE.md` pour le contexte global du monorepo.

## Stack

- **Vite 6** + **React 19.2** + **TypeScript 5.9** (strict, React Compiler activé)
- **shadcn/ui** + **Tailwind CSS 4.1** (config CSS, pas JS)
- **TanStack Query 5.90** + **React Router 7.13**
- **GraphQL** : `@graphql-codegen` + fetch natif (client custom, pas de lib type Apollo/urql)
- **Deploy** : Vercel
- **Pkg manager** : npm

## Commandes (`package.json`)

```bash
npm run dev          # Vite dev server
npm run build        # tsc -b && vite build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .
npm run format       # prettier --write "**/*.{ts,tsx}"
npm run codegen      # graphql-codegen --config codegen.ts && node scripts/fix-codegen.mjs
npm run preview      # vite preview
```

## Variables d'environnement

`.env` (voir `.env.example`) :

| Var | Usage | Côté |
|---|---|---|
| `VITE_API_URL` | endpoint GraphQL Keystone (défaut: `https://api.beepbeepcity-pp.aleygues.fr/ks/api`) | client |
| `RESEND_API_KEY` | email serverless via proxy Vite dev / Vercel functions | server |
| `EMAIL_FROM_NAME` | nom expéditeur | server |
| `EMAIL_FROM_ADDRESS` | adresse expéditeur | server |
| `EMAIL_REPLY_TO` | adresse reply-to | server |

⚠️ Les `RESEND_*` ne doivent **jamais** être exposées en `VITE_*` côté client. Le proxy dev est dans `vite.config.ts`, en prod c'est une serverless function Vercel `/api/send-email`.

## Structure `src/`

```
src/
├── App.tsx                    # Routes + providers (QueryClient, AuthProvider)
├── contexts/auth-context.ts   # createContext + types AuthState
├── components/
│   ├── providers/auth-provider.tsx   # logique auth, listen storage events
│   ├── guards/                       # AuthGuard pour routes protégées
│   ├── layouts/                      # AppLayout (sidebar + header)
│   ├── ui/                           # primitives shadcn (Button, Dialog, …)
│   ├── dialogs/                      # modales métier
│   └── shared/                       # composants réutilisables transverses
├── pages/                     # une page = un fichier *-page.tsx
├── lib/
│   ├── api.ts                 # graphqlClient<TData,TVars>() — fonction fetch
│   ├── query-client.ts        # config TanStack Query (retry:1, staleTime:5min)
│   ├── constants.ts           # SESSION_TOKEN_KEY = "session-token", events…
│   └── formatters.ts          # format dates / monnaies / téléphones
├── hooks/                     # use-auth, use-debounce, use-mobile, use-paged-search-params
├── gql/
│   ├── operations.ts          # documents .graphql exportés (sources)
│   └── generated.ts           # SORTIE codegen — ne pas éditer à la main
└── types/                     # types non-GraphQL
```

## Auth flow

1. **Login** : mutation `authenticateUserWithPassword` → `localStorage.setItem("session-token", ...)` → dispatch `"auth:token-changed"` event → `AuthProvider` re-fetch user
2. **Toutes les requêtes** : `lib/api.ts:38` ajoute `Authorization: Bearer ${token}` si présent
3. **Expiration** : si la réponse contient `KS_ACCESS_DENIED` ou `"not authenticated"`, dispatch `"auth:expired"` → AuthProvider redirige vers `/login`
4. **Multi-onglets** : `AuthProvider` écoute `window.storage` pour synchroniser la session entre onglets
5. **Logout** : mutation `endSession` → `localStorage.removeItem` → navigation `/login`

⚠️ Le token n'est **jamais** envoyé en cookie — uniquement en header. Pas de refresh token : si le JWT (1 an) expire, l'utilisateur doit se reconnecter.

## Client GraphQL

`src/lib/api.ts:23-60` — `graphqlClient<TData, TVariables>(query, variables)`. Utilisé par les hooks générés par codegen (`useFooQuery`, `useFooMutation`).

Pas d'instance partagée — chaque appel est un `fetch()` indépendant. Le token est lu depuis `localStorage` à chaque requête.

## Routing (React Router v7)

Configuration en code dans `src/App.tsx:20-49`. Pas de file-based routing.

Routes publiques : `/login`, `/forgot-password`
Routes protégées (wrap dans `<AuthGuard><AppLayout>...`) : `/`, `/tickets[/:id]`, `/users[/:id]`, `/documents`, `/performance`, `/finance`
Catch-all `*` → redirect `/`

## Codegen GraphQL

Config : `codegen.ts` (v6.1.3)

- **Schema** : fichier local `./schema.graphql` (69KB) — copié manuellement depuis `back`
- **Documents** : `src/**/*.{ts,tsx}` (parse les `gql\`...\`` ou strings)
- **Output** : `src/gql/generated.ts`
- **Plugins** : `typescript`, `typescript-operations`, `typescript-react-query` (génère `useFooQuery` hooks TanStack)
- **Post-process** : `scripts/fix-codegen.mjs` (corrections custom)
- **Options** : `exposeQueryKeys: true`, `enumsAsTypes: true`

Quand le schéma `back` change : copier le nouveau `schema.graphql` à la racine puis `npm run codegen`. Ou utiliser `/sync-graphql`.

## Code partagé (`src/shared/`)

Copie locale du module canonique `BEEP/shared/`. **Ne pas modifier directement** — éditer `BEEP/shared/` et lancer `npm run sync-shared` (ou `/sync-shared`).

Imports : `import { isTripActive, formatDate, FINISHED_COURSE_STATES } from "@/shared/trip-logic"` (ou via les façades historiques `@/lib/format` qui re-exportent depuis `@/shared/formatters`).

## Validation runtime (Zod)

`src/validation/` contient les schemas Zod pour valider les réponses GraphQL et les inputs sensibles :

- `auth.ts` — `parseAuthUser()`, `loginResponseSchema`

Pattern : remplacer un cast `as Foo` aveugle par `parseFoo(input)` qui renvoie `null` + warn si shape invalide. Aligné avec le pattern de `mobile/validation/`.

## Conventions

- **Alias** : `@/*` → `src/*` (`tsconfig.app.json:27`)
- **Fichiers pages** : kebab-case avec suffixe `-page.tsx` (ex: `users-detail-page.tsx`)
- **Composants** : PascalCase, fichiers en kebab-case
- **Hooks** : préfixe `use-` (ex: `use-auth.ts`, exporte `useAuth`)
- **ESLint** notable :
  - `react-compiler/react-compiler: error` — React 19 Compiler **obligatoire** (pas de mutations en effet)
  - `@typescript-eslint/no-non-null-assertion: warn`
- **Prettier** : `tabWidth:2`, `semi:false`, `singleQuote:false`, plugin `prettier-plugin-tailwindcss`

## Déploiement (Vercel)

`vercel.json` :

- Build : `npm run build` → output `dist/`
- Framework : `vite`
- Rewrites : `/api/(.*)` → serverless functions, SPA fallback `/index.html`

Env de prod : `VITE_API_URL` doit pointer la prod Keystone, `RESEND_*` configurées dans le projet Vercel.

## Pièges connus

- `src/gql/operations.ts:293,320` — TODOs sur les states de courses (non documentés côté client) et sur les métriques calculées en JS (idéalement déplacées dans une query Keystone)
- Le proxy Resend (`vite.config.ts:6-60`) **disparaît** en prod : utiliser la serverless function Vercel
- Pas de tests : ne pas inventer un framework sans demander
- Si une query renvoie `null` pour un champ existant en DB, vérifier les `accesses.ts` côté `back` — la query passe mais le champ est filtré

## Commandes Claude utiles dans ce projet

- `/sync-graphql` après une modif schéma `back`
- `/debug-auth` si problème de token/login
- Agent `beep-graphql-bridge` pour vérifier qu'une opération GraphQL existe bien côté schéma
