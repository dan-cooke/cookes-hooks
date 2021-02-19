import useDelayedFunctionQueue from '../src/useDelayedFunctionQueue';
import { act, renderHook } from '@testing-library/react-hooks';

jest.useFakeTimers();

it('should execute each function in a series, with the specified delay in between each', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();
    const res = renderHook(() => useDelayedFunctionQueue());

    
    const getCurrent = () => res.result.current;

    // Add all your functions to the queue, you can specify a time delay in ms as the second param
    act(() => {
        getCurrent().add(fn1, 1000);
        getCurrent().add(fn2, 3000);
        getCurrent().add(fn3, 5000);
    })


    expect(getCurrent().queue.length).toBe(3);

    // Call run to begin executing the queue
    act(() => getCurrent().run())

    // Functions should be cleared after executing
    act(() => jest.advanceTimersByTime(1000))

    expect(fn1).toHaveBeenCalled();
    expect(getCurrent().queue.length).toBe(2);
    expect(getCurrent().queue).not.toContain(fn1);

    act(() => jest.advanceTimersByTime(3000));
    expect(fn2).toHaveBeenCalled();
    expect(getCurrent().queue.length).toBe(1);
    expect(getCurrent().queue).not.toContain(fn1);
    expect(getCurrent().queue).not.toContain(fn2);

    act(() => jest.advanceTimersByTime(5000));
    expect(fn3).toHaveBeenCalled();
    expect(getCurrent().queue.length).toBe(0);
    expect(getCurrent().queue).not.toContain(fn1);
    expect(getCurrent().queue).not.toContain(fn2);
    expect(getCurrent().queue).not.toContain(fn3);
})