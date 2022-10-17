import { CalendarBlank, List, MagnifyingGlass, PawPrint, PencilSimple, Plus, WarningCircle } from "phosphor-react";
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

enum CurrentScreen {
  ALERTS = 'alerts',
  APPOINTMENTS = 'appointments',
  FINDPETS = 'findPets'
}

export function BloodCenter() {
  const bloodCenterInformationStore = useBloodCenterInformationStore();
  const [isSearchingPet, setIsSearchingPet] = useState(false);
  const [searchPet, setSearchPet] = useState('');
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [openAppointmentModal, setOpenAppointmentModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [screenOptionsOpen, setScreenOpitionsOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>(CurrentScreen.APPOINTMENTS)

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
        <ButtonNavbar type="button" label="Sair" path="/" role='secondary' />
      </Navbar>
      <div className="lg:mt-28 mt-20 lg:mx-32 sm:mx-12 mx-6 flex gap-14">
        <div className={`lg:w-4/6 lg:block w-full ${currentScreen !== 'appointments' && 'hidden'}`}>
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
        <div className={`lg:w-2/6 w-full lg:block flex flex-col gap-4 ${currentScreen === 'appointments' && 'hidden'}`}>
          <div className={`bg-white min-h-[11rem] shadow rounded-3xl p-5 lg:block ${currentScreen !== 'findPets' && 'hidden'}`}>
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
          <div className={`bg-white min-h-[11rem] shadow rounded-3xl p-5 flex flex-col w-full justify-between lg:block ${currentScreen !== 'alerts' && 'hidden'}`}>
            <>
              <h1 className="text-lg font-medium">Criar Alerta</h1>
              {bloodCenterInformationStore.alerts && bloodCenterInformationStore.alerts.map(alert => (
                <div className="flex items-center gap-3">
                  {alert.species === "dog"
                    ? <img src="/assets/dog-icon.png" className="h-5" />
                    : <img src="/assets/cat-icon.png" className="h-5" />
                  }
                  <p>{alert.bloodType}</p>
                </div>
              ))}
              <button onClick={() => setOpenAlertModal(true)} className="self-end  w-fit rounded-full p-2 bg-sky-800 hover:bg-sky-700">
                <Plus className="m-auto" size={15} color="#ffffff" />
              </button>
            </>
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 right-5 lg:hidden flex flex-col justify-end gap-2">
        {screenOptionsOpen &&
          <div className="bottom-16 right-2 p-3 rounded-lg gap-3 flex flex-col w-full items-end lg:hidden bg-sky-800 text-white">
            <button className={`flex gap-2 ${currentScreen === 'appointments' && 'hidden'}`} onClick={() => {setCurrentScreen(CurrentScreen.APPOINTMENTS); setScreenOpitionsOpen(false)}}>
              Consultas
              <CalendarBlank className="m-auto" size={15} color="#ffffff" />
            </button>
            <button className={`flex gap-2 ${currentScreen === 'findPets' && 'hidden'}`} onClick={() => {setCurrentScreen(CurrentScreen.FINDPETS); setScreenOpitionsOpen(false)}}>
              Buscar Pets
              <PawPrint className="m-auto" size={15} color="#ffffff" />
            </button>
            <button className={`flex gap-2 ${currentScreen === 'alerts' && 'hidden'}`} onClick={() => {setCurrentScreen(CurrentScreen.ALERTS); setScreenOpitionsOpen(false)}}>
              Alertas
              <WarningCircle className="m-auto" size={15} color="#ffffff" />
            </button>
          </div>
        }
        <button className="self-end w-fit rounded-full p-3 bg-sky-800 hover:bg-sky-700" onClick={() => setScreenOpitionsOpen(!screenOptionsOpen)}>
          <List className="m-auto" size={20} color="#ffffff" />
        </button>
      </div>
      <Footer />
    </>
  )
}