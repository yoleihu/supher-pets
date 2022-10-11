import * as Yup from "yup";
import { useFormik } from "formik";
import { TextField } from "../TextField";
import { ButtonAsync } from "../Buttons/ButtonAsync";
import { Dialog } from "@headlessui/react";
import { ComboBox } from "../ComboBox";
import { CaretDown, CaretUp, CheckCircle, GenderFemale, GenderMale, MinusCircle, XCircle } from "phosphor-react";
import { useState } from "react";
import { PetsProps, useGuardianInformationStore } from "../../store/GuardianInformationStore";
import { dogsBloodTypeOptions } from "../../utils/data/dogsBloodTypes";
import { catsBloodTypeOptions } from "../../utils/data/catsBloodTypes";

interface PetModalProps {
  pet?: PetsProps,
  isOpen: boolean,
  isEditing?: boolean,
  onClose: () => void,
}

export function PetModal({ pet, isOpen, isEditing, onClose }: PetModalProps) {
  const guardianInformationStore = useGuardianInformationStore();
  const [seeMore, setSeeMore] = useState(false);

  const initialValues: PetsProps = {
    id: pet?.id ?? '',
    name: pet?.name ?? '',
    sex: pet?.sex ?? '',
    statusToDonation: pet?.statusToDonation ?? "unknow",
    species: pet?.species ?? '',
    age: pet?.age ?? '',
    breed: pet?.breed ?? '',
    weight: pet?.weight ?? '',
    bloodType: pet?.bloodType ?? '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, 'O nome deve ter no minímo 3 letras')
      .matches(/^[A-z ]+$/, 'O nome não deve conter números ou caracteres especiais')
      .required('Campo obrigatório'),
    sex: Yup.string()
      .required('Selecione o sexo'),
    species: Yup.string()
      .required('Selecione a espécie')
  });

  const formik = useFormik<PetsProps>({
    initialValues,
    onSubmit: (values) => { guardianInformationStore.addPet(values); onClose() },
    validationSchema,
  });

  const { values, setFieldValue, handleSubmit, handleChange, touched, errors } = formik;

  return (
    <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto duration-200 ease-in-out">
      <div className="fixed inset-0 bg-black/30" />
      <Dialog.Panel className="w-full max-w-md transform rounded-2xl h-4/6 bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Description className="p-5 fixed inset-0 overflow-y-auto flex flex-col justify-between">
          <Dialog.Title className="font-semibold text-2xl mb-5">Criar Pet</Dialog.Title>
          <form className="gap-4 flex flex-col" onSubmit={handleSubmit}>
            <ul className="flex gap-12 max-h-32 justify-center">
              <li className="w-fit min-w-[6.75rem]">
                <input type="radio" id="dog" name="species" value="dog" className="hidden peer" onChange={handleChange} checked={values.species === "dog"} />
                <label htmlFor="dog" className="flex flex-col justify-between items-center p-5 text-gray-500 bg-white rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                  <img src={"/assets/dog-icon.png"} className="h-14" />
                  <p>Cachorro</p>
                </label>
              </li>
              <li className="w-fit min-w-[6.75rem]">
                <input type="radio" id="cat" name="species" value="cat" className="hidden peer" onChange={handleChange} checked={values.species === "cat"} />
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

            <TextField
              name="name"
              placeholder="Nome"
              value={values.name}
              onChange={(value) => setFieldValue('name', value)}
              errorMessage={(touched.name && errors.name) ? errors.name : undefined}
            />
            <ul className="flex gap-12 justify-center">
              <li className="w-fit">
                <input type="radio" id="female" name="sex" value="female" className="hidden peer" onChange={handleChange} checked={values.sex === "female"} />
                <label htmlFor="female" className="gap-2 flex justify-between items-center py-1 px-7 text-gray-500 bg-white rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                  <GenderFemale />
                  <p>Fêmea</p>
                </label>
              </li>
              <li className="w-fit">
                <input type="radio" id="male" name="sex" value="male" className="hidden peer" onChange={handleChange} checked={values.sex === "male"} />
                <label htmlFor="male" className="gap-2 flex justify-between items-center py-1 px-7 text-gray-500 rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                  <GenderMale />
                  <p>Macho</p>
                </label>
              </li>
            </ul>
            {(touched.sex && errors.sex) ?
              <span className="text-red-600 text-xs text-center">
                {errors.sex}
              </span> :
              null
            }

            <p>Aptidez para doação:</p>
            <ul className="flex gap-6 justify-center">
              <li className="w-fit">
                <input type="radio" id="fit" name="statusToDonation" value="fit" className="hidden peer" onChange={handleChange} checked={values.statusToDonation === "fit"} />
                <label htmlFor="fit" className="gap-2 flex justify-between items-center py-1 px-5 text-gray-500 bg-white rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                  <CheckCircle />
                  <p>Apto</p>
                </label>
              </li>
              <li className="w-fit">
                <input type="radio" id="unfit" name="statusToDonation" value="unfit" className="hidden peer" onChange={handleChange} checked={values.statusToDonation === "unfit"} />
                <label htmlFor="unfit" className="gap-2 flex justify-between items-center py-1 px-5 text-gray-500 rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                  <XCircle />
                  <p>Inapto</p>
                </label>
              </li>
              <li className="w-fit">
                <input type="radio" id="unknow" name="statusToDonation" value="unknow" className="hidden peer" onChange={handleChange} checked={values.statusToDonation === "unknow"} />
                <label htmlFor="unknow" className="gap-2 flex justify-between items-center py-1 px-5 text-gray-500 rounded-lg border border-gray-200 peer-checked:border-red-500 peer-checked:text-red-500 hover:text-gray-600 hover:bg-gray-100">
                  <MinusCircle />
                  <p>Não sei</p>
                </label>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => setSeeMore(!seeMore)}
              className="flex items-center gap-1 w-fit self-end text-sky-800 underline text-sm"
            >
              Campos Avançados
              {seeMore ? <CaretUp /> : <CaretDown />}
            </button>

            {seeMore &&
              <>
                <h3 className="text-sm font-bold mt-2">Campos opicionais:</h3>
                <TextField name="breed" placeholder="Raça" value={values.breed} onChange={(value) => setFieldValue('breed', value)} />
                <div className="grid grid-cols-2 gap-4">
                  <TextField name="age" placeholder="Idade" value={values.age} onChange={(value) => setFieldValue('age', value)} />
                  <TextField name="weight" placeholder="Peso" value={values.weight} onChange={(value) => setFieldValue('weight', value)} />
                </div>
                <ComboBox name="bloodType" value={values.bloodType} onChange={(value) => setFieldValue('bloodType', value)} options={values.species === 'dog' ? dogsBloodTypeOptions : catsBloodTypeOptions} />
              </>
            }

            <button className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 self-end" type="submit">{isEditing ? 'Atualizar' : 'Adicionar'}</button>
          </form>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  )
}