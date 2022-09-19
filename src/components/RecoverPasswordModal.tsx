import { Modal } from "./Modal";
import emailjs from '@emailjs/browser';
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "./TextField";
import { Fragment, useState } from "react";
import { ButtonAsync } from "./Buttons/ButtonAsync";
import { Dialog, Transition } from "@headlessui/react";

interface RecoverPasswordModalProps {
  isOpen: boolean,
  onClose: () => void,
}

interface FormValuesProps {
  email: string,
}

export const RecoverPasswordModal = ({ isOpen, onClose }: RecoverPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toSend, setToSend] = useState({
    from_email: '',
    token: '123456',
  });

  const sendEmail = async () => {
    try {
      setIsLoading(true)
      emailjs.send('service_a7m1m8i', 'template_1xf8ift', toSend, 'Dn6OsVlPmO2i-Z0EP')
      console.log("Mensagem enviada com sucesso");
    } catch (error) {
      alert("Erro ao enviar mensagem");
    } finally {
      setIsLoading(false)
    }
  };

  const initialValues: FormValuesProps = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Campo obrigatório'),
  });

  const formik = useFormik<FormValuesProps>({
    initialValues,
    onSubmit: () => { sendEmail(); onClose() },
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <Dialog open={isOpen} onClose={onClose} className="flex min-h-full items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30" />
      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Title className="font-semibold text-2xl mb-5">Recuperar Senha</Dialog.Title>
        <Dialog.Description>
          <form className="flex w-full flex-col justify-center items-end" onSubmit={handleSubmit}>
            <TextField
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={(value) => { setFieldValue('email', value); setToSend({ ...toSend, from_email: value }) }}
              onBlur={handleBlur}
              errorMessage={(touched.email && errors.email) ? errors.email : undefined}
            />

            <div className="w-fit flex items-center justify-center lg:p-6 p-2 gap-2 ">
              <button
                className="text-sky-800 hover:text-sky-700 border border-sky-800 hover:border-sky-700 rounded-full h-10 w-fit px-3"
                onClick={onClose}
              >
                Cancelar
              </button>
              <ButtonAsync
                className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit px-3 flex items-center justify-center gap-1"
                type="submit"
                isLoading={isLoading}
                disabled={isLoading}
              >
                Enviar email
              </ButtonAsync>
            </div>
          </form>

        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  )
}
