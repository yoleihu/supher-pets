import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

interface ButtonNavbarProps {
  label: string;
  path?: string;
  type: "button" | "submit";
  role: "primary" | "secondary";
  isSignOutButton?: boolean
}

export function ButtonNavbar({ label, path, type, role, isSignOutButton }: ButtonNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useContext(UserContext);

  return (
    <button
      onClick={() => {isSignOutButton ? signOut() : navigate(path ?? '')}}
      type={type}
      className={`
        px-4 py-1 
        lg:my-0
        my-1
        lg:w-fit
        max-w-[13rem]
        border
        rounded-full 
        ${
          role === "primary"
            ? "bg-red-600 text-white hover:bg-red-400"
            : "text-red-600 hover:text-red-400"
        }
        border-red-600 
        hover:border-red-400 
        transition-colors
        ${location.pathname === '/' && 'w-3/5'}
      `}
    >
      {label}
    </button>
  );
}
