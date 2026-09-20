import type { Repository } from "@/types/types";
import Card from "@mui/material/Card";

import { useTracksStore } from "@/stores/track-store";
import RepoCardContent from "./RepoCardContent";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

type SearchRepoCardProps = {
  repo: Repository;
};

const SearchRepoCard = ({ repo }: SearchRepoCardProps) => {
  const addTrackedRepo = useTracksStore((state) => state.addTrackedRepo);
  const removeTrackedRepo = useTracksStore((state) => state.removeTrackedRepo);

  const isTracked = useTracksStore((state) =>
    state.trackedRepos.some((trackedRepo) => trackedRepo.id === repo.id),
  );

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
            <Link href={repo.owner.html_url} color="inherit" underline="hover">
              {repo.owner.login}
            </Link>
          }
        />
        {!isTracked ? (
          <Button
            variant="outlined"
            sx={{ flexShrink: 0 }}
            onClick={() => addTrackedRepo(repo)}
          >
            Track
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ flexShrink: 0 }}
            onClick={() => removeTrackedRepo(repo.id)}
          >
            Untrack
          </Button>
        )}
      </Box>
      <RepoCardContent repo={repo} />
    </Card>
  );
};

export default SearchRepoCard;
