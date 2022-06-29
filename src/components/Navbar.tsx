import React from 'react';
import Logo from '../assets/logo-supher.png';
import { PrimaryButton, SecondaryButton } from './Buttons';

export function Navbar () {
    return(
    <header className="    w-full py-6 flex justify-center font-bold text-lg border-b border-red-200 ">
            <div className="w-4/5 flex justify-between">
                <img src={Logo} width="350px"/>
                <div>
                    <a className="px-4">Sobre</a>
                    <a className="px-4">Aos Hemocentros</a>
                    <a className="px-4">FAQ</a>
                    <a className="px-4">Quem somos</a>
                    <SecondaryButton label="Registre-se"/>
                    <PrimaryButton label="Entre"/>
                </div>
            </div>
        </header>
    )
}