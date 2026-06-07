import { createError, readBody } from 'h3';

interface StartGGRequest {
  eventId?: number | string;
  url?: string;
  page?: number;
  perPage?: number;
}

const EVENT_ID_FROM_URL = /\/event\/(\d+)(?:[/?#]|$)/i;
const EVENT_ID_FROM_HTML = [
  /"eventId"\s*:\s*(\d+)/i,
  /eventId\s*[:=]\s*(\d+)/i,
  /"event_id"\s*:\s*(\d+)/i,
];

async function extractEventIdFromUrl(url: string) {
  const normalized = url.trim();
  const urlMatch = EVENT_ID_FROM_URL.exec(normalized);
  if (urlMatch) return urlMatch[1];

  const response = await fetch(normalized, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo descargar la página del torneo desde start.gg');
  }

  const html = await response.text();

  for (const regex of EVENT_ID_FROM_HTML) {
    const match = regex.exec(html);
    if (match) {
      return match[1];
    }
  }

  throw new Error('No se pudo extraer el eventId de la página de start.gg');
}

function normalizeHandle(handle: string): string {
  const trimmed = handle.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('@')) return trimmed;
  return `@${trimmed}`;
}

function parseCharacters(characters: unknown): string[] {
  if (!characters) {
    return [];
  }

  if (Array.isArray(characters)) {
    return characters.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof characters === 'string') {
    try {
      const parsed = JSON.parse(characters);
      return parseCharacters(parsed);
    } catch {
      const trimmed = characters.trim();
      return trimmed ? [trimmed] : [];
    }
  }

  if (typeof characters === 'object') {
    const values = Object.values(characters as Record<string, unknown>);
    return values
      .flatMap((value) => parseCharacters(value))
      .map((value) => String(value).trim())
      .filter(Boolean);
  }

  return [];
}

function parseConnectedAccounts(value: unknown): string | null {
  if (!value) return null;

  let accounts: any[] = [];
  if (typeof value === 'string') {
    try {
      accounts = JSON.parse(value);
    } catch {
      return null;
    }
  } else if (Array.isArray(value)) {
    accounts = value;
  } else if (typeof value === 'object') {
    accounts = [value];
  }

  for (const account of accounts) {
    if (!account || typeof account !== 'object') continue;

    const source = String(
      account.source || account.type || account.provider || account.service || ''
    ).toLowerCase();
    const username = String(account.username || account.handle || account.name || account.url || '').trim();

    if (source.includes('twitter') || source.includes('x')) {
      if (username) return normalizeHandle(username.replace(/^(https?:\/\/)?(www\.)?twitter\.com\//i, ''));
    }

    if (typeof account.url === 'string') {
      const match = account.url.match(/twitter\.com\/(?:#!\/)?@?([A-Za-z0-9_]+)/i);
      if (match) {
        return normalizeHandle(match[1]);
      }
    }
  }

  return null;
}

function parseAuthorizations(value: unknown): string | null {
  if (!value) return null;

  const authorizations = Array.isArray(value) ? value : typeof value === 'object' ? [value] : [];

  for (const auth of authorizations) {
    if (!auth || typeof auth !== 'object') continue;

    const type = String(auth.type || '').toLowerCase();
    const username = String(auth.externalUsername || '').trim();
    const authUrl = String(auth.url || '').trim();

    if (type.includes('twitter') || type.includes('x')) {
      if (username) return normalizeHandle(username.replace(/^(https?:\/\/)?(www\.)?twitter\.com\//i, ''));
      if (authUrl) {
        const match = authUrl.match(/twitter\.com\/(?:#!\/)?@?([A-Za-z0-9_]+)/i);
        if (match) return normalizeHandle(match[1]);
      }
    }
  }

  return null;
}

function chooseCharacters(characterCounts: Record<string, number>): { mainCharacter: string; secondaryCharacters: string[] } {
  const entries = Object.entries(characterCounts).filter(([, count]) => count > 0);
  if (!entries.length) {
    return { mainCharacter: '', secondaryCharacters: [] };
  }

  entries.sort((a, b) => b[1] - a[1]);
  const mainCharacter = entries[0][0];
  const secondaryCharacters = entries.slice(1).map(([character]) => character);
  return { mainCharacter, secondaryCharacters };
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const token = config.startggApiToken;

  if (!token) {
    throw createError({ statusCode: 500, statusMessage: 'Falta el token de start.gg en runtimeConfig' });
  }

  const body = (await readBody(event)) as StartGGRequest;
  const page = Number(body.page ?? 1);
  const perPage = Number(body.perPage ?? 8);
  let eventId = body.eventId ? String(body.eventId).trim() : undefined;
  const url = body.url ? String(body.url).trim() : undefined;

  if (!eventId && url) {
    eventId = await extractEventIdFromUrl(url);
  }

  if (!eventId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Debes enviar eventId o la URL de start.gg del torneo en el body',
    });
  }

  const standingsQuery = `query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {
    event(id: $eventId) {
      id
      name
      startAt
      tournament {
        name
      }
      standings(query: { page: $page, perPage: $perPage }) {
        nodes {
          placement
          entrant {
            id
            name
            participants {
              id
              gamerTag
              prefix
              connectedAccounts
              player {
                user {
                  id
                  name
                  url
                  authorizations {
                    type
                    externalUsername
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const gqlHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'client-version': '20',
  };

  const standingsResponse = await $fetch('https://www.start.gg/api/-/gql', {
    method: 'POST',
    headers: gqlHeaders,
    body: {
      query: standingsQuery,
      variables: {
        eventId,
        page,
        perPage,
      },
    },
  });

  const standingsData = (standingsResponse as any).data?.event ?? (standingsResponse as any).event ?? standingsResponse;
  const standingsNodes = standingsData?.standings?.nodes ?? [];

  if (!standingsNodes.length) {
    throw createError({ statusCode: 404, statusMessage: 'No se encontraron standings válidos en start.gg' });
  }

  const entrantIds = new Set(standingsNodes.map((node: any) => String(node.entrant?.id)));

  const setsQuery = `query EventSets($eventId: ID!, $page: Int!, $perPage: Int!) {
    event(id: $eventId) {
      paginatedSets(query: { page: $page, perPage: $perPage }) {
        pageInfo {
          page
          totalPages
          perPage
          total
        }
        nodes {
          id
          fullRoundText
          slots {
            slotIndex
            entrant {
              id
            }
          }
          games {
            id
            orderNum
            selections {
              entrant {
                id
              }
              character {
                id
                name
              }
            }
          }
        }
      }
    }
  }`;

  async function fetchSetsPage(pageNumber: number) {
    return await $fetch('https://www.start.gg/api/-/gql', {
      method: 'POST',
      headers: gqlHeaders,
      body: {
        query: setsQuery,
        variables: {
          eventId,
          page: pageNumber,
          perPage: 100,
        },
      },
    });
  }

  const firstSetsResponse = await fetchSetsPage(1);
  const firstSetsData = (firstSetsResponse as any).data?.event ?? (firstSetsResponse as any).event ?? firstSetsResponse;
  const firstSetsConnection = firstSetsData?.paginatedSets;
  const pageInfo = firstSetsConnection?.pageInfo ?? { page: 1, totalPages: 1, perPage: 100, total: 0 };

  const pagesToFetch = new Set<number>([1]);
  if (pageInfo.totalPages > 1) {
    if (pageInfo.totalPages <= 3) {
      for (let i = 2; i <= pageInfo.totalPages; i += 1) {
        pagesToFetch.add(i);
      }
    } else {
      pagesToFetch.add(Math.max(2, pageInfo.totalPages - 1));
      pagesToFetch.add(pageInfo.totalPages);
    }
  }

  const allSets = [...(firstSetsConnection?.nodes ?? [])];

  for (const pageNumber of pagesToFetch) {
    if (pageNumber === 1) continue;
    const pageResponse = await fetchSetsPage(pageNumber);
    const pageData = (pageResponse as any).data?.event ?? (pageResponse as any).event ?? pageResponse;
    allSets.push(...(pageData?.paginatedSets?.nodes ?? []));
  }

  const characterCountsByEntrant = new Map<string, Record<string, number>>();

  for (const set of allSets) {
    const games = (set as any).games ?? [];

    for (const game of games) {
      const selections = game.selections ?? [];

      for (const selection of selections) {
        const entrantId = String(selection?.entrant?.id ?? '');
        if (!entrantId || !entrantIds.has(entrantId)) continue;

        const characterName = String(selection?.character?.name ?? '').trim();
        if (!characterName) continue;

        const counts = characterCountsByEntrant.get(entrantId) ?? {};
        counts[characterName] = (counts[characterName] ?? 0) + 1;
        characterCountsByEntrant.set(entrantId, counts);
      }
    }
  }

  const players = standingsNodes.map((node: any) => {
    const entrant = node.entrant ?? {};
    const participant = entrant.participants?.[0] ?? {};
    const handleFromAccounts = parseConnectedAccounts(participant.connectedAccounts);
    const handleFromAuth = parseAuthorizations(participant.player?.user?.authorizations);
    const handle = handleFromAccounts || handleFromAuth || '';
    const characterCounts = characterCountsByEntrant.get(String(entrant.id)) ?? {};
    const { mainCharacter, secondaryCharacters } = chooseCharacters(characterCounts);

    return {
      placement: node.placement ?? 0,
      entrantId: String(entrant.id ?? ''),
      name: entrant.name || participant.gamerTag || '',
      handle,
      twitterHandle: handle,
      character: mainCharacter,
      secondaryCharacters,
      twitterUrl: handle ? `https://twitter.com/${handle.replace(/^@/, '')}` : '',
      userUrl: participant.player?.user?.url ?? '',
      gamerTag: participant.gamerTag ?? '',
      prefix: participant.prefix ?? '',
    };
  });

  const eventStartAt = standingsData?.startAt ?? null;
  const eventDate = typeof eventStartAt === 'number'
    ? new Date(eventStartAt * 1000).toISOString()
    : typeof eventStartAt === 'string'
      ? new Date(eventStartAt).toISOString()
      : null;

  return {
    eventId,
    eventName: standingsData?.name ?? '',
    tournamentName: standingsData?.tournament?.name ?? standingsData?.name ?? '',
    eventDate,
    eventStartAt,
    pageInfo,
    players,
    standings: standingsNodes,
  };
});
