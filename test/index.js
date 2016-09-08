var test = require('tape');
var voo = require('../dist/voo.js');

var make     = voo.make;
var text     = voo.text;
var fragment = voo.fragment;
var template = voo.template;

test('make', function(t) {
    var h1 = make('h1');
    var el = h1('voobar');
    t.equals(el.textContent, 'voobar');
    t.equals(el.nodeType, Node.ELEMENT_NODE);
    t.ok(el instanceof HTMLHeadingElement);
    t.end();
});

test('make with a query', function(t) {
    var withId                  = make('#some-id');
    var withClass               = make('.some-class');
    var withBoth                = make('#some-id.some-class');
    var withManyClasses         = make('.a-class.b-class');
    var withIdAndManyClasses    = make('#some-id.a-class.b-class');
    var withTagIdAndManyClasses = make('section#some-id.a-class.b-class');

    var el;

    el = withId();
    t.equals(el.tagName, 'DIV');
    t.equals(el.id, 'some-id');
    t.equals(el.className, '');

    el = withClass();
    t.equals(el.tagName, 'DIV');
    t.equals(el.id, '');
    t.equals(el.className, 'some-class');

    el = withBoth();
    t.equals(el.tagName, 'DIV');
    t.equals(el.id, 'some-id');
    t.equals(el.className, 'some-class');

    el = withManyClasses();
    t.equals(el.tagName, 'DIV');
    t.equals(el.id, '');
    t.equals(el.className, 'a-class b-class');

    el = withIdAndManyClasses();
    t.equals(el.tagName, 'DIV');
    t.equals(el.id, 'some-id');
    t.equals(el.className, 'a-class b-class');

    el = withTagIdAndManyClasses();
    t.equals(el.tagName, 'SECTION');
    t.equals(el.id, 'some-id');
    t.equals(el.className, 'a-class b-class');

    t.end();
});

test('fragment', function(t) {
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');

    var frag;

    frag = fragment(div1, div2);

    t.equals(frag.nodeType, Node.DOCUMENT_FRAGMENT_NODE);
    t.equals(frag.childNodes.length, 2);
    t.equals(frag.firstChild, div1);
    t.equals(frag.lastChild, div2);

    frag = fragment.from([div1, div2]);

    t.equals(frag.nodeType, Node.DOCUMENT_FRAGMENT_NODE);
    t.equals(frag.childNodes.length, 2);
    t.equals(frag.firstChild, div1);
    t.equals(frag.lastChild, div2);

    t.end();
});

test('text', function(t) {
    var tn = text('voobar');

    t.equals(tn.nodeType, Node.TEXT_NODE);
    t.equals(tn.textContent, 'voobar');

    t.end();
});

test('template', function(t) {
    var voobar = make('#voo.bar');

    var temp = template(voobar('Hello Voo!'));

    var el1 = temp();
    var el2 = temp();

    el2.textContent = 'Override!';

    t.equals(el1.id, 'voo');
    t.equals(el2.id, 'voo');
    t.equals(el1.className, 'bar');
    t.equals(el2.className, 'bar');
    t.equals(el1.textContent, 'Hello Voo!');
    t.equals(el2.textContent, 'Override!');

    t.end();
});
