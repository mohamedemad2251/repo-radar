import { searchRepositories } from "@/services/repositories";
import { type SearchRepositories } from "@/types/types";
import { Grid, Pagination, Skeleton, Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import RepoCard from "./ui/RepoCard";

const DEBOUNCE_DURATION_MS = 500;

const SearchRepos = () => {
  // NOTE: I used inputRef (useRef()) at first but it caused debouncing issues. Because my useEffect()'s dependency list was [isChanged] which is a boolean. The cleaner fix was to keep watch of the input's value state and make the useEffect() depend on it. That way, the timeout is cleaned out per keystroke and restarted to wait for 500ms from THE LAST KEYSTROKE.
  //   (Removed these for the above reasons)
  //   const [isChanged, setIsChanged] = useState(false);
  //   const debouncedRef = useRef<boolean>(true);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [data, setData] = useState<SearchRepositories | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const repos = data ? data.items : null;

  //   GitHub API's Limitation: Requesting data beyond 1000 renders error status 422
  const DATA_LIMIT = 1000;
  const PER_PAGE = 12;

  const [page, setPage] = useState<number>(1);

  // API's useEffect()
  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const searchQueryParams = new URLSearchParams();
      searchQueryParams.append("q", searchQuery.trim());
      searchQueryParams.append("per_page", PER_PAGE.toString());
      searchQueryParams.append("page", page.toString());
      const data = await searchRepositories(searchQueryParams);
      if (data) {
        setData(data);
      }
      console.log(data);
      for (const entry of searchQueryParams.entries()) {
        console.log(entry[0], ": ", entry[1]);
      }
      setIsLoading(false);
    };

    getData();
  }, [searchQuery, page]);

  // Timeout (debouncing) useEffect()
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      setSearchQuery(inputValue);
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
          <TextField
            id="search-query"
            name="search-query"
            onChange={(e) => {
              if (e.target.value.trim() !== inputValue) {
                setInputValue(e.target.value.trim());
              }
            }}
            placeholder="Search for repositories by their names here"
          />
        </Stack>
        {!isLoading && repos && (
          <Grid container spacing={2} columns={{ lg: 3, md: 2, xs: 1 }}>
            {repos.map((repo) => (
              <Grid key={repo.id} size={1} sx={{ display: "flex" }}>
                <RepoCard repo={repo} />
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
              data.total_count > DATA_LIMIT
                ? Math.ceil(DATA_LIMIT / PER_PAGE)
                : Math.ceil(data?.total_count / PER_PAGE)
            }
          />
        )}
      </Stack>
    </Container>
  );
};

export default SearchRepos;
