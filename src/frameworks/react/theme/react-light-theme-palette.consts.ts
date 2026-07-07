import { amber, blue, green, grey, orange, red } from '@mui/material/colors';
import { alpha, type Palette, type SimplePaletteColorOptions } from '@mui/material/styles';

import { BLACK_COLOR, WHITE_COLOR } from './react-theme-palette.consts';

const LIGHT_TEXT_PRIMARY_COLOR = '#000000de';
const LIGHT_TEXT_SECONDARY_COLOR = '#00000099';
const LIGHT_TEXT_DISABLED_COLOR = '#00000061';
const LIGHT_BACKGROUND_DEFAULT_COLOR = '#ffffff';
const LIGHT_BACKGROUND_PAPER_COLOR = '#ffffff';
const LIGHT_BACKGROUND_LIGHT_COLOR = '#fff7ed';
const LIGHT_BACKGROUND_DARK_COLOR = '#ffedd5';

export const LIGHT_PRIMARY_PALETTE: Palette['primary'] = {
  main: orange[800],
  light: orange[500],
  dark: orange[900],
  contrastText: WHITE_COLOR,
  selected: alpha(orange[500], 0.12),
  hover: alpha(orange[800], 0.08),
  focusVisible: alpha(orange[800], 0.3),
  outlinedBorder: alpha(orange[800], 0.5),
};

export const LIGHT_SECONDARY_PALETTE: SimplePaletteColorOptions = {
  main: grey[300],
  light: grey[100],
  dark: grey[700],
  contrastText: BLACK_COLOR,
  selected: alpha(grey[500], 0.08),
  hover: alpha(grey[500], 0.08),
};

export const LIGHT_ERROR_PALETTE: Palette['error'] = {
  main: red[700],
  light: red[400],
  dark: red[800],
  contrastText: WHITE_COLOR,
  selected: alpha(red[700], 0.08),
  hover: alpha(red[700], 0.08),
  focusVisible: alpha(red[700], 0.3),
  outlinedBorder: alpha(red[700], 0.5),
};

export const LIGHT_WARNING_PALETTE: Palette['warning'] = {
  main: amber[700],
  light: amber[400],
  dark: amber[800],
  contrastText: BLACK_COLOR,
  selected: alpha(amber[700], 0.12),
  hover: alpha(amber[700], 0.08),
  focusVisible: alpha(amber[700], 0.3),
  outlinedBorder: alpha(amber[700], 0.5),
};

export const LIGHT_INFO_PALETTE: Palette['info'] = {
  main: blue[700],
  light: blue[400],
  dark: blue[800],
  contrastText: WHITE_COLOR,
  selected: alpha(blue[700], 0.08),
  hover: alpha(blue[700], 0.08),
  focusVisible: alpha(blue[700], 0.3),
  outlinedBorder: alpha(blue[700], 0.5),
};

export const LIGHT_SUCCESS_PALETTE: Palette['success'] = {
  main: green[700],
  light: green[400],
  dark: green[800],
  contrastText: WHITE_COLOR,
  selected: alpha(green[700], 0.08),
  hover: alpha(green[700], 0.08),
  focusVisible: alpha(green[700], 0.3),
  outlinedBorder: alpha(green[700], 0.5),
};

export const LIGHT_TEXT_PALETTE: Palette['text'] = {
  primary: LIGHT_TEXT_PRIMARY_COLOR,
  secondary: LIGHT_TEXT_SECONDARY_COLOR,
  disabled: LIGHT_TEXT_DISABLED_COLOR,
  hover: alpha(BLACK_COLOR, 0.04),
};

export const LIGHT_BACKGROUND_PALETTE: Palette['background'] = {
  default: LIGHT_BACKGROUND_DEFAULT_COLOR,
  paper: LIGHT_BACKGROUND_PAPER_COLOR,
  light: LIGHT_BACKGROUND_LIGHT_COLOR,
  dark: LIGHT_BACKGROUND_DARK_COLOR,
};

export const LIGHT_ACTION_PALETTE: Palette['action'] = {
  active: alpha(BLACK_COLOR, 0.54),
  hover: alpha(BLACK_COLOR, 0.04),
  hoverOpacity: 0.04,
  selected: alpha(BLACK_COLOR, 0.08),
  selectedOpacity: 0.08,
  disabled: alpha(BLACK_COLOR, 0.26),
  disabledOpacity: 0.26,
  disabledBackground: alpha(BLACK_COLOR, 0.12),
  focus: alpha(BLACK_COLOR, 0.12),
  focusOpacity: 0.12,
  activatedOpacity: 0.12,
};

export const LIGHT_DIVIDER_COLOR: Palette['divider'] = alpha(grey[500], 0.12);
