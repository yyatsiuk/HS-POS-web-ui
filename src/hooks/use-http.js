import {useCallback} from 'react';
import {useMounted} from "./use-mounted";
import {isJWTValid} from "../utils/jwt";
import {useAuth} from "./use-auth";

const useHttp = () => {
    const mounted = useMounted();
    const {logout} = useAuth();

    return useCallback(async (fetchMethod, setState) => {
        if (isJWTValid()) {
            await logout();
        }

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
