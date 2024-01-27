import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { TransferMoney } from "./SendMoney"



export const Dashboard = () => {
    return (
        <div>
            <AppBar />
            <Balance />
            <div className="ml-2">
            <Users/>
            <TransferMoney/>

            </div>
            

        </div>

    )
}