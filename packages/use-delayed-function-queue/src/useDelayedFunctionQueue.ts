import { useCallback, useEffect, useState } from "react"

/**
 * This hook will allow you to queue up several functions for delayed execution. 
 * You can specify a delay in ms for every function to wait before calling the next 
 * in the queue.
 * 
 * @docs https://github.com/dan-cooke/cookes-hooks/tree/master/packages/use-delayed-function-queue
 */
const useDelayedFunctionQueue = () => {
    const [queue, setQueue] = useState([])
    const [running, setRunning] = useState(false)

    /**
     * Add a function to the queue, and specify a time in ms to wait before
     * calling the next function in the queue.
     * 
     * @param fn The function you wish to add to the queue
     * @param delayAfterMs A delay in ms before the next function is called
     * 
     * @example
     * ```
     * const { add } = useDelayedFunctionQueue()
     * 
     * // Wait 2.5 seconds before calling the next function
     * add(() => console.log('hello!'), 2500);
     * add(() => console.log('world!'));
     * ```
     */
    const add = useCallback((fn: (...params: any) => any, delayAfterMs = 1000) => {
        setQueue(prevQueue => ([...prevQueue, { fn, delayAfterMs }]));
    }, [setQueue])

    /**
     * Run the function queue
     */
    const run = useCallback(() => {
        if (!running){
            setRunning(true);
        }
    },[running])

    useEffect(() => {
        if (!running) return;

        let timer;
        const runNextQueueFn = (currentQueueFn) => {
            if (!currentQueueFn) return;
            const { fn , delayAfterMs } = currentQueueFn;
            fn();
            setTimeout(() => {
                remove(0);
            }, delayAfterMs)
        } 
        
        runNextQueueFn(queue[0]);

        return () => {
            clearTimeout(timer);
        }
    }, [queue, running])

    /**
     * Allows you to remove a function from the queue.
     * @param fn Exact object reference to the function to be removed.
     * @example
     * ```
     * function hello() {
     * 
     * }
     * 
     * function world() {
     * }
     * 
     * const { add, remove, run } = useDelayedFunctionQueue
     * 
     * add(hello)
     * remove(0)
     * 
     * run();
     * ```
     */
    const remove = (index: number) => {
        setQueue(prevQueue => prevQueue.filter((_, idx) => idx !== index));
    }

    return {
        add,
        remove,
        run,
        queue
    }
}

export default useDelayedFunctionQueue;