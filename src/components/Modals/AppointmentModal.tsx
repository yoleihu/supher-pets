import * as Yup from "yup";
import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { AppointmentProps, useBloodCenterInformationStore } from "../../store/BloodCenterInformationStore";
import { TextField } from "../TextField";
import { formatDate } from "../../utils/mask/dateMask";

interface AppointmentModalProps {
  appointment?: AppointmentProps,
  isOpen: boolean,
  isEditing?: boolean,
  onClose: () => void,
}

export function AppointmentModal({ appointment, isOpen, isEditing, onClose }: AppointmentModalProps) {
  const bloodCenterInformationStore = useBloodCenterInformationStore()

  const initialValues: AppointmentProps = {
    type: appointment?.type ?? '',
    date: appointment?.date ?? '',
    pet: appointment?.pet ?? '',
    result: appointment?.result ?? false,
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string()
      .required('Campo obrigatório'),
    pet: Yup.string()
      .required('Campo obrigatório'),
    date: Yup.string()
      .required('Selecione a data'),
  });

  const formik = useFormik<AppointmentProps>({
    initialValues,
    onSubmit: (values) => { bloodCenterInformationStore.addAppointment(values); onClose() },
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, touched, errors } = formik;

  return (
    <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto duration-200 ease-in-out">
      <div className="fixed inset-0 bg-black/30" />
      <Dialog.Panel className="w-full max-w-md transform rounded-2xl h-fit bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Description className="flex flex-col justify-between">
          <Dialog.Title className="font-semibold text-2xl mb-5">Criar Consulta</Dialog.Title>
          <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
            <TextField
              name="type"
              placeholder="Tipo da consulta"
              value={values.type}
              onChange={(value) => setFieldValue('type', value)}
              errorMessage={(touched.type && errors.type) ? errors.type : undefined}
            />
            <TextField
              name="pet"
              placeholder="Pet"
              value={values.pet}
              onChange={(value) => setFieldValue('pet', value)}
              errorMessage={(touched.pet && errors.pet) ? errors.pet : undefined}
            />

            <TextField
              name="date"
              placeholder="Data"
              type="text"
              onChange={(value) => setFieldValue('date', formatDate(value))}
              value={values.date}
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="result_input" className="text-zinc-700 pl-3">Resultado exame:</label>
              <input className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" id="result_input" type="file" />
            </div>
            <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 self-end" type="submit">{isEditing ? 'Atualizar' : 'Adicionar'}</button>
          </form>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  )
}