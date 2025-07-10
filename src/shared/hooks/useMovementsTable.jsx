import { useState, useMemo } from "react";
import { useMovements } from "./useMovements";
import { useMovementsActions } from "./useMovementsActions";
import { useNavigate } from "react-router-dom";

export function useMovementsTable(role) {
    const { response, page, setPage, rowsPerPage, setRowsPerPage, total, loading, refetch } = useMovements(role);
    const { updateMovement, revertMovement, loading: actionLoading, error: actionError } = useMovementsActions();
    const [search, setSearch] = useState("");
    const [selectedMovement, setSelectedMovement] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const filteredMovements = useMemo(() => {
        const s = search.toLowerCase();
        return response.filter((mov) =>
            (mov.description || "").toLowerCase().includes(s) ||
            (mov.type || "").toLowerCase().includes(s) ||
            (mov.status || "").toLowerCase().includes(s) ||
            (
                mov.originAccount
                    ? (typeof mov.originAccount === "object" && mov.originAccount !== null
                        ? (mov.originAccount.accountNumber || mov.originAccount._id || "")
                        : mov.originAccount)
                    : ""
            ).toString().toLowerCase().includes(s) ||
            (
                mov.destinationAccount
                    ? (typeof mov.destinationAccount === "object" && mov.destinationAccount !== null
                        ? (mov.destinationAccount.accountNumber || mov.destinationAccount._id || "")
                        : mov.destinationAccount)
                    : ""
            ).toString().toLowerCase().includes(s)
        );
    }, [response, search]);

    const handleActionClick = (movement) => {
        setSelectedMovement(movement);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedMovement(null);
    };

    const handleUpdate = async (newAmount) => {
        const movementId = selectedMovement?.mid || selectedMovement?._id || selectedMovement?.id;
        if (!movementId) {
            setErrorMsg("No se encontró el ID del movimiento.");
            handleDialogClose();
            return;
        }
        const res = await updateMovement(movementId, Number(newAmount));
        if (res && !actionError) {
            setSuccessMsg("Movimiento actualizado correctamente");
            await refetch();
        } else {
            setErrorMsg("Error al actualizar el movimiento");
        }
        handleDialogClose();
    };

    const handleRevert = async () => {
        const movementId = selectedMovement?.mid || selectedMovement?._id || selectedMovement?.id;
        if (!movementId) {
            setErrorMsg("No se encontró el ID del movimiento.");
            handleDialogClose();
            return;
        }
        const res = await revertMovement(movementId);
        if (res && !actionError) {
            setSuccessMsg("Movimiento revertido correctamente");
            await refetch();
        } else {
            setErrorMsg("Error al revertir el movimiento");
        }
        handleDialogClose();
    };

    return {
        page, setPage, rowsPerPage, setRowsPerPage, total, loading, refetch,
        search, setSearch, filteredMovements,
        selectedMovement, setSelectedMovement,
        dialogOpen, setDialogOpen,
        successMsg, setSuccessMsg,
        errorMsg, setErrorMsg,
        handleActionClick, handleDialogClose, handleUpdate, handleRevert,
        actionLoading, actionError
    };
}