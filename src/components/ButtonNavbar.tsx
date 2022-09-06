import { useNavigate } from "react-router-dom";

interface ButtonNavbarProps {
  label: string;
  path: string;
  type: "button" | "submit";
  role: "primary" | "secondary";
}

export function ButtonNavbar({ label, path, type, role }: ButtonNavbarProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      type={type}
      className={`
			px-4 py-1 
			lg:my-0
			my-1
			lg:w-fit
			max-w-[13rem]
			w-3/5
			border
			rounded-full 
			${
        role === "primary"
          ? "bg-red-600 text-white hover:bg-red-400"
          : "text-red-600 hover:text-red-400"
      }
			border-red-600 
			hover:border-red-400 
			transition-colors`}
    >
      {label}
    </button>
  );
}
