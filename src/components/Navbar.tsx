import { List, X } from 'phosphor-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

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
					<img src={Logo} className="lg:w-80 w-52 max-h-fit pl-6" onClick={() => navigate('/')} />
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
				flex 
				lg:items-center 
				lg:justify-end 
				lg:static 
				lg:z-auto 
				lg:pb-0 
				lg:pl-0 
				lg:bg-transparent
				lg:flex-row
				absolute 
				pb-12 
				pr-6 
				pl-9
				flex-col
				w-full 
				text-right 
				transition-all 
				ease-in-out 
				duration-50
				z-50
				bg-yellow-50 
				${showNav ? 'right-0 pr-6 shadow-md' : 'right-[-100%] transition-all ease-in-out duration-500'} `}
			>
				{links?.map((linkProps) => (
					<li 
						onClick={() => setShowNav(false)} 
						key={linkProps.label} 
						className='text-xl lg:my-0 my-7'
					>
						<NavLink link={linkProps.link} label={linkProps.label} />
					</li>
				))}
				<div className='py-2 items-end flex md:flex-row flex-col lg:gap-8'>
					<ButtonNavbar type="button" label="Registre-se" path='/register' role='secondary' />
					<ButtonNavbar type="button" label="Entre" path='/login' role='primary' />
				</div>
			</ul>
		</div>
	)
}