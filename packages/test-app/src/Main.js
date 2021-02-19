import React, { useEffect } from 'react';
import useDelayedFunctionQueue  from '@cookes-hooks/useDelayedFunctionQueue'

const Main = () => {
    const { add, queue } = useDelayedFunctionQueue()
    return <div></div>
}

export default Main;