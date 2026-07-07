import ReactAppProvider from './providers/ReactAppProvider';
import './Welcome.css';

const WELCOME_CONTAINER_ELEMENT_ID = 'container';
const WELCOME_HERO_SECTION_ELEMENT_ID = 'hero';

export default function Welcome() {
  return (
    <ReactAppProvider>
      <div id={WELCOME_CONTAINER_ELEMENT_ID}>
        <main>
          <section id={WELCOME_HERO_SECTION_ELEMENT_ID}>
            <h1>
              Для начала откройте каталог{' '}
              <code>
                <pre>src/frameworks/react/Welcome.tsx</pre>
              </code>{' '}
              в вашем проекте.
            </h1>
          </section>
        </main>
      </div>
    </ReactAppProvider>
  );
}
