import { CheckCircle } from "phosphor-react";
import { Footer } from "../components/Footer";
import { LinksProps, Navbar } from "../components/Navbar";
import Pets from '../assets/gato-e-cachorro.png';
import { ButtonNavbar } from "../components/ButtonNavbar";

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
      <div className="lg:px-40 px-2">
        <section className="pt-16 lg:pt-24 flex flex-row items-center justify-center" id="welcome">
          <div className="py-6 flex lg:flex-row justify-between flex-col-reverse">
            <div className="lg:w-3/5 w-full">
              <h1 className=" text-red-600 lg:text-6xl text-3xl font-bold ">Faça do seu pet um herói, agende uma consulta!</h1>
              <div className="py-2">
                <p className="text-lg">Você sabia que seu pet pode salvar vidas de outros animais através da doação de sangue?</p>
                <p className="flex flex-row gap-2 items-center text-lg"><CheckCircle size={32} color="#57cba1" weight="fill" />Realize Seu cadastro</p>
                <p className="flex flex-row gap-2 items-center text-lg"><CheckCircle size={32} color="#57cba1" weight="fill" />Inclua seu pet</p>
                <p className="flex flex-row gap-2 items-center text-lg"><CheckCircle size={32} color="#57cba1" weight="fill" />Procure o receptor mais próximo</p>
              </div>
              <div className="md:text-start text-center">
                <ButtonNavbar label="Cadastre-se" path='/register' role='primary' type='button'/>
              </div>
            </div>
            <div className="lg:w-2/5 w-full">
              <img src={Pets} className="w-full max-h-fit" />
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
      </div>
      <footer className="lg:absolute bottom-0 w-full">
        <Footer links={ancors}/>
      </footer>
    </div>
  )
}