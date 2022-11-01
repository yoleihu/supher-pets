import { PencilSimple } from "phosphor-react"
import { useState } from "react";
import { PetOutput } from "../interfaces/Pet";
import { PetModal } from "./Modals/PetModal";

interface PetsButtonProps {
  pet: PetOutput,
}

export function Pets({ pet }: PetsButtonProps) {
  const [isEditingPet, setIsEditindPet] = useState(false);

  return (
    <>
      {isEditingPet &&
        <PetModal pet={pet} isOpen={isEditingPet} isEditing onClose={() => { setIsEditindPet(false) }} />
      }

      <div className="flex flex-col text-center w-fit">
        <button onClick={() => setIsEditindPet(true)} className="rounded-full w-20 h-20 bg-red-200 bg-opacity-60 hover:bg-red-200 hover:bg-opacity-80 flex justify-end items-end">
          <img className=" h-14 m-auto" src={pet.species === 'DOG' ? "/assets/dog-icon.png" : "/assets/cat-icon.png"} />
          <PencilSimple className="absolute bg-sky-800 p-1 rounded-full" size={24} color={"#ffffff"} />
        </button>
        <label>{pet.name}</label>
      </div>
    </>
  )
}