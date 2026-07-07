import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';

import { APP_THEME_MODES, useAppThemeStore } from '../store/app-theme.store';

const REACT_THEME_MODE_TOGGLE_TEXTS = {
  ariaLabel: 'Toggle theme mode',
  label: 'Dark theme',
  tooltip: 'Toggle theme mode',
} as const;

/** Переключает глобальный режим темы React-приложения. */
export default function ReactThemeModeToggle() {
  const themeMode = useAppThemeStore((state) => state.themeMode);
  const toggleThemeMode = useAppThemeStore((state) => state.toggleThemeMode);
  const isDarkThemeMode = themeMode === APP_THEME_MODES.dark;

  return (
    <Tooltip title={REACT_THEME_MODE_TOGGLE_TEXTS.tooltip}>
      <FormControlLabel
        control={
          <Switch
            checked={isDarkThemeMode}
            slotProps={{
              input: {
                'aria-label': REACT_THEME_MODE_TOGGLE_TEXTS.ariaLabel,
              },
            }}
            onChange={toggleThemeMode}
          />
        }
        label={REACT_THEME_MODE_TOGGLE_TEXTS.label}
      />
    </Tooltip>
  );
}
