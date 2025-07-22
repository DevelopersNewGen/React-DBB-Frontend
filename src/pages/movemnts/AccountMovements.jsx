import React from 'react'
import { ResponsiveAppBar } from "../../components/Navbar.jsx";
import { AccountsMovements } from "../../components/movemnts/AccountsMovements.jsx";
import { useParams } from 'react-router-dom';

export const AccountMovements = () => {
    const { accountId } = useParams();

    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ paddingTop: 80, maxWidth: 12000, margin: "0 auto" }}>
                <AccountsMovements accountId={accountId} />
            </div>
        </div>
    )
}
