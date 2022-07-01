import React from 'react';
import Logo from '../assets/logo-supher.png';
import { NavLink, PrimaryButton, SecondaryButton } from './Buttons';

interface NavbarProps {
    links: LinksProps[];
}

export type LinksProps = {
    link: string;
    label: string;
}

export function Navbar ({links} : NavbarProps) {
    console.log(links)
    return(
    <header className="
    md:w-full 
    md:h-32 
    md:justify-between 
    md:flex-row
    md:items-center
    md:text-xl 
    flex
    flex-col
    justify-start
    text-md
    font-medium 
    border-b 
    border-red-200 ">
            <img src={Logo} className="md:w-80 w-4/5 md:my-0 my-2 h-fit"/>
            <div className="
            md:flex-row 
            md:items-center 
            md:space-x-10 
            md:w-100 
            md:bg-transparent
            bg-yellow-300
            flex 
            flex-col 
            items-end 
            space-x-0 
            w-4/5 
            px-4
            self-end">
                {links?.map((linkProps) => (
                    <NavLink link={linkProps.link} label={linkProps.label}/>
                ))}
                <SecondaryButton label="Registre-se"/>
                <PrimaryButton label="Entre"/>
            </div>
        </header>
    )
}