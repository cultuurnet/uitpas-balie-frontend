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
      .replaceAll('Event-@id', 'EventId')
      .replaceAll('Organizer-@id', 'OrganizerId')
      .replaceAll('Place-@id', 'PlaceId'),
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
      baseUrl: '/api/proxy/uitpas',
      mutator: {
        path: '../src/shared/lib/dataAccess/fetcher.ts',
        name: 'fetcher',
      },
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
      baseUrl: '/api/proxy/search',
      mutator: {
        path: '../src/shared/lib/dataAccess/fetcher.ts',
        name: 'fetcher',
      },
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
      baseUrl: '/api/proxy/entry',
      mutator: {
        path: '../src/shared/lib/dataAccess/fetcher.ts',
        name: 'fetcher',
      },
    },
  },
}));
