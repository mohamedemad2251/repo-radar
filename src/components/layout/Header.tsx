import {
  AppBar,
  Badge,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";

import type { TabType } from "@/types/types";
import { useTracksStore } from "@/stores/track-store";

type HeaderProps = {
  tab: TabType;
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
};

const Header = ({ tab, setTab }: HeaderProps) => {
  const trackedRepos = useTracksStore((state) => state.trackedRepos);
  return (
    <AppBar
      position="sticky"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        // Spacing is configured to be 8px by default, so 4x8 = 32px.
        mb: 4,
      }}
      color="secondary"
      enableColorOnDark
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography component="h1" variant="h2" sx={{ flexGrow: 1 }}>
            Repo Radar
          </Typography>
          <Tabs value={tab} onChange={(_, value: TabType) => setTab(value)}>
            <Tab value="repo" label="Repositories" />
            <Tab
              value="tracked"
              label={
                <Badge
                  badgeContent={trackedRepos.length}
                  invisible={trackedRepos.length === 0}
                  color="info"
                  sx={{
                    "& .MuiBadge-badge": {
                      top: -14,
                      right: -16,
                      transform: "none",
                    },
                  }}
                >
                  Tracked
                </Badge>
              }
            />
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
