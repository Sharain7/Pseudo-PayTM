import { useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
export const Users = () => {
    const [users, setUsers] = useState([{
        firstName: "Sharain",
        lastName: "Kapoor",
        _id: 1

    },
    {
        firstName: "sdsd",
        lastName: "adasds",
        _id: 2
    }
    ]);
    return (
        <>
            <div className="font bold mt-6 text-lg">
                Users
            </div>
            <div className="my-2">
                <input type="text" placeholder="Search users...." className="py-2 px-2 rounded-full border border-slate-200 w-full"></input>
            </div>
            <div>
                {users.map(user => <User user={user} />)}
            </div>
        </>

    )

}
function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 ">
                    <div className="flex flex-col h-full justify-center">
                        {user.firstName[0]}
                    </div>

                </div>
                <div className="flex flex-col justify-center ml-2">
                    {user.firstName} {user.lastName}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">

                <Button label={"Send Money"}    />



            </div>
        </div>
    )
}