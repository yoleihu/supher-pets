export function HeadButton ({label} : {label:string;}) {
    return (
        <button className="px-4 m-x4 text-zinc-900 hover:text-zinc-700">
            {label}
        </button>
    )
}

export function RegisterButton () {
    return (
        <button className="px-6 py-1 mx-4 border-2 rounded-full border-red-600 text-red-600
        hover:border-red-400 hover:text-red-400">
            Registre-se
        </button>
    )
}

export function LoginButton () {
    return (
        <button className="px-6 py-1 mx-4 rounded-full border-red-600 bg-red-600 text-white 
        hover:bg-red-400 hover:border-red-400">
            Entre
        </button>
    )
}