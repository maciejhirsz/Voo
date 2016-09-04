import { doc } from './global.js';

export function text(content) {
    return doc.createTextNode(content);
}
