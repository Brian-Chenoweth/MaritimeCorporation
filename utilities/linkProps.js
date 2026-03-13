const INTERNAL_HOSTS = new Set(
  [
    'calmaritimecorporation.org',
    'www.calmaritimecorporation.org',
    'cms.calmaritimecorporation.org',
  ].filter(Boolean)
);

if (process.env.NEXT_PUBLIC_WORDPRESS_URL) {
  try {
    INTERNAL_HOSTS.add(new URL(process.env.NEXT_PUBLIC_WORDPRESS_URL).hostname);
  } catch (_error) {
    // Ignore malformed env values and fall back to the known host list.
  }
}

export function isExternalHref(href) {
  if (!href || typeof href !== 'string') return false;
  if (href.startsWith('/') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  try {
    const url = new URL(href, 'https://calmaritimecorporation.org');
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;

    return !INTERNAL_HOSTS.has(url.hostname);
  } catch (_error) {
    return false;
  }
}

export function getLinkRel({ href, rel, target }) {
  const tokens = new Set((rel ?? '').split(/\s+/).filter(Boolean));

  if (isExternalHref(href)) {
    tokens.add('nofollow');
    tokens.add('external');
  }

  if (target === '_blank') {
    tokens.add('noopener');
    tokens.add('noreferrer');
  }

  return tokens.size > 0 ? Array.from(tokens).join(' ') : undefined;
}
