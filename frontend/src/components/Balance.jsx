export const Balance = ({balance}) => {
    return(
        <div className="flex justify-start">
            <div className="font-medium text-lg">
                Your balance{balance}
            </div>
            <div className="ml-4 text-lg">
                Rs. {balance}
            </div>
            
        </div>
    )

}