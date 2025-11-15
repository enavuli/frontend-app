// parser.js
import { URL } from 'url';

class Parser {
  constructor() {
    this.parsers = {
      'application/json': JSON.parse,
      'text/javascript': (data) => eval(data),
      'application/x-www-form-urlencoded': (data) => {
        const params = {};
        const pairs = data.split('&');
        pairs.forEach((pair) => {
          const [key, value] = pair.split('=');
          params[key] = decodeURIComponent(value);
        });
        return params;
      },
    };
  }

  parse(data, contentType) {
    if (!contentType) {
      throw new Error('Content-Type header is required');
    }
    if (!this.parsers[contentType]) {
      throw new Error(`Unsupported Content-Type: ${contentType}`);
    }
    return this.parsers[contentType](data);
  }
}

const parser = new Parser();

export default parser;