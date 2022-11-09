import { Dialog } from "@headlessui/react";
import { Cake, Drop, GenderFemale, GenderMale, HandbagSimple, PawPrint } from "phosphor-react";
import { useState } from "react";
import { PetOutput } from "../../interfaces/Pet";
import { AppointmentModal } from "./AppointmentModal";

interface PetInfoModalProps {
  pet: PetOutput,
  isOpen: boolean,
  onClose: () => void,
}

export function PetInfoModal({ pet, isOpen, onClose }: PetInfoModalProps) {
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);

  return (
    <>
      {openAppointmentModal &&
        <AppointmentModal pet={pet.id} isOpen={openAppointmentModal} onClose={() => { setOpenAppointmentModal(false) }} />
      }

      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-xs transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Description className="px-5 text-justify">
                <div className="flex flex-col items-center gap-1 w-full mb-5">
                  <img className="h-16 w-fit" src={pet.species === 'DOG' ? "/assets/dog-icon.png" : "/assets/cat-icon.png"} />
                  <label className="font-semibold text-lg">{pet.name}</label>
                </div>
                <p className="flex gap-1 items-center">
                  {pet.sexOfPet === "FEMALE" ? <GenderFemale color="#FC95FE" /> : <GenderMale color="#6794FE" />}
                  Sexo: {pet.sexOfPet === "FEMALE" ? "Fêmea" : "Macho"}
                </p>
                {pet.age &&
                  <p className="flex gap-1 items-center">
                    <Cake />
                    Idade: {pet.age}
                  </p>
                }
                {pet.bloodType &&
                  <p className="flex gap-1 items-center">
                    <Drop />
                    Tipo sanguíneo: {pet.bloodType}
                  </p>
                }
                {pet.breed &&
                  <p className="flex gap-1 items-center">
                    <PawPrint />
                    Raça: {pet.breed}
                  </p>
                }
                {pet.statusToDonation &&
                  <p className="flex gap-1 items-center">Status para doação: {pet.statusToDonation}</p>
                }
                {pet.weight &&
                  <p className="flex gap-1 items-center">
                    <HandbagSimple />
                    Peso: {pet.weight}
                  </p>
                }

                <div className="w-full flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOpenAppointmentModal(true)}
                    className="bg-sky-800 text-white hover:bg-sky-700 rounded-full h-10 w-fit mt-2 px-4 flex justify-center items-center gap-2 disabled:bg-gray-300 disabled:text-gray-700"
                  >
                    Criar consulta
                  </button>
                </div>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}