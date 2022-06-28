import React from 'react';
import Logo from '../assets/logo-supher.png';

export function Navbar () {
    return(
        <header className="w-full py-6 flex items-center justify-between bg-white">
            <img src={Logo} width="250px"/>
            <div>
                <button>Sobre</button>
                <button>Aos Hemocentros</button>
                <button>FAQ</button>
                <button>Quem somos</button>
                <button>Registre-se</button>
                <button>Entrar</button>
            </div>
        </header>
    )
}