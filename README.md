# Core Requirements

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

## Roadmap

### Core

- [x] Debounced GitHub repository search (logic)
- [x] Debounced GitHub repository search (UI)
- [x] Install Zustand
- [x] Create stores via Zustand
- [ ] Apply Loading state per repo for avatar-loading, etc. (Not in the tracked states, but generally in RepoCard)
- [x] Add error state handling
- [ ] Add 422 rate limit reached condition

### Enhancements & Optimizations

- [ ] Use an authenticated user to increase rate limit for API calling + handle 422 errors
- [ ] Enhance UI & theme
- [x] Audit responsive design
- [ ] Add issues page per repo to show like the most recent open issues. (Just in case)
- [ ] Make the `SearchRepos` localStorage be of one object instead of `repos-search-page`, `repos-search-query` and `repos-search-data`