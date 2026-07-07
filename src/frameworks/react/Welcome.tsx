import ReactRouterProvider from './app/router/ReactRouterProvider';
import ReactAppProvider from './providers/ReactAppProvider';

export default function Welcome() {
  return (
    <ReactAppProvider>
      <ReactRouterProvider />
    </ReactAppProvider>
  );
}
