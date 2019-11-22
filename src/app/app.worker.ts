/// <reference lib="webworker" />

import * as Comlink from 'comlink';

export function test(text: string): string {
  return `"${text}" from worker`;
}

Comlink.expose(test);
