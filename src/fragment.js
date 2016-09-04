import { text } from './text.js';
import { doc } from './global.js';

export function fragment() {
    var frag = doc.createDocumentFragment();

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        frag.appendChild(typeof arg === 'string' ? text(arg) : arg);
    }

    return frag;
}
