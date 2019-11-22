/// <reference lib="webworker" />

import * as Comlink from 'comlink';

export function test(text: string) {
  return `"${text}" from worker`;
}

Comlink.expose(test);
