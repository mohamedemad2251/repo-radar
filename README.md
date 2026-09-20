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

### Bugs

- [x] Change error message to something user-friendly.
- [x] Clamp description text to 4 lines.
- [x] 2 Y-axis instead of 1
- [x] Make bar thinner
- [x] Loading state when clicking "Refresh" does not match the height of the tallest grid item
- [x] Fix badge layout/styling (it's chopped)

### Enhancements & Optimizations

- [x] Add "Show Last Update" Button that bypasses API and shows last cached content
- [ ] Fix localStorage bugs when a user manually removes core items like page number
- [x] Search error handling
- [ ] Check if you can add an authenticated user to increase rate limit
- [x] Theme Switching (Light/Dark)
- [ ] Use an authenticated user to increase rate limit for API calling + handle 422 errors
- [x] Check if you can have 2 y-axis scales for the BarChart component
- [ ] Add selector for PER_PAGE In `SearchRepos`
- [x] Clear search bar via "Clear" button
- [x] Clear all button to clear all tracked repos
- [x] Enhance UI & theme
- [x] Audit responsive design
- [ ] Add issues page per repo to show like the most recent open issues. (Just in case)
- [ ] Make the `SearchRepos` localStorage be of one object instead of `repos-search-page`, `repos-search-query` and `repos-search-data`
