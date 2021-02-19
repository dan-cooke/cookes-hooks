import React from 'react';
import useDelayedFunctionQueue  from '@cookes-hooks/useDelayedFunctionQueue'

const Main = () => {
    const { add, queue } = useDelayedFunctionQueue()
    add();
    queue();
    return <div></div>
}

export default Main;