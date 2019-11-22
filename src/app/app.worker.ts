/// <reference lib="webworker" />

import * as Comlink from 'comlink';

export function test() {
  return 'Hello World';
}

Comlink.expose(test);
