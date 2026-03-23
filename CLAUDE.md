# Spoltec

Website for Spoltec Södra AB — Swedish wastewater/drainage services company. Headless CMS architecture with Next.js frontend and WordPress backend.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS 4 + shadcn/ui + Radix UI + CVA
- WordPress GraphQL (headless CMS)
- TanStack Query + TanStack Form + Zod
- SendGrid (email)
- Bun (package manager)

## Commands

- `bun dev` — dev server
- `bun run build` — production build
- `bun run lint` — eslint (max-warnings=0)

## Project Structure

```
app/                        # Next.js App Router
├── page.tsx                # Homepage
├── layout.tsx              # Root layout (fonts, GA/GTM, metadata)
├── providers.tsx           # React providers
├── tjanster/               # Services listing
├── [slug]/                 # Dynamic page routes
├── kunskapsbank/           # Knowledge base / blog
├── om-spoltec/             # About
├── kontakta-oss/           # Contact
├── akut-hjalp/             # Emergency help
├── faq/                    # FAQ
├── api/                    # API routes (contact-form, get-posts, revalidate)
│
components/
├── flexible-content/       # Block-based content system
│   ├── block.tsx           # Block router
│   └── sections/           # Section components (Services, TextImage, BlogPosts, etc.)
├── header/                 # Navigation
├── footer/                 # Footer
├── form/                   # Form components
├── ui/                     # Base UI (button, input, etc.)
├── icons/                  # SVG icon components
│
lib/
├── data/                   # Data fetching layer (page, post, service, instagram)
├── wp/                     # WordPress GraphQL client (fetchGraphQL, auth)
├── queries/                # GraphQL query definitions
├── types/                  # TypeScript type definitions
├── seo/                    # Schema.org / JSON-LD
├── utils/                  # Helpers
│
data/                       # Static JSON (services, nav links, footer links)
public/                     # Static assets (images, favicons)
styles/                     # Global CSS
hooks/                      # Custom React hooks
scripts/                    # Build/utility scripts
actions/                    # Server actions
```

## Data Flow

WordPress (`media.spoltec.se/graphql`) → `lib/wp/fetchGraphQL.ts` → `lib/data/` → App pages → `components/flexible-content/block.tsx` → Section components
