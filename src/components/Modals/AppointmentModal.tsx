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
  pet?: string,
  isOpen: boolean,
  isEditing?: boolean,
  onClose: () => void,
}

export interface AppointmentProps {
  data: string,
  type: string,
  pet: string,
  result?: string,
}

export function AppointmentModal({ appointment, pet, isOpen, isEditing, onClose }: AppointmentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [deleteAppointmentModalOpen, setDeleteAppointmentModalOpen] = useState(false);
  const { createAppointment, updateAppointment } = useContext(UserContext);

  const onHandleSubmit = async (values: AppointmentProps) => {
    setIsLoading(true);

    const appointmentInput: AppointmentInput = {
      data: DateTime.fromFormat(values.data, 'dd/LL/yyyy').toISO(),
      type: values.type,
      pet: values.pet,
      bloodCenterId: JSON.parse(localStorage.getItem("USERINFO_ID") ?? ''),
      result: values.result ?? null,
    };

    try {
      if (isEditing) {
        await updateAppointment(appointmentInput, appointment?.id ?? '')
      } else {
        await createAppointment(appointmentInput)
      };
    } finally {
      setIsLoading(false);
    }
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
    pet: appointment?.pet ?? pet ?? '',
    result: appointment?.result ?? '',
  };

  const validationSchema = Yup.object().shape({
    type: Yup.string()
      .required('Campo obrigatório'),
    pet: Yup.string()
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
        <ConfirmDeleteModal id={appointment?.id} itemDeleted="appointment" isOpen={deleteAppointmentModalOpen} onClose={() => setDeleteAppointmentModalOpen(false)} />
      }

      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="font-semibold text-2xl mb-5">{isEditing ? 'Atualizar' : 'Criar'} Consulta</Dialog.Title>
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
                    name="pet"
                    placeholder="Pet"
                    value={values.pet}
                    onChange={(value) => setFieldValue('pet', value)}
                    errorMessage={(touched.pet && errors.pet) ? errors.pet : undefined}
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
                  <div className={`w-full flex ${isEditing ? 'justify-between' : 'justify-end'}`}>
                    {isEditing &&
                      <button type="button" onClick={() => setDeleteAppointmentModalOpen(true)}>
                        <Trash color="red" size={25} />
                      </button>
                    }

                    <ButtonAsync
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                      className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
                    >
                      {isEditing ? 'Atualizar' : 'Adicionar'}
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