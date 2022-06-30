import { Navbar } from "../components/Navbar";

export function Home() {
  return(
    <div className="flex flex-col min-h-screen">
            <Navbar 
            link1="frame-sobre" 
            link2="frame-aos-hemocentros" 
            link3="frame-faq" 
            link4="frame-quem-somos"/>
            <h2 id="frame-sobre">Sobre</h2>
            <h2 id="frame-aos-hemocentros">Aos hemocentros</h2>
            <h2 id="frame-faq">FAQ</h2>
            <h2 id="frame-quem-somos">Quem somos</h2>
    </div>
  )
}