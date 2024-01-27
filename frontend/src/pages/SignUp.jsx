
import { HeadingComponent } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
export const SignUp = () => {
    return (
        <div className="bg-slate-300 flex justify-center h-screen">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center">
                    <HeadingComponent label={"Sign up"} />
                    <Subheading label={"Enter your information to create an account"} />
                    <InputBox placeholder="John" label={"First Name"} />
                    <InputBox placeholder="Doe" label={"Last Name"} />
                    <InputBox placeholder="johndoe@gmail.com" label={"Email"} />
                    <InputBox placeholder="*******" label={"Password"} />
                    <div className="pt-4">
                        <Button label={"Create Account"}></Button>

                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>


                </div>


            </div>

        </div>
    )
}