import { CaretDown, CaretLeft, CaretRight, CheckCircle, FirstAidKit, Kanban, MagnifyingGlass, NewspaperClipping } from "phosphor-react";
import { Footer } from "../components/Footer";
import { LinksProps, Navbar } from "../components/Navbar";
import Pets from '../assets/gato-e-cachorro.png';
import { ButtonNavbar } from "../components/ButtonNavbar";
import useCollapse from 'react-collapsed';


let ancors: LinksProps[];
ancors = [
  { "link": "#sobre", "label": "Sobre" },
  { "link": "#aos-hemocentros", "label": "Aos Hemocentros" },
  { "link": "#faq", "label": "FAQ" },
  { "link": "#quem-somos", "label": "Quem somos" }
]

interface CollapseProps {
  question: string,
  response: string,
  number: string
}

export function Check() {
  return (
    <CheckCircle size={32} color="#57cba1" weight="fill" />
  )
}

function CollapsibleFaq({ question, response, number }: CollapseProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible w-full flex flex-col">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-row items-center">
          <div className="w-20 h-20 bg-green-400 rounded-full flex justify-center items-center">
            <p className="text-4xl text-bold text-yellow-50">{number}</p>
          </div>
          <p className="text-2xl px-8 text-zinc-800">{question}</p>
        </div>
        <div className="header" {...getToggleProps()}>
          {isExpanded ? <CaretDown size={52} color="#b0b0b0" weight="fill" /> : <CaretLeft size={52} color="#b0b0b0" weight="fill" />}
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <p className="text-xl p-8 ml-20 my-4 text-zinc-600 bg-zinc-200 rounded-3xl">{response}</p>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar links={ancors} />
      </header>
      <div className="lg:px-56 px-2 flex flex-col">
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
                <ButtonNavbar label="Cadastre-se" path='/register' role='primary' type='button' />
              </div>
            </div>
            <div className="lg:w-2/5 w-full">
              <img src={Pets} className="w-full max-h-fit" />
            </div>
          </div>
        </section>

        <section className="pt-16 flex flex-col" id="sobre">
          <div className="flex flex-col items-center">
            <p className="lg:text-4xl font-bold text-zinc-800">Sobre</p>
            <p className="text-lg w-3/5 text-center">Unimos bancos de sangue veterinário e tutores em um ambiente digital,
              afim de facilitar o processo de doação, possibilitando o tratamento de mais animais.</p>
          </div>
          <div className="pt-16 flex flex-col items-center">
            <p className="lg:text-xl font-bold text-zinc-400">Como funciona?</p>
            <p className="lg:text-4xl font-bold text-zinc-800">Principais funcionalidades</p>
          </div>
          <div className="flex md:flex-row flex-col justify-center items-center md:items-start gap-20 pt-10">
            <div className="flex flex-col w-40 gap-4">
              <div className="bg-red-600 rounded-full pt-7 pl-7 justify-center w-40 h-40">
                <NewspaperClipping size={100} color="#FFF8ED" weight="fill" />
              </div>
              <p className=" text-red-600 text-xl font-bold text-center">Cadastro de multiplos pets</p>
              <p className="text-zinc-600 text-center">Você pode cadastrar todos os seus pets!</p>
            </div>
            <div className="flex flex-col w-40 gap-2">
              <div className="bg-red-600 rounded-full pt-7 pl-7 justify-center w-40 h-40">
                <Kanban size={100} color="#FFF8ED" weight="fill" />
              </div>
              <p className=" text-red-600 text-xl font-bold text-center">Gerenciamento de consultas</p>
              <p className="text-zinc-600 text-center">Receba notificações sobre as consultas de cada pet e acesse os resultados!</p>
            </div>
            <div className="flex flex-col w-40 gap-2">
              <div className="bg-red-600 rounded-full pt-8 pl-8 justify-center w-40 h-40">
                <MagnifyingGlass size={100} color="#FFF8ED" weight="fill" />
              </div>
              <p className=" text-red-600 text-xl font-bold text-center">Encontre  hemocentros</p>
              <p className="text-zinc-600 text-center">Conheça os bancos de sangue próximos a você!</p>
            </div>
          </div>
        </section>

        <section className="lg:py-20 md:px-10 py-5 lg:mt-20 mt-5 lg:px-40 px-2 flex lg:flex-row justify-center items-center flex-col-reverse bg-red-200 rounded-3xl" id="aos-hemocentros">
          <div className="lg:w-1/2 w-full flex flex-col gap-4">
            <p className="lg:text-xl font-bold text-zinc-600">Aos Hemocentros</p>
            <p className="lg:text-4xl text-xl font-bold text-zinc-800">Hemocentros e veterinários</p>
            <p className="text-lg">O SUPHER Pets foi criado para te auxiliar a encontrar doadores e gerenciar consultas. Através dele você pode criar alertas de necessidade, visulizar perfis dos animais e agendar consultas.</p>
            <div className="md:text-start text-center">
              <ButtonNavbar label="Cadastre-se" path='/register' role='primary' type='button' />
            </div>
          </div>
          <div className="lg:w-1/2 items-center justify-center text-center flex w-full">
            <FirstAidKit size={200} color="#f23326" weight="fill" />
          </div>
        </section>

        <section className="py-5 lg:mt-20 mt-5 lg:px-40 px-2 flex items-start flex-col" id="faq">
          <p className="lg:text-xl font-bold text-zinc-600">FAQ</p>
          <p className="lg:text-4xl text-xl font-bold text-red-600">Perguntas frequentes</p>
          <div className="flex flex-col w-full gap-4 mt-5">
            <CollapsibleFaq question="Pergunta" response="Resposta" number="1" />
            <CollapsibleFaq question="Pergunta" response="Resposta" number="2" />
            <CollapsibleFaq question="Pergunta" response="Resposta" number="3" />
            <CollapsibleFaq question="Pergunta" response="Resposta" number="4" />
          </div>
        </section>

        <section className="lg:py-20 md:px-10 py-5 lg:mt-20 mt-5 lg:px-40 px-2 flex items-start flex-col bg-red-200 rounded-3xl" id="quem-somos">
          <p className="lg:text-xl font-bold text-zinc-600">Quem somos</p>
          <p className="lg:text-4xl text-xl font-bold text-zinc-800">Conheça os idealizadores</p>
          <div className="mt-5 lg:w-full w-full flex lg:flex-row flex-col justify-center gap-8">
            <div className="bg-yellow-50 w-full rounded-full flex flex-row p-10 items-center justify-between">
              <div className="gap-4 pl-5">
                <p className="lg:text-2xl font-bold text-zinc-800">Giuliana Missio</p>
                <p className="text-xl text-red-600">Web Developer, 20 anos</p>
              </div>
              <div className="w-24 h-24 bg-red-600 rounded-full"></div>
            </div>
            <div className="bg-yellow-50 w-full rounded-full flex flex-row p-10 items-center justify-between">
              <div className="gap-4 pl-5">
                <p className="lg:text-2xl font-bold text-zinc-800">Yolanda Ferreira</p>
                <p className="text-xl text-red-600">Web Developer, 20 anos</p>
              </div>
              <div className="w-24 h-24 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </section>
        <div className="w-3/5 items-end flex flex-col gap-4 my-16 self-end">
          <p className="lg:text-4xl text-xl font-bold text-zinc-800 self-start">Contato</p>
          <div className="flex flex-row justify-between items-center w-full gap-4">
            <input className="bg-yellow-50 border w-full h-fit border-zinc-200 rounded-xl p-4" placeholder="Nome"></input>
            <input className="bg-yellow-50 border w-full h-fit border-zinc-200 rounded-xl p-4" placeholder="E-mail"></input>
          </div>
          <input className="bg-yellow-50 border w-full h-fit border-zinc-200 rounded-xl p-4" placeholder="Assunto"></input>
          <input className="bg-yellow-50 border w-full h-fit border-zinc-200 rounded-xl p-4" placeholder="Mensagem"></input>
          <ButtonNavbar label="Enviar" path="/enviar" type="submit" role="primary" />
        </div>
      </div>
      <footer className="bottom-0 w-full">
        <Footer links={ancors} />
      </footer>
    </div>
  )
}