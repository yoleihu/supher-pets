import { MagnifyingGlass, PencilSimple, Plus } from "phosphor-react";
import { useState } from "react";
import { Appointment } from "../components/Appointment";
import { ButtonNavbar } from "../components/Buttons/ButtonNavbar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ProfileModal } from "../components/Modals/ProfileModal";
import { TextField } from "../components/TextField";
import { AppointmentModal } from "../components/Modals/AppointmentModal";
import { useBloodCenterInformationStore } from "../store/BloodCenterInformationStore";
import { AlertModal } from "../components/Modals/AlertModal";

export function BloodCenter() {
  const bloodCenterInformationStore = useBloodCenterInformationStore();
  const [isSearchingPet, setIsSearchingPet] = useState(false);
  const [searchPet, setSearchPet] = useState('');
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  return (
    <>
      {openEditProfileModal &&
        <ProfileModal isOpen={openEditProfileModal} onClose={() => { setOpenEditProfileModal(false) }} />
      }

      {openAppointmentModal &&
        <AppointmentModal isOpen={openAppointmentModal} onClose={() => { setOpenAppointmentModal(false) }} />
      }

      {openAlertModal &&
        <AlertModal isOpen={openAlertModal} onClose={() => { setOpenAlertModal(false) }} />
      }

      <Navbar>
        <div className='py-2 items-end bottom-0 flex lg:flex-row flex-col lg:gap-8 w-full lg:w-fit'>
          <ButtonNavbar type="button" label="Sair" path="/" role='secondary' />
        </div>
      </Navbar>
      <div className="mt-28 lg:mx-32 mx-16 flex gap-14">
        <div className="w-4/6">
          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-xl">Olá Hemocentro!</h1>
            <button onClick={() => setOpenEditProfileModal(true)} className="px-1 py-1 lg:my-0 my-1 w-fit rounded-full">
              <PencilSimple color="#075985" size={24} />
            </button>
          </div>
          <hr className="border-1 border-sky-800 my-4" />
          <h1 className="text-xl">Suas Consultas:</h1>
          <div className="flex flex-col gap-4 mt-4 w-full">
            {bloodCenterInformationStore.appointments && bloodCenterInformationStore.appointments.map(appointment => (
              <Appointment appointment={appointment} />
            ))}
            <button onClick={() => setOpenAppointmentModal(true)} className="w-fit self-end rounded-full p-4 bg-sky-800 hover:bg-sky-700">
              <Plus className="m-auto" size={25} color="#ffffff" />
            </button>
          </div>
        </div>
        <div className="w-2/6 flex flex-col gap-4 ">
          <div className="bg-white min-h-[11rem] shadow rounded-3xl p-5">
            {isSearchingPet
              ? <TextField
                placeholder="Pesquise aqui"
                onBlur={() => { !searchPet && setIsSearchingPet(false) }}
                autoFocus
                value={searchPet}
                onChange={(value) => setSearchPet(value)}
              />
              : <div className="flex justify-between">
                <h1 className="text-lg font-medium">Buscar Pets</h1>
                <button onClick={() => setIsSearchingPet(true)}>
                  <MagnifyingGlass />
                </button>
              </div>
            }
          </div>
          <div className="bg-white min-h-[11rem] shadow rounded-3xl p-5 flex flex-col w-full justify-between">
            <>
              <h1 className="text-lg font-medium">Criar Alerta</h1>
              {bloodCenterInformationStore.alerts && bloodCenterInformationStore.alerts.map(alert => (
                <div className="flex items-center gap-3">
                  {alert.species === "dog" 
                    ? <img src="/assets/dog-icon.png" className="h-5" />
                    : <img src="/assets/cat-icon.png" />
                  }
                  <p>{alert.bloodType}</p>
                </div>
              ))}
              <button onClick={() => setOpenAlertModal(true)} className="self-end w-fit rounded-full p-2 bg-sky-800 hover:bg-sky-700">
                <Plus className="m-auto" size={15} color="#ffffff" />
              </button>
            </>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}