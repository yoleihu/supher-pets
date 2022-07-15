import { Formik, Form } from "formik";
import { useState } from "react";
import { useLocation } from "react-router-dom"
import { Input } from "./Input";
import * as Yup from "yup";
import { ButtonUser } from "./ButtonUser";

interface FormValuesProps {
  name: string,
  cpf: string,
  cnpj: string,
  email: string,
  password: string,
  confirmPassword: string
}

export function FormInput() {
  const { pathname } = useLocation();
  const [isGuardian, setIsGuardian] = useState(true)
  const [isBloodCenter, setIsBloodCenter] = useState(false)

  const initialValues: FormValuesProps = {
    name: '',
    cpf: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras e nenhum número')
      .required('Campo obrigatório'),
    cpf: Yup.string()
      .length(14, "CPF Inválido")
      .required('Campo obrigatório'),
    cnpj: Yup.string()
      .length(18, "CNPJ Inválido")
      .required('Campo obrigatório'),
    email: Yup.string().email('Email inválido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 digítos')
      .required('Campo obrigatório'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais.')
      .required('Campo obrigatório')
  });

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="min-w-fit max-w-lg w-1/3">
        <div>
          <ButtonUser isGuardian={isGuardian} label={"Tutor"} onChangeUser={() => { setIsGuardian(true), setIsBloodCenter(false) }} />
          <ButtonUser isBloodCenter={isBloodCenter} label={"Hemocentro"} onChangeUser={() => { setIsGuardian(false), setIsBloodCenter(true) }} />
        </div>

        <div className="bg-yellow-200 lg:p-16 px-6 py-8 h-fit rounded-xl rounded-tl-none">
          {pathname === '/register' &&
            <>
              <div className="flex flex-col gap-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-3 justify-center items-center">
                      <Input id="name" name={"name"} label="Nome" type={"text"} errors={errors.name ?? null} touched={touched.name ?? null} />
                      {isGuardian ?
                        <Input id="cpf" name={"cpf"} label="CPF" type={"text"} errors={errors.cpf ?? null} touched={touched.cpf ?? null} /> :
                        <Input id="cnpj" name={"cnpj"} label="CNPJ" type={"text"} errors={errors.cnpj ?? null} touched={touched.cnpj ?? null} />
                      }
                      <Input id="email" name={"email"} label="Email" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                      <Input id="password" name={"password"} label="Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword />
                      <Input id="confirmPassword" name={"confirmPassword"} label="Confirme a senha" type={"password"} errors={errors.confirmPassword ?? null} touched={touched.confirmPassword ?? null} isPassword />

                      <button className="bg-red-600 text-white hover:bg-red-400 rounded-full h-10 w-3/4 mt-5" type="submit">Cadastrar</button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="text-center mt-1">
                <span>Já possui uma conta?</span><br />
                <a href="/login" className="text-red-500 underline">Faça Login</a>
              </div>
            </>
          }

          {pathname === '/login' &&
            <>
              <div className="flex flex-col gap-6">
                <Formik
                  initialValues={initialValues}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-3 justify-center items-center">
                      <Input id="email" name={"email"} label="Email" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                      <Input id="password" name={"password"} label="Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword />

                      <button className="bg-red-600 text-white hover:bg-red-400 rounded-full h-10 w-3/4 mt-5" type="submit">Login</button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="text-center mt-1">
                <span>Não possui uma conta?</span><br />
                <a href="/login" className="text-red-500 underline">Cadastre-se</a>
              </div>
            </>

          }
          {pathname === '/recoverPassword' &&
            <div>
              <p>recover</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}