import * as Yup from "yup";
import { useFormik } from "formik";
import { formatPhoneNumber } from "../../utils/mask/phoneMask";
import { TextField } from "../TextField";
import { formatCnpj } from "../../utils/mask/cnpjMask";
import { formatCpf } from "../../utils/mask/cpfMask";
import { ButtonAsync } from "../Buttons/ButtonAsync";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { cnpj, cpf } from "cpf-cnpj-validator";
import { validatePhone } from "../../utils/validators/phone";

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

interface RegisterFormProps {
  isGuardian?: boolean,
  onTermsModal: () => void
}

export const RegisterForm = ({ isGuardian, onTermsModal }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUpGuardian, signUpBloodCenter } = useContext(UserContext);

  const onHandleSubmit = async (values: FormValuesProps) => {
    setIsLoading(true);

    try {
      if (isGuardian) {
        const guardian = {
          cpf: values.cpf,
          name: values.name,
          email: values.email,
          telephone: values.phone,
          password: values.password
        }
  
        await signUpGuardian(guardian)
      } else {
        const bloodCenter = {
          cnpj: values.cnpj,
          name: values.name,
          email: values.email,
          telephone: values.phone,
          password: values.password
        }
  
        await signUpBloodCenter(bloodCenter)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const initialValues: FormValuesProps = {
    name: '',
    cpf: '',
    cnpj: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-Za-zÀ-ÿ ]+$/, 'O nome não deve conter números ou caracteres especiais')
      .required('Campo obrigatório'),
    cpf: isGuardian
      ? Yup.string()
        .test('test-invalid-cpf', 'CPF Inválido', (value) => cpf.isValid(value ?? ''))
        .length(14, "CPF Inválido")
        .required('Campo obrigatório')
      : Yup.string().nullable(),
    cnpj: !isGuardian
      ? Yup.string()
        .test('test-invalid-cnpj', 'CNPJ Inválido', (value) => cnpj.isValid(value ?? ''))
        .length(18, "CNPJ Inválido")
        .required('Campo obrigatório')
      : Yup.string().nullable(),
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    phone: Yup.string()
      .test('test-invalid-cnpj', 'Celular Inválido', (value) => validatePhone(value ?? ''))
      .length(15, "Celular Inválido")
      .required('Campo obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter no mínimo 8 digítos')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'A senha precisa ter no mínimo 8 caracteres, ' +
        'uma letra maiúscula e uma letra minúscula, ' +
        'um número e um caracter especial')
      .required('Campo obrigatório'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas precisam ser iguais.')
      .required('Campo obrigatório'),
    terms: Yup.boolean()
      .oneOf([true], "Você deve aceitar os termos para continuar")
  });

  const formik = useFormik<FormValuesProps>({
    initialValues,
    onSubmit: ((values) => { onHandleSubmit(values) }),
    validationSchema
  });

  const { values, setFieldValue, handleChange, handleSubmit, handleBlur, setFieldTouched, touched, errors } = formik;

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <h2 className="lg:text-2xl text-xl font-semibold text-zinc-800 text-center mb-3">Cadastro {isGuardian ? 'Tutor' : 'Hemocentro'}</h2>
        <TextField
          name="name"
          placeholder="Nome"
          value={values.name}
          onChange={(value) => setFieldValue('name', value)}
          onBlur={handleBlur}
          errorMessage={(touched.name && errors.name) ? errors.name : undefined}
        />
        {isGuardian ?
          <TextField
            name="cpf"
            placeholder="CPF"
            value={values.cpf}
            onChange={(value) => setFieldValue('cpf', formatCpf(value))}
            onBlur={handleBlur}
            errorMessage={(touched.cpf && errors.cpf) ? errors.cpf : undefined}
          /> :
          <TextField
            name="cnpj"
            placeholder="CNPJ"
            value={values.cnpj}
            onChange={(value) => { setFieldValue('cnpj', formatCnpj(value)) }}
            onBlur={handleBlur}
            errorMessage={(touched.cnpj && errors.cnpj) ? errors.cnpj : undefined}
          />
        }
        <TextField
          name="phone"
          placeholder="Celular"
          value={values.phone}
          onChange={(value) => { setFieldValue('phone', formatPhoneNumber(value)) }}
          onBlur={handleBlur}
          errorMessage={(touched.phone && errors.phone) ? errors.phone : undefined}
        />
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
        <TextField
          name="confirmPassword"
          placeholder="Confirmar Senha"
          value={values.confirmPassword}
          onChange={(value) => { setFieldValue('confirmPassword', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.confirmPassword && errors.confirmPassword) ? errors.confirmPassword : undefined}
          isPassword
        />
        <div className="flex gap-2 items-center">
          <input name="terms" checked={values.terms} onClick={() => { setFieldTouched('terms') }} value={"terms"} onChange={handleChange} type={"checkbox"} className={"w-fit accent-sky-800"} />
          <label className="text-sm">Concordo com os <a onClick={onTermsModal} className="text-sky-800 underline font-bold">termos de uso e política de privacidade</a></label>
        </div>
        {(touched.terms && errors.terms) ?
          <span className="text-red-600 text-xs">
            {errors.terms}
          </span> :
          null
        }

        <div className="flex flex-col items-center">
          <ButtonAsync
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
            className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
          >
            Cadastrar
          </ButtonAsync>
        </div>
      </form>
    </>
  )
}