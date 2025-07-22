import { useEffect, useState } from "react";
import { getMovementById } from "../../services/api";

const useMovemntById = (mid) => {
  const [movement, setMovement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mid) return;

    setLoading(true);
    setError(null);

    getMovementById(mid)
      .then((res) => {
        if (res.error) {
          setError(res.e || "Error al obtener el movimiento");
          setMovement(null);
        } else {
          setMovement(res.data);
        }
      })
      .catch((err) => {
        setError(err);
        setMovement(null);
      })
      .finally(() => setLoading(false));
  }, [mid]);

  return { movement, loading, error };
};

export default useMovemntById;