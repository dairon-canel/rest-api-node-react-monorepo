import { useEffect, useState } from 'react';
import { Gateway } from '../types';

export const useGateways = () => {
  const [gateways, setGateways] = useState<Gateway[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    fetch('/gateways', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        setGateways(data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { gateways, loading, error };
};
