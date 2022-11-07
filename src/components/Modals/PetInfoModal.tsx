import { Dialog } from "@headlessui/react";
import { PetOutput } from "../../interfaces/Pet";

interface PetInfoModalProps {
  pet: PetOutput,
  isOpen: boolean,
  onClose: () => void,
}

export function PetInfoModal({ pet, isOpen, onClose }: PetInfoModalProps) {


  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="font-semibold lg:text-2xl text-lg mb-5">{pet.name}</Dialog.Title>
              <Dialog.Description className="p-5 text-justify">
                <img className=" h-14 m-auto" src={pet.species === 'DOG' ? "/assets/dog-icon.png" : "/assets/cat-icon.png"} />
                <p>{pet.sexOfPet}</p>
                <p>{pet.age}</p>
                <p>{pet.bloodType}</p>
                <p>{pet.breed}</p>
                <p>{pet.statusToDonation}</p>
                <p>{pet.weight}</p>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}