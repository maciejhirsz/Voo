# Voo

> Any intelligent fool can make things bigger, more complex, and more violent. It takes a touch of genius – and a lot of courage – to move in the opposite direction.

```js
import { voo, attr } from 'voo';

const form   = voo('form');
const input  = voo('input');
const button = voo('button');

function login() {
    const email = input(attr('type', 'text'));
    const pass  = input(attr('type', 'password'));

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
