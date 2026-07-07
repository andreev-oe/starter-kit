import { createTheme } from '@mui/material/styles';

import {
  ACTION_PALETTE,
  BACKGROUND_PALETTE,
  COMMON_PALETTE,
  DIVIDER_COLOR,
  ERROR_PALETTE,
  INFO_PALETTE,
  PRIMARY_PALETTE,
  SECONDARY_PALETTE,
  SUCCESS_PALETTE,
  TEXT_PALETTE,
  WARNING_PALETTE,
} from './react-theme-palette.consts';

const PALETTE_MODE = 'light';
const BORDER_RADIUS = 8;
const FONT_FAMILY = "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif";

export const reactTheme = createTheme({
  palette: {
    mode: PALETTE_MODE,
    common: COMMON_PALETTE,
    primary: PRIMARY_PALETTE,
    secondary: SECONDARY_PALETTE,
    error: ERROR_PALETTE,
    warning: WARNING_PALETTE,
    info: INFO_PALETTE,
    success: SUCCESS_PALETTE,
    text: TEXT_PALETTE,
    background: BACKGROUND_PALETTE,
    action: ACTION_PALETTE,
    divider: DIVIDER_COLOR,
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
  typography: {
    fontFamily: FONT_FAMILY,
  },
});
