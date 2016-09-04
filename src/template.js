export function template(root) {
    return function () {
        return root.cloneNode(true);
    }
}
