import { useTracksStore } from "@/stores/track-store";
import type { Repository } from "@/types/types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import { CardActions, Skeleton } from "@mui/material";
import ErrorMessage from "@/components/ui/messages/ErrorMessage";
import RepoCardContent from "@/components/ui/RepoCardContent";

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

  // const status = { status: "error", error: "An error has occured 403" };

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        minHeight: 200,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {status.status === "error" ? (
        <>
          <ErrorMessage error={status.error} />
          <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
            <Button
              variant="outlined"
              onClick={() => refreshTrackedRepo(repo.id)}
            >
              Retry
            </Button>

            <Button
              variant="outlined"
              onClick={() => refreshTrackedRepo(repo.id, true)}
            >
              Show Last Snapshot
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
        <Skeleton variant="rectangular" sx={{ flex: 1 }} />
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
          <RepoCardContent repo={repo} />

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
