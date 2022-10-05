import { MagnifyingGlass, PencilSimple, Plus } from "phosphor-react";
import { ButtonNavbar } from "../components/Buttons/ButtonNavbar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Pets } from "../components/Pets";
import { ProfileModal } from "../components/Modals/ProfileModal";
import { TextField } from "../components/TextField";
import { useState } from 'react'
import { PetModal } from "../components/Modals/PetModal";
import { useGuardianInformationStore } from "../store/GuardianInformationStore";

export function Guardian() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchBloodCenter, setSearchBloodCenter] = useState('');
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openPetModal, setOpenPetModal] = useState(false);
  const pets = useGuardianInformationStore();

  return (
    <>
        {openEditProfileModal &&
          <ProfileModal isGuardian isOpen={openEditProfileModal} onClose={() => { setOpenEditProfileModal(false) }} />
        }

        {openPetModal &&
          <PetModal isOpen={openPetModal} onClose={() => { setOpenPetModal(false) }} />
        }

      <Navbar>
        <div className='py-2 items-end bottom-0 flex lg:flex-row flex-col lg:gap-8 w-full lg:w-fit'>
          <ButtonNavbar type="button" label="Sair" path="/" role='secondary' />
        </div>
      </Navbar>
      <div className="mt-28 lg:mx-32 mx-16 flex gap-14">
        <div className="w-4/6">
          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-xl">Olá Pessoa!</h1>
            <button onClick={() => setOpenEditProfileModal(true)} className="px-1 py-1 lg:my-0 my-1 w-fit rounded-full">
              <PencilSimple color="#075985" size={24} />
            </button>
          </div>
          <hr className="border-1 border-sky-800 my-4" />
          <h1 className="text-xl">Seus Pets:</h1>
          <div className="flex gap-4 mt-4">
            {pets.listPets() && pets.listPets().map(pet => (
              <>
                <Pets pet={pet}
                // name={pet.name} species={pet.species} 
                // onEditing={() => {setOpenPetModal(true), setIsEditindPet(true)}} 
                />
              </>
            ))}
            <button onClick={() => setOpenPetModal(true)} className="rounded-full w-20 h-20 bg-red-200 opacity-60 hover:bg-red-200 hover:opacity-80">
              <Plus className="m-auto" size={34} color="#b91c1c" />
            </button>
          </div>
        </div>
        <div className="w-2/6 bg-white shadow rounded-3xl p-5 min-h-[22rem]">
          {isSearching
            ? <TextField placeholder="Pesquise aqui" onBlur={() => { !searchBloodCenter && setIsSearching(false) }} autoFocus value={searchBloodCenter} onChange={(value) => setSearchBloodCenter(value)} />
            : <div className="flex justify-between">
              <h1 className="text-lg font-medium">Hemocentros Próximos</h1>
              <button onClick={() => setIsSearching(true)}>
                <MagnifyingGlass />
              </button>
            </div>
          }
        </div>
      </div>
      <Footer />
    </>
  )
}