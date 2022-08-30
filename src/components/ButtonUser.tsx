import { FirstAid, PawPrint } from "phosphor-react"

interface ButtonUserProps {
  label: string,
  isGuardian?: boolean,
  isBloodCenter?: boolean,
  onChangeUser: () => void
}

export function ButtonUser({ label, isGuardian, isBloodCenter, onChangeUser }: ButtonUserProps) {
  return (
    <button
      className={`
        h-fit 
        w-4/6
        py-3
        px-5 
        rounded-xl

        shadow
        lg:text-lg
        flex
        gap-1
        justify-center
        items-center
        transition-all
        duration-500
        ${label === 'Hemocentro' ? 'rounded-l-none' : 'rounded-r-none'}
        ${isGuardian || isBloodCenter ? 'bg-zinc-200 shadow-inner text-zinc-600' : 'bg-white '} 
      `}
      onClick={onChangeUser}
    >
      {label === 'Hemocentro' ?
        <FirstAid /> :
        <PawPrint />
      }
      {label}
    </button>
  )
}