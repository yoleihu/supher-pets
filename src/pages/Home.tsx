import { CheckCircle, FirstAidKit, Kanban, MagnifyingGlass, NewspaperClipping } from "phosphor-react";
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
        <section className="pt-16 lg:pt-40 flex flex-row items-center justify-center" id="welcome">
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

        <section className="pt-16 flex flex-col" id="sobre">
          <div className="flex flex-col items-center">
            <p className="lg:text-4xl font-bold text-gray-800">Sobre</p>
            <p className="text-lg w-3/5 text-center">Unimos bancos de sangue veterinário e tutores em um ambiente digital, 
              afim de facilitar o processo de doação, possibilitando o tratamento de mais animais.</p>
          </div>
          <div className="pt-16 flex flex-col items-center">
            <p className="lg:text-xl font-bold text-gray-400">Como funciona?</p>
            <p className="lg:text-4xl font-bold text-gray-800">Principais funcionalidades</p>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center md:items-start gap-20 pt-10">
            <div className="flex flex-col w-40 gap-2">
            <div className="bg-red-600 rounded-full pt-7 pl-7 justify-center w-40 h-40">
                <NewspaperClipping size={100} color="#FFF8ED" weight="fill" />
              </div>
              <p className=" text-red-600 text-xl font-bold text-center">Cadastro de multiplos pets</p>
              <p className="text-gray-600 text-center">Você pode cadastrar todos os seus pets!</p>
            </div>
            <div className="flex flex-col w-40 gap-2">
            <div className="bg-red-600 rounded-full pt-7 pl-7 justify-center w-40 h-40">
                <Kanban size={100} color="#FFF8ED" weight="fill" />
              </div>
              <p className=" text-red-600 text-xl font-bold text-center">Gerenciamento de consultas</p>
              <p className="text-gray-600 text-center">Receba notificações sobre as consultas de cada pet e acesse os resultados!</p>
            </div>
            <div className="flex flex-col w-40 gap-2">
              <div className="bg-red-600 rounded-full pt-8 pl-8 justify-center w-40 h-40">
                <MagnifyingGlass size={100} color="#FFF8ED" weight="fill" />
              </div>
              <p className=" text-red-600 text-xl font-bold text-center">Encontre  hemocentros</p>
              <p className="text-gray-600 text-center">Conheça os bancos de sangue próximos a você!</p>
            </div>
          </div>
        </section>

        <section className="lg:py-20 md:px-10 py-5 lg:mt-20 mt-5 lg:px-40 px-2 flex lg:flex-row justify-center items-center flex-col-reverse bg-red-200 rounded-3xl" id="aos-hemocentros">
            <div className="lg:w-1/2 w-full flex flex-col gap-4">
              <p className="lg:text-xl font-bold text-gray-600">Aos Hemocentros</p>
              <p className="lg:text-4xl text-xl font-bold text-gray-800">Hemocentros e veterinários</p>
              <p className="text-lg">O SUPHER Pets foi criado para te auxiliar a encontrar doadores e gerenciar consultas. Através dele você pode criar alertas de necessidade, visulizar perfis dos animais e agendar consultas.</p>
              <div className="md:text-start text-center">
                <ButtonNavbar label="Cadastre-se" path='/register' role='primary' type='button'/>
              </div>
            </div>
            <div className="lg:w-1/2 items-center justify-center text-center flex w-full">
              <FirstAidKit size={200} color="#f23326" weight="fill" />
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
      {/* <footer className="lg:absolute bottom-0 w-full">
        <Footer links={ancors}/>
      </footer> */}
    </div>
  )
}