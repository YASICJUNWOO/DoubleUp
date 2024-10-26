import {useCallback, useEffect, useState} from 'react';

const useFetchData = <T = any>(url: string) => {
  const [data, setData] = useState<T | any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true); // 로딩 상태를 true로 다시 설정
    try {
      const response = await fetch(url);
      const json = await response.json();

      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false); // 데이터 가져오기 완료 후 로딩 false
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, fetchData };
};

export default useFetchData;
