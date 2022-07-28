interface ButtonUserProps {
  label: string,
  isGuardian?: boolean,
  isBloodCenter?: boolean,
  onChangeUser: () => void
}

export function ButtonUser({label, isGuardian, isBloodCenter, onChangeUser}: ButtonUserProps) {
  return (
    <button 
      className={`${isGuardian || isBloodCenter ? 'bg-yellow-200' : 'bg-amber-400 text-zinc-700'} h-fit pt-3 px-5 rounded-t-3xl lg:text-lg transition-all duration-500`} 
      onClick={onChangeUser}
    >
      {label}
    </button>
  )
}