import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { HeadingComponent } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useState } from "react"
import { GenericMessage } from '../components/GenericMessage';
export const SignIn = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleSignin = async () => {
        
        try {
            if (!username || !password) {
                setError("Please fill in all required fields.");
                return;
            }
            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                username,
                password

            })


            localStorage.setItem("token", response.data.token);

            navigate("/dashboard")

        } catch (e) {
            if(e.response && e.response.status===401){
                setError("Invalid username or password")
            }
            else{
                setError("Unauthorised access")
            }

        

        }
    }
    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center">
                    <HeadingComponent label={"Sign In"} />
                    <GenericMessage message={error} />
                    <Subheading label={"Enter your credentials to access your account"} />
                    <InputBox onChange={(e) => {
                        setUserName(e.target.value)
                    }} placeholder="johndoe@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="*******" label={"Password"} />
                    <div className="pt-4">
                        <Button label={"Log In"} onClick={handleSignin}></Button>

                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/"} />


                </div>


            </div>

        </div>
    )
}