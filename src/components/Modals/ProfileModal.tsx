import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "../TextField";
import { ButtonAsync } from "../Buttons/ButtonAsync";
import { Dialog } from "@headlessui/react";
import { formatCpf } from "../../utils/mask/cpfMask";
import { formatCnpj } from "../../utils/mask/cnpjMask";
import { formatPhoneNumber } from "../../utils/mask/phoneMask";
import { ComboBox } from "../ComboBox";
import { stateOptions } from "../../utils/data/states";

interface ProfileModalProps {
  isOpen: boolean,
  isGuardian?: boolean,
  onClose: () => void,
}

interface FormValuesProps {
  name: string,
  cpf: string,
  cnpj: string,
  email: string,
  phone: string,
  cep?: string,
  street?: string,
  number?: string,
  neighborhood?: string,
  city?: string,
  state?: string,
}

export function ProfileModal({ isOpen, isGuardian, onClose }: ProfileModalProps) {
  const initialValues: FormValuesProps = {
    name: '',
    cpf: '',
    cnpj: '',
    email: '',
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z ]+$/, 'O nome não deve conter números ou caracteres especiais')
      .required('Campo obrigatório'),
    cpf: isGuardian ?
      Yup.string().length(14, "CPF Inválido").required('Campo obrigatório') :
      Yup.string().nullable(),
    cnpj: !isGuardian ?
      Yup.string().length(18, "CNPJ Inválido").required('Campo obrigatório') :
      Yup.string().nullable(),
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    phone: Yup.string()
      .length(15, "Celular Inválido")
      .required('Campo obrigatório'),
    cep: Yup.string()
      .length(9, "CEP Inválido"),
    street: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z ]+$/, 'O nome não deve conter números ou caracteres especiais'),
    number: Yup.string()
      .matches(/^[0-9]?/),
    neighborhood: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z ]+$/, 'O nome não deve conter números ou caracteres especiais'),
    city: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z ]+$/, 'O nome não deve conter números ou caracteres especiais'),
  });

  const formik = useFormik<FormValuesProps>({
    initialValues,
    onSubmit: (values) => { console.log(values); onClose() },
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  return (

    <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto duration-200 ease-in-out">
      <div className="fixed inset-0 bg-black/30" />
      <Dialog.Panel className="w-full max-w-md transform rounded-2xl h-4/6 bg-white p-6 text-left align-middle shadow-xl transition-all">
        <div className="">
          <Dialog.Description className="p-5 fixed inset-0 overflow-y-auto">
            <Dialog.Title className="font-semibold text-2xl mb-5">Editar Perfil</Dialog.Title>
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
              {isGuardian
                ? <TextField disabled name="cpf" placeholder="CPF" value={values.cpf} onChange={(value) => setFieldValue('cpf', formatCpf(value))} />
                : <TextField disabled name="cnpj" placeholder="CNPJ" value={values.cnpj} onChange={(value) => setFieldValue('cnpj', formatCnpj(value))} />
              }
              <TextField name="name" placeholder="Nome" value={values.name} onChange={(value) => setFieldValue('name', value)} />
              <TextField name="email" placeholder="Email" value={values.email} onChange={(value) => setFieldValue('email', value)} />
              <TextField name="phone" placeholder="Celular" value={values.phone} onChange={(value) => setFieldValue('phone', formatPhoneNumber(value))} />
              <TextField name="cep" placeholder="CEP" value={values.cep} onChange={(value) => setFieldValue('cep', value)} />
              <div className="flex gap-3">
                <ComboBox name="state" value={values.state} onChange={(value) => setFieldValue('state', value)} options={stateOptions} />
                <TextField name="city" placeholder="Cidade" value={values.city} onChange={(value) => setFieldValue('city', value)} />
              </div>
              <TextField name="street" placeholder="Rua" value={values.street} onChange={(value) => setFieldValue('street', value)} />
              <div className="flex gap-3">
                <TextField name="number" placeholder="Nº" value={values.number} onChange={(value) => setFieldValue('number', value)} />
                <TextField name="neighborhood" placeholder="Bairro" value={values.neighborhood} onChange={(value) => setFieldValue('neighborhood', value)} />
              </div>

              <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 self-end" type="submit">Atualizar</button>
            </form>
          </Dialog.Description>
        </div>
      </Dialog.Panel>
    </Dialog>
  )
}