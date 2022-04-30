import { renderToReadableStream } from 'react-dom/server';
import type { EntryContext } from '@remix-run/cloudflare';
import { RemixServer } from '@remix-run/react';
import isbot from 'isbot';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const controller = new AbortController();

  try {
    const stream = await renderToReadableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        signal: controller.signal,
        onError: error => {
          responseStatusCode = 500;
          console.error(error);
        },
      }
    );

    if (isbot(request.headers.get('user-agent'))) {
      await stream.allReady;
    }

    responseHeaders.set('Content-Type', 'text/html');

    return new Response(stream, {
      status: responseStatusCode,
      headers: responseHeaders,
    });
  } catch (e) {
    return new Response('<!doctype html><p>Loading...</p>', {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
