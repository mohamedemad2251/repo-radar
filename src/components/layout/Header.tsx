import type { TabType } from "@/types/types";
import { useTracksStore } from "@/stores/track-store";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import ToggleTheme from "../ui/ToggleTheme";

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
          <Stack spacing={{
            md: 6,
            sm: 2,
          }} direction={"row"} sx={{ alignItems: "center"}}>
            <ToggleTheme />
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
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
