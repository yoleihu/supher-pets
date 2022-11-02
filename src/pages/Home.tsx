import {
  CaretDown,
  CaretLeft,
  CheckCircle,
  FirstAidKit,
  Kanban,
  MagnifyingGlass,
  NewspaperClipping,
} from "phosphor-react";
import { Footer } from "../components/Footer";
import { LinksProps, Navbar } from "../components/Navbar";
import Pets from "../assets/gato-e-cachorro.png";
import Form from "../assets/pet-form.png";
import PetShop from "../assets/pet-shop.png";
import Calendar from "../assets/calendar.png";
import Attach from "../assets/attach.png";
import Location from "../assets/location.png";
import Appoitment from "../assets/appointment.png";
import PetForm from "../assets/pet-certificate.png";
import Yo from "../assets/yo.png";
import Giu from "../assets/giu.png";

import { ButtonNavbar } from "../components/Buttons/ButtonNavbar";
import useCollapse from "react-collapsed";
import { ContactForm } from "../components/Forms/ContactForm";
import { ReactElement } from "react";

let ancors: LinksProps[];
ancors = [
  { link: "#sobre", label: "Sobre" },
  { link: "#aos-hemocentros", label: "Aos Hemocentros" },
  { link: "#faq", label: "FAQ" },
  { link: "#quem-somos", label: "Quem somos" },
];

interface AboutItemProps {
  title: string;
  text: string;
  icon: ReactElement;
}

interface DeveloperProps {
  name: string;
  descrption: string;
  image: ReactElement;
}

interface CollapseProps {
  question: string;
  response: string;
  number: string;
}

function AboutItem({ title, text, icon }: AboutItemProps) {
  return (
    <div className="flex md:flex-col flex-row items-center md:w-40 w-full gap-4">
      {icon}
      <div className="flex flex-col md:items-center items-start md:w-40 w-full gap-4">
        <p className=" text-cyan-900 text-xl font-bold md:text-center text-left">
          {title}
        </p>
        <p className="text-zinc-600 md:text-center text-left">{text}</p>
      </div>
    </div>
  );
}

function CollapsibleFaq({ question, response, number }: CollapseProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  return (
    <div className="collapsible w-full flex flex-col">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-row items-center">
          <div className="w-16 h-16 bg-green-400 rounded-full flex justify-center items-center">
            <p className="text-2xl text-bold text-yellow-50">{number}</p>
          </div>
          <p className="text-xl px-8 text-zinc-800">{question}</p>
        </div>
        <div className="header" {...getToggleProps()}>
          {isExpanded ? (
            <CaretDown size={44} color="#b0b0b0" weight="fill" />
          ) : (
            <CaretLeft size={44} color="#b0b0b0" weight="fill" />
          )}
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <p className="text-xl p-8 md:ml-20 my-4 text-zinc-600 bg-zinc-200 rounded-3xl">
            {response}
          </p>
        </div>
      </div>
    </div>
  );
}

function DeveloperItem({ name, descrption, image }: DeveloperProps) {
  return (
    <div className="border-zinc-400 border-2 h-fit w-full rounded-3xl flex flex-row p-6 items-center justify-between">
      <div className="gap-4 pl-5">
        <p className="lg:text-xl font-bold text-zinc-800">{name}</p>
        <p className="text-lg text-red-600">{descrption}</p>
      </div>
      <div >
        {image}
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar links={ancors}>
          <div className='py-2 items-end bottom-0 flex lg:flex-row flex-col lg:gap-8 w-full lg:w-fit'>
            <ButtonNavbar type="button" label="Registre-se" path='/register' role='secondary' />
            <ButtonNavbar type="button" label="Entre" path='/login' role='primary' />
          </div>
        </Navbar>
      </header>
      <div className="lg:px-40 md:px-20 px-5 flex flex-col">
        <section className=" flex flex-row items-center justify-center lg:pt-28 pt-20" id="welcome">
          <div className="flex md:flex-row justify-between flex-col-reverse">
            <div className="lg:w-3/5 w-full">
              <h1 className=" text-cyan-900 md:text-5xl text-xl font-bold">
                Faça do seu pet um herói, agende uma doação de sangue!
              </h1>
              <div className="md:py-5 md:gap-2 flex flex-col">
                <p className="md:text-xl text-base">
                  Você sabia que seu pet pode salvar vidas de outros animais
                  através da doação sanguínea?
                </p>
                <p className="flex flex-row gap-2 items-center md:text-xl text-base">
                  <CheckCircle size={40} className="text-green-400" weight="fill" />
                  Realize Seu cadastro
                </p>
                <p className="flex flex-row gap-2 items-center md:text-xl text-base">
                  <CheckCircle size={40} className="text-green-400" weight="fill" />
                  Inclua seu pet
                </p>
                <p className="flex flex-row gap-2 items-center md:text-xl text-base">
                  <CheckCircle size={40} className="text-green-400" weight="fill" />
                  Procure o receptor mais próximo
                </p>
              </div>
              <div className="text-start">
                <ButtonNavbar
                  label="Cadastre-se"
                  path="/register"
                  role="primary"
                  type="button"
                />
              </div>
            </div>
            <div className="lg:w-2/5 w-full">
              <img src={Pets} className="w-full max-h-fit md:mt-24 mt-4" />
            </div>
          </div>
        </section>

        <section className="flex flex-col pt-20 gap-6" id="sobre">
          <div className="flex flex-col items-center">
            <p className="md:text-4xl text-xl font-bold text-zinc-800 pb-4">
              Sobre
            </p>
            <p className="text-base md:w-3/5 w-full md:text-center text-justify md:text-xl">
              Unimos bancos de sangue veterinário e tutores em um ambiente
              digital, afim de facilitar o processo de doação, possibilitando o
              tratamento de diversos animais.
            </p>
          </div>
          <div className="md:pt-16 flex flex-col items-center">
            <p className="lg:text-xl font-bold text-zinc-400">Como funciona?</p>
            <p className="lg:text-4xl font-bold text-zinc-800">
              Principais funcionalidades
            </p>
            <div className="flex md:flex-row flex-col justify-center items-center md:items-start md:gap-32 gap-6">
              <AboutItem
                title="Cadastro de multiplos pets"
                text="Você pode cadastrar todos os seus pets!"
                icon={
                  <img src={PetForm} className="w-20 max-h-fit md:mt-24 mt-4" />
                }
              />
              <AboutItem
                title="Gerenciamento de consultas"
                text="Receba notificações sobre as consultas de cada pet e acesse os resultados!"
                icon={
                  <img src={Calendar} className="w-20 max-h-fit md:mt-24 mt-4" />
                }
              />
              <AboutItem
                title="Encontre hemocentros"
                text="Conheça os bancos de sangue próximos a você!"
                icon={
                  <img src={Location} className="w-20 max-h-fit md:mt-24 mt-4" />
                }
              />
            </div>
          </div>
        </section>

        <section className="pt-20" id="aos-hemocentros">
          <div className="md:py-16 md:px-10 lg:px-20 px-4 py-5 flex lg:flex-row justify-center items-center flex-col-reverse bg-white shadow rounded-3xl">
            <div className="lg:w-1/2 w-full flex flex-col md:gap-4">
              <p className="lg:text-xl font-bold text-zinc-600">
                Aos Hemocentros
              </p>
              <p className="lg:text-4xl text-xl font-bold text-zinc-800">
                Hemocentros e veterinários
              </p>
              <p className="text-base text-justify">
                O SUPHER Pets foi criado para te auxiliar a encontrar doadores e
                gerenciar consultas. Através dele você pode criar alertas de
                necessidade, visulizar perfis dos animais e agendar consultas.
              </p>
              <div className="text-start">
                <ButtonNavbar
                  label="Cadastre-se"
                  path="/register"
                  role="primary"
                  type="button"
                />
              </div>
            </div>
            <div className="lg:w-1/2 items-end justify-end lg:pr-24 text-center flex w-full">
            <img src={PetShop} className="w-56 max-h-fit" />
            </div>
          </div>
        </section>

        <section
          className="lg:px-20 px-2 flex items-start flex-col pt-20"
          id="faq"
        >
          <p className="lg:text-xl font-bold text-zinc-600">FAQ</p>
          <p className="lg:text-4xl text-xl font-bold text-red-600">
            Perguntas frequentes
          </p>
          <div className="flex flex-col w-full gap-4 mt-5">
            <CollapsibleFaq
              question="Todos os gatos e cães podem doar sangue?"
              response="Todos que estejam saudáveis e tenham o peso e idade seguros, você pode verificar se eles estão aptos cadastrando-os e agendando uma consulta"
              number="1"
            />
            <CollapsibleFaq
              question="Quais os benefícios de doar sangue?"
              response="O procedimento conta com o exame de sangue para identificar a tipagem sanguínea, além disso, diversas clínicas oferecerem exames adicionais gratuitos."
              number="2"
            />
            <CollapsibleFaq
              question="Como saber se meu pet pode doar sangue?"
              response="Ao realizar o cadastro do seu pet você saberá se o seu pet é apto para doação de acordo com as informações cadastradas, os veterinários também avaliam a saúde, peso e idade do animal na primeira consulta."
              number="3"
            />
            <CollapsibleFaq
              question="A doação de sangue veterinário oferece riscos ao pet?"
              response="Não, é um procedimento seguro e sem efeitos colaterais."
              number="4"
            />
            <CollapsibleFaq
              question="Gatos e cães possuem tipos sanguíneos?"
              response="Sim, os tipos sanguíneos são diferentes para cada espécie, ou seja, o esquema de tipagem sanguínea é distinto entre cães e gatos, e diferentes também dos humanos."
              number="5"
            />
            <CollapsibleFaq
              question="Qual o intervalo de tempo entre uma doação e outra?"
              response="Cada hemocentro aplica seu intervalo de acordo com a saúde do cão, popularmente o período é de em média três meses."
              number="6"
            />
            <CollapsibleFaq
              question="Qual a quantidade de sangue que colhem de cada pet?"
              response="Em média 20 do volume do sangue do doador."
              number="7"
            />
            <CollapsibleFaq
              question="Onde posso levar meu amiguinho de quatro patas para doação?"
              response="Para descobrir os hemocentros mais próximos de você basta criar sua conta e visualizar a lista de hemocentros no lado direito da página."
              number="8"
            />
          </div>
        </section>

        <section className="pt-20" id="quem-somos">
          <div className="lg:py-16 md:px-10 lg:px-20 py-5 px-4 flex items-start flex-col bg-white shadow rounded-3xl">
            <p className="lg:text-xl font-bold text-zinc-600">Quem somos</p>
            <p className="lg:text-4xl text-xl font-bold text-zinc-800">
              Conheça os idealizadores
            </p>
            <div className="mt-4 lg:w-full w-full flex lg:flex-row flex-col justify-center md:gap-8 gap-4">
              <DeveloperItem
                name="Giuliana Missio"
                descrption="Web Developer, 20 anos"
                image={<img src={Giu} className="w-20 max-h-fit" />}
              />
              <DeveloperItem
                name="Yolanda Ferreira"
                descrption="Web Developer, 20 anos"
                image={<img src={Yo} className="w-20 max-h-fit" />}
              />
            </div>
          </div>
        </section>

        <section
          className="flex flex-col w-full items-end md:pr-20 pt-20"
          id="contato"
        >
          <ContactForm />
        </section>
      </div>
      <footer className="mt-8 bottom-0 w-full">
        <Footer links={ancors} />
      </footer>
    </div>
  );
}
