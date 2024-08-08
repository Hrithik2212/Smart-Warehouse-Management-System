import React, { useState, useEffect } from 'react';
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
                console.log(err)
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    return {data,loading,error}
};

export default useFetch;
