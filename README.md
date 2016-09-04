# Voo

A tiny DOM library.

```js
import { voo, fragment } from 'voo';

const header    = voo('h1.voo-header');
const paragraph = voo('p')
const bold      = voo('b');

document.body.appendChild(
    fragment(
        header('Hello ', bold('Voo'), '!'),
        paragraph('This is just an example, but it shows well just how simple Voo is.')
    )
);
```

## Philsophy

> Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better.

  — Edsger W. Dijkstra, 1984

### Focus

"Do One Thing and Do It Well" - this really is _just_ a DOM library, but you can build view components on top of it.

### Performance

Voo is fast! Creating DOM `Node`s with Voo is comparable to writing plain DOM API instructions, and is much faster than `innerHTML` on modern browers.

### Simplicity

Voo is not here to abstract DOM away from you, it only simplifies the the most tedious parts of the API.

### Just JavaScript

No build tools, no precompiled templates, no HTML. Syntax ought to be simple enough to render JSX unnecessary.
