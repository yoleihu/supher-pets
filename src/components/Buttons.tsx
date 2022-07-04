export function NavLink ({label, link} : {label:string; link:string;}) {
    return (
        <a className="
        text-zinc-800 
        hover:text-red-400
        transition-colors" 
        href={link}>{label}</a>
    )
}

export function SecondaryButton ({label} : {label:string;}) {
    return (
        <button className="
        px-4 py-1 
        lg:my-0
        my-1
        lg:w-fit
        w-3/4
        lg:ml-8
        border
        rounded-full 
        border-red-600 
        text-red-600
        hover:border-red-400 
        hover:text-red-400
        transition-colors">
            {label}
        </button>
    )
}

export function PrimaryButton ({label} : {label:string;}) {
    return (
        <button className="
        px-4 py-1 
        lg:my-0
        my-1
        lg:w-fit
        w-3/4
        rounded-full 
        border
        lg:ml-8
        border-red-600 
        bg-red-600 
        text-white 
        hover:bg-red-400 
        hover:border-red-400
        transition-colors">
            {label}
        </button>
    )
}