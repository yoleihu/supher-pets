import emailjs from '@emailjs/browser';
import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "../TextField";
import { useState } from "react";
import { ButtonAsync } from "../Buttons/ButtonAsync";
import { Dialog } from "@headlessui/react";
import supherClient from '../../service/SupherClient';
import { useNavigate } from 'react-router-dom';

interface RecoverPasswordModalProps {
  isGuardian: boolean,
  isOpen: boolean,
  onClose: () => void,
}

interface FormValuesProps {
  email: string,
}

export const RecoverPasswordModal = ({ isOpen, onClose, isGuardian }: RecoverPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [toSend, setToSend] = useState({
    from_email: '',
    token: ''
  });

  const onHandleSubmit = async ({ email }: FormValuesProps) => {

    const body = {
      email,
      hash: Math.floor(Math.random() * (9999 - 1000) + 1000).toString(),
    };

    // salva o token para atualizar senha do usuário no banco 
    if(isGuardian) {
      if ( await supherClient.getGuardian(email)){
        const response = await supherClient.recoverPasswordGuardian(body);
        setToSend({from_email: email, token: body.hash})
      } else {
        throw new Error("O seu email não existe")
      }
    } else {
      if ( await supherClient.getBloodCenter(email)){
        const response = await supherClient.recoverPasswordBloodCenter(body);
        setToSend({from_email: email, token: body.hash})
      } else {
        throw new Error("O seu email não existe")
      }
    }
    
    await sendEmail();
    setIsLoading(false);
  }

  const sendEmail = async () => {
    try {
      await emailjs.send('service_a7m1m8i', 'template_1xf8ift', toSend, 'Dn6OsVlPmO2i-Z0EP')
      navigate("/recoverPassword")
    } catch (error) {
      alert("Verifique se seu e-mail est[a correto");
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
    onSubmit: ((values) => { onHandleSubmit(values) }), 
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title className="font-semibold text-2xl mb-5">Recuperar Senha</Dialog.Title>
            <Dialog.Description>
              <form className="flex w-full flex-col justify-center items-end" onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={(value) => { setFieldValue('email', value);  }}
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
                    className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
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
        </div>
      </div>
    </Dialog>
  )
}
