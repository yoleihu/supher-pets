import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "../TextField";
import { useContext, useState } from "react";
import { ButtonAsync } from "../Buttons/ButtonAsync";
import { UserContext } from "../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";

interface FormValuesProps {
  username: string,
  password: string,
}

interface LoginFormProps {
  isGuardian?: boolean,
  onForgotPassword: () => void
}

export const LoginForm = ({ isGuardian, onForgotPassword }: LoginFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signInGuardian, signInBloodCenter } = useContext(UserContext);

  const onHandleSubmit = async (values: FormValuesProps) => {
    setIsLoading(true)

    const loginData = {
      username: values.username,
      password: values.password
    }

    try {
      if (isGuardian) {
        await signInGuardian(loginData)
      } else {
        await signInBloodCenter(loginData)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const initialValues: FormValuesProps = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 digítos')
      .required('Campo obrigatório'),
  });

  const formik = useFormik<FormValuesProps>({
    initialValues,
    onSubmit: ((values) => { onHandleSubmit(values) }),
    validationSchema
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h2 className="lg:text-2xl text-xl font-semibold text-zinc-800 text-center mb-3">Login {isGuardian ? 'Tutor' : 'Hemocentro'}</h2>
        <TextField
          name="username"
          placeholder="Email"
          value={values.username}
          onChange={(value) => { setFieldValue('username', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.username && errors.username) ? errors.username : undefined}
        />
        <TextField
          name="password"
          placeholder="Senha"
          value={values.password}
          onChange={(value) => { setFieldValue('password', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.password && errors.password) ? errors.password : undefined}
          isPassword
        />
        <button type="button" className="text-sky-800 underline text-sm right-0 w-fit self-end" onClick={onForgotPassword}>Esqueceu a senha?</button>

        <div className="flex flex-col items-center">
          <ButtonAsync
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
          >
            Login
          </ButtonAsync>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}