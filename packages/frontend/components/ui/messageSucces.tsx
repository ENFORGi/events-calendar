
interface IPropsMessageError{
    message: string
}

export default function MessageSucces({message}: IPropsMessageError) {
    if(!message) return null
    return (
        <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500 mb-3">
            {message}
        </div>
    );
}