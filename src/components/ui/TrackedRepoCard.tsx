import { useTracksStore } from "@/stores/track-store";
import type { Repository } from "@/types/types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { CardActions, Skeleton, Stack } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

type TrackedRepoCardProps = {
  repo: Repository;
};

const TrackedRepoCard = ({ repo }: TrackedRepoCardProps) => {
  const removeTrackedRepo = useTracksStore((state) => state.removeTrackedRepo);
  const refreshTrackedRepo = useTracksStore(
    (state) => state.refreshTrackedRepo,
  );

  // FOR TESTING PURPOSES, COMMENT THIS AND UNCOMMENT THE OTHER "status" BELOW
  const status = useTracksStore((state) => state.statusById[repo.id]) ?? {
    status: "idle",
    error: null,
  };

  //   const status = { status: "error", error: "An error has occured" };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status.status === "error" ? (
        <>
          <Stack
            spacing={1}
            sx={{
              flex: 1,
              minHeight: 150,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <WarningAmberIcon color="error" fontSize="large" />

            <Typography color="error">{status.error}</Typography>
          </Stack>

          <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
            <Button
              variant="outlined"
              onClick={() => void refreshTrackedRepo(repo.id)}
            >
              Retry
            </Button>

            <Button
              variant="outlined"
              onClick={() => removeTrackedRepo(repo.id)}
            >
              Untrack
            </Button>
          </CardActions>
        </>
      ) : status.status === "loading" ? (
        <Skeleton variant="rectangular" height={200} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pr: 2,
            }}
          >
            <CardHeader
              avatar={
                <Link href={repo.owner.html_url} underline="none">
                  <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} />
                </Link>
              }
              title={
                <Link href={repo.html_url} underline="hover">
                  {repo.name}
                </Link>
              }
              subheader={
                <Link
                  href={repo.owner.html_url}
                  color="inherit"
                  underline="hover"
                >
                  {repo.owner.login}
                </Link>
              }
            />
          </Box>
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
          >
            <Typography sx={{ flex: 1 }} variant="subtitle2">
              {repo.description ?? "No description provided."}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <StarIcon fontSize="inherit" color="warning"></StarIcon>
                <Typography variant="body2" sx={{ lineHeight: 1 }}>
                  {repo.stargazers_count.toLocaleString()}
                </Typography>
              </Box>
              <Box
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}
              >
                <ErrorOutlineOutlinedIcon fontSize="inherit" color="success" />
                <Typography
                  variant="body2"
                  sx={{ lineHeight: 1 }}
                  color="success"
                >
                  {repo.open_issues_count.toLocaleString()} open
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2">
                  Last Committed: {new Date(repo.pushed_at).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              pr: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={() => refreshTrackedRepo(repo.id)}
            >
              Refresh
            </Button>
            <Button
              variant="outlined"
              sx={{ flexShrink: 0 }}
              onClick={() => removeTrackedRepo(repo.id)}
            >
              Untrack
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

export default TrackedRepoCard;
