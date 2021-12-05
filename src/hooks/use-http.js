import {useCallback} from 'react';
import {useMounted} from "./use-mounted";

const useHttp = () => {
    const mounted = useMounted();

    return useCallback(async (fetchMethod, setState) => {
        setState(() => ({
            isLoading: true,
            error: null
        }));

        try {
            const result = await fetchMethod();
            if (mounted.current) {
                setState({
                    isLoading: false,
                    data: result
                })
            }

        } catch (err) {
            console.error(err);
            if (mounted.current) {
                setState(() => ({
                    isLoading: false,
                    error: err.message
                }));
            }
        }
    }, []);
};

export default useHttp;
