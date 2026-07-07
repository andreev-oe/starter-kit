import { amber, blue, green, grey, orange, red } from '@mui/material/colors';
import { alpha, type Palette, type SimplePaletteColorOptions } from '@mui/material/styles';

import { BLACK_COLOR, WHITE_COLOR } from './react-theme-palette.consts';

const DARK_TEXT_PRIMARY_COLOR = '#f8fafc';
const DARK_TEXT_SECONDARY_COLOR = '#cbd5e1';
const DARK_TEXT_DISABLED_COLOR = '#64748b';
const DARK_BACKGROUND_DEFAULT_COLOR = '#101418';
const DARK_BACKGROUND_PAPER_COLOR = '#171d22';
const DARK_BACKGROUND_LIGHT_COLOR = '#1f2933';
const DARK_BACKGROUND_DARK_COLOR = '#0b0f13';

export const DARK_PRIMARY_PALETTE: Palette['primary'] = {
  main: orange[400],
  light: orange[300],
  dark: orange[700],
  contrastText: BLACK_COLOR,
  selected: alpha(orange[400], 0.16),
  hover: alpha(orange[300], 0.12),
  focusVisible: alpha(orange[300], 0.3),
  outlinedBorder: alpha(orange[300], 0.5),
};

export const DARK_SECONDARY_PALETTE: SimplePaletteColorOptions = {
  main: grey[700],
  light: grey[500],
  dark: grey[900],
  contrastText: WHITE_COLOR,
  selected: alpha(grey[400], 0.12),
  hover: alpha(grey[400], 0.1),
};

export const DARK_ERROR_PALETTE: Palette['error'] = {
  main: red[400],
  light: red[300],
  dark: red[700],
  contrastText: BLACK_COLOR,
  selected: alpha(red[400], 0.14),
  hover: alpha(red[400], 0.1),
  focusVisible: alpha(red[300], 0.3),
  outlinedBorder: alpha(red[300], 0.5),
};

export const DARK_WARNING_PALETTE: Palette['warning'] = {
  main: amber[400],
  light: amber[300],
  dark: amber[700],
  contrastText: BLACK_COLOR,
  selected: alpha(amber[400], 0.16),
  hover: alpha(amber[400], 0.1),
  focusVisible: alpha(amber[300], 0.3),
  outlinedBorder: alpha(amber[300], 0.5),
};

export const DARK_INFO_PALETTE: Palette['info'] = {
  main: blue[300],
  light: blue[200],
  dark: blue[600],
  contrastText: BLACK_COLOR,
  selected: alpha(blue[300], 0.14),
  hover: alpha(blue[300], 0.1),
  focusVisible: alpha(blue[200], 0.3),
  outlinedBorder: alpha(blue[200], 0.5),
};

export const DARK_SUCCESS_PALETTE: Palette['success'] = {
  main: green[400],
  light: green[300],
  dark: green[700],
  contrastText: BLACK_COLOR,
  selected: alpha(green[400], 0.14),
  hover: alpha(green[400], 0.1),
  focusVisible: alpha(green[300], 0.3),
  outlinedBorder: alpha(green[300], 0.5),
};

export const DARK_TEXT_PALETTE: Palette['text'] = {
  primary: DARK_TEXT_PRIMARY_COLOR,
  secondary: DARK_TEXT_SECONDARY_COLOR,
  disabled: DARK_TEXT_DISABLED_COLOR,
  hover: alpha(WHITE_COLOR, 0.08),
};

export const DARK_BACKGROUND_PALETTE: Palette['background'] = {
  default: DARK_BACKGROUND_DEFAULT_COLOR,
  paper: DARK_BACKGROUND_PAPER_COLOR,
  light: DARK_BACKGROUND_LIGHT_COLOR,
  dark: DARK_BACKGROUND_DARK_COLOR,
};

export const DARK_ACTION_PALETTE: Palette['action'] = {
  active: alpha(WHITE_COLOR, 0.7),
  hover: alpha(WHITE_COLOR, 0.08),
  hoverOpacity: 0.08,
  selected: alpha(WHITE_COLOR, 0.12),
  selectedOpacity: 0.12,
  disabled: alpha(WHITE_COLOR, 0.3),
  disabledOpacity: 0.3,
  disabledBackground: alpha(WHITE_COLOR, 0.12),
  focus: alpha(WHITE_COLOR, 0.12),
  focusOpacity: 0.12,
  activatedOpacity: 0.16,
};

export const DARK_DIVIDER_COLOR: Palette['divider'] = alpha(grey[100], 0.14);
