export function NavLink ({label, link} : {label:string; link:string;}) {
    return (
        <a className="
        text-zinc-800 
        hover:text-red-400" 
        href={link}>{label}</a>
    )
}

export function SecondaryButton ({label} : {label:string;}) {
    return (
        <button className="
        px-4 py-1 
        md:my-0
        my-1
        md:w-fit
        w-full
        border-2
        rounded-full 
        border-red-600 
        text-red-600
        hover:border-red-400 
        hover:text-red-400">
            {label}
        </button>
    )
}

export function PrimaryButton ({label} : {label:string;}) {
    return (
        <button className="
        px-4 py-1 
        md:my-0
        my-1
        md:w-fit
        w-full
        rounded-full 
        border-2 
        border-red-600 
        bg-red-600 
        text-white 
        hover:bg-red-400 
        hover:border-red-400">
            {label}
        </button>
    )
}