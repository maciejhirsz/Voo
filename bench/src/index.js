
import { bench } from './bench.js';
import { make, template, fragment } from '../../src/index.js';

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
