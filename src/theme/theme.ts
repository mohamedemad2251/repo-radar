import { createTheme } from "@mui/material/styles";

// Material UI lets you customize the theme via <ThemeProvider>{children}</ThemeProvider>. For the provider, you need to specify a theme in its props. This theme is defined here in @/theme/theme.ts
// Reference: https://mui.com/material-ui/customization/theming/?_gl=1*1em5dwr*_up*MQ..*_ga*MTE3MTg1MTk2Mi4xNzg5NTkzOTk4*_ga_5NXDQLC2ZK*czE3ODk1OTM5OTckbzEkZzAkdDE3ODk1OTQwMTgkajM5JGwwJGgw
export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  defaultColorScheme: "dark",
  // Since we'll be defining both light & dark themes, a simple "palette" won't do (too general). Therefore, we defined colorSchemes
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#0d275e",
          light: "#60a5fa",
          dark: "#1d4ed8",
          contrastText: "#ffffff",
        },

        secondary: {
          main: "#b2a8c4",
        },

        background: {
          default: "#f8fafc",
          paper: "#ffffff",
        },

        text: {
          primary: "#0f172a",
          secondary: "#445975",
        },

        error: {
          main: "#ce4646",
        },
      },
    },

    dark: {
      palette: {
        primary: {
          main: "#60a5fa",
          light: "#93c5fd",
          dark: "#2563eb",
          contrastText: "#0f172a",
        },
        secondary: {
          main: "#120d22",
        },
        background: {
          default: "#14171f",
          paper: "#1e293b",
        },
        text: {
          primary: "#f8fafc",
          secondary: "#94a3b8",
        },
        error: {
          main: "#f87171",
        },
      },
    },
  },

  typography: {
    fontFamily: ["Roboto", "Arial", "sans-serif"].join(","),

    h1: {
      fontSize: "2rem",
      fontWeight: 700,
    },

    h2: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 10,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },

    MuiCard: {
      defaultProps: {
        variant: "outlined",
      },

      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});
