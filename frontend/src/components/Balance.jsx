import { useState, useEffect } from "react";
import axios from "axios";
import { GenericMessage } from "./GenericMessage";

export const Balance = () => {
  const [balance, setBalance] = useState("Loading..."); // Default message while loading

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if(token){
            const response = await axios.get("http://localhost:3000/api/v1/account/balance" , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            //updating the balance
            setBalance(response.data.balance);
            

        }
        else{
            <GenericMessage message={"Token not found"}/>

        }
        

      } catch (e) {
        console.log(e);
        <GenericMessage message={"Cannot update the balance"}/>

      }
    };

    fetchBalance();
  }, [balance]);

  return (
    <div className="flex justify-start">
      <div className="font-medium text-lg">Your balance</div>
      <div className="ml-4 text-lg">Rs. {balance}</div>
    </div>
  );
};
