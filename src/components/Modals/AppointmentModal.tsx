import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { AppointmentProps, useBloodCenterInformationStore } from "../../store/BloodCenterInformationStore";
import { TextField } from "../TextField";

interface AppointmentModalProps {
  appointment?: AppointmentProps,
  isOpen: boolean,
  isEditing?: boolean,
  onClose: () => void,
}

export function AppointmentModal({ appointment, isOpen, isEditing, onClose}: AppointmentModalProps) {
  const bloodCenterInformationStore = useBloodCenterInformationStore()
  
  const initialValues: AppointmentProps = {
    type: '',
    date: '',
    pet: '',
    result: false,
  };

  const formik = useFormik<AppointmentProps>({
    initialValues,
    onSubmit: (values) => { bloodCenterInformationStore.addAppointment(values); onClose() },
    // validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleChange, handleBlur, touched, errors } = formik;

  return (
    <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto duration-200 ease-in-out">
      <div className="fixed inset-0 bg-black/30" />
      <Dialog.Panel className="w-full max-w-md transform rounded-2xl h-fit bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Description className="p-5 flex flex-col justify-between">
          <Dialog.Title className="font-semibold text-2xl mb-5">Criar Consulta</Dialog.Title>
          <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
            <TextField placeholder="Tipo da consulta" />
            <TextField placeholder="Pet" />
            <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 self-end" type="submit">{isEditing ? 'Atualizar' : 'Adicionar'}</button>
          </form>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  )
}