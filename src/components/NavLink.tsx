interface NavLinkProps {
  label: string,
  link: string
}

export function NavLink ({label, link}: NavLinkProps) {
  return (
      <a className="
      text-zinc-800 
      hover:text-red-400
      transition-colors
      font-medium
      text-sm
      lg:text-base" 
      href={link}>
        {label}
      </a>
  )
}