import type { Repository } from "@/types/types";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

type RepoCardContentProps = {
    repo: Repository;
};

const RepoCardContent = ({repo}: RepoCardContentProps) => {
    return (
        <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}
      >
        <Typography
          sx={{
            flex: 1,
            overflowWrap: "anywhere",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,
          }}
          variant="subtitle2"
        >
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
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
            <ErrorOutlineOutlinedIcon fontSize="inherit" color="success" />
            <Typography variant="body2" sx={{ lineHeight: 1 }} color="success">
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
    )
};

export default RepoCardContent;