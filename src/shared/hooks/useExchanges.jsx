import { useState, useCallback } from 'react';
import { getExchanges } from '../../services';

export const useExchange = () => {
  const [conversionRate, setConversionRate] = useState(null);
  const [conversionAmount, setConversionAmount] = useState(null);
  const [netAmount, setNetAmount] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const convert = useCallback(async ({ from, to, amount, operation }) => {
    setIsLoading(true);
    setError(null);
    setConversionRate(null);
    setConversionAmount(null);
    setNetAmount(null);
  
    try {
      const res = await getExchanges({ from, to, amount });
      if (res.error) throw res.e;
  
      const {
        data: { conversionRate: rate, conversionAmount: amt },
      } = res;
  
      setConversionRate(rate);
      setConversionAmount(amt);
      
      let adjustedAmount = amt;
      if (operation === 'compra') {
        adjustedAmount = (amount) * (rate)- (rate*amount*0.03); 
      } else if (operation === 'vende') {
        adjustedAmount = amount*rate - (amount *rate * 0.03); 
      }
      setNetAmount(adjustedAmount); 
  
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
