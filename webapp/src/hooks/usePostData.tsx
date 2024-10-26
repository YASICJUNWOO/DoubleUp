import {useCallback, useEffect, useState} from 'react';
import axios from "axios";

const usePostData = <T = any>(url: string) => {
    const [data, setData] = useState<T | any>([]);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const postData = useCallback(async (url: string, payload: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(url, payload);
            setData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        postData(url, {});
    }, [url, postData]);


    return { data, error, loading, postData };
};

export default usePostData;
