import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "../TextField";
import supherClient from '../../service/SupherClient';


interface FormValuesProps {
  email: string,
  token: string,
  password: string,
  confirmPassword: string,
}

interface updatePasswordProps {
  isGuardian: boolean,
}

export const RecoverPasswordForm = ({ isGuardian }: updatePasswordProps) => {
  const initialValues: FormValuesProps = {
    email: '',
    token: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 digítos')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'A senha precisa ter no mínimo 8 caracteres, ' +
        'uma letra maiúscula e uma letra minúscula, ' +
        'um número e um caracter especial')
      .required('Campo obrigatório'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais.')
      .required('Campo obrigatório'),
  });

  const formik = useFormik<FormValuesProps>({
    initialValues,
    onSubmit: (values) => { console.log(values) },
    validationSchema
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  async function updatePassword(email: string, pass: string){
    if(isGuardian) {
      const response = await supherClient.updatePasswordGuardian({email, pass}, values.token);

    } else {
      const response = await supherClient.updatePasswordBloodCenter({email, pass}, values.token);

    }

  }

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="lg:text-2xl text-xl font-semibold text-zinc-800 text-center mb-3">Recuperar senha</h2>
      <TextField
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={(value) => { setFieldValue('email', value);  }}
                  onBlur={handleBlur}
                  errorMessage={(touched.email && errors.email) ? errors.email : undefined}
                />
      <TextField
          name="token"
          placeholder="Digite o token de verificação recebido por email"
          value={values.token}
          onChange={(value) => { setFieldValue('token', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.token && errors.token) ? errors.token : undefined}
          isPassword
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
        <TextField
          name="confirmPassword"
          placeholder="Confirmar Senha"
          value={values.confirmPassword}
          onChange={(value) => { setFieldValue('confirmPassword', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.confirmPassword && errors.confirmPassword) ? errors.confirmPassword : undefined}
          isPassword
        />

        <div className="flex flex-col items-center">
          <button onClick={() => updatePassword(values.email, values.password)} className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-5 px-4" type="submit">Alterar senha</button>
        </div>
      </form>
    </>
  )
}