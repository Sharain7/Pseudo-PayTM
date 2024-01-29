export const InputBox = ({label,placeholder,onChange}) =>{
    return (
        <div>
            <div className="font-medium text-left py-2">
                {label}
            </div>
            <input required onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" placeholder={placeholder}></input>

        </div>
    )

}