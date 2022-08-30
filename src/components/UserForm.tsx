import { Formik, Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Input } from "./Input";
import * as Yup from "yup";
import { ButtonUser } from "./ButtonUser";
import { Modal } from "./Modal";

interface FormValuesProps {
  name: string,
  cpf: string,
  cnpj: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  terms: boolean
}

interface UserFormProps {
  isLogin?: boolean,
  isRegister?: boolean,
  isRecoverPassword?: boolean
}

export function UserForm({ isLogin, isRegister, isRecoverPassword }: UserFormProps) {
  const navigate = useNavigate();
  const [isGuardian, setIsGuardian] = useState(true)
  const [isBloodCenter, setIsBloodCenter] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openTerm, setOpenTerm] = useState(false)

  const initialValuesRegister: FormValuesProps = {
    name: '',
    cpf: '',
    cnpj: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z]+$/, 'O nome não deve conter números ou caracteres especiais')
      .required('Campo obrigatório'),
    cpf: Yup.string()
      .length(14, "CPF Inválido")
      .required('Campo obrigatório'),
    cnpj: Yup.string()
      .length(18, "CNPJ Inválido")
      .required('Campo obrigatório'),
    email: Yup.string().email('Email inválido')
      .required('Campo obrigatório'),
    phone: Yup.string()
      .length(15, "Celular Inválido")
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 digítos')
      .required('Campo obrigatório'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais.')
      .required('Campo obrigatório'),
    terms: Yup.boolean()
      .oneOf([true], "Você deve aceitar os termos para continuar")
  });

  return (
    <div className="flex flex-col justify-center items-center mx-4 lg:mx-0">
      <div className="min-w-fit lg:min-w-[] max-w-lg w-2/5">
        {(isRegister || isLogin) &&
          <div className="justify-around flex mb-5">
            <ButtonUser isGuardian={isGuardian} label={"Tutor"} onChangeUser={() => { setIsGuardian(true), setIsBloodCenter(false) }} />
            <ButtonUser isBloodCenter={isBloodCenter} label={"Hemocentro"} onChangeUser={() => { setIsGuardian(false), setIsBloodCenter(true) }} />
          </div>
        }

        <div className={`bg-white shadow lg:px-10 lg:py-7 px-6 py-4 h-fit rounded-3xl`}>
          {isRegister &&
            <>
              <div className="flex flex-col gap-2">
                <h2 className="lg:text-2xl text-xl font-semibold text-zinc-800 text-center">Cadastro {isGuardian ? 'Tutor' : 'Hemocentro'}</h2>
                <Formik
                  initialValues={initialValuesRegister}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-4 justify-center items-center">
                      <Input id="name" name={"name"} placeholder="Nome" type={"text"} errors={errors.name ?? null} touched={touched.name ?? null} />
                      {isGuardian ?
                        <Input id="cpf" name={"cpf"} placeholder="CPF" type={"text"} errors={errors.cpf ?? null} touched={touched.cpf ?? null} /> :
                        <Input id="cnpj" name={"cnpj"} placeholder="CNPJ" type={"text"} errors={errors.cnpj ?? null} touched={touched.cnpj ?? null} />
                      }
                      <Input id="email" name={"email"} placeholder="Email" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                      <Input id="phone" name={"phone"} placeholder="Celular" type={"text"} errors={errors.phone ?? null} touched={touched.phone ?? null} />
                      <Input id="password" name={"password"} placeholder="Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword />
                      <Input id="confirmPassword" name={"confirmPassword"} placeholder="Confirme a senha" type={"password"} errors={errors.confirmPassword ?? null} touched={touched.confirmPassword ?? null} isPassword />
                      <Input id="terms" name={"terms"} type={"checkbox"} onTerms={() => {setOpenTerm(true)}} errors={errors.terms ?? null} touched={touched.terms ?? null} />
                      
                      <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-2/4 mt-5" type="submit">Cadastrar</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          }

          {isLogin &&
            <>
              <div className="flex flex-col gap-2">
                <h2 className="lg:text-2xl text-xl font-semibold text-zinc-800 text-center">Login {isGuardian ? 'Tutor' : 'Hemocentro'}</h2>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col justify-center gap-4">
                      <Input id="email" name={"email"} placeholder="Email" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                      <div className="w-full flex flex-col gap-1">
                        <Input id="password" name={"password"} placeholder="Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword />
                        <button type="button" className="text-sky-800 underline text-sm right-0 w-fit self-end" onClick={() => setIsModalOpen(true)}>Esqueceu a senha?</button>
                      </div>
                      <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-2/4 mt-2 self-center" type="submit">Login</button>
                    </Form>
                  )}
                </Formik>
              </div>
              {isModalOpen &&
                <Modal title="Recuperar Senha" onClose={() => setIsModalOpen(false)}>
                  <>
                    <Formik
                      initialValues={{ email: '' }}
                      validationSchema={SignupSchema}
                      onSubmit={(values, actions) => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                      }}
                    >
                      {({ errors, touched }) => (
                        <Form className="flex w-full flex-col justify-center items-end">
                          <Input id="email" name={"email"} placeholder="Informe o email cadastrado" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                          <div className="w-3/5 flex items-center justify-center p-6 gap-2 ">
                            <button
                              className="text-sky-800 hover:text-sky-700 border border-sky-800 hover:border-sky-700 rounded-full h-10 w-3/4 mt-5"
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancelar
                            </button>
                            <button
                              className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-3/4 mt-5"
                              onClick={() => navigate('/recoverPassword')}
                              type="submit"
                            >
                              Enviar email
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </>
                </Modal>
              }
            </>
          }

          {isRecoverPassword &&
            <>
              <div className="flex flex-col lg:gap-6">
                <h2 className="lg:text-3xl text-2xl font-semibold text-zinc-800 text-center">Nova senha</h2>
                <Formik
                  initialValues={{ password: '', confirmPassword: '' }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col lg:gap-3 gap-1 justify-center items-center">
                      <Input id="password" name={"password"} placeholder="Nova Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword />
                      <Input id="confirmPassword" name={"confirmPassword"} placeholder="Confirme a nova senha" type={"password"} errors={errors.confirmPassword ?? null} touched={touched.confirmPassword ?? null} isPassword />

                      <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-2/4 mt-5" type="submit">Alterar</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          }
        </div>

      </div>
      {isLogin ?
        <div className="text-center mt-3">
          <span>Não possui uma conta?</span><br />
          <a href="/register" className="text-sky-800 underline">Cadastre-se</a>
        </div> :
        isRegister ?
          <div className="text-center mt-3">
            <span>Já possui uma conta?</span><br />
            <a href="/login" className="text-sky-800 underline">Faça Login</a>
          </div> : null
      }
    </div>
  )
}