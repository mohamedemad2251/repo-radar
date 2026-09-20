import Header from "@/components/layout/Header";
import type { TabType } from "@/types/types";
import { useState } from "react";
import SearchRepos from "@/components/SearchRepos";
import TrackedRepos from "@/components/TrackedRepos";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

function App() {
  const [tab, setTab] = useState<TabType>("repo");
  return (
    <>
      <Header tab={tab} setTab={setTab} />
      {/* Problem: There's a tiny window between the "repo" container and "tracked" container where they are both in the DOM. That pushes the upcoming tab a bit down then it resettles when the outgoing tab unmounts. */}
      {/* Solution: Use grid and occupy both in the same grid part via gridArea */}
      <main style={{ display: "grid" }}>
        <Fade in={tab === "repo"} unmountOnExit>
          <Box sx={{ gridArea: "1 / 1" }}>
            <SearchRepos />
          </Box>
        </Fade>

        <Fade in={tab === "tracked"} unmountOnExit>
          <Box sx={{ gridArea: "1 / 1" }}>
            <TrackedRepos />
          </Box>
        </Fade>
      </main>
    </>
  );
}

export default App;
