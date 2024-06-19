import { defineConfig } from "orval";

export default defineConfig({
  uitpas: {
    input: {
      target:
        "https://stoplight.io/api/v1/projects/publiq/uitpas/nodes/reference/uitpas.json?deref=optimizedBundle",
    },
    output: {
      mode: "tags-split",
      target: "../src/shared/lib/dataAccess/uitpas/generated/uitpas.ts",
      schemas: "../src/shared/lib/dataAccess/uitpas/generated/model",
      client: "react-query",
      mock: false,
      baseUrl: "NEXT_PUBLIC_API_PATH",
      override: {
        operations: {
          "get-rewards": {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: "start",
            },
          },
        },
      },
    },
  },
  search: {
    input: {
      target:
        "https://stoplight.io/api/v1/projects/publiq/uitdatabank/nodes/reference/search.json?deref=optimizedBundle",
    },
    output: {
      mode: "tags-split",
      target: "../src/shared/lib/dataAccess/search/generated/search.ts",
      schemas: "../src/shared/lib/dataAccess/search/generated/model",
      client: "react-query",
      mock: false,
      baseUrl: "NEXT_PUBLIC_SEARCH_API_PATH",
    },
  },
  entry: {
    input: {
      target:
        "https://stoplight.io/api/v1/projects/publiq/uitdatabank/nodes/reference/entry.json?deref=optimizedBundle",
    },
    output: {
      mode: "tags-split",
      target: "../src/shared/lib/dataAccess/entry/generated/entry.ts",
      schemas: "../src/shared/lib/dataAccess/entry/generated/model",
      client: "react-query",
      mock: false,
      baseUrl: "NEXT_PUBLIC_ENTRY_API_PATH",
    },
  },
});
