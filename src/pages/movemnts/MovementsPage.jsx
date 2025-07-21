import React, { useState } from 'react';
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { MovementsTable } from "../../components/movemnts/MovementsTable.jsx";
import { TopMovementsTable } from "../../components/movemnts/TopMovementsTable.jsx";
import { useUser } from "../../shared/hooks/useUser.jsx";
import { ButtonGroup, Button } from "@mui/material";
import { useTopMovements } from '../../shared/hooks/useTopMovements.jsx';
import {RecentmovmentsTable} from '../../components/movemnts/RecentmovmentsTable.jsx';


export const MovementsPage = () => {
    const { role } = useUser();
    const [view, setView] = useState("movements");
    const { topAccounts} = useTopMovements();

    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ maxWidth: 12000, margin: "0 auto", padding: 24 }}>
                <h1>Movimientos</h1>
                <ButtonGroup sx={{ mb: 2 }}>
                    <Button
                        variant={view === "movements" ? "contained" : "outlined"}
                        onClick={() => setView("movements")}
                    >
                        Movimientos
                    </Button>
                    <Button
                        variant={view === "top" ? "contained" : "outlined"}
                        onClick={() => setView("top")}
                    >
                        {role === "ADMIN_ROLE" ? "Top Movimientos" : "Movimientos recientes"}                    
                    </Button>
                </ButtonGroup>
                {view === "movements" ? (
                    <MovementsTable role={role} />
                ) : (
                    role === "ADMIN_ROLE"
                        ? <TopMovementsTable topAccounts={topAccounts} />
                        : <RecentmovmentsTable/>
                )}
            </div>
        </div>
    );
};
