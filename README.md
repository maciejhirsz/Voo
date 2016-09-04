# Voo

> Simplicity is a great virtue but it requires hard work to achieve it and education to appreciate it. And to make matters worse: complexity sells better.

-- Edsger W. Dijkstra, 1984

```js
import { voo } from 'voo';

const form   = voo('form');
const input  = voo('input');
const button = voo('button');

function login() {
    const email = input({ type: 'text' });
    const pass  = input({ type: 'password' });

    return form(
        email,
        pass,
        button('Log in'),

        on('submit', e => {
            e.preventDefault();

            console.log(email.value, pass.value);
        }),
    );
}

document.body.appendChild(login());
```
