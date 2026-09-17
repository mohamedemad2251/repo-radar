import { Stack, TextField } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useRef, useState } from "react";

const DEBOUNCE_DURATION_MS = 500;

const SearchRepos = () => {
  const [isChanged, setIsChanged] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState(
    inputRef.current ? inputRef.current.value : "", 
  );
  const debouncedRef = useRef<boolean>(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsChanged(false);
    }, DEBOUNCE_DURATION_MS);

    if (isChanged === true) {
      debouncedRef.current = false;
    } else {
      if (debouncedRef.current === false) {
        // console.log(inputRef.current?.value.trim());
        setSearchQuery(inputRef.current ? inputRef.current?.value.trim() : "");
        debouncedRef.current = true;
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isChanged]);

  useEffect(() => {
    console.log("State: ", searchQuery);
  }, [searchQuery]);

  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={1}>
        <label htmlFor="search-query">Search Repositories</label>
        <TextField
          inputRef={inputRef}
          id="search-query"
          name="search-query"
          onChange={() => {
            setIsChanged(true);
          }}
          placeholder="Search for repositories by their names here"
        ></TextField>
      </Stack>
    </Container>
  );
};

export default SearchRepos;
