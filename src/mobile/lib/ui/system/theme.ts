"use client";

import { createTheme } from "@mui/material/styles";
import { poppinsFont } from "./fonts";

declare module "@mui/material/styles" {
  interface Palette {
    navigation: {
      primary: string;
    };
    neutral: {
      0: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
    };
    brand: {
      0: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      darkCyan: string;
      blue: string;
      red: string;
      orange: string;
      purple: string;
    };
  }
  interface PaletteOptions {
    navigation?: {
      primary?: string;
    };
    neutral: {
      0?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
      1000?: string;
      1100?: string;
      1200?: string;
    };
    brand: {
      0?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
      1000?: string;
      darkCyan?: string;
      blue?: string;
      red?: string;
      orange?: string;
      purple?: string;
    };
  }
  interface TypeBackground {
    primary: string;
  }
}

export const palette = {
  primary: "#168B8D",
  primaryDark: "#168B8D",
  secondary: "#149773",
  secondaryDark: "#149773",
  navigationPrimary: "#39AC8D",
  backgroundPrimary: "#EFF0F0",
  dividerPrimary: "#6D7878",
  // I'd like to import all of the colors from the figma design
  // however, I don't see a way to copy all of the colors (it does not let me)
  neutral: {
    0: "#FFFFFF",
    100: "#F9FAF9",
    200: "#CFD3D3",
    300: "#D8DAD9",
    500: "#787474",
    900: "#2E3333",
  },
  brand: {
    200: "#ABE3D4",
    300: "#81D5BE",
    800: "#127173",
    900: "#0B5641",
    darkCyan: "#1AA4A7",
    blue: "#1AA5A8",
    orange: "#F79F1A",
    purple: "#340C7F",
  },
  error: {
    main: "#F82E58",
    light: "#FA5273",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      dark: palette.primaryDark,
    },
    secondary: {
      main: palette.secondary,
      dark: palette.secondaryDark,
    },
    error: {
      main: palette.error.main,
      light: palette.error.light,
    },
    navigation: {
      primary: palette.navigationPrimary,
    },
    background: {
      default: palette.backgroundPrimary,
      primary: palette.neutral[0],
    },
    neutral: {
      0: palette.neutral[0],
      100: palette.neutral[100],
      200: palette.neutral[200],
      300: palette.neutral[300],
      500: palette.neutral[500],
      900: palette.neutral[900],
    },
    brand: {
      200: palette.brand[200],
      300: palette.brand[300],
      800: palette.brand[800],
      900: palette.brand[900],
      darkCyan: palette.brand.darkCyan,
      blue: palette.brand.blue,
      red: palette.error.main,
      orange: palette.brand.orange,
      purple: palette.brand.purple,
    },
  },
  typography: {
    fontFamily: poppinsFont.style.fontFamily,
    h1: {
      fontSize: "18px",
      fontWeight: 700,
      color: palette.brand[800],
    },
    h2: {
      fontSize: "16px",
      fontWeight: 700,
      color: palette.primary,
    },
  },
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: palette.dividerPrimary,
        },
      },
    },
  },
});
