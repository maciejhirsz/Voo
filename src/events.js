
export function on(event, handler) {
    return function(el) {
        el.addEventListener(event, handler);
    }
}
