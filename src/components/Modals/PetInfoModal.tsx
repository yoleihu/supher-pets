import { Dialog } from "@headlessui/react";
import { Cake, GenderFemale, GenderMale } from "phosphor-react";
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
        <AppointmentModal isOpen={openAppointmentModal} onClose={() => { setOpenAppointmentModal(false) }} />
      }


      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className=" max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="font-semibold lg:text-2xl text-lg mb-5">{pet.name}</Dialog.Title>
              <Dialog.Description className="px-5 text-justify">
                <img className="h-16 mb-5 mx-auto" src={pet.species === 'DOG' ? "/assets/dog-icon.png" : "/assets/cat-icon.png"} />
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
                  <p>Tipo sanguíneo: {pet.bloodType}</p>
                }
                {pet.breed &&
                  <p>Raça: {pet.breed}</p>
                }
                {pet.statusToDonation &&
                  <p>Status para doação: {pet.statusToDonation}</p>
                }
                {pet.weight &&
                  <p>Peso: {pet.weight}</p>
                }

                <button
                  type="button"
                  onClick={() => setOpenAppointmentModal(true)}
                >
                  Criar consulta
                </button>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}