import { useTracksStore } from "@/stores/track-store";

import TrackedRepoCard from "./ui/TrackedRepoCard";
import { BarChart } from "@mui/x-charts/BarChart";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

const TrackedRepos = () => {
  const trackedRepos = useTracksStore((state) => state.trackedRepos);
  const removeTrackedRepo = useTracksStore((state) => state.removeTrackedRepo)
  const refreshTrackedRepo = useTracksStore(
    (state) => state.refreshTrackedRepo,
  );

  const refreshAll = () => {
    trackedRepos.forEach((trackedRepo) => refreshTrackedRepo(trackedRepo.id));
  };

  const untrackAll = () => {
    trackedRepos.forEach((trackedRepo) => removeTrackedRepo(trackedRepo.id));
  };

  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {sm: "row", xs: "column"},
              gap: 2,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Tracked Repositories</Typography>
            <Fade in={trackedRepos.length > 0}>
              <Stack spacing={2} direction={"row"}>

              <Button variant="outlined" onClick={refreshAll}>
                Refresh All
              </Button>
              <Button variant="outlined" onClick={untrackAll}>
                Untrack All
              </Button>
              </Stack>
            </Fade>
          </Box>
          <Grid container spacing={2} columns={{ lg: 3, md: 2, xs: 1 }}>
            {trackedRepos.map((trackedRepo) => (
              <Grid key={trackedRepo.id} size={1} sx={{ display: "flex" }}>
                <TrackedRepoCard repo={trackedRepo} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        {trackedRepos.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">
              No tracked repos added yet. Add some!
            </Typography>
          </Box>
        )}
        {trackedRepos.length > 0 && (
          <>
            <Typography variant="h2" sx={{textAlign: {xs: "center", sm: "start"}}}>Tracked Stars/Issues Chart</Typography>

            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: trackedRepos.map((repo) => repo.full_name),
                  // We can use this to sort the trackedRepos if we want to.
                  // data: trackedRepos.sort((a,b)=>b.stargazers_count - a.stargazers_count).map((repo)=>repo),
                  categoryGapRatio: 0.6,
                  barGapRatio: 0.4,
                },
              ]}
              series={[
                {
                  label: "Stars",
                  data: trackedRepos.map((repo) => repo.stargazers_count),
                  color: "orange",
                  yAxisId: "stars",
                },
                {
                  label: "Open Issues",
                  data: trackedRepos.map((repo) => repo.open_issues_count),
                  color: "limegreen",
                  yAxisId: "issues",
                },
              ]}
              yAxis={[
                {
                  id: "stars",
                  label: "Stars",
                  position: "left",
                  width: "auto",
                  valueFormatter: (value: number) =>
                    Intl.NumberFormat("en", {
                      notation: "compact",
                    }).format(value),
                },
                {
                  id: "issues",
                  label: "Open Issues",
                  position: "right",
                  width: "auto",
                  valueFormatter: (value: number) =>
                    Intl.NumberFormat("en", {
                      notation: "compact",
                    }).format(value),
                },
              ]}
              height={300}
            />
          </>
        )}
      </Stack>
    </Container>
  );
};

export default TrackedRepos;
