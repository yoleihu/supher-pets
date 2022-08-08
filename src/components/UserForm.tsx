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
  password: string,
  confirmPassword: string
}

interface FormInputProps {
  isLogin?: boolean,
  isRegister?: boolean,
  isRecoverPassword?: boolean
}

export function FormInput({ isLogin, isRegister, isRecoverPassword }: FormInputProps) {
  const navigate = useNavigate();
  const [isGuardian, setIsGuardian] = useState(true)
  const [isBloodCenter, setIsBloodCenter] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const initialValuesRegister: FormValuesProps = {
    name: '',
    cpf: '',
    cnpj: '',
    email: '',
    password: '',
    confirmPassword: '',
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
        {(isRegister || isLogin) &&
          <div>
            <ButtonUser isGuardian={isGuardian} label={"Tutor"} onChangeUser={() => { setIsGuardian(true), setIsBloodCenter(false) }} />
            <ButtonUser isBloodCenter={isBloodCenter} label={"Hemocentro"} onChangeUser={() => { setIsGuardian(false), setIsBloodCenter(true) }} />
          </div>
        }

        <div className={`bg-yellow-200 lg:p-16 px-6 py-4 h-fit rounded-3xl ${isRecoverPassword ?? 'rounded-tl-none'}`}>
          {isRegister &&
            <>
              <div className="flex flex-col lg:gap-6">
                <h2 className="lg:text-3xl text-2xl font-semibold text-zinc-800 text-center">Cadastre-se</h2>
                <Formik
                  initialValues={initialValuesRegister}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col lg:gap-3 gap-1 justify-center items-center">
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

          {isLogin &&
            <>
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold text-zinc-800 text-center">Login</h2>
                <Formik
                  initialValues={{email: '', password: ''}}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col gap-3 justify-center items-center">
                      <Input id="email" name={"email"} label="Email" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                      <Input id="password" name={"password"} label="Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword isLogin onModal={() => setIsModalOpen(true)} />

                      <button className="bg-red-600 text-white hover:bg-red-400 rounded-full h-10 w-3/4 mt-5" type="submit">Login</button>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="text-center mt-1">
                <span>Não possui uma conta?</span><br />
                <a href="/register" className="text-red-500 underline">Cadastre-se</a>
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
                          <Input id="email" name={"email"} label="Informe o email cadastrado" type={"email"} errors={errors.email ?? null} touched={touched.email ?? null} />
                          <div className="w-3/5 flex items-center justify-center p-6 gap-2 ">
                            <button
                              className="text-red-600 hover:text-red-400 border border-red-600 hover:border-red-400 rounded-full h-10 w-3/4 mt-5"
                              type="button"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Cancelar
                            </button>
                            <button
                              className="bg-red-600 text-white hover:bg-red-400 rounded-full h-10 w-3/4 mt-5"
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
                  initialValues={{password: '', confirmPassword: ''}}
                  validationSchema={SignupSchema}
                  onSubmit={(values, actions) => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="flex flex-col lg:gap-3 gap-1 justify-center items-center">
                      <Input id="password" name={"password"} label="Nova Senha" type={"password"} errors={errors.password ?? null} touched={touched.password ?? null} isPassword />
                      <Input id="confirmPassword" name={"confirmPassword"} label="Confirme a nova senha" type={"password"} errors={errors.confirmPassword ?? null} touched={touched.confirmPassword ?? null} isPassword />

                      <button className="bg-red-600 text-white hover:bg-red-400 rounded-full h-10 w-3/4 mt-5" type="submit">Alterar</button>
                    </Form>
                  )}
                </Formik>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}