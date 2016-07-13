"use strict";
var d3 = require('d3');
//export * from './accumulatingWindow';
//export * from './mappedSlidingWindow';
//export * from './merge';
//export * from './slidingWindow';
//export * from './zipper';
function getClosestItemIndexes2(array, value, accessor) {
    var left = d3.bisector(accessor).left(array, value);
    left = Math.max(left - 1, 0);
    var right = Math.min(left + 1, array.length - 1);
    var item = accessor(array[left]);
    if (item >= value && item <= value) {
        right = left;
    }
    return { left: left, right: right };
}
exports.getClosestItemIndexes2 = getClosestItemIndexes2;
function getClosestItemIndexes(array, value, accessor) {
    var lo = 0;
    var hi = array.length - 1;
    while (hi - lo > 1) {
        var mid = Math.round((lo + hi) / 2);
        if (accessor(array[mid]) <= value) {
            lo = mid;
        }
        else {
            hi = mid;
        }
    }
    // for Date object === does not work, so using the <= in combination with >=
    // the same code works for both dates and numbers
    if (accessor(array[lo]) >= value && accessor(array[lo]) <= value) {
        hi = lo;
    }
    if (accessor(array[hi]) >= value && accessor(array[hi]) <= value) {
        lo = hi;
    }
    if (accessor(array[lo]) < value && accessor(array[hi]) < value) {
        lo = hi;
    }
    if (accessor(array[lo]) > value && accessor(array[hi]) > value) {
        hi = lo;
    }
    return { left: lo, right: hi };
}
exports.getClosestItemIndexes = getClosestItemIndexes;
function getClosestItem(array, value, accessor) {
    var _a = getClosestItemIndexes(array, value, accessor), left = _a.left, right = _a.right;
    if (left === right) {
        return array[left];
    }
    var closest = (Math.abs(accessor(array[left]) - value) < Math.abs(accessor(array[right]) - value))
        ? array[left]
        : array[right];
    return closest;
}
exports.getClosestItem = getClosestItem;
//export const overlayColors = d3.scale.category10();
function rebind(target, source, mappings) {
    if (typeof (mappings) !== 'object') {
        return d3.rebind.apply(d3, arguments);
    }
    Object.keys(mappings)
        .forEach(function (targetName) {
        var method = source[mappings[targetName]];
        if (typeof method !== 'function') {
            throw new Error("The method " + mappings[targetName] + " does not exist on the source object");
        }
        target[targetName] = function () {
            var value = method.apply(source, arguments);
            return value === source ? target : value;
        };
    });
    return target;
}
exports.rebind = rebind;
function head(array, accessor) {
    if (accessor && array) {
        var value = void 0;
        for (var i = 0; i < array.length; i++) {
            value = array[i];
            if (isDefined(accessor(value)))
                break;
        }
        return value;
    }
    return array ? array[0] : undefined;
}
exports.head = head;
exports.first = head;
function last(array, accessor) {
    if (accessor && array) {
        var value = void 0;
        for (var i = array.length - 1; i >= 0; i--) {
            value = array[i];
            if (isDefined(accessor(value)))
                break;
        }
        return value;
    }
    var length = array ? array.length : 0;
    return length ? array[length - 1] : undefined;
}
exports.last = last;
function isDefined(d) {
    return d !== null && typeof d != 'undefined';
}
exports.isDefined = isDefined;
function isNotDefined(d) {
    return !isDefined(d);
}
exports.isNotDefined = isNotDefined;
function isObject(d) {
    return isDefined(d) && typeof d === 'object' && !Array.isArray(d);
}
exports.isObject = isObject;
exports.isArray = Array.isArray;
function touchPosition(touch, e) {
    var container = e.target;
    var rect = container.getBoundingClientRect();
    var x = touch.clientX - rect.left - container.clientLeft;
    var y = touch.clientY - rect.top - container.clientTop;
    var xy = [Math.round(x), Math.round(y)];
    return xy;
}
exports.touchPosition = touchPosition;
function mousePosition(e) {
    var container = e.currentTarget;
    var rect = container.getBoundingClientRect();
    var x = e.clientX - rect.left - container.clientLeft;
    var y = e.clientY - rect.top - container.clientTop;
    var xy = [Math.round(x), Math.round(y)];
    return xy;
}
exports.mousePosition = mousePosition;
function clearCanvas(canvasList) {
    canvasList.forEach(function (each) {
        each.setTransform(1, 0, 0, 1, 0, 0);
        each.clearRect(-1, -1, each.canvas.width + 2, each.canvas.height + 2);
    });
}
exports.clearCanvas = clearCanvas;
function hexToRGBA(inputHex, opacity) {
    var hex = inputHex.replace('#', '');
    if (inputHex.indexOf('#') > -1 && (hex.length === 3 || hex.length === 6)) {
        var multiplier = (hex.length === 3) ? 1 : 2;
        var r = parseInt(hex.substring(0, 1 * multiplier), 16);
        var g = parseInt(hex.substring(1 * multiplier, 2 * multiplier), 16);
        var b = parseInt(hex.substring(2 * multiplier, 3 * multiplier), 16);
        var result = "rgba(" + r + ", " + g + ", " + b + ", " + opacity + ")";
        return result;
    }
    return inputHex;
}
exports.hexToRGBA = hexToRGBA;
function isDate(date) {
    return Object.prototype.toString.call(date) === "[object Date]";
}
function isEqual(val1, val2) {
    return (isDate(val1) && isDate(val2))
        ? val1.getTime() === val2.getTime()
        : val1 === val2;
}
function shallowEqual(a, b) {
    if (!a && !b) {
        return true;
    }
    if (!a && b || a && !b) {
        return false;
    }
    var numKeysA = 0;
    var numKeysB = 0;
    var key;
    for (key in b) {
        numKeysB++;
        if (!a.hasOwnProperty(key) || !isEqual(a[key], b[key])) {
            return false;
        }
    }
    for (key in a) {
        numKeysA++;
    }
    return numKeysA === numKeysB;
}
exports.shallowEqual = shallowEqual;
function identity(arg) {
    return arg;
}
exports.identity = identity;
function noop() { }
exports.noop = noop;
//# sourceMappingURL=index.js.map