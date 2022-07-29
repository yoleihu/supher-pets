import { ButtonNavbar } from "./ButtonNavbar";
import { ButtonUser } from "./ButtonUser";
import { NavLink } from "./NavLink";

interface FooterProps {
	links?: LinksProps[];
}

export type LinksProps = {
	link: string;
	label: string;
}

export function Footer({ links }: FooterProps) {
	return (
		<footer className="
      		lg:h-24
			h-fit
			bg-yellow-50
			border-t
			lg:flex 
			lg:items-center 
			lg:justify-between 
			bottom-0
			px-56
			flex-col"
		>
			<div className="flex flex-row lg:items-center lg:justify-between w-full h-fit">
				<ul className="
				lg:flex 
				lg:items-center 
				lg:justify-start 
				w-full 
				transition-all 
				duration-500 
				ease-in ">
					{links?.map((linkProps) => (
						<li
							key={linkProps.label}
							className='lg:ml-8 ml-6 text-xl lg:my-0 my-7'
						>
							<NavLink link={linkProps.link} label={linkProps.label} />
						</li>
					))}
				</ul>
				<h2 className="
            text-zinc-500 
            font-medium
            text-sm
            lg:text-lg 
            w-full
            lg:text-right
            text-left
            lg:px-8
            px-6
            py-5">
					Copyright © Supher Pets</h2>
			</div>
		</footer>
	)
}