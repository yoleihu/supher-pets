import { CaretDown, CaretLeft, CaretRight, CheckCircle, FirstAidKit, Kanban, MagnifyingGlass, NewspaperClipping } from "phosphor-react";
import { Footer } from "../components/Footer";
import { LinksProps, Navbar } from "../components/Navbar";
import Pets from '../assets/gato-e-cachorro.png';
import { ButtonNavbar } from "../components/ButtonNavbar";
import useCollapse from 'react-collapsed';
import emailjs from '@emailjs/browser';
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { Input } from "../components/Input";


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

interface FormValuesProps {
  nome: string,
  email: string,
  assunto: string,
  menssagem: string
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
          <div className="w-16 h-16 bg-green-400 rounded-full flex justify-center items-center">
            <p className="text-2xl text-bold text-yellow-50">{number}</p>
          </div>
          <p className="text-xl px-8 text-zinc-800">{question}</p>
        </div>
        <div className="header" {...getToggleProps()}>
          {isExpanded ? <CaretDown size={44} color="#b0b0b0" weight="fill" /> : <CaretLeft size={44} color="#b0b0b0" weight="fill" />}
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          <p className="text-xl p-8 md:ml-20 my-4 text-zinc-600 bg-zinc-200 rounded-3xl">{response}</p>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm('service_ms7fk94', 'template_sorb2cv', e.currentTarget, 'Dn6OsVlPmO2i-Z0EP')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
    e.currentTarget.reset();
  };

  const initialValuesRegister: FormValuesProps = {
    nome: '',
    email: '',
    assunto: '',
    menssagem: '',
  }

  const SignupSchema = Yup.object().shape({
    nome: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z]+$/, 'O nome não deve conter números ou caracteres especiais')
      .required('Campo obrigatório'),
    email: Yup.string().email('Email inválido')
      .required('Campo obrigatório'),
    assunto: Yup.string()
      .min(3, 'O assunto deve conter no mínimo 3 caracteres')
      .required('Campo obrigatório'),
    mensagem: Yup.string()
      .min(3, 'A menssagem deve conter no mínimo 3 caracteres')
      .required('Campo obrigatório'),
  });

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar links={ancors} />
      </header>
      <div className="lg:px-40 md:px-20 px-5 flex flex-col gap-16">
        <section className="pt-16 md:pt-40 flex flex-row items-center justify-center" id="welcome">
          <div className="flex md:flex-row justify-between flex-col-reverse">
            <div className="lg:w-3/5 w-full">
              <h1 className=" text-red-600 md:text-5xl text-xl font-bold">Faça do seu pet um herói, agende uma consulta!</h1>
              <div className="md:py-5 md:gap-2 flex flex-col">
                <p className="md:text-lg text-base">Você sabia que seu pet pode salvar vidas de outros animais através da doação de sangue?</p>
                <p className="flex flex-row gap-2 items-center md:text-lg text-base"><CheckCircle size={32} color="#57cba1" weight="fill" />Realize Seu cadastro</p>
                <p className="flex flex-row gap-2 items-center md:text-lg text-base"><CheckCircle size={32} color="#57cba1" weight="fill" />Inclua seu pet</p>
                <p className="flex flex-row gap-2 items-center md:text-lg text-base"><CheckCircle size={32} color="#57cba1" weight="fill" />Procure o receptor mais próximo</p>
              </div>
              <div className="text-start">
                <ButtonNavbar label="Cadastre-se" path='/register' role='primary' type='button' />
              </div>
            </div>
            <div className="lg:w-2/5 w-full">
              <img src={Pets} className="w-full max-h-fit md:mt-24 mt-4" />
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6" id="sobre">
          <div className="flex flex-col items-center">
            <p className="md:text-4xl text-xl font-bold text-zinc-800 pb-4">Sobre</p>
            <p className="text-base md:w-3/5 w-full md:text-center text-justify">Unimos bancos de sangue veterinário e tutores em um ambiente digital,
              afim de facilitar o processo de doação, possibilitando o tratamento de mais animais.</p>
          </div>
          <div className="md:pt-16 flex flex-col items-center">
            <p className="lg:text-xl font-bold text-zinc-400">Como funciona?</p>
            <p className="lg:text-4xl font-bold text-zinc-800">Principais funcionalidades</p>
            <div className="flex md:flex-row flex-col justify-center items-center md:items-start md:gap-32 gap-6 pt-10">
              <div className="flex md:flex-col flex-row items-center md:w-40 w-full gap-4">
                <div className="bg-red-600 rounded-full flex items-center justify-center md:w-32 w-20 md:h-32 h-20">
                  <NewspaperClipping size={"80"} className="md:h-20 h-10" color="#FFF8ED" weight="fill" />
                </div>
                <div className="flex flex-col md:items-center items-start md:w-40 w-full gap-4">
                  <p className=" text-red-600 text-xl font-bold md:text-center text-left">Cadastro de multiplos pets</p>
                  <p className="text-zinc-600 md:text-center text-left">Você pode cadastrar todos os seus pets!</p>
                </div>
              </div>
              <div className="flex md:flex-col flex-row items-center md:w-40 w-full gap-4">
                <div className="bg-red-600 rounded-full flex items-center justify-center md:w-32 w-20 md:h-32 h-20">
                  <Kanban size={80} className="md:h-20 h-10" color="#FFF8ED" weight="fill" />
                </div>
                <div className="flex flex-col md:items-center items-start md:w-40 w-full gap-4">
                  <p className=" text-red-600 text-xl font-bold md:text-center text-left">Gerenciamento de consultas</p>
                  <p className="text-zinc-600 md:text-center text-left">Receba notificações sobre as consultas de cada pet e acesse os resultados!</p>
                </div>
              </div>
              <div className="flex md:flex-col flex-row items-center md:w-40 w-full gap-4">
                <div className="bg-red-600 rounded-full flex items-center justify-center md:w-32 w-20 md:h-32 h-20">
                  <MagnifyingGlass size={80} className="md:h-20 h-10" color="#FFF8ED" weight="fill" />
                </div>
                <div className="flex flex-col md:items-center items-start md:w-40 w-full gap-4">
                  <p className=" text-red-600 text-xl font-bold md:text-center text-left">Encontre hemocentros</p>
                  <p className="text-zinc-600 md:text-center text-left">Conheça os bancos de sangue próximos a você!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="md:py-16 md:px-10 py-5 lg:px-20 px-4 flex lg:flex-row justify-center items-center flex-col-reverse bg-red-200 rounded-3xl" id="aos-hemocentros">
          <div className="lg:w-1/2 w-full flex flex-col md:gap-4">
            <p className="lg:text-xl font-bold text-zinc-600">Aos Hemocentros</p>
            <p className="lg:text-4xl text-xl font-bold text-zinc-800">Hemocentros e veterinários</p>
            <p className="text-base text-justify">O SUPHER Pets foi criado para te auxiliar a encontrar doadores e gerenciar consultas. Através dele você pode criar alertas de necessidade, visulizar perfis dos animais e agendar consultas.</p>
            <div className="text-start">
              <ButtonNavbar label="Cadastre-se" path='/register' role='primary' type='button' />
            </div>
          </div>
          <div className="lg:w-1/2 items-center justify-center text-center flex w-full">
            <FirstAidKit size={200} color="#f23326" weight="fill" />
          </div>
        </section>

        <section className="py-5 lg:px-20 px-2 flex items-start flex-col" id="faq">
          <p className="lg:text-xl font-bold text-zinc-600">FAQ</p>
          <p className="lg:text-4xl text-xl font-bold text-red-600">Perguntas frequentes</p>
          <div className="flex flex-col w-full gap-4 mt-5">
            <CollapsibleFaq question="Pergunta" response="Resposta" number="1" />
            <CollapsibleFaq question="Pergunta" response="Resposta" number="2" />
            <CollapsibleFaq question="Pergunta" response="Resposta" number="3" />
            <CollapsibleFaq question="Pergunta" response="Resposta" number="4" />
          </div>
        </section>

        <section className="lg:py-16 md:px-10 py-5 lg:px-20 px-4 flex items-start flex-col bg-red-200 rounded-3xl" id="quem-somos">
          <p className="lg:text-xl font-bold text-zinc-600">Quem somos</p>
          <p className="lg:text-4xl text-xl font-bold text-zinc-800">Conheça os idealizadores</p>
          <div className="mt-4 lg:w-full w-full flex lg:flex-row flex-col justify-center md:gap-8 gap-4">
            <div className="bg-yellow-50 h-fit w-full rounded-full flex flex-row p-6 items-center justify-between">
              <div className="gap-4 pl-5">
                <p className="lg:text-xl font-bold text-zinc-800">Giuliana Missio</p>
                <p className="text-lg text-red-600">Web Developer, 20 anos</p>
              </div>
              <div className="w-24 h-24 bg-red-600 rounded-full"></div>
            </div>
            <div className="bg-yellow-50 h-fit w-full rounded-full flex flex-row p-6 items-center justify-between">
              <div className="gap-4 pl-5">
                <p className="lg:text-xl font-bold text-zinc-800">Yolanda Ferreira</p>
                <p className="text-lg text-red-600">Web Developer, 20 anos</p>
              </div>
              <div className="w-24 h-24 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </section>
        <div className="flex flex-col w-full items-end md:pr-20">
          <Formik initialValues={initialValuesRegister}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}>
            {({ errors, touched }) => (
              <Form onSubmit={sendEmail} className="flex flex-col lg:gap-3 gap-1 md:w-3/5 w-full justify-center items-end">
                <p className="lg:text-4xl text-xl font-bold text-zinc-800 self-start">Contato</p>
                <div className="flex flex-row justify-between items-center w-full gap-4">
                  <Input id="nome" name={"nome"} label="Nome" type={"text"} errors={errors.nome ?? null} touched={touched.nome ?? null} />
                  <Input id="email" name={"email"} label="Email" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                </div>
                <Input id="assunto" name={"assunto"} label="Assunto" type={"assunto"} errors={errors.assunto ?? null} touched={touched.assunto ?? null} />
                <Input id="menssagem" name={"menssagem"} label="Menssagem" type={"menssagem"} errors={errors.menssagem ?? null} touched={touched.menssagem ?? null} />
                <button className="bg-red-600 text-white hover:bg-red-400 rounded-full h-fit w-fit px-4 py-1 mt-5" type="submit">Enviar</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <footer className="bottom-0 w-full">
        <Footer links={ancors} />
      </footer>
    </div>
  )
}