import { MagnifyingGlass, PencilSimple, Plus } from "phosphor-react";
import { useState } from "react";
import { Appointment, AppointmentProps } from "../components/Appointment";
import { ButtonNavbar } from "../components/Buttons/ButtonNavbar";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { TextField } from "../components/TextField";

const appointments: AppointmentProps[] = [{
  date: "21/08/2022",
  type: "type",
  pet: "Totó",
},
{
  date: "15/08/2022",
  type: "type",
  pet: "Fofinha",
  result: true,
}]


export function BloodCenter() {
  const [isSearchingPet, setIsSearchingPet] = useState(false);
  const [searchPet, setSearchPet] = useState('');

  return (
    <>
      <Navbar>
        <div className='py-2 items-end bottom-0 flex lg:flex-row flex-col lg:gap-8 w-full lg:w-fit'>
          <ButtonNavbar type="button" label="Sair" path="/" role='secondary' />
        </div>
      </Navbar>
      <div className="mt-28 lg:mx-32 mx-16 flex gap-14">
        <div className="w-4/6">
          <div className="flex justify-between items-center">
            <h1 className="md:text-3xl text-xl">Olá Hemocentro!</h1>
            <button className="px-1 py-1 lg:my-0 my-1 w-fit rounded-full">
              <PencilSimple color="#075985" size={24} />
            </button>
          </div>
          <hr className="border-1 border-sky-800 my-4" />
          <h1 className="text-xl">Suas Consultas:</h1>
          <div className="flex flex-col gap-4 mt-4 w-full">
            {appointments && appointments.map(appointment => (
              <Appointment date={appointment.date} type={appointment.type} pet={appointment.pet} result={appointment.result} />
            ))}
            <button onClick={() => console.log("oi")} className="w-fit self-end rounded-full p-4 bg-sky-800 hover:bg-sky-700">
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
            <h1 className="text-lg font-medium">Criar Alerta</h1>
            <button onClick={() => console.log("oi")} className="self-end w-fit rounded-full p-2 bg-sky-800 hover:bg-sky-700">
              <Plus className="m-auto" size={15} color="#ffffff" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}