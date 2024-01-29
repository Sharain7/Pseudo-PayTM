import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HeadingComponent } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import axios from "axios";
import { BottomWarning } from "../components/BottomWarning"
import { GenericMessage } from '../components/GenericMessage';
export const SignUp = () => {
    //1. Creating states for the inputs
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username,setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const handleSignupClick = async () => {
        try{
            if (!username || !firstName || !lastName || !password) {
                setError("Please fill in all required fields.");
                return;
              }
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
          username,
          firstName,
          lastName,
          password
        });
        console.log(response.data.userExists)
    
        localStorage.setItem("token", response.data.token);
    
        navigate("/dashboard")

    }catch (error) {
        if (error.response && error.response.status === 411) {
            if (error.response.data.userExists) {
              setError("User Already Exists");
            } else {
              setError("Error during signup. Please try again later.");
            }
          } else {
            setError("Error during signup. Please try again later."); 
          
        }
    }
        
      };
    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center">
                    <HeadingComponent label={"Sign up"} />
                    <div>
                        <GenericMessage message={error}/>
                    </div>
                    
                    <Subheading label={"Enter your information to create an account"} />
                    <InputBox onChange={(e) => {
                        setFirstName(e.target.value)

                    }} placeholder="John" label={"First Name"} />
                    <InputBox onChange={(e) => {
                        setLastName(e.target.value)
                    }} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChange={(e) => {
                        setUserName(e.target.value)
                    }} placeholder="johndoe@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder="*******" label={"Password"} />
                    <div className="pt-4">
                        <Button label={"Sign Up"} onClick={handleSignupClick}/>                        
                    </div>
                    
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />


                </div>


            </div>

        </div>
    )
}
