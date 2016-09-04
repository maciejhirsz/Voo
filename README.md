# voo

```js
import { voo, set } from 'voo';

const form = voo('form');
const input = voo('input');
const button = voo('button');

function login() {
    const email = input(set('type', 'text'));
    const pass  = input(set('type', 'password'));

    return form(
        on('submit', e => {
            e.preventDefault();

            console.log(email.value, pass.value);
        }),

        email,
        pass,
        button('Log in')
    );
}

document.body.appendChild(login());
```
