import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "./TextField";

interface FormValuesProps {
  email: string,
  password: string,
}

interface LoginFormProps {
  isGuardian?: boolean,
  onForgotPassword: () => void
}

export const LoginForm = ({ isGuardian, onForgotPassword }: LoginFormProps) => {
  const initialValues: FormValuesProps = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 digítos')
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
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="lg:text-2xl text-xl font-semibold text-zinc-800 text-center mb-3">Login {isGuardian ? 'Tutor' : 'Hemocentro'}</h2>
        <TextField
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={(value) => { setFieldValue('email', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.email && errors.email) ? errors.email : undefined}
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
          <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-5 px-4" type="submit">Login</button>
        </div>
      </form>
    </>
  )
}