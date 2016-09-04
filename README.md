# Voo

A tiny DOM library.

```js
import { voo } from 'voo';

const form   = voo('form');
const input  = voo('input');
const button = voo('button');

function login() {
    const email = input(el => el.type = 'email');
    const pass  = input(el => el.type = 'password');

    return form(
        email,
        pass,
        button('Log in'),

        el => el.onsubmit = (e) => {
            e.preventDefault();

            console.log(email.value, pass.value);
        }
    );
}

document.body.appendChild(login());
```

## Philsophy

> Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better.

  — Edsger W. Dijkstra, 1984


### Core Principles

- **Focus**.

  "Do One Thing and Do It Well" - this really is _just_ a DOM library, but you can build view components on top of it.

- **Performance**.

  Voo is fast! Creating DOM with **Voo** is comparable to writing plain DOM API instructions, and is much faster than `innerHTML` on modern browers.

- **Simplicity**.
 
  Voo is not here to abstract DOM away from you, it only simplifies the the most tedious parts of the API.

- **Just JavaScript**.

  **Voo** doesn't require a build tool, it doesn't precompile anything, it doesn't require (nor support) JSX.
