(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.voo = global.voo || {})));
}(this, (function (exports) { 'use strict';

var doc = document;

function createElement(query) {
    var cp = 0;
    var i = 0;
    var len = query.length;
    while (i < len) {
        cp = query.charCodeAt(i++);

        if (cp < 0x30) {
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

function voo(query) {
    var origin = createElement(query);

    return function (first) {
        var el = origin.cloneNode(false);
        var len = arguments.length;

        if (len) {
            if (typeof first === 'string') {
                el.textContent = first;
            } else if (typeof first === 'function') {
                first(el);
            } else if (first.nodeType) {
                el.appendChild(first);
            } else {
                for (var attr in first) {
                    if (attr in el) {
                        el.attr = first[attr];
                    } else {
                        el.setAttribute(attr, first[attr]);
                    }
                }
            }

            var arg, i = 1;
            while (i < len) {
                arg = arguments[i++];

                if (typeof arg === 'function') {
                    arg(el);
                } else {
                    el.appendChild(typeof arg === 'string' ? doc.createTextNode(arg) : arg);
                }
            }
        }

        return el;
    }
}

function on(event, handler) {
    return function(el) {
        el.addEventListener(event, handler);
    }
}

function template(root) {
    return function () {
        return root.cloneNode(true);
    }
}

exports.voo = voo;
exports.on = on;
exports.template = template;

Object.defineProperty(exports, '__esModule', { value: true });

})));