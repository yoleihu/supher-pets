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
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { formatCep } from "../../utils/mask/cepMask";
import { validatePhone } from "../../utils/validators/phone";
import { BloodCenterUpdate, GuardianUpdate, UserUpdate } from "../../interfaces/User";
import { Trash } from "phosphor-react";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface ProfileModalProps {
  isOpen: boolean,
  isGuardian?: boolean,
  onClose: () => void,
}

interface FormValuesProps extends UserUpdate {
  cpf?: string,
  cnpj?: string,
}

export function ProfileModal({ isOpen, isGuardian, onClose }: ProfileModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const { updateGuardian, updateBloodCenter } = useContext(UserContext);

  const onHandleSubmit = async (values: FormValuesProps) => {
    setIsLoading(true);

    const user = {
      name: values.name,
      email: values.email,
      telephone: values.telephone,
      cep: values.cep ?? null,
      address: values.address ?? null,
      number: values.number ?? null,
      district: values.district ?? null,
      city: values.city ?? null,
      state: values.state ?? null,
    }

    try {
      if (isGuardian) {
        const guardian: GuardianUpdate = {
          ...user,
          cpf: values.cpf ?? '',
        }
        await updateGuardian(guardian);
      } else {
        const bloodCenter: BloodCenterUpdate = {
          ...user,
          cnpj: values.cnpj ?? '',
        }
        await updateBloodCenter(bloodCenter)
      }
    } finally {
      setIsLoading(false)
    }
    onClose()
  }

  const user = JSON.parse(localStorage.getItem("USERINFO") ?? '')

  const initialValues: FormValuesProps = {
    name: user.name,
    cpf: user.cpf ?? '',
    cnpj: user.cnpj ?? '',
    email: user.email,
    telephone: user.telephone,
    cep: user.cep ?? '',
    address: user.address ?? '',
    number: user.number ?? '',
    district: user.district ?? '',
    city: user.city ?? '',
    state: user.state ?? '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-Za-zÀ-ÿ ]+$/, 'O nome não deve conter números ou caracteres especiais')
      .required('Campo obrigatório'),
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
    telephone: Yup.string()
      .test('test-invalid-cnpj', 'Celular Inválido', (value) => validatePhone(value ?? ''))
      .length(15, "Celular Inválido")
      .required('Campo obrigatório'),
    cep: Yup.string()
      .length(9, "CEP Inválido"),
    address: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-Za-zÀ-ÿ .]+$/, 'O nome não deve conter números ou caracteres especiais'),
    number: Yup.string()
      .matches(/^[0-9]?/),
    district: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-Za-zÀ-ÿ .]+$/, 'O nome não deve conter números ou caracteres especiais'),
    city: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-Za-zÀ-ÿ ]+$/, 'O nome não deve conter números ou caracteres especiais'),
  });

  const formik = useFormik<FormValuesProps>({
    initialValues,
    onSubmit: ((values) => { onHandleSubmit(values) }),
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <>
      {deleteAccountModalOpen &&
        <ConfirmDeleteModal itemDeleted={isGuardian ? 'guardian' : 'bloodCenter'} isOpen={deleteAccountModalOpen} onClose={() => setDeleteAccountModalOpen(false)} />
      }

      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="font-semibold text-2xl mb-5">Editar Perfil</Dialog.Title>
              <Dialog.Description>
                <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
                  {isGuardian
                    ? <TextField
                      disabled
                      name="cpf"
                      placeholder="CPF"
                      value={values.cpf}
                      onChange={(value) => setFieldValue('cpf', formatCpf(value))}
                      errorMessage={(touched.cpf && errors.cpf) ? errors.cpf : undefined}
                    />
                    : <TextField
                      disabled
                      name="cnpj"
                      placeholder="CNPJ"
                      value={values.cnpj}
                      onChange={(value) => setFieldValue('cnpj', formatCnpj(value))}
                      errorMessage={(touched.cnpj && errors.cnpj) ? errors.cnpj : undefined}
                    />
                  }
                  <TextField
                    name="name"
                    placeholder="Nome"
                    value={values.name}
                    onChange={(value) => setFieldValue('name', value)}
                    errorMessage={(touched.name && errors.name) ? errors.name : undefined}
                  />
                  <TextField
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={(value) => setFieldValue('email', value)}
                    errorMessage={(touched.email && errors.email) ? errors.email : undefined}
                  />
                  <TextField
                    name="telephone"
                    placeholder="Celular"
                    value={values.telephone}
                    onChange={(value) => setFieldValue('telephone', formatPhoneNumber(value))}
                    errorMessage={(touched.telephone && errors.telephone) ? errors.telephone : undefined}
                  />
                  <TextField
                    name="cep"
                    placeholder="CEP"
                    value={values.cep ?? ''}
                    onChange={(value) => setFieldValue('cep', formatCep(value))}
                    errorMessage={(touched.cep && errors.cep) ? errors.cep : undefined}
                  />
                  <div className="flex gap-3">
                    <ComboBox
                      name="state"
                      value={values.state ?? ''}
                      onChange={(value) => setFieldValue('state', value)}
                      options={stateOptions}
                      errorMessage={(touched.state && errors.state) ? errors.state : undefined}
                    />
                    <TextField
                      name="city"
                      placeholder="Cidade"
                      value={values.city ?? ''}
                      onChange={(value) => setFieldValue('city', value)}
                      errorMessage={(touched.city && errors.city) ? errors.city : undefined}
                    />
                  </div>
                  <TextField
                    name="address"
                    placeholder="Rua"
                    value={values.address ?? ''}
                    onChange={(value) => setFieldValue('address', value)}
                    errorMessage={(touched.address && errors.address) ? errors.address : undefined}
                  />
                  <div className="flex gap-3">
                    <TextField
                      name="number"
                      placeholder="Nº"
                      value={values.number ?? ''}
                      onChange={(value) => setFieldValue('number', value)}
                      errorMessage={(touched.number && errors.number) ? errors.number : undefined}
                    />
                    <TextField
                      name="district"
                      placeholder="Bairro"
                      value={values.district ?? ''}
                      onChange={(value) => setFieldValue('district', value)}
                      errorMessage={(touched.district && errors.district) ? errors.district : undefined}
                    />
                  </div>

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setDeleteAccountModalOpen(true)}>
                      <Trash color="red" size={25} />
                    </button>

                    <ButtonAsync
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                      className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
                    >
                      Atualizar
                    </ButtonAsync>
                  </div>
                </form>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}