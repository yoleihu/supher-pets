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
import { ButtonAsync } from "../Buttons/ButtonAsync";

interface AlertModalProps {
  isOpen: boolean,
  onClose: () => void,
}

interface AlertProps {
  species: "DOG" | "CAT" | "",
  bloodType: string,
}

export function AlertModal({ isOpen, onClose }: AlertModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { createAlert } = useContext(UserContext);

  const onHandleSubmit = async (values: AlertProps) => {
    setIsLoading(true);

    try {
      const alert: AlertInput = {
        bloodType: values.bloodType,
        species: values.species,
        bloodCenterId: JSON.parse(localStorage.getItem("USERINFO_ID")!),
        data: DateTime.now().toISO(),
      };
      await createAlert(alert);
    } finally {
      setIsLoading(false)
    }

    onClose();
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
      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="font-semibold text-2xl mb-5">Criar Alerta</Dialog.Title>
              <Dialog.Description className="flex flex-col justify-between">
                <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
                  <ul className="flex lg:gap-12 gap-6 max-h-32 justify-center">
                    <li className="w-fit lg:min-w-[6.75rem] min-w-[6rem]" onClick={() => setFieldValue('bloodType', '')}>
                      <input type="radio" id="dog" name="species" value="DOG" className="hidden peer" onChange={handleChange} checked={values.species === "DOG"} />
                      <label htmlFor="dog" className="flex flex-col justify-between items-center p-5 text-gray-500 bg-white rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                        <img src={"/assets/dog-icon.png"} className="lg:h-14 h-12" />
                        <p>Cachorro</p>
                      </label>
                    </li>
                    <li className="w-fit lg:min-w-[6.75rem] min-w-[6rem]" onClick={() => setFieldValue('bloodType', '')}>
                      <input type="radio" id="cat" name="species" value="CAT" className="hidden peer" onChange={handleChange} checked={values.species === "CAT"} />
                      <label htmlFor="cat" className="flex flex-col justify-between items-center p-5 text-gray-500 rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                        <img src={"/assets/cat-icon.png"} className="lg:h-14 h-12" />
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

                  <div className="w-full justify-end flex gap-2 items-center mt-2">
                    <button
                      className="text-sky-800 hover:text-sky-700 border border-sky-800 hover:border-sky-700 rounded-full h-10 w-fit px-3"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <ButtonAsync
                      type="submit"
                      isLoading={isLoading}
                      disabled={isLoading}
                      className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
                    >
                      Criar
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