import React from 'react';
import Logo from '../assets/logo-supher.png';
import { NavLink, PrimaryButton, SecondaryButton } from './Buttons';

export function Navbar ({
    link1,
    link2,
    link3,
    link4,
} : {
    link1: string;
    link2: string;
    link3: string;
    link4: string;
}
) {
    return(
    <header className="w-full h-32 flex justify-center text-xl font-medium border-b border-red-200 ">
            <div className="w-4/5 flex justify-between items-center">
                <img src={Logo} width="350px"/>
                <div>
                    <NavLink link={link1} label="Sobre"/>
                    <NavLink link={link2} label="Aos Hemocentros" />
                    <NavLink link={link3} label="FAQ" />
                    <NavLink link={link4} label="Quem somos" />
                    <SecondaryButton label="Registre-se"/>
                    <PrimaryButton label="Entre"/>
                </div>
            </div>
        </header>
    )
}