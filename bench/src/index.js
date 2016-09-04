
import { bench } from './bench.js';
import { voo, template, fragment } from '../../src/index.js';

var header = voo('h1.voo-header');
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
    header.className = 'voo-header';

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

const paragraph = voo('p')
const bold      = voo('b');

document.body.appendChild(
    fragment(
        header('Hello ', bold('Voo'), '!'),
        paragraph('This is just a simple example, but it shows how dead simple Voo is.')
    )
);

console.log(temp());
