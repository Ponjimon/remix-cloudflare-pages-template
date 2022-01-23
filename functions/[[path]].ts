import { createPagesFunctionHandler } from '@remix-run/cloudflare-pages';

// @ts-ignore
import * as build from '../build';

const handleRequest = createPagesFunctionHandler({
  build,
});

export function onRequest(context: EventContext<any, any, any>) {
  return handleRequest(context);
}
