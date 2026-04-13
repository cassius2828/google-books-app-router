# LibrisList

A full-stack book discovery and reading tracker built with the **Next.js App Router**, powered by the Google Books API and MongoDB. Users can search for books, manage a personal reading list, write notes, and share their profiles publicly.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, Radix UI primitives, Lucide icons |
| Database | MongoDB with Mongoose 9 |
| Auth | NextAuth v5 (beta) with Google OAuth, MongoDB adapter |
| HTTP | Axios (client), native fetch (server) |
| Testing | Jest (unit), Playwright (E2E) |
| CI/CD | GitHub Actions, deployed on Vercel |

## Project Structure

```
app/
├── _components/       # Shared UI (nav, search, books, reading list, marquee, images)
├── _context/          # React context providers (BooksProvider)
├── _lib/              # Core logic
│   ├── actions.ts     # Server Actions (add/remove book, update status)
│   ├── auth.ts        # NextAuth handlers + adapter
│   ├── auth.config.ts # Edge-safe auth config (Google provider, JWT callbacks)
│   ├── cache.ts       # localStorage cache-aside utilities
│   ├── db.ts          # Mongoose + MongoClient connection pooling
│   ├── google-books.ts# API URL constants
│   ├── service.ts     # Google Books API wrappers
│   ├── models/        # Mongoose schemas (User, Book, ReadingList, Note)
│   └── types/         # Shared TypeScript types
├── api/               # REST route handlers (books, reading-list, notes, auth)
├── books/[bookId]/    # Book details (RSC shell + client sections)
├── reading-list/      # Reading list (public landing + [userId] owner/viewer)
├── search/            # Search (RSC hero + client results) + advanced search
├── profile/[userId]/  # User profile (RSC, server-fetched data)
├── auth/signin/       # Google sign-in page
└── page.tsx           # Home page (RSC + async marquee)
components/ui/         # Shadcn-style primitives (Button, Card, Skeleton, etc.)
lib/                   # Utility helpers (cn)
```

## Architecture

### Server vs Client Component Split

Pages follow a consistent pattern: a **thin RSC shell** handles data fetching, auth checks, and metadata, while interactive leaves are client components.

| Route | Rendering | Rationale |
|-------|-----------|-----------|
| `/` (home) | RSC | Static marketing content; `Marquee3D` is an async server component wrapped in `Suspense` |
| `/books/[bookId]` | RSC shell → client sections | RSC passes params; `BookDetailsContent` owns cache-aside fetching and composes `BookHero`, `BookMetadata`, `BookDescription`, `BookNotes` |
| `/search` | RSC | Hero (title, input, advanced link) renders server-side; `BooksGallery` is a client component in `Suspense` |
| `/search/advanced` | Client | Form + results depend on `BooksContext`; fully interactive |
| `/reading-list/[userId]` | RSC | Auth + access control server-side; owner's list delegates to client `ReadingListPageContent` for cache-aside; non-owner list renders with server-fetched `initialData` |
| `/profile/[userId]` | RSC | All data fetched with `await`; interactive blocks (favorite book search, clear cache) are client leaf components |

### Caching Strategy

#### Client-Side: localStorage Cache-Aside (`app/_lib/cache.ts`)

Interactive pages that fetch data client-side use a cache-aside pattern backed by `localStorage`:

- **Book details** — cached under `librislist:book:{id}` with a 30-minute TTL
- **Owner's reading list** — cached under `librislist:reading-list:{userId}` with a 10-minute TTL

The cache is **invalidated** on mutations: adding/removing a book, updating a book's status. A manual "Clear Cache" button on the profile page calls `clearAppCache()` to wipe all `librislist:*` entries.

All cache functions no-op when `window` is undefined, making them SSR-safe.

#### Server-Side: In-Memory Module Cache (Marquee)

The home page marquee (`Marquee3D`) uses a **module-level in-memory cache** with a 10-minute TTL. This avoids redundant Google Books API calls across requests within the same server process, resets naturally on Vercel cold starts, and costs nothing.

### Loading & Skeleton Strategy

Every page uses **inline skeletons** rather than full-page loading spinners. Each section renders its own skeleton state while data loads, so the page shell is visible immediately:

- **Book details** — `BookHero` shows a skeleton cover and pulsing title/author lines; `BookMetadata` shows skeleton value bars; `BookDescription` and `BookNotes` show skeleton text lines
- **Search results** — `SearchResultsSkeleton` renders a 12-card grid of skeleton book cards
- **Reading list** — Owner's list shows a 6-card skeleton grid while loading
- **Home marquee** — Renders with `Suspense fallback={null}`; book images fade in with a CSS opacity transition

### Image Resilience

All images use a retry-on-error strategy via `RetryImage`:

1. On load failure, retry up to 2 times with a cache-busting query parameter after a 1.5s delay
2. After exhausting retries, fall back to `fallbackSrc` (a configurable placeholder)
3. Images render with `opacity: 0` and transition to `opacity: 1` on load for a smooth fade-in

`BookCoverImage` is a thin wrapper that sets the fallback to the app's "image not found" placeholder (`NEXT_PUBLIC_IMG_NOT_FOUND`).

### Authentication

NextAuth v5 with Google OAuth and JWT-based sessions. The MongoDB adapter persists user accounts and sessions. An edge-safe auth config (`auth.config.ts`) is shared between middleware and the full auth module to avoid importing Mongoose on the edge runtime.

### Data Models

| Model | Purpose |
|-------|---------|
| `User` | Profile (name, email, image, favorite genres/books, privacy setting) |
| `Book` | Google Books metadata cache (google_book_id as unique key) |
| `ReadingList` | User ↔ Book junction with status (`to_read`, `reading`, `completed`); unique index on (user_id, book_id) |
| `Note` | Per-reading-list-entry notes (unique ref to ReadingList) |

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB instance (local or Atlas)
- Google Cloud project with Books API enabled and OAuth credentials

### Environment Variables

Create a `.env.local` file at the project root:

```env
MONGODB_URI=mongodb+srv://...
GOOGLE_API_KEY=your-google-books-api-key
BASE_VOL_URL=https://www.googleapis.com/books/v1/volumes

AUTH_SECRET=your-random-secret
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret

NEXT_PUBLIC_IMG_NOT_FOUND=https://your-cdn.com/placeholder.png
```

### Development

```bash
npm install
npm run dev
```

### Testing

```bash
npm test          # Jest unit tests
npm run test:e2e  # Playwright E2E (requires a built app)
```

### CI/CD

GitHub Actions runs on pushes and PRs to `main` and `dev`:

1. **lint-and-test** — `npm run lint` + Jest with coverage
2. **e2e** — builds the app and runs Playwright against Chromium

Concurrency groups cancel in-progress runs for the same branch. E2E only fires on PRs or pushes to `main`/`dev` (not both for the same merge).

## Deployment

Deployed on [Vercel](https://vercel.com). Set the environment variables above in your Vercel project settings. The app uses `next/font` to load [Geist](https://vercel.com/font).
