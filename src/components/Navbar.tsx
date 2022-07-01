import { List } from 'phosphor-react';
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

export function Navbar ({links} : NavbarProps) {
    const [showNav, setShowNav] = useState(false);

    return(
    <header className="
    lg:px-40
    lg:w-full 
    lg:h-32 
    lg:justify-between
    lg:flex-row
    lg:items-center
    lg:text-xl 
    px-0
    flex
    flex-col
    justify-start
    text-md
    font-medium 
    border-b 
    border-red-200 ">
        <div className="flex items-center justify-between">
            <img src={Logo} className="lg:w-80 w-4/6 lg:my-0 my-2 h-fit"/>
            <List size={40} onClick={() => setShowNav(!showNav)} className="lg:hidden block px-2 cursor-pointer" />
        </div>
            <div className={ (showNav ? "hidden " : "visible ") + "lg:flex-row lg:items-center lg:space-x-10 lg:w-100 lg:bg-transparent lg:self-center lg:p-0 justify-end bg-yellow-300 flex flex-col items-end space-x-0 w-4/5 p-4 self-end"}>
                {links?.map((linkProps) => (
                    <NavLink link={linkProps.link} label={linkProps.label}/>
                ))}
                <SecondaryButton label="Registre-se"/>
                <PrimaryButton label="Entre"/>
            </div>
        </header>
    )
}