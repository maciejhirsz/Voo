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
            } else {
                el.appendChild(first);
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

function template(root) {
    return function () {
        return root.cloneNode(true);
    }
}

var header = voo('h1.voo');
var b = voo('b');
var p = voo('p');
var div = voo('div');
var foobar = voo('#baz.foo.bar');

bench('document.createElement and set stuff', function() {
  var el = document.createElement('div');
  el.id = 'baz';
  el.className = 'foo bar';
  el.textContent = 'Hello world!';
})

bench('foobar()', function() {
  foobar('Hello world!');
});

bench('Vanilla JS <div> with children', function() {
    var div = document.createElement('div');

    var header = document.createElement('h1');
    header.className = 'voo';

    var b = document.createElement('b');
    b.appendChild(document.createTextNode('Voo'));

    header.appendChild(document.createTextNode('Hello '));
    header.appendChild(b);
    header.appendChild(document.createTextNode('!'));

    div.appendChild(header);

    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Bacon ipsum dolor amet meatloaf meatball shank porchetta \
             picanha bresaola short loin short ribs capicola fatback beef \
             ribs corned beef ham hock.'));

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

console.log(temp());

}());