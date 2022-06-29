import React from 'react';
import Logo from '../assets/logo-supher.png';
import { HeadButton, PrimaryButton, SecondaryButton } from './Buttons';

export function Navbar () {
    return(
        <header className="w-full py-6 px-8 flex items-center justify-between font-medium ">
            <img src={Logo} width="250px"/>
            <div>
                <HeadButton label="Sobre" />
                <HeadButton label="Aos Hemocentros" />
                <HeadButton label="FAQ" />
                <HeadButton label="Quem somos" />
                <SecondaryButton label="Registre-se"/>
                <PrimaryButton label="Entre"/>
            </div>
        </header>
    )
}