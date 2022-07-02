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
		<div className='shadow-md w-full fixed h-24 top-0 left-0'>
			<div className='lg:flex items-center justify-between py-4 px-7'>
				<div className='cursor-pointer flex items-center text'>
					<span>
						<img src={Logo} className="w-80 max-h-fit" />
					</span>
				</div>
				<div
					onClick={() => setShowNav(!showNav)}
					className='text-5xl absolute right-8 top-6 cursor-pointer lg:hidden'
				>
					{showNav ?
						<X /> :
						<List />
					}
				</div>
				<ul className={`lg:flex lg:items-center absolute lg:pb-0 pb-12 lg:static lg:z-auto z-[-1] right-10 w-2/4 text-right lg:pl-0 pl-9 transition-all duration-500 ease-in ${showNav ? 'right-10' : 'right-[-490px]'} `}>
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