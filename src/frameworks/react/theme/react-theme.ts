import { createTheme } from '@mui/material/styles';

import { APP_THEME_MODES } from '../store/app-theme.store';
import type { AppThemeMode } from '../store/app-theme.store';
import {
  DARK_ACTION_PALETTE,
  DARK_BACKGROUND_PALETTE,
  DARK_DIVIDER_COLOR,
  DARK_ERROR_PALETTE,
  DARK_INFO_PALETTE,
  DARK_PRIMARY_PALETTE,
  DARK_SECONDARY_PALETTE,
  DARK_SUCCESS_PALETTE,
  DARK_TEXT_PALETTE,
  DARK_WARNING_PALETTE,
} from './react-dark-theme-palette.consts';
import {
  LIGHT_ACTION_PALETTE,
  LIGHT_BACKGROUND_PALETTE,
  LIGHT_DIVIDER_COLOR,
  LIGHT_ERROR_PALETTE,
  LIGHT_INFO_PALETTE,
  LIGHT_PRIMARY_PALETTE,
  LIGHT_SECONDARY_PALETTE,
  LIGHT_SUCCESS_PALETTE,
  LIGHT_TEXT_PALETTE,
  LIGHT_WARNING_PALETTE,
} from './react-light-theme-palette.consts';
import { COMMON_PALETTE } from './react-theme-palette.consts';

const BORDER_RADIUS = 8;
const FONT_FAMILY = "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif";

/** Создает Material UI тему для выбранного режима отображения. */
export function createReactTheme(themeMode: AppThemeMode) {
  const isDarkThemeMode = themeMode === APP_THEME_MODES.dark;

  return createTheme({
    palette: {
      mode: themeMode,
      common: COMMON_PALETTE,
      primary: isDarkThemeMode ? DARK_PRIMARY_PALETTE : LIGHT_PRIMARY_PALETTE,
      secondary: isDarkThemeMode ? DARK_SECONDARY_PALETTE : LIGHT_SECONDARY_PALETTE,
      error: isDarkThemeMode ? DARK_ERROR_PALETTE : LIGHT_ERROR_PALETTE,
      warning: isDarkThemeMode ? DARK_WARNING_PALETTE : LIGHT_WARNING_PALETTE,
      info: isDarkThemeMode ? DARK_INFO_PALETTE : LIGHT_INFO_PALETTE,
      success: isDarkThemeMode ? DARK_SUCCESS_PALETTE : LIGHT_SUCCESS_PALETTE,
      text: isDarkThemeMode ? DARK_TEXT_PALETTE : LIGHT_TEXT_PALETTE,
      background: isDarkThemeMode ? DARK_BACKGROUND_PALETTE : LIGHT_BACKGROUND_PALETTE,
      action: isDarkThemeMode ? DARK_ACTION_PALETTE : LIGHT_ACTION_PALETTE,
      divider: isDarkThemeMode ? DARK_DIVIDER_COLOR : LIGHT_DIVIDER_COLOR,
    },
    shape: {
      borderRadius: BORDER_RADIUS,
    },
    typography: {
      fontFamily: FONT_FAMILY,
    },
  });
}
