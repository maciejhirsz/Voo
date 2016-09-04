function createCurry(single) {
    return function (a, b) {
        if (arguments.length === 2) {
            return function (el) {
                single(el, a, b);
            }
        }

        return function (el) {
            for (var key in a) {
                single(el, key, a[key]);
            }
        }
    }
}

export var attr = createCurry(function (el, attribute, value) {
    if (attribute in el) {
        el[attribute] = value;
    } else {
        el.setAttribute(attribute, value);
    }
})

export var on = createCurry(function (el, event, handler) {
    el.addEventListener(event, handler);
});
