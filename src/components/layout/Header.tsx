import {
  AppBar,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";

import type { TabType } from "@/types/types";

type HeaderProps = {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
};

const Header = ({ tab, setTab }: HeaderProps) => {
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
            <Tab value="repo" label="Repositories"></Tab>
            <Tab value="tracked" label="Track"></Tab>
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
