import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from '@emailjs/browser';
import { TextField } from "./TextField";

interface FormValuesProps {
	name: string,
	email: string,
	subject: string,
	message: string
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

	const initialValues: FormValuesProps = {
		name: '',
		email: '',
		subject: '',
		message: '',
	}

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, 'O nome deve ter no minímo 3 letras')
			.matches(/^[A-z]+$/, 'O nome não deve conter números ou caracteres especiais')
			.required('Campo obrigatório'),
		email: Yup.string().email('Email inválido')
			.required('Campo obrigatório'),
		subject: Yup.string()
			.min(3, 'O assunto deve conter no mínimo 3 caracteres')
			.required('Campo obrigatório'),
		message: Yup.string()
			.min(3, 'A menssagem deve conter no mínimo 3 caracteres')
			.required('Campo obrigatório'),
	});

	const formik = useFormik<FormValuesProps>({
		initialValues,
		onSubmit: (values) => { console.log(values) },
		validationSchema
	});

	const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

	return (
		<>
			<form className="flex flex-col lg:gap-3 gap-1 md:w-3/5 w-full justify-center items-end" onSubmit={handleSubmit}>
			<h2 className="lg:text-4xl text-xl font-bold text-zinc-800 self-start">Contato</h2>
			<div className="flex flex-row justify-between items-center w-full gap-4">
			<TextField
          name="name"
          placeholder="Nome"
          value={values.name}
          onChange={(value) => { setFieldValue('name', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.name && errors.name) ? errors.name : undefined}
        />
        <TextField
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={(value) => { setFieldValue('email', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.email && errors.email) ? errors.email : undefined}
        />
			</div>
        <TextField
          name="subject"
          placeholder="Assunto"
          value={values.subject}
          onChange={(value) => { setFieldValue('subject', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.subject && errors.subject) ? errors.subject : undefined}
        />
        <TextField
          name="message"
          placeholder="Mensagem"
          value={values.message}
          onChange={(value) => { setFieldValue('message', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.message && errors.message) ? errors.message : undefined}
        />

        <div className="flex flex-col items-center">
          <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-5 px-4" type="submit">Enviar</button>
        </div>
      </form>

		</>
	)
}