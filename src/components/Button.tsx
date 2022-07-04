import { useNavigate } from "react-router-dom";

interface ButtonProps {
    label: string,
    path: string,
    role: 'primary' | 'secondary'
}

export function Button ({label, path, role}: ButtonProps) {
    const navigate = useNavigate();

    return (
        <button 
        onClick={() => navigate(path)}
        className={`
        px-4 py-1 
        lg:my-0
        my-1
        lg:w-fit
        w-3/4
        lg:ml-8
        border
        rounded-full 
        ${role === 'primary' ? 'bg-red-600 text-white hover:bg-red-400' : 'text-red-600 hover:text-red-400' }
        border-red-600 
        hover:border-red-400 
        transition-colors`}>
            {label}
        </button>
    )
}