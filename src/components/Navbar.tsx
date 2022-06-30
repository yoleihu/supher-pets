import React from 'react';
import Logo from '../assets/logo-supher.png';
import { SimpleButton, PrimaryButton, SecondaryButton } from './Buttons';

export function Navbar () {
    return(
    <header className="w-full h-32 flex justify-center text-xl font-medium border-b border-red-200 ">
            <div className="w-4/5 flex justify-between items-center">
                <img src={Logo} width="350px"/>
                <div>
                    <SimpleButton label="Sobre"/>
                    <SimpleButton label="Aos Hemocentros" />
                    <SimpleButton label="FAQ" />
                    <SimpleButton label="Quem somos" />
                    <SecondaryButton label="Registre-se"/>
                    <PrimaryButton label="Entre"/>
                </div>
            </div>
        </header>
    )
}