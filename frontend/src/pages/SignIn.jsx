
import { HeadingComponent } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
export const SignIn = () => {
    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center">
                    <HeadingComponent label={"Sign In"} />
                    <Subheading label={"Enter your credentials to access your account"} />
                    <InputBox placeholder="johndoe@gmail.com" label={"Email"} />
                    <InputBox placeholder="*******" label={"Password"} />
                    <div className="pt-4">
                        <Button label={"Log In"}></Button>

                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/"}/>


                </div>


            </div>

        </div>
    )
}