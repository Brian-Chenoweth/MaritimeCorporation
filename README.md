# MaritimeCorporation

Headless WordPress frontend for Cal Maritime Corporation, built with Next.js and Faust.js.

The site pulls content from WordPress over WPGraphQL, renders standard WordPress routes through Faust templates, and includes custom archive/search experiences for posts and projects.

## Stack

- Next.js 14
- React 18
- Faust.js / `@faustwp/core`
- Apollo Client
- Sass modules
- Formspree for the public contact/comment form

## What Is In This Repo

- `pages/` contains the Next.js routes, including:
  - `pages/index.js` and `pages/[...wordpressNode].js` for Faust-powered WordPress pages
  - `pages/posts/index.js` for the posts archive
  - `pages/projects/index.js` for the projects archive
  - `pages/search.js` for client-side search against WPGraphQL
- `wp-templates/` contains Faust template mappings for WordPress content types.
- `components/` contains shared UI components and homepage sections.
- `plugins/` contains custom Faust plugins, including project template and relay-style pagination support.
- `public/` contains static assets used by the site.
- `acm-blueprint.zip` is the Atlas Content Modeler blueprint export used to seed or sync the WordPress content model.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Common commands:

```bash
npm run build
npm run start
npm run lint
npm run format
npm run generate
```

## Environment Notes

This project relies on the standard Faust/WordPress environment setup. The codebase also references these public variables:

- `NEXT_PUBLIC_WORDPRESS_URL`
  Used for internal link handling.
- `NEXT_PUBLIC_SITE_URL`
  Used for canonical URLs and SEO metadata.
- `NEXT_PUBLIC_VERCEL_URL`
  Used as a fallback site origin when `NEXT_PUBLIC_SITE_URL` is not set.

There is also a hardcoded production site URL in [app.config.js](/Users/bchenowe/Sites/MaritimeCorporation/app.config.js) and CSP/image host configuration in [next.config.js](/Users/bchenowe/Sites/MaritimeCorporation/next.config.js).

## Content And Behavior

- The frontend is configured for the production site origin `https://calmaritimecorporation.org`.
- The app expects WordPress menu locations including `PRIMARY`, `FOOTER`, `FOOTER_SECONDARY`, `FOOTER_TERTIARY`, `RESOURCES_FOOTER`, `QUICK_FOOTER`, and `ABOUT_FOOTER`.
- Posts are paginated in groups of 9.
- Projects are paginated in groups of 5.
- Search is implemented in the frontend and queries WordPress content live.
- The contact/comment form submits through Formspree using the form ID currently hardcoded in [components/ContactForm/ContactForm.js](/Users/bchenowe/Sites/MaritimeCorporation/components/ContactForm/ContactForm.js).

## WordPress / Blueprint Workflow

The repo still includes the original ACM blueprint workflow in [DEVELOPMENT.md](/Users/bchenowe/Sites/MaritimeCorporation/DEVELOPMENT.md) for importing/exporting the content model into a WordPress instance.

If this site's WordPress schema or seed content changes, update the blueprint export and commit the new `acm-blueprint.zip`.

## Security And Deployment Notes

- Custom security headers are configured in [next.config.js](/Users/bchenowe/Sites/MaritimeCorporation/next.config.js), including CSP, HSTS, `X-Frame-Options`, and `X-Content-Type-Options`.
- Remote image loading is currently limited to the configured WordPress hosts.
- Form submissions are allowed only to Formspree via the configured CSP `connect-src` and `form-action` directives.

## Repository Notes

- Local path: `/Users/bchenowe/Sites/MaritimeCorporation`
- Git remote `origin`: `git@github.com:cpc-it/MaritimeCorporation.git`

If GitHub ownership, deployment targets, WordPress hosts, or Formspree configuration change again, update this README along with the related config files so the operational notes stay accurate.
