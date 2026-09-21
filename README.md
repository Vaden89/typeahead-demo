## Typeahead Demo

Built using Next.js and the Google Books API, this project is a small bookshop front where users can search for books and receive suggestions as they type.

### Technologies

- Next.js (frontend framework of choice)
- Google Books API
- TanStack Query (chosen to reduce manually managed fetch and cache state)
- Tailwind CSS (for styling)
- Fetch API

### Architecture

I went with a component-based architecture, allowing parts of the UI to be composed and replaced with few forced dependencies. For example, the preview list can be changed without rewriting the search input or query logic.

### Requirements

- **Debouncing inputs:** Input changes are debounced by 300 ms before a request is made. This prevents a request for every keystroke, reducing API usage and improving the experience while keeping suggestions responsive.

- **Handling out-of-order or stale responses:** TanStack Query passes an abort signal to the fetcher, so an obsolete request can be cancelled when the debounced query changes. Results are considered fresh for one minute. This intentionally allows a small amount of stale data because this is a read-only search experience and I chose not to build a real-time synchronization system; the simpler cache is a better tradeoff for this demo.

- **Keyboard navigation:** I used an ARIA combobox pattern where focus stays in the input while users navigate the suggestions. `ArrowUp` and `ArrowDown` move through results, `Home` and `End` jump to the first or last result, `Enter` selects the active result, and `Escape` clears the active option.

- **Mouse interaction:** Moving over a result highlights it and clicking a result selects it, so keyboard and pointer users follow the same selection path.

### Tradeoffs

- The Google Books API keeps the demo small and realistic, but it introduces network latency, availability limits, and an external dependency that is outside the application's control.
- The one-minute freshness window improves responsiveness and reduces repeat requests at the cost of briefly showing data that may have changed. That is acceptable here because the application does not require real-time book catalog updates and does not maintain a real-time system.
- The current UI favors a focused, compact experience over advanced search features such as filters, pagination, ranking, and offline support.

### Scaling and hardening from the frontend

At higher traffic, I would keep the frontend responsible for making search feel fast and predictable while avoiding unnecessary work. The main improvements would be:

- Tune the debounce interval based on real usage, normalize whitespace and casing before creating query keys, and avoid searching for empty or very short inputs.
- Configure TanStack Query with an intentional `staleTime`, cache size, retry policy, and garbage-collection time so repeated searches reuse cached results.
- Keep the client bundle small through component-level code splitting, and avoiding unnecessary re-renders while the user types.
- Add clear loading, empty, error, retry, and offline states so a slow or unavailable provider does not leave the interface ambiguous.
- Make the interaction resilient to slow networks: maintain the current selection while a new query loads, prevent layout shifts where possible, and avoid aggressive retries from every open browser tab.
- Continue to harden the accessibility layer with correct combobox/listbox relationships, and screen-reader announcements where needed.
- Measure frontend latency, search abandonment, error rates, cache-hit behavior, and Web Vitals so performance decisions are based on real user behavior.
- Add server-side rate limiting, request-size limits, timeouts, and circuit breaking around the upstream API.
- Cache popular queries, normalize casing and whitespace.

### Project Setup

This project uses `pnpm` as its package manager. Install dependencies and start the development server with:

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

The app uses the Google Books API directly from the client, so no local database or environment variables are required for the current demo.

### Project Structure

The main application code lives under `src`:

```text
src/
├── app/             # Next.js app entry points, page, layout, and global styles
├── components/
│   ├── book/        # Book result previews, skeletons, and selected-book details
│   └── common/      # Reusable UI such as the search input and collapse behavior
├── context/         # Shared providers, including TanStack Query and theme setup
├── hooks/           # Reusable client behavior: debounce and typeahead navigation
├── services/        # External data access, including Google Books search requests
├── types/           # Shared TypeScript types for books, inputs, and search results
└── utils/           # Small shared helpers, such as class-name and image utilities
```

The page coordinates search state and data fetching, while the typeahead hook owns keyboard and pointer navigation. This keeps API access, interaction behavior, and presentation components separated enough to evolve independently.

### Testing

The main manual acceptance flow is:

1. Search for **Isaac Newton** and confirm suggestions appear while typing, without a request for every keystroke.
2. Use `ArrowDown` and `ArrowUp` to move through the suggestions, then use `Enter` to select one. Also verify `Home`, `End`, and `Escape` behave as expected.
3. Repeat the selection with the mouse by hovering over an option and clicking it. Confirm the highlighted option and selected book details are correct.
4. Clear the input using the clear button and confirm the query, suggestions, and selected state are handled correctly.
5. Test an empty query, a query with no results, a slow or failed network request, and quickly changing queries to confirm loading, error, cancellation, and stale-result behavior.
