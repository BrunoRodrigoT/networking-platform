import { useEffect, useState } from 'react';

export default function UseDebounce(search: string, timeout: number = 500) {
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    useEffect(() => {
        const timeoutFunction = setTimeout(() => {
            setDebouncedSearch(search);
        }, timeout);
        return () => {
            clearTimeout(timeoutFunction);
        };
    }, [timeout, search]);

    return debouncedSearch;
}
