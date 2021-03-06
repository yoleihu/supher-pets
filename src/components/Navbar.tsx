import { List, X } from 'phosphor-react';
import { useState } from 'react';
import Logo from '../assets/logo-supher.png';
import { ButtonNavbar } from './ButtonNavbar';
import { NavLink } from './NavLink';

interface NavbarProps {
	links?: LinksProps[];
}

export type LinksProps = {
	link: string;
	label: string;
}

export function Navbar({ links }: NavbarProps) {
	const [showNav, setShowNav] = useState(false);

	return (
		<div className='
			bg-yellow-50
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
				m-auto'
			>
			<div className='cursor-pointer flex items-center text'>
				<span>
					<img src={Logo} className="lg:w-80 w-52 max-h-fit pl-6" />
				</span>
			</div>
			<div
				onClick={() => setShowNav(!showNav)}
				className='text-5xl absolute right-0 top-0 p-5 cursor-pointer lg:hidden'
			>
				{showNav ?
					<X size={32} color="#474747" /> :
					<List size={32} color="#474747" />
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
				text-right 
				lg:pl-0 
				pl-9 
				transition-all 
				duration-500 
				ease-in 
				bg-yellow-50 
				lg:bg-transparent ${showNav ? 'right-0 pr-6' : 'right-[-1490px]'} `}
			>
				{links?.map((linkProps) => (
					<li 
						onClick={() => setShowNav(false)} 
						key={linkProps.label} 
						className='lg:ml-8 text-xl lg:my-0 my-7'
					>
						<NavLink link={linkProps.link} label={linkProps.label} />
					</li>
				))}
				<div className='align-bottom'>
					<ButtonNavbar type="button" label="Registre-se" path='/register' role='secondary' />
					<ButtonNavbar type="button" label="Entre" path='/login' role='primary' />
				</div>
			</ul>
		</div>
	)
}