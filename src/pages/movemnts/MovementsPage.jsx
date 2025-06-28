import React from 'react'
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { MovementsTable } from "../../components/movemnts/MovementsTable.jsx";
import {useUser} from "../../shared/hooks/useUser.jsx"
import { useMovements} from "../../shared/hooks/useMovements.jsx";

export const MovementsPage = () => {
    const {role} = useUser();
    const {response} = useMovements();
    let movementsList = [];

    if(role === "ADMIN_ROLE") {
        movementsList = response;
    }
    
    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
                <h1>Movimientos</h1>
                <MovementsTable movements={movementsList} />
            </div>
        </div>
    )
}
