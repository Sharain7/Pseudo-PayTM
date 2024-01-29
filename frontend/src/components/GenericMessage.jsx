export const GenericMessage = ({ message }) => {
    return (
        <div className="p-4 mb-4 text-sm text-red-800  dark:text-red-400" role="alert">
            <span className="font-medium">{message}</span>
        </div>
    )

}