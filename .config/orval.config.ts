import { defineConfig } from 'orval';

const SEARCH_URL =
  'https://stoplight.io/api/v1/projects/publiq/uitdatabank/nodes/reference/search.json?deref=optimizedBundle';

const ENTRY_URL =
  'https://stoplight.io/api/v1/projects/publiq/uitdatabank/nodes/reference/entry.json?deref=optimizedBundle';

// The search spec uses JSON-LD property names like "Event-@id" in components/schemas
// which violate Orval's naming pattern ^[a-zA-Z0-9._-]+$. We rename them before
// Orval validates the spec.
async function fetchAndFixSearchSpec(url: string) {
  const spec = await fetch(url).then((r) => r.json());
  return JSON.parse(
    JSON.stringify(spec)
      .replaceAll('Event-@id', 'EventAtId')
      .replaceAll('Organizer-@id', 'OrganizerAtId')
      .replaceAll('Place-@id', 'PlaceAtId'),
  );
}

export default defineConfig(async () => ({
  uitpas: {
    input: {
      target:
        'https://stoplight.io/api/v1/projects/publiq/uitpas/nodes/reference/uitpas.json?deref=optimizedBundle&branch=unreleased',
    },
    output: {
      mode: 'tags-split',
      target: '../src/shared/lib/dataAccess/uitpas/generated/uitpas.ts',
      schemas: '../src/shared/lib/dataAccess/uitpas/generated/model',
      client: 'react-query',
      mock: false,
      baseUrl: 'NEXT_PUBLIC_API_PATH',
      override: {
        operations: {
          'get-rewards': {
            query: {
              useInfinite: true,
              useInfiniteQueryParam: 'start',
            },
          },
        },
      },
    },
  },
  search: {
    input: {
      target: await fetchAndFixSearchSpec(SEARCH_URL),
    },
    output: {
      mode: 'tags-split',
      target: '../src/shared/lib/dataAccess/search/generated/search.ts',
      schemas: '../src/shared/lib/dataAccess/search/generated/model',
      client: 'react-query',
      mock: false,
      baseUrl: 'NEXT_PUBLIC_SEARCH_API_PATH',
    },
  },
  entry: {
    input: {
      target: await fetchAndFixSearchSpec(ENTRY_URL),
    },
    output: {
      mode: 'tags-split',
      target: '../src/shared/lib/dataAccess/entry/generated/entry.ts',
      schemas: '../src/shared/lib/dataAccess/entry/generated/model',
      client: 'react-query',
      mock: false,
      baseUrl: 'NEXT_PUBLIC_ENTRY_API_PATH',
    },
  },
}));
