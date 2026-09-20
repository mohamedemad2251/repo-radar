# Repo Radar

Your solution for searching and tracking [GitHub](https://github.com) Repositories.

---

## Installation

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm
- Git, when cloning from the terminal

### GUI

1. Click Code > Local > Download ZIP
2. Extract zip file
3. Open VS Code (or your preferred IDE)
4. Click File > Open Folder
5. Select the entire folder named `repo-radar-main`
6. Click "Select folder"
7. Open your terminal (CTRL + `) and install dependencies (make sure you have npm package installer installed):

```bash
npm --version #Check if NPM exists first
npm install
```

> [!IMPORTANT]
> Create your local environment file before starting the application:
>
> ```bash
> cp .env.example .env.local
> ```
>
> `VITE_*` variables are included in the frontend bundle and must not contain secrets.

8. Once that is done, you can either run the development server:

```bash
npm run dev
```

Or you can build and preview locally via:

```bash
npm run build
npm run preview
```

### Terminal Only (Bash)

1. Open the desired folder to clone the repo in the following steps:

```bash
cd *desired_path*
```

2. Clone the git repository (make sure git is installed on your kernel):

```bash
git --version #Verify you have git first.
git clone https://github.com/mohamedemad2251/repo-radar.git
```

3. For VS Code, open an instance via:

```bash
code ./repo-radar
```

or:

```bash
cd repo-radar
code .
```

4. Open your terminal (CTRL + `) and install dependencies (make sure you have npm package installer installed):

```bash
npm --version #Check if NPM exists first
npm install
```

5. Once that is done, you can either run the development server:

```bash
npm run dev
```

Or you can build and preview locally via:

```bash
npm run build
npm run preview
```

> [!IMPORTANT]
> Check [.env.example](/.env.example) for an example on the environment variable.

## Core Requirements

- [x] Debounced GitHub repository search
- [x] Track / untrack repositories
- [x] Tracked Repos view
- [x] Show stars (`stargazers_count`), open issues (`open_issues_count`), and last commit date (`pushed_at`)
- [x] Refresh individual repos and/or all repos
- [x] Independent loading and error states per repo
- [x] Persist tracked repos using localStorage
- [x] Proper TypeScript types
- [x] Bar chart showing stars per tracked repository

---

## Additional Features

- "Clear" search bar button
- Theme switching with user system preference (Light - Dark)
- Search query, page and data persistence via `localStorage`
- Multiple y-axes for BarChart (stars + open issues)
- Tab switching for views
- Count tracked repos on "Tracked" tab
- "Untrack All" button for tracked repos
- "Show Last Snapshot" button to show the last cached data before errors

## Assumptions & Limitations

This section provides details on any assumptions or limitations made while making the project:

- The user calling GitHub's API is an **unauthenticated user**
- The search API provides the **first 1000 repositories only**. That is considered in [`SearchRepos`](/src/components/SearchRepos.tsx) component
- Error code `403` is handled exceptionally because it correlates to GitHub's unauthenticated user **rate limit**
- `DEBOUNCE_DURATION_MS`: Amount of time set to the timer after the user presses the last keystroke. After the timer fires off, the search query is handed to the API. The value is **500 ms by default**. (Configurable)

### Features assumptions

The following assumptions are necessary for understanding the direction this project was headed towards:

- Debounced GitHub repository search: GitHub search that waits for the user's last keystroke + `DEBOUNCE_DURATION_MS` to call the API: https://api.github.com/search/repositories?q={query}&page={page}&per_page={per_page}. This helps in reducing the amount of API calls used.
- Track / untrack repositories: User can click track to add a repo to the tracked view where it would show more analytics about the repo (like the bar chart). Untrack removes it from the view.
- Tracked Repos view: The view that contains all and only the tracked repos post-clicking "Track". This is where the refresh/refresh all and untrack all lives as well as the bar chart.
- Show stars, open issues, and last commit date: Assuming these mean the numbers/value only and nothing else.
- Refresh individual repos and/or all repos: The refresh state per tracked repo only. Because the search API for the search tab returns ALL matching repos, we cannot asynchronize it.
- Bar chart showing stars per tracked repository: Shows all tracked repositories and compare them in a bar chart **by stars**.

---

## Milestones

### Bugs

- [x] Change error message to something user-friendly.
- [x] Clamp description text to 4 lines.
- [x] 2 Y-axis instead of 1
- [x] Make bar thinner
- [x] Loading state when clicking "Refresh" does not match the height of the tallest grid item
- [x] Fix badge layout/styling (it's chopped)

### Enhancements & Optimizations

- [x] Add "Show Last Snapshot" Button that bypasses API and shows last cached content
- [x] Search error handling
- [x] Theme Switching (Light/Dark)
- [x] Check if you can have 2 y-axis scales for the BarChart component
- [x] Clear search bar via "Clear" button
- [x] Clear all button to clear all tracked repos
- [x] Enhance UI & theme
- [x] Audit responsive design

---

## Architectural & Technical Decisions

This section provides insights on the developer's choices and reasons why said choices were made.

### Architectural Decisions

The file structure looks like the following:

```text
repo-radar/
|-- public/                              # Public assets user can navigate to on the browser
|   |-- favicon.svg
|   `-- icons.svg
|-- src/                                 # Contains all the source code
|   |-- assets/                          # Unexposed assets
|   |   |-- hero.png
|   |   |-- react.svg
|   |   `-- vite.svg
|   |-- components/                      # General components used by the entire project
|   |   |-- layout/                      # Layout-specific components (components that persist in different pages)
|   |   |   `-- Header.tsx
|   |   |-- ui/                          # UI-specific components, messages, and styling
|   |   |   |-- messages/
|   |   |   |   `-- ErrorMessage.tsx
|   |   |   |-- RepoCardContent.tsx
|   |   |   |-- SearchRepoCard.tsx
|   |   |   |-- ToggleTheme.tsx
|   |   |   `-- TrackedRepoCard.tsx
|   |   |-- SearchRepos.tsx
|   |   `-- TrackedRepos.tsx
|   |-- lib/                             # Utility functions used by the project
|   |   `-- api/                         # Low-level API layer
|   |       `-- client.ts
|   |-- services/                        # Serves specific-purpose features
|   |   `-- repositories.ts              # Gets single repo and searches repos
|   |-- stores/                          # Contains all stores via Zustand
|   |   `-- track-store.ts               # Store specific to the tracking system
|   |-- theme/                           # Contains theme configuration & palettes
|   |   `-- theme.ts
|   |-- types/                           # Contains generic/general types used in the project
|   |   `-- types.ts
|   |-- App.tsx                          # Main App component
|   |-- index.css                        # Entry CSS
|   `-- main.tsx                         # Entry Point
|-- .gitignore
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- tsconfig.app.json
|-- tsconfig.json
|-- tsconfig.node.json
`-- vite.config.ts
```

---

The following architectural decisions were vital to orchestrate the project properly:

#### 1. User navigation

- The UI is split to two main tabs: [SearchRepos](/src/components/SearchRepos.tsx) & [TrackedRepos](/src/components/TrackedRepos.tsx).

- They are handled via `tab` state in [App](/src/App.tsx)
- Navigation is handled in [Header](/src/components/layout/Header.tsx) by `tab` as well.

```text
main.tsx
`-- App
    |-- Header
    |   |-- ToggleTheme --> MUI color scheme
    |   `-- Tabs --> changes the active tab in App
    |
    `-- Active view
        |-- Repositories tab
        |   `-- SearchRepos
        |       |-- Repository service --> API client --> GitHub API
        |       `-- SearchRepoCard
        |           |-- RepoCardContent
        |           `-- Track / Untrack --> Zustand store --> localStorage
        |
        `-- Tracked tab
            `-- TrackedRepos
                |-- Zustand store --> tracked repositories and refresh states
                |-- TrackedRepoCard
                |   |-- RepoCardContent
                |   `-- Refresh --> Repository service --> API client --> GitHub API
                `-- BarChart --> stars and open issues from tracked repositories
```

Reason: No need for multi-page solution. SPA (Single-Page Application) should be sufficient with the business requirements provided.

---

#### 2. Zustand vs Redux

- While Redux is great for an enterprise-level solution. Zustand proves efficient and way less of a boilerplate than Redux. A simple store with states and actions are sufficient to carry out every single requirement in this project.

- Verdict: Use Zustand

- Refer to [the track store here](/src/stores/track-store.ts)

---

#### 3. Loading & Error States

- [SearchRepos](/src/components/SearchRepos.tsx) fetches the GitHub search API, returning multiple repos. Therefore, **loading/error states are handled as a group/chunk**
- [SearchRepos](/src/components/SearchRepos.tsx) handles exception inside via `try-catch`.
- On the contrary, [TrackedRepos](/src/components/TrackedRepos.tsx) fetches (i.e. refreshes) its repos inside [the track store here](/src/stores/track-store.ts). Therefore, the exception and loading handling is handled outside of it.
- [TrackedRepoCard](/src/components/ui/TrackedRepoCard.tsx) has its error/loading handled separately by subscribing to the store's `statusById`. Keeping the states local-component leveled allows us to refresh each card independently without subscribing/listening to other cards.
- Reason: search API has no other choice than being handled where the grid is. While the tracking system uses store (i.e. Zustand) to handle all its cases. So we simply call the needed store values and use it in the component.

---

#### 4. API client vs repository service

- Verdict: Keep generic HTTP behavior in [lib/api/client.ts](/src/lib/api/client.ts) and GitHub repository operations in [services/repositories.ts](/src/services/repositories.ts).
- Reason: Components and stores request repository data without needing to construct URLs or handle low-level HTTP behavior.

### Technical Decisions

#### 1. Whole-store vs selective Zustand subscriptions

- Verdict: Use `(state) => state.trackedRepos` instead of `(state) => state`.
- Reason: `(state) => state` subscribes the component to the entirety of the store. So if we have `add`, `refresh` & `remove`, but we only use `add`, any `refresh` or `remove` operation will trigger a re-render for the component (inefficient)

---

#### 2. `Status[]` vs `Partial<Record<Repository["id"],RefreshState>>` (Zustand)

- Verdict: Choose `Partial<Record<Repository["id"],RefreshState>>`
- Reason: `Status[]` would mean we have two asynchronous data (i.e. `trackedRepos: Repository[]` & `status: Status[]`) to be **MANUALLY** synchronized together with every add, remove, refresh, etc. That also mean we would have to register `status` as a 1-to-1 with `trackedRepos`. If `trackedRepos = [1,2,3]`, `status` would be `[idle,loading,idle]` for example where 1 => idle, 2 => loading and 3 => idle. Not a recommended design. For the other design, it would look like:

```typescript
statusById: {
 123: {
   status: "loading",
   error: null,
 },
 456: {
   status: "error",
   error: "Request failed",
 },
}
```

So, each `key` would correspond to an ID and any missing ID's would be considered `status: "idle"`. This is better for lookup.

---

#### 3. `import {#Bundle_Name} from "@mui/material"` vs `import {#Bundle_Name} from "@mui/material/#Bundle_Name"`

- Verdict: Use `import {#Bundle_Name} from "@mui/material/#Bundle_Name"`
- Reason: To avoid **Barrel Imports** which can slow down performance. [See Material UI's documentation for bundle size.](https://mui.com/material-ui/guides/minimizing-bundle-size/)
