const mapping: Record<string, string> = {
  contacts: 'contact',
  events: 'event',
  'gift-suggestions': 'gift_suggestion',
  meetings: 'meeting',
  notes: 'note',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
