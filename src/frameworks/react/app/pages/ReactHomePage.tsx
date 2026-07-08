import type { SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router';

import JsonPlaceholderTodosPanel from '../../features/json-placeholder-todos/ui/JsonPlaceholderTodosPanel';
import MvpChatPanel from '../../features/mvp-chat/ui/MvpChatPanel';
import ReactThemeModeToggle from '../../theme/ReactThemeModeToggle';
import { REACT_ROUTE_PATHS } from '../router/react-router.consts';

const REACT_HOME_PAGE_TEXTS = {
  todoTab: 'Todo',
  welcomeTab: 'Welcome',
} as const;

const REACT_HOME_PAGE_TABS = [
  {
    label: REACT_HOME_PAGE_TEXTS.welcomeTab,
    value: REACT_ROUTE_PATHS.welcome,
  },
  {
    label: REACT_HOME_PAGE_TEXTS.todoTab,
    value: REACT_ROUTE_PATHS.todo,
  },
] as const;

export default function ReactHomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeRoutePath =
    location.pathname === REACT_ROUTE_PATHS.todo ? REACT_ROUTE_PATHS.todo : REACT_ROUTE_PATHS.welcome;

  function handleRouteTabChange(_event: SyntheticEvent, routePath: string) {
    navigate(routePath);
  }

  return (
    <ReactHomePageRoot>
      <ReactHomeTabsContainer>
        <Tabs value={activeRoutePath} onChange={handleRouteTabChange}>
          {REACT_HOME_PAGE_TABS.map((reactHomePageTab) => {
            return <Tab key={reactHomePageTab.value} label={reactHomePageTab.label} value={reactHomePageTab.value} />;
          })}
        </Tabs>
        <ReactThemeModeToggle />
      </ReactHomeTabsContainer>

      {activeRoutePath === REACT_ROUTE_PATHS.welcome && (
        <ReactHomeWelcomeContainer>
          <MvpChatPanel />
        </ReactHomeWelcomeContainer>
      )}
      {activeRoutePath === REACT_ROUTE_PATHS.todo && <JsonPlaceholderTodosPanel />}
    </ReactHomePageRoot>
  );
}

const ReactHomePageRoot = styled(Box)(() => {
  return {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    paddingTop: '24px',
    width: '100%',
  };
});

const ReactHomeTabsContainer = styled(Box)(({ theme }) => {
  return {
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3, 0),

    [theme.breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      padding: theme.spacing(2, 3),
    },
  };
});

const ReactHomeWelcomeContainer = styled(Box)(({ theme }) => {
  return {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 1,
    minHeight: 0,
    padding: theme.spacing(3),
  };
});
