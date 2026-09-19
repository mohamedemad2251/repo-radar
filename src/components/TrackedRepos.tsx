import { useTracksStore } from "@/stores/track-store";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import RepoCard from "./ui/RepoCard";

const TrackedRepos = () => {
  const { trackedRepos } = useTracksStore();
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
          <Button variant="outlined">Refresh All</Button>
        </Box>
        <Grid container spacing={2} columns={{ lg: 3, md: 2, xs: 1 }}>
          {trackedRepos.map((trackedRepo) => (
            <Grid key={trackedRepo.id} size={1} sx={{ display: "flex" }}>
              <RepoCard repo={trackedRepo} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};

export default TrackedRepos;
