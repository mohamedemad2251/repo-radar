import type { Repository } from "@/types/types";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

type RepoCardProps = {
  repo: Repository;
};

const RepoCard = ({ repo }: RepoCardProps) => {
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
            <Link href={repo.owner.html_url}>
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
        <Button sx={{ flexShrink: 0 }}>Track</Button>
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
            <Typography  variant="body2" sx={{ lineHeight: 1 }}>
              {repo.stargazers_count.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
            <ErrorOutlineOutlinedIcon fontSize="inherit"  color="success"/>
            <Typography variant="body2" sx={{ lineHeight: 1 }} color="success">
              {repo.open_issues_count.toLocaleString()} open
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Last Committed: {new Date(repo.pushed_at).toLocaleString()}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RepoCard;
