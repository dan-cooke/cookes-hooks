declare const useDelayedFunctionQueue: () => {
    add: (fn: (...params: any) => any, delayAfterMs?: any) => void;
    remove: (index: number) => void;
    run: () => void;
    queue: any[];
};
export default useDelayedFunctionQueue;
