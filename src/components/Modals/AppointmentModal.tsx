import * as Yup from "yup";
import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { TextField } from "../TextField";
import { formatDate } from "../../utils/mask/dateMask";
import { AppointmentInput, AppointmentOutput } from "../../interfaces/Appointment";
import { DateTime } from "luxon";
import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { ButtonAsync } from "../Buttons/ButtonAsync";
import { Trash } from "phosphor-react";

interface AppointmentModalProps {
  appointment?: AppointmentOutput,
  isOpen: boolean,
  isEditing?: boolean,
  onClose: () => void,
}

export interface AppointmentProps {
  data: string,
  type: string,
  petId: string,
  result?: string,
}

export function AppointmentModal({ appointment, isOpen, isEditing, onClose }: AppointmentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteAppointmentModalOpen, setDeleteAppointmentModalOpen] = useState(false);
  const { createAppointment, updateAppointment } = useContext(UserContext);

  const onHandleSubmit = async (values: AppointmentProps) => {
    setIsLoading(true);

    const appointmentInput: AppointmentInput = {
      data: DateTime.fromFormat(values.data, 'dd/LL/yyyy').toISO(),
      type: values.type,
      petId: JSON.parse(values.petId),
      bloodCenterId: JSON.parse(localStorage.getItem("USERINFO_ID") ?? ''),
      result: values.result ?? null,
    };

    if (isEditing) {
      await updateAppointment(appointmentInput, appointment?.id ?? '')
    } else {
      await createAppointment(appointmentInput)
    };

    setIsLoading(false);
    onClose();
  }

  function convertToBase64(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const selectedFile = event.target.files[0]
      const fileReader = new FileReader();
      let base64;
      fileReader.onload = function (fileLoadedEvent) {
        base64 = fileLoadedEvent.target?.result;
        setFieldValue('result', base64)
      };
      fileReader.readAsDataURL(selectedFile);
    }
  }

  const initialValues = {
    type: appointment?.type ?? '',
    data: appointment?.data ? DateTime.fromISO(appointment?.data).toFormat('dd/LL/yyyy') : '',
    petId: JSON.stringify(appointment?.petId!) ?? '',
    result: appointment?.result ?? '',
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string()
      .required('Campo obrigatório'),
    petId: Yup.string()
      .required('Campo obrigatório'),
    data: Yup.string()
      .required('Selecione a data'),
  });

  const formik = useFormik<AppointmentProps>({
    initialValues,
    onSubmit: (values) => { onHandleSubmit(values) },
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, touched, errors } = formik;

  return (
    <>
      {deleteAppointmentModalOpen &&
        <ConfirmDeleteModal id={appointment?.id} itemDeleted="pet" isOpen={deleteAppointmentModalOpen} onClose={() => setDeleteAppointmentModalOpen(false)} />
      }

      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto duration-200 ease-in-out">
        <div className="fixed inset-0 bg-black/30" />
        <Dialog.Panel className="w-full max-w-md transform rounded-2xl h-fit bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title className="font-semibold text-2xl mb-5">Criar Consulta</Dialog.Title>
          <Dialog.Description className="flex flex-col justify-between">
            <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
              <TextField
                name="type"
                placeholder="Tipo da consulta"
                value={values.type}
                onChange={(value) => setFieldValue('type', value)}
                errorMessage={(touched.type && errors.type) ? errors.type : undefined}
              />
              <TextField
                name="petId"
                placeholder="Pet"
                value={values.petId}
                onChange={(value) => setFieldValue('petId', value)}
                errorMessage={(touched.petId && errors.petId) ? errors.petId : undefined}
              />

              <TextField
                name="data"
                placeholder="Data"
                type="text"
                onChange={(value) => setFieldValue('data', formatDate(value))}
                value={values.data}
              />
              <div className="flex flex-col gap-2">
                <label htmlFor="result" className="text-zinc-700 pl-3">Resultado exame: <span className="text-zinc-400 text-xs">(opicional)</span></label>
                <input
                  id="result"
                  name="result"
                  type="file"
                  accept="application/pdf"
                  onChange={convertToBase64}
                  className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
              <div className="flex justify-between">
                <button onClick={() => setDeleteAppointmentModalOpen(true)}>
                  <Trash color="red" size={25} />
                </button>

                <ButtonAsync
                  disabled={isLoading}
                  isLoading={isLoading}
                  className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center disabled:bg-gray-300 disabled:text-gray-700"
                  type="submit"
                >
                  {isEditing ? 'Atualizar' : 'Adicionar'}
                </ButtonAsync>
              </div>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}