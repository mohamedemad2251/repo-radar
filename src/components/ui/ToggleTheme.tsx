import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import Switch from "@mui/material/Switch";
import { useColorScheme } from "@mui/material/styles";

const ToggleTheme = () => {
  // mode: Current mode, systemMode: user's prefered theme/mode
  const { mode, systemMode, setMode } = useColorScheme();

  if (!mode) return null;

  const resolvedMode = mode === "system" ? systemMode : mode;
  const isDark = resolvedMode === "dark";

  return (
    <Switch
      checked={isDark}
      onChange={(_, checked) => setMode(checked ? "dark" : "light")}
      icon={
        <LightModeRoundedIcon
          sx={{
            color: "#f59e0b",
          }}
        />
      }
      checkedIcon={
        <DarkModeRoundedIcon
          sx={{
            color: "#c4b5fd",
          }}
        />
      }
      slotProps={{
        input: {
          "aria-label": `Switch to ${isDark ? "light" : "dark"} mode`,
        },
      }}
      sx={{
        width: 62,
        height: 34,
        p: "3px",

        "& .MuiSwitch-switchBase": {
          p: "4px",
          transitionDuration: "250ms",

          "&.Mui-checked": {
            transform: "translateX(28px)",

            "& + .MuiSwitch-track": {
              backgroundColor: "#334155",
              opacity: 1,
            },
          },
        },

        "& .MuiSwitch-thumb": {
          width: 26,
          height: 26,
          padding: "5px",
          borderRadius: "50%",
          boxShadow: "0 2px 6px rgb(0 0 0 / 30%)",
        },

        "& .MuiSwitch-track": {
          borderRadius: 17,
          backgroundColor: "#bfdbfe",
          opacity: 1,
        },
      }}
    />
  );
};

export default ToggleTheme;
