import { Formik, Form } from "formik";
import { Input } from "./Input";
import * as Yup from "yup";
import emailjs from '@emailjs/browser';


interface FormValuesProps {
    nome: string,
    email: string,
    assunto: string,
    menssagem: string
}

export function ContactForm() {

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        emailjs.sendForm('service_ms7fk94', 'template_sorb2cv', e.currentTarget, 'Dn6OsVlPmO2i-Z0EP')
            .then((result) => {
                alert("Mensagem enviada com sucesso");
            }, (error) => {
                alert("Erro ao enviar mensagem");
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
    )
}