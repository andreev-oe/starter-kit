import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface PaletteColor {
    selected: string;
    hover: string;
    focusVisible: string;
    outlinedBorder: string;
  }

  interface SimplePaletteColorOptions {
    selected?: string;
    hover?: string;
    focusVisible?: string;
    outlinedBorder?: string;
  }

  interface TypeText {
    hover: string;
  }

  interface TypeBackground {
    light: string;
    dark: string;
  }
}
