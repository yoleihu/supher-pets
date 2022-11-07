import { DotsThree } from "phosphor-react"
import { useState } from "react"
import { PetOutput } from "../interfaces/Pet";
import { PetInfoModal } from "./Modals/PetInfoModal";

interface FindPetProps {
  pet: PetOutput,
}

export const FindPet = ({ pet }: FindPetProps) => {
  const [petInfoModalOpen, setPetInfoModalOpen] = useState(false);

  return (
    <>
      {petInfoModalOpen &&
        <PetInfoModal pet={pet} isOpen={petInfoModalOpen} onClose={() => setPetInfoModalOpen(false)} />
      }

      <div className="flex justify-between mt-6">
        <div className="flex items-center gap-2">
          <img className="h-12 m-auto" src={pet.species === 'DOG' ? "/assets/dog-icon.png" : "/assets/cat-icon.png"} />
          <p>{pet.name}</p>
        </div>
        <button onClick={() => setPetInfoModalOpen(true)}>
          <DotsThree size={20} color="#075985" />
        </button>
      </div>
    </>
  )
}
