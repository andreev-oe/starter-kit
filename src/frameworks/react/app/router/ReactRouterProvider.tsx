import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import ReactHomePage from '../pages/ReactHomePage';
import { REACT_ROUTE_PATHS, REACT_ROUTER_BASENAME } from './react-router.consts';

export default function ReactRouterProvider() {
  return (
    <BrowserRouter basename={REACT_ROUTER_BASENAME}>
      <Routes>
        <Route path={REACT_ROUTE_PATHS.home} element={<ReactHomePage />} />
        <Route path={REACT_ROUTE_PATHS.fallback} element={<Navigate to={REACT_ROUTE_PATHS.home} replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}
