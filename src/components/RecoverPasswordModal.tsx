import { Modal } from "./Modal";

import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";

interface RecoverPasswordModalProps {
  onClose: () => void
}

interface FormValuesProps {
  email: string,
}

export const RecoverPasswordModal = ({ onClose }: RecoverPasswordModalProps) => {
  const navigate = useNavigate();

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
    onSubmit: (values) => { console.log(values) },
    validationSchema
  });

  const { values, setFieldValue, handleSubmit, handleBlur, touched, errors } = formik;

  return (
    <Modal title="Recuperar Senha" onClose={onClose}>
      <form className="flex w-full flex-col justify-center items-end" onSubmit={handleSubmit}>
        <TextField
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={(value) => { setFieldValue('email', value) }}
          onBlur={handleBlur}
          errorMessage={(touched.email && errors.email) ? errors.email : undefined}
        />

        <div className="w-3/5 flex items-center justify-center p-6 gap-2 ">
          <button
            className="text-sky-800 hover:text-sky-700 border border-sky-800 hover:border-sky-700 rounded-full h-10 w-3/4 mt-5"
            type="button"
            onClick={onClose}
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
      </form>
    </Modal>
  )
}
