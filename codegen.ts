import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  schema: "./schema.graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        reactQueryVersion: 5,
        fetcher: {
          func: "@/lib/api#graphqlClient",
          isReactHook: false,
          fetchParams: {},
        },
        exposeQueryKeys: true,
        exposeFetcher: true,
        addInfiniteQuery: false,
        enumsAsTypes: true,
        useTypeImports: true,
        scalars: {
          DateTime: "string",
          JSON: "Record<string, unknown>",
          Decimal: "string",
          Upload: "File",
        },
        // Pour aligner avec `beepbeepcity-app` qui utilise `typesPrefix: GQL_`,
        // ajouter ici `typesPrefix: "GQL_"`. Décidé en 2026-04 de NE PAS le faire :
        // ~25 fichiers à mettre à jour pour un bénéfice purement cosmétique.
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
