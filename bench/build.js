(function () {
'use strict';

function bench(name, iter) {
    console.log(`Benching ${name}`);

    var maxIterations = 1000000;
    var iterations = maxIterations;

    var start = performance.now();

    while (iterations--) iter();

    var totalNanos = (performance.now() - start) * 1e6;
    var average = totalNanos / maxIterations;
    var iterPerSec = 1e9 / average;


    console.log(`- ${Math.round(average)}ns per iteration (${iterPerSec | 0} ops/sec)`);
    console.log('');
}

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

var header = make('h1.voo-header');
var b      = make('b');
var p      = make('p');
var div    = make('div');
var voobar = make('#voo.bar.baz');

bench('document.createElement and set stuff', function() {
  var el = document.createElement('div');
  el.id = 'voo';
  el.className = 'bar baz';
  el.textContent = 'Hello world!';
})

bench('voobar()', function() {
  voobar('Hello world!');
});

bench('Vanilla JS <div> with children', function() {
    var div = document.createElement('div');

    var header = document.createElement('h1');
    header.className = 'voo-header';

    var b = document.createElement('b');
    b.textContent = 'Voo';

    header.textContent = 'Hello ';
    header.appendChild(b);
    header.appendChild(document.createTextNode('!'));

    div.appendChild(header);

    var p = document.createElement('p');
    p.textContent = 'Bacon ipsum dolor amet meatloaf meatball shank porchetta \
             picanha bresaola short loin short ribs capicola fatback beef \
             ribs corned beef ham hock.';

    div.appendChild(p);
});

bench('Voo <div> with children', function() {
    div(
        header('Hello ', b('Voo'), '!'),
        p(
            'Bacon ipsum dolor amet meatloaf meatball shank porchetta \
             picanha bresaola short loin short ribs capicola fatback beef \
             ribs corned beef ham hock.'
        )
    )
});

var temp = template(
    div(
        header('Hello ', b('Voo'), '!'),
        p(
            'Bacon ipsum dolor amet meatloaf meatball shank porchetta \
             picanha bresaola short loin short ribs capicola fatback beef \
             ribs corned beef ham hock.'
        )
    )
);

bench('Voo <div> with children (template)', function() {
    temp();
});

const paragraph = make('p')
const bold      = make('b');

document.body.appendChild(
    fragment(
        header('Hello ', bold('Voo'), '!'),
        paragraph('This is just an example, but it shows well just how simple Voo is.')
    )
);

console.log(temp());

}());