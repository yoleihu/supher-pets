import { LinksProps, Navbar } from "../components/Navbar";

export function Home() {
  let ancors: Array<LinksProps>;
  ancors = [
    {"link":"frame-sobre", "label":"Sobre"},
    {"link":"frame-aos-hemocentros", "label":"Aos Hemocentros"},
    {"link":"frame-faq", "label":"FAQ"},
    {"link":"frame-quem-somos", "label":"Quem somos"}
  ]
  return(
    <div className="flex flex-col min-h-screen">
            <Navbar links={ancors}/>
            <h2 id="frame-sobre">Sobre</h2>
            <h2 id="frame-aos-hemocentros">Aos hemocentros</h2>
            <h2 id="frame-faq">FAQ</h2>
            <h2 id="frame-quem-somos">Quem somos</h2>
    </div>
  )
}