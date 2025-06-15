import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const { Response, Request, Headers } = require('node-fetch');
global.Response = Response;
global.Request = Request;
global.Headers = Headers;

global.BroadcastChannel = class BroadcastChannel {
  constructor(name) {
    this.name = name;
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
  dispatchEvent() { return true; }
};

global.TransformStream = class TransformStream {
  constructor() {
    this.readable = new ReadableStream();
    this.writable = new WritableStream();
  }
};

global.ReadableStream = class ReadableStream {
  constructor() {}
  getReader() {
    return {
      read: () => Promise.resolve({ done: true, value: undefined }),
      cancel: () => Promise.resolve(),
      releaseLock: () => {},
    };
  }
};

global.WritableStream = class WritableStream {
  constructor() {}
  getWriter() {
    return {
      write: () => Promise.resolve(),
      close: () => Promise.resolve(),
      abort: () => Promise.resolve(),
      releaseLock: () => {},
    };
  }
}; 