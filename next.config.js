const { withFaust, getWpHostname } = require('@faustwp/core');

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net https://cdnjs.cloudflare.com",
  "font-src 'self' data: https://fonts.gstatic.com https://use.typekit.net https://cdnjs.cloudflare.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://cms.calmaritimecorporation.org https://bpmaritimecorp.wpenginepowered.com https://formspree.io https://api.formspree.com",
  "form-action 'self' https://formspree.io https://api.formspree.com",
  "frame-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
  images: {
    domains: [
      getWpHostname(),             
      'cms.calmaritimecorporation.org',   
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
});
