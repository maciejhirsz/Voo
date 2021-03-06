(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.voo = global.voo || {})));
}(this, (function (exports) { 'use strict';

var doc = document;

function text(content) {
    return doc.createTextNode(content);
}

function createElement(query) {
    var cp = 0;
    var i = 0;
    var len = query.length;
    while (i < len) {
        cp = query.charCodeAt(i++);

        if (cp < 0x30 && (cp === 0x23 || cp === 0x2E)) {
            var el = doc.createElement(i === 1 ? 'div' : query.substring(0, i - 1));
            var readId = cp === 0x23;
            var from = i;
            var className;

            while (i <= len) {
                cp = i === len ? 0 : query.charCodeAt(i);

                if (cp === 0 || cp === 0x23 || cp === 0x2E) {
                    var slice = query.substring(from, i)
                    if (readId) {
                        el.id = slice;
                    } else if (className) {
                        className += ' ' + slice;
                    } else {
                        className = slice;
                    }

                    if (i === len) break;

                    readId = cp === 0x23;
                    from = ++i;
                } else {
                    ++i;
                }
            }

            if (className) el.className = className;

            return el;
        }
    }

    return doc.createElement(query);
}

function make(query) {
    var origin;

    return function (first) {
        origin || (origin = createElement(query));
        var el = origin.cloneNode(false);
        var len = arguments.length;

        if (len) {
            if (typeof first === 'string') {
                el.textContent = first;
            } else if (typeof first === 'function') {
                first(el);
            } else {
                el.appendChild(first);
            }

            var arg, i = 1;
            while (i < len) {
                arg = arguments[i++];

                if (typeof arg === 'function') {
                    arg(el);
                } else {
                    el.appendChild(typeof arg === 'string' ? text(arg) : arg);
                }
            }
        }

        return el;
    }
}

function fragment() {
    var frag = doc.createDocumentFragment();

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        frag.appendChild(typeof arg === 'string' ? text(arg) : arg);
    }

    return frag;
}

fragment.from = function(array) {
    var frag = fragment();

    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        frag.appendChild(typeof item === 'string' ? text(item) : item);
    }

    return frag;
}

function template(root) {
    return function () {
        return root.cloneNode(true);
    }
}

exports.make = make;
exports.text = text;
exports.fragment = fragment;
exports.template = template;

Object.defineProperty(exports, '__esModule', { value: true });

})));