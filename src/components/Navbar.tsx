import { List, X } from 'phosphor-react';
import React, { useState } from 'react';
import Logo from '../assets/logo-supher.png';
import { NavLink, PrimaryButton, SecondaryButton } from './Buttons';

interface NavbarProps {
	links: LinksProps[];
}

export type LinksProps = {
	link: string;
	label: string;
}

export function Navbar({ links }: NavbarProps) {
	const [showNav, setShowNav] = useState(false);

	return (
			<div className='
            shadow-md 
            w-full 
            fixed 
            lg:h-24 
            h-fit 
            top-0 
            left-0 
            lg:flex 
            items-center 
            justify-between 
            py-4 
            self-center 
            m-auto'>
				<div className='cursor-pointer flex items-center text'>
					<span>
						<img src={Logo} className="lg:w-80 w-56 max-h-fit pl-6" />
					</span>
				</div>
				<div
					onClick={() => setShowNav(!showNav)}
					className='text-5xl absolute right-0 top-0 p-5 cursor-pointer lg:hidden'
				>
					{showNav ?
						<X size={32} color="#474747"/> :
						<List size={32} color="#474747"/>
					}
				</div>
				<ul className={`
                mt-0 
                lg:flex 
                lg:items-center 
                lg:justify-end 
                absolute 
                lg:pb-0 
                pb-12 
                lg:static 
                lg:z-auto 
                z-[-1] 
                pr-6 
                w-full 
                min-h-screen 
                text-right 
                lg:pl-0 
                pl-9 
                transition-all 
                duration-500 
                ease-in 
                bg-yellow-200 
                lg:bg-transparent ${showNav ? 'right-0 pr-6' : 'right-[-1490px]'} `}>
					{links?.map((linkProps) => (
						<li key={linkProps.label} className='lg:ml-8 text-xl lg:my-0 my-7'>
							<NavLink link={linkProps.link} label={linkProps.label} />
						</li>
					))}
					<div className='align-bottom'>
						<SecondaryButton label="Registre-se" />
						<PrimaryButton label="Entre" />
					</div>
				</ul>
			</div>

		// <header className="
		// lg:px-40
		// lg:w-full 
		// lg:h-32 
		// lg:justify-between
		// lg:flex-row
		// lg:items-center
		// lg:text-xl 
		// px-0
		// flex
		// flex-col
		// justify-start
		// text-md
		// font-medium 
		// border-b 
		// border-red-200 ">
		//     <div className="flex items-center justify-between">
		//         <img src={Logo} className="lg:w-80 w-4/6 lg:my-0 my-2 h-fit"/>
		//         <List size={40} onClick={() => setShowNav(!showNav)} className="lg:hidden block px-2 cursor-pointer" />
		//     </div>
		//         <nav  className={ (showNav ? "hidden " : "visible ") + "lg:visible lg:flex-row lg:items-center lg:space-x-10 lg:w-100 lg:bg-transparent lg:self-center lg:p-0 justify-end bg-yellow-300 flex flex-col items-end space-x-0 w-4/5 p-4 self-end"}>
		//             {links?.map((linkProps) => (
		//                 <NavLink link={linkProps.link} label={linkProps.label}/>
		//             ))}
		//             <SecondaryButton label="Registre-se"/>
		//             <PrimaryButton label="Entre"/>
		//         </nav>
		//     </header>
	)
}