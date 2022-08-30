import { ButtonNavbar } from "./ButtonNavbar";
import { ButtonUser } from "./ButtonUser";
import { NavLink } from "./NavLink";

interface FooterProps {
  links?: LinksProps[];
}

export type LinksProps = {
  link: string;
  label: string;
};

export function Footer({ links }: FooterProps) {
  return (
    <footer
      className="
			bg-yellow-50
			border-t
			flex 
			flex-col
			md:flex-row
			md:items-center 
			md:justify-between
			md:px-20
			lg:px-44
			px-6"
    >
      <div className="flex lg:items-center lg:justify-between w-full h-fit">
        <ul
          className="
					flex 
					md:flex-row
					flex-col
					md:items-center 
					md:justify-start 
					w-full"
        >
          {links?.map((linkProps) => (
            <li key={linkProps.label} className="md:ml-8 text-xl lg:my-0 my-4">
              <NavLink link={linkProps.link} label={linkProps.label} />
            </li>
          ))}
        </ul>
      </div>
      <h2
        className="
				text-zinc-500 
				font-medium
				text-sm
				lg:text-base 
				text-left
				md:text-right
				w-full
				py-5"
      >
        Copyright © Supher Pets
      </h2>
    </footer>
  );
}
