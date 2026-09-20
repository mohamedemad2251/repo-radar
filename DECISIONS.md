# Decisions

This file will hold all the architectural/technical decisions made in order to make the project functional and optimal.

---

#### 1. `(state) => state` vs `(state) => state.#store_value#` (Zustand)

- Verdict: Choose `(state) => state.#store_value#`
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
