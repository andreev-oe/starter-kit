import { amber, blue, green, grey, orange, red } from '@mui/material/colors';
import { alpha, type Palette, type SimplePaletteColorOptions } from '@mui/material/styles';

const WHITE_COLOR = '#ffffff';
const BLACK_COLOR = '#000000';
const TEXT_PRIMARY_COLOR = '#000000de';
const TEXT_SECONDARY_COLOR = '#00000099';
const TEXT_DISABLED_COLOR = '#00000061';
const BACKGROUND_DEFAULT_COLOR = '#ffffff';
const BACKGROUND_PAPER_COLOR = '#ffffff';
const BACKGROUND_LIGHT_COLOR = '#fff7ed';
const BACKGROUND_DARK_COLOR = '#ffedd5';

export const PRIMARY_PALETTE: Palette['primary'] = {
  main: orange[800],
  light: orange[500],
  dark: orange[900],
  contrastText: WHITE_COLOR,
  selected: alpha(orange[500], 0.12),
  hover: alpha(orange[800], 0.08),
  focusVisible: alpha(orange[800], 0.3),
  outlinedBorder: alpha(orange[800], 0.5),
};

export const SECONDARY_PALETTE: SimplePaletteColorOptions = {
  main: grey[300],
  light: grey[100],
  dark: grey[700],
  contrastText: BLACK_COLOR,
  selected: alpha(grey[500], 0.08),
  hover: alpha(grey[500], 0.08),
};

export const ERROR_PALETTE: Palette['error'] = {
  main: red[700],
  light: red[400],
  dark: red[800],
  contrastText: WHITE_COLOR,
  selected: alpha(red[700], 0.08),
  hover: alpha(red[700], 0.08),
  focusVisible: alpha(red[700], 0.3),
  outlinedBorder: alpha(red[700], 0.5),
};

export const WARNING_PALETTE: Palette['warning'] = {
  main: amber[700],
  light: amber[400],
  dark: amber[800],
  contrastText: BLACK_COLOR,
  selected: alpha(amber[700], 0.12),
  hover: alpha(amber[700], 0.08),
  focusVisible: alpha(amber[700], 0.3),
  outlinedBorder: alpha(amber[700], 0.5),
};

export const INFO_PALETTE: Palette['info'] = {
  main: blue[700],
  light: blue[400],
  dark: blue[800],
  contrastText: WHITE_COLOR,
  selected: alpha(blue[700], 0.08),
  hover: alpha(blue[700], 0.08),
  focusVisible: alpha(blue[700], 0.3),
  outlinedBorder: alpha(blue[700], 0.5),
};

export const SUCCESS_PALETTE: Palette['success'] = {
  main: green[700],
  light: green[400],
  dark: green[800],
  contrastText: WHITE_COLOR,
  selected: alpha(green[700], 0.08),
  hover: alpha(green[700], 0.08),
  focusVisible: alpha(green[700], 0.3),
  outlinedBorder: alpha(green[700], 0.5),
};

export const TEXT_PALETTE: Palette['text'] = {
  primary: TEXT_PRIMARY_COLOR,
  secondary: TEXT_SECONDARY_COLOR,
  disabled: TEXT_DISABLED_COLOR,
  hover: alpha(BLACK_COLOR, 0.04),
};

export const BACKGROUND_PALETTE: Palette['background'] = {
  default: BACKGROUND_DEFAULT_COLOR,
  paper: BACKGROUND_PAPER_COLOR,
  light: BACKGROUND_LIGHT_COLOR,
  dark: BACKGROUND_DARK_COLOR,
};

export const ACTION_PALETTE: Palette['action'] = {
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

export const COMMON_PALETTE: Palette['common'] = {
  black: BLACK_COLOR,
  white: WHITE_COLOR,
};

export const DIVIDER_COLOR: Palette['divider'] = alpha(grey[500], 0.12);
