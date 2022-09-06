  import { List, X } from "phosphor-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/logo-supher.png";
import SmallLogo from "../assets/small-logo-supher.png";
import { ButtonNavbar } from "./ButtonNavbar";
import { NavLink } from "./NavLink";

interface NavbarProps {
  links?: LinksProps[];
}

export type LinksProps = {
  link: string;
  label: string;
};

export function Navbar({ links }: NavbarProps) {
	const [showNav, setShowNav] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

  return (
    <div
      className="
				lg:h-[4.5rem] 
				lg:flex 
			bg-yellow-50
				shadow-md 
				w-full 
				fixed 
				h-16
				top-0 
				left-0 
				items-center 
				justify-between 
				py-4 
				self-center 
				m-auto"
    >
      <div className="flex items-center text">
        <span>
          <img
            src={Logo}
            className="lg:w-80 w-52 max-h-fit pl-6 lg:block hidden"
            onClick={() => navigate("/")}
          />
          <img
            src={SmallLogo}
            className="lg:w-80 w-[3.75rem] max-h-fit pl-6 lg:hidden block"
            onClick={() => navigate("/")}
          />
        </span>
        {location.pathname !== "/register" &&
          location.pathname !== "/login" &&
          location.pathname !== "/recoverPassword" && (
            <div
              onClick={() => setShowNav(!showNav)}
              className="text-5xl absolute right-0 top-0 p-5 lg:hidden"
            >
              {showNav ? (
                <X size={25} color="#474747" />
              ) : (
                <List size={25} color="#474747" />
              )}
            </div>
          )}
      </div>
      <div
        className={`
				lg:h-fit
				lg:static
				lg:mt-0
				mt-3
				w-full
				h-screen
				absolute
				justify-end
				flex
				transition-all 
				ease-in-out 
				duration-500
				${showNav ? "right-0" : "right-[-100%] "}`}
      >
        <div
          className={`
					lg:bg-transparent
					lg:backdrop-blur-none
					lg:bg-opacity-0
					h-full
					w-1/4
					transition-all
					duration-500	
					${showNav ? "bg-opacity-30 bg-black backdrop-blur-lg" : "bg-transparent"}
					`}
          onClick={() => setShowNav(!showNav)}
        />
        <ul
          className={`
					w-3/4
					rigth-0
					pb-12 
					pr-6 
					pl-9
					flex
					text-right 
					lg:items-center 
					lg:justify-end 
					lg:static 
					lg:z-auto 
					lg:pb-0 
					lg:pl-0 
					lg:gap-8
					lg:flex-row
					flex-col
					bg-yellow-50
					lg:h-fit
					h-screen
					items-end
				`}
				>
					{links?.map((linkProps) => (
						<li
							onClick={() => setShowNav(false)}
							key={linkProps.label}
							className='text-xl lg:my-0 my-3 w-fit	items-center'
						>
							<NavLink link={linkProps.link} label={linkProps.label} />
						</li>
					))}
					{(location.pathname !== '/register' && location.pathname !== '/login' && location.pathname !== '/recoverPassword') &&
						<div className='py-2 items-end bottom-0 flex lg:flex-row flex-col lg:gap-8 w-full lg:w-fit'>
							<ButtonNavbar type="button" label="Registre-se" path='/register' role='secondary' />
							<ButtonNavbar type="button" label="Entre" path='/login' role='primary' />
						</div>
					}
				</ul>
			</div>
		</div>
	)
}
