import React from 'react';
import Logo from '../assets/logo-supher.png';
import { HeadButton, LoginButton, RegisterButton } from './Buttons';

export function Navbar () {
    return(
        <header className="w-full py-6 flex items-center justify-between px-8 font-medium">
            <img src={Logo} width="250px"/>
            <div>
                <HeadButton label="Sobre" />
                <HeadButton label="Aos Hemocentros" />
                <HeadButton label="FAQ" />
                <HeadButton label="Quem somos" />
                <RegisterButton/>
                <LoginButton/>
            </div>
        </header>
    )
}