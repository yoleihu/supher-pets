import { LinksProps, Navbar } from "../components/Navbar";

let ancors: LinksProps[];
ancors = [
  { "link": "#frame-sobre", "label": "Sobre" },
  { "link": "#frame-aos-hemocentros", "label": "Aos Hemocentros" },
  { "link": "#frame-faq", "label": "FAQ" },
  { "link": "#frame-quem-somos", "label": "Quem somos" }
]

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar links={ancors} />
      </header>
      <div className="mt-28">
        <h2 className="mb-96" id="frame-sobre">Sobre</h2>
        <h2 className="mb-96" id="frame-aos-hemocentros">Aos hemocentros</h2>
        <h2 className="mb-96" id="frame-faq">FAQ</h2>
        <h2 className="mb-96" id="frame-quem-somos">Quem somos</h2>
      </div>
    </div>
  )
}