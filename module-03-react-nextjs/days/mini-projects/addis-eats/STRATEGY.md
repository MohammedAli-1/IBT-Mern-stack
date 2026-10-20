# Addis Eats — Route Strategy

| Route            | Strategy                        | Why                                                                 |
| ---------------- | ------------------------------- | ------------------------------------------------------------------- |
| `/`              | Static (default)                | Homepage content never changes at request time.                     |
| `/menu`          | Dynamic (`searchParams`)        | Reading `searchParams` for category filtering opts the route into dynamic rendering. `revalidate=60` is set for when it becomes static. |
| `/menu/[id]`     | Static + ISR (`revalidate=60`)  | Each dish page is pre-built via `generateStaticParams`; stale after 60 s. |
| `/cart`          | Client component (no SSR data)  | Cart state lives in context; no server data needed.                 |
| `/checkout`      | Dynamic (`cookies()`)           | Reads the `session` cookie — request-specific, cannot be pre-rendered. |
| `/orders`        | Static (default)                | Placeholder page with no request-specific data.                     |
| `/login`         | Static (default)                | Auth form; no server data required at render time.                  |
| `/register`      | Static (default)                | Registration form; no server data required at render time.          |
