import { FirstAid, MagnifyingGlass, PawPrint, PencilSimple, Plus } from "phosphor-react";
import { ButtonNavbar } from "../components/Buttons/ButtonNavbar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Pets } from "../components/Pets";
import { ProfileModal } from "../components/Modals/ProfileModal";
import { TextField } from "../components/TextField";
import { useContext, useState } from 'react'
import { PetModal } from "../components/Modals/PetModal";
import { UserContext } from "../context/UserContext";

export function Guardian() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchBloodCenter, setSearchBloodCenter] = useState('');
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openPetModal, setOpenPetModal] = useState(false);
  const [isPetsScreen, setIsPetsScreen] = useState(true);
  const { pets } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("USERINFO") ?? '');

  return (
    <>
      {openEditProfileModal &&
        <ProfileModal isGuardian isOpen={openEditProfileModal} onClose={() => { setOpenEditProfileModal(false) }} />
      }

      {openPetModal &&
        <PetModal isOpen={openPetModal} onClose={() => { setOpenPetModal(false) }} />
      }

      <Navbar>
        <ButtonNavbar type="button" label="Sair" role='secondary' isSignOutButton />
      </Navbar>
      <div className="lg:mt-28 mt-20 lg:mx-32 sm:mx-12 mx-6 lg:flex lg:gap-14">
        <div className={`lg:w-4/6 lg:block ${!isPetsScreen && 'hidden w-full'}`}>
          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-xl">Olá {(user.name as string + ' ').split(' ').shift()}!</h1>
            <button onClick={() => setOpenEditProfileModal(true)} className="px-1 py-1 lg:my-0 my-1 w-fit rounded-full">
              <PencilSimple color="#075985" size={24} />
            </button>
          </div>
          <hr className="border-1 border-sky-800 my-4" />
          <h1 className="text-xl">Seus Pets:</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4 justify-items-center">
            {pets && pets.map(pet => (
              <Pets pet={pet} key={pet.id} />
            ))}
            <button onClick={() => setOpenPetModal(true)} className="rounded-full w-20 h-20 bg-red-200 opacity-60 hover:bg-red-200 hover:opacity-80">
              <Plus className="m-auto" size={34} color="#b91c1c" />
            </button>
          </div>
        </div>
        <div className={`lg:w-2/6 lg:block bg-white shadow rounded-3xl p-5 min-h-[22rem] ${isPetsScreen && 'hidden w-full'}`}>
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
      <div className="absolute bottom-20 right-5 lg:hidden">
        <button className="self-end w-fit rounded-full p-3 bg-sky-800 hover:bg-sky-700" onClick={() => setIsPetsScreen(!isPetsScreen)}>
          {isPetsScreen
            ? <FirstAid className="m-auto" size={20} color="#ffffff" />
            : <PawPrint className="m-auto" size={20} color="#ffffff" />
          }
        </button>
      </div>
      <Footer />
    </>
  )
}