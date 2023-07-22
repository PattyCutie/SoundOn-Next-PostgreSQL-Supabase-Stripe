import { useEffect, useState } from "react";

function useDebounce<T>(val: T, delay?: number): T {
    const [debouncedVal, setDebouncedVal] = useState<T>(val)

    useEffect(() => {
        // Delaying search functionality that prevent calling api while typing is not yet finish
        // after no typing for 5 sec.
        const timer= setTimeout(() => {
            setDebouncedVal(val)
        }, delay || 500)

        return () => {
            clearTimeout(timer)
        }
    }, [val, delay])

    return debouncedVal
}

export default useDebounce