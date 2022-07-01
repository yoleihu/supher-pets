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
    <header className="w-full h-32 flex justify-center text-xl font-medium border-b border-red-200 ">
            <div className="w-4/5 flex justify-between items-center">
                <div>
                <img src={Logo} width="350px"/>
                    <div>
                        <div>
                        {
                            links.map((linkProps) => {
                                <NavLink link={linkProps.link} label={linkProps.label}/>
                                })
                        }
                        </div>
                    <SecondaryButton label="Registre-se"/>
                    <PrimaryButton label="Entre"/>
                    </div>
                </div>
            </div>
        </header>
    )
}