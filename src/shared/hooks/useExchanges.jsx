import { useState, useCallback } from 'react';
import { getExchanges } from '../../services';

export const useExchange = () => {
  const [conversionRate, setConversionRate] = useState(null);
  const [conversionAmount, setConversionAmount] = useState(null);
  const [netAmount, setNetAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convert = useCallback(async ({ from, to, amount }) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await getExchanges({ from, to, amount });
      if (res.error) throw res.e;

      const {
        data: { conversionRate: rate, conversionAmount: amt },
      } = res;

      setConversionRate(rate);
      setConversionAmount(amt);

      const discounted = amt * (1 - 0.0003);
      setNetAmount(discounted);
    } catch (e) {
      setError(
        e?.response?.data?.msg || e?.message || 'Error en la conversión de divisas'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    conversionRate,    
    conversionAmount,  
    netAmount,         
    isLoading,
    error,
    convert,
  };
};
