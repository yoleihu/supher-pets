import * as Yup from "yup";
import { Dialog } from "@headlessui/react";
import { useFormik } from "formik";
import { catsBloodTypeOptions } from "../../utils/data/catsBloodTypes";
import { dogsBloodTypeOptions } from "../../utils/data/dogsBloodTypes";
import { ComboBox } from "../ComboBox";
import { AlertInput } from "../../interfaces/Alert";
import { DateTime } from "luxon";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface AlertModalProps {
  isOpen: boolean,
  onClose: () => void,
}

interface AlertProps {
  species: "DOG" | "CAT" | "",
  bloodType: string,
}

export function AlertModal({ isOpen, onClose }: AlertModalProps) {
  const { createAlert } = useContext(UserContext)

  const onHandleSubmit = async (values: AlertProps) => {
    const alert: AlertInput = {
      bloodType: values.bloodType,
      species: values.species,
      bloodCenterId: JSON.parse(localStorage.getItem("USERINFO_ID")!),
      data: DateTime.now().toISO(),
    }

    console.log(alert)

    await createAlert(alert)
    onClose()
  }

  const initialValues: AlertProps = {
    species: '',
    bloodType: '',
  };

  const validationSchema = Yup.object().shape({
    species: Yup.string()
      .required('Selecione a espécie'),
    bloodType: Yup.string()
      .required('Selecione o tipo sanguíneo')
  });

  const formik = useFormik<AlertProps>({
    initialValues,
    onSubmit: (values) => { onHandleSubmit(values) },
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleChange, handleBlur, touched, errors } = formik;

  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto duration-200 ease-in-out">
        <div className="fixed inset-0 bg-black/30" />
        <Dialog.Panel className="w-full max-w-md transform rounded-2xl h-fit bg-white p-6 text-left align-middle shadow-xl transition-all">
          <Dialog.Title className="font-semibold text-2xl mb-5">Criar Alerta</Dialog.Title>
          <Dialog.Description className="flex flex-col justify-between">
            <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
              <ul className="flex gap-12 max-h-32 justify-center">
                <li className="w-fit min-w-[6.75rem]" onClick={() => setFieldValue('bloodType', '')}>
                  <input type="radio" id="dog" name="species" value="DOG" className="hidden peer" onChange={handleChange} checked={values.species === "DOG"} />
                  <label htmlFor="dog" className="flex flex-col justify-between items-center p-5 text-gray-500 bg-white rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                    <img src={"/assets/dog-icon.png"} className="h-14" />
                    <p>Cachorro</p>
                  </label>
                </li>
                <li className="w-fit min-w-[6.75rem]" onClick={() => setFieldValue('bloodType', '')}>
                  <input type="radio" id="cat" name="species" value="CAT" className="hidden peer" onChange={handleChange} checked={values.species === "CAT"} />
                  <label htmlFor="cat" className="flex flex-col justify-between items-center p-5 text-gray-500 rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                    <img src={"/assets/cat-icon.png"} className="h-14" />
                    <p>Gato</p>
                  </label>
                </li>
              </ul>
              {(touched.species && errors.species) ?
                <span className="text-red-600 text-xs text-center">
                  {errors.species}
                </span> :
                null
              }

              <ComboBox
                disabled={!values.species}
                name="bloodType"
                value={values.bloodType} onChange={(value) => setFieldValue('bloodType', value)}
                options={values.species === 'DOG' ? dogsBloodTypeOptions : catsBloodTypeOptions}
                errorMessage={(touched.bloodType && errors.bloodType) ? errors.bloodType : undefined}
              />

              <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 self-end" type="submit">Criar</button>
            </form>
          </Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}