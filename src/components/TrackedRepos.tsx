import { useTracksStore } from "@/stores/track-store";
import {
  Box,
  Button,
  Container,
  Fade,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import TrackedRepoCard from "./ui/TrackedRepoCard";
import { BarChart } from "@mui/x-charts/BarChart";

const TrackedRepos = () => {
  const trackedRepos = useTracksStore((state) => state.trackedRepos);
  const refreshTrackedRepo = useTracksStore(
    (state) => state.refreshTrackedRepo,
  );

  const refreshAll = () => {
    trackedRepos.forEach((trackedRepo) => refreshTrackedRepo(trackedRepo.id));
  };

  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">Tracked Repositories</Typography>
            <Fade in={trackedRepos.length > 0}>
              <Button variant="outlined" onClick={refreshAll}>
                Refresh All
              </Button>
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
            <Typography variant="h2">Tracked Stars/Issues Chart</Typography>

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
