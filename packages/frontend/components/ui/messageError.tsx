interface IPropsMessageError{
    message: string
}

export default function MessageError({message}: IPropsMessageError) {
    if(!message) return null
    return (
        <div className="bg-red-600/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-600 mb-3">
            {message}
        </div>
    );
}