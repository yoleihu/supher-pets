import { CheckCircle } from "phosphor-react";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { LinksProps, Navbar } from "../components/Navbar";

let ancors: LinksProps[];
ancors = [
  { "link": "#sobre", "label": "Sobre" },
  { "link": "#aos-hemocentros", "label": "Aos Hemocentros" },
  { "link": "#faq", "label": "FAQ" },
  { "link": "#quem-somos", "label": "Quem somos" }
]

export function Check() {
  return(
    <CheckCircle size={32} color="#57cba1" weight="fill" />
  )
}

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar links={ancors} />
      </header>

      <section className="pt-16 lg:pt-24 flex flex-row items-center justify-center" id="welcome">
        <div className="w-4/5 py-6 ">
          <div className="w-3/5 ">
            <h1 className=" text-red-600 text-6xl font-bold ">Faça do seu pet um herói, agende uma consulta!</h1>
            <p>Você sabia que seu pet pode salvar vidas de outros animais através da doação de sangue?</p>
            <p>Realize Seu cadastro</p>
            <p>Inclua seu pet</p>
            <p>Procure o receptor mais próximo</p>
            <Button label="Cadastre-se" path='/register' role='primary' />
          </div>
          <div>
            <img src=""/>
          </div>
        </div>
      </section>

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
      <footer className="lg:absolute bottom-0 w-full">
        <Footer links={ancors}/>
      </footer>
    </div>
  )
}