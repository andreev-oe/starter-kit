import { create } from 'zustand';

export const APP_THEME_MODES = {
  dark: 'dark',
  light: 'light',
} as const;

export type AppThemeMode = (typeof APP_THEME_MODES)[keyof typeof APP_THEME_MODES];

type AppThemeState = {
  setThemeMode: (themeMode: AppThemeMode) => void;
  themeMode: AppThemeMode;
  toggleThemeMode: () => void;
};

/** Хранит глобальное состояние выбранной темы React-приложения. */
export const useAppThemeStore = create<AppThemeState>((set) => {
  return {
    setThemeMode: (themeMode) => {
      set({ themeMode });
    },
    themeMode: APP_THEME_MODES.light,
    toggleThemeMode: () => {
      set((state) => {
        return {
          themeMode: state.themeMode === APP_THEME_MODES.dark ? APP_THEME_MODES.light : APP_THEME_MODES.dark,
        };
      });
    },
  };
});
