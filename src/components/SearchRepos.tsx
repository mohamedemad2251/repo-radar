import { searchRepositories } from "@/services/repositories";
import { type SearchRepositories } from "@/types/types";

import Container from "@mui/material/Container";
import { useEffect, useRef, useState } from "react";
import SearchRepoCard from "@/components/ui/SearchRepoCard";
import ErrorMessage from "./ui/messages/ErrorMessage";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";

// Configuration Of Debounce/Timeout Value
const DEBOUNCE_DURATION_MS = 500;

// Local Storage Variables
const REPOS_SEARCH_QUERY = "repos-search-query";
const REPOS_SEARCH_DATA = "repos-search-data";
const REPOS_SEARCH_PAGE = "repos-search-page";

const SearchRepos = () => {
  // NOTE: I used inputRef (useRef()) at first but it caused debouncing issues. Because my useEffect()'s dependency list was [isChanged] which is a boolean. The cleaner fix was to keep watch of the input's value state and make the useEffect() depend on it. That way, the timeout is cleaned out per keystroke and restarted to wait for 500ms from THE LAST KEYSTROKE.
  //   (Removed these for the above reasons)
  //   const [isChanged, setIsChanged] = useState(false);
  //   const debouncedRef = useRef<boolean>(true);

  // inputValue => Value of the controlled input field (state) (persistent)
  // searchQuery => Value of search query parameter "q" (state) (persistent)
  const [inputValue, setInputValue] = useState(() => {
    const localStorageQuery = localStorage.getItem(REPOS_SEARCH_QUERY);
    return localStorageQuery ?? "";
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    const localStorageQuery = localStorage.getItem(REPOS_SEARCH_QUERY);
    return localStorageQuery ?? "";
  });

  // Boolean to check whether it's the first render or not (used later)
  const initialRenderRef = useRef(true);

  // data => Carries API's response from /search/repositories?q=searchQuery
  const [data, setData] = useState<SearchRepositories | null>(() => {
    const localStorageData = localStorage.getItem(REPOS_SEARCH_DATA);
    const sanitizedData = localStorageData
      ? (JSON.parse(localStorageData) as SearchRepositories)
      : null;
    return sanitizedData;
  });

  // UI Loading State (for the entire component)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Error state
  const [error, setError] = useState<string | null>(null);

  // repos => data.items
  const repos = data ? data.items : null;

  //   GitHub API's Limitation: Requesting data beyond 1000 renders error status 422
  const SEARCH_DATA_LIMIT = 1000;
  const PER_PAGE = 12;

  // page => pagination and API's search parameter "page"
  const [page, setPage] = useState<number>(() => {
    const localStoragePage = Number(
      localStorage.getItem(REPOS_SEARCH_PAGE) ?? 1,
    );
    return Number.isInteger(localStoragePage) ? localStoragePage : 1;
  });

  // API's useEffect()
  useEffect(() => {
    const getData = async () => {
      // Constructing the search parameters sent to the API
      const searchQueryParams = new URLSearchParams();
      searchQueryParams.append("q", searchQuery.trim());
      searchQueryParams.append("per_page", PER_PAGE.toString());
      searchQueryParams.append("page", page.toString());
      // API call: /search/repositories
      try {
        setError(null);
        const data = await searchRepositories(searchQueryParams);
        if (data) {
          setData(data);
          localStorage.setItem(REPOS_SEARCH_DATA, JSON.stringify(data));
          localStorage.setItem(REPOS_SEARCH_PAGE, String(page));
        }
        console.log(data);
        for (const entry of searchQueryParams.entries()) {
          console.log(entry[0], ": ", entry[1]);
        }
      } catch (error) {
        console.log(error);
        setError(
          error instanceof Error ? error.message : "Something went wrong",
        );
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // If this is the initial render, no need to call the API UNLESS data was not pre-filled via localStorage
    // NOTE: For <StrictMode> (development-only), the API will be called on each refresh. Because the second render will show initialRenderRef.current = false (so it re-fetches). This problem DOES NOT EXIST on production build.
    if (initialRenderRef.current) {
      if (!data) {
        setIsLoading(true);
        getData();
      } else {
        // No loading state since the data was persisted. Therefore, set isLoading to false
        setIsLoading(false);
      }
      initialRenderRef.current = false;
    } else {
      setIsLoading(true);
      getData();
    }
  }, [searchQuery, page]);

  // Timeout (debouncing) useEffect()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const nextQuery = inputValue.trim();
      if (searchQuery !== nextQuery) {
        setPage(1);
        setSearchQuery(inputValue);
        localStorage.setItem(REPOS_SEARCH_QUERY, inputValue);
      }
    }, DEBOUNCE_DURATION_MS);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  // TODO: Remove this later
  useEffect(() => {
    console.log("State: ", searchQuery);
  }, [searchQuery]);

  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={2}>
        <Stack spacing={1}>
          <label htmlFor="search-query">Search Repositories</label>
          <Stack spacing={2} direction={"row"}>

          <TextField
            id="search-query"
            name="search-query"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            sx={{flex: 1}}
            placeholder="Search for repositories by their names here"
          />
          <Button variant="outlined" onClick={()=>setInputValue("")}>Clear</Button>
          </Stack>
        </Stack>
        {error && <ErrorMessage error={error} />}
        {!isLoading && repos && (
          <Grid container spacing={2} columns={{ lg: 3, md: 2, xs: 1 }}>
            {repos.map((repo) => (
              <Grid key={repo.id} size={1} sx={{ display: "flex" }}>
                <SearchRepoCard repo={repo} />
              </Grid>
            ))}
          </Grid>
        )}
        {isLoading && (
          <Grid spacing={2} container columns={{ lg: 3, md: 2, xs: 1 }}>
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).map(
              (_, index) => (
                <Grid key={index} size={1}>
                  <Skeleton variant="rectangular" height={200} />
                </Grid>
              ),
            )}
          </Grid>
        )}
        {!isLoading && data && data.total_count > 0 && (
          <Pagination
            page={page}
            onChange={(_, p) => setPage(p)}
            shape="rounded"
            variant="outlined"
            sx={{ alignSelf: "center" }}
            count={
              data.total_count > SEARCH_DATA_LIMIT
                ? Math.ceil(SEARCH_DATA_LIMIT / PER_PAGE)
                : Math.ceil(data?.total_count / PER_PAGE)
            }
          />
        )}
      </Stack>
    </Container>
  );
};

export default SearchRepos;
