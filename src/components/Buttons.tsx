export function SecondaryButton ({label} : {label:string;}) {
    return (
        <button className="px-4 py-1 mx-6 border-2 rounded-full border-red-600 text-red-600
        hover:border-red-400 hover:text-red-400">
            {label}
        </button>
    )
}

export function PrimaryButton ({label} : {label:string;}) {
    return (
        <button className="px-4 py-1 mx-6 rounded-full border-red-600 bg-red-600 text-white 
        hover:bg-red-400 hover:border-red-400">
            {label}
        </button>
    )
}