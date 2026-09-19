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
    </Container>
  );
};

export default TrackedRepos;
