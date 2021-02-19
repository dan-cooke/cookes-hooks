"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var useDelayedFunctionQueue = function () {
    var _a = react_1.useState([]), queue = _a[0], setQueue = _a[1];
    var _b = react_1.useState(false), running = _b[0], setRunning = _b[1];
    var add = react_1.useCallback(function (fn, delayAfterMs) {
        if (delayAfterMs === void 0) { delayAfterMs = 1000; }
        setQueue(function (prevQueue) { return (__spreadArrays(prevQueue, [{ fn: fn, delayAfterMs: delayAfterMs }])); });
    }, [setQueue]);
    var run = react_1.useCallback(function () {
        if (!running) {
            setRunning(true);
        }
    }, [running]);
    react_1.useEffect(function () {
        if (!running)
            return;
        var timer;
        var runNextQueueFn = function (currentQueueFn) {
            if (!currentQueueFn)
                return;
            var fn = currentQueueFn.fn, delayAfterMs = currentQueueFn.delayAfterMs;
            fn();
            setTimeout(function () {
                remove(0);
            }, delayAfterMs);
        };
        runNextQueueFn(queue[0]);
        return function () {
            clearTimeout(timer);
        };
    }, [queue, running]);
    var remove = function (index) {
        setQueue(function (prevQueue) { return prevQueue.filter(function (_, idx) { return idx !== index; }); });
    };
    return {
        add: add,
        remove: remove,
        run: run,
        queue: queue
    };
};
exports["default"] = useDelayedFunctionQueue;
