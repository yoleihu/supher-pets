import { LinksProps, Navbar } from "../components/Navbar";

let ancors: LinksProps[];
ancors = [
  { "link": "#sobre", "label": "Sobre" },
  { "link": "#aos-hemocentros", "label": "Aos Hemocentros" },
  { "link": "#faq", "label": "FAQ" },
  { "link": "#quem-somos", "label": "Quem somos" }
]

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar links={ancors} />
      </header>

      <section className="pt-16 lg:pt-24" id="sobre">
        <h2>Sobre</h2>
      </section>

      <section className="pt-16 lg:pt-24" id="aos-hemocentros">
        <h2>Aos hemocentros</h2>
      </section>

      <section className="pt-16 lg:pt-24" id="faq">
        <h2>FAQ</h2>
      </section>

      <section className="pt-16 lg:pt-24" id="quem-somos">
        <h2>Quem somos</h2>
      </section>
    </div>
  )
}