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
    flex
    flex-col
    justify-starts
    md:items-center
    md:text-xl 
    text-md
    font-medium 
    border-b 
    border-red-200 ">
        <div className="md:w-4/5 w-100 md:flex-row flex-col flex">
            <img src={Logo} className="md:w-80 w-4/5 md:my-0 my-2 h-fit"/>
            <div className="md:flex-row md:items-center flex flex-col md:space-x-10 space-x-0 mx-6">
                {links?.map((linkProps) => (
                    <NavLink link={linkProps.link} label={linkProps.label}/>
                ))}
                <SecondaryButton label="Registre-se"/>
                <PrimaryButton label="Entre"/>
            </div>
        </div>
        </header>
    )
}