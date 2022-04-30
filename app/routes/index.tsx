import { lazy, Suspense, useState } from 'react';

const LazyLoaded = lazy(async () => {
  // Artificial delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return await import('../components/LazyLoaded');
});

export default function Index() {
  const [showLazyLoaded, setShowLazyLoaded] = useState(false);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
            target="_blank"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
            target="_blank"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a href="https://remix.run/docs" rel="noreferrer" target="_blank">
            Remix Docs
          </a>
        </li>
        <li>
          {showLazyLoaded ? (
            <Suspense fallback="Loading...">
              <LazyLoaded />
            </Suspense>
          ) : (
            <button type="button" onClick={() => setShowLazyLoaded(true)}>
              Click here to Lazy Load
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
