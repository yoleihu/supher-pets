import { FilePdf, PencilSimple } from "phosphor-react";
import { useState } from "react";
import { AppointmentProps } from "../store/BloodCenterInformationStore";
import { AppointmentModal } from "./Modals/AppointmentModal";

interface AppointmentButtonProps {
  appointment: AppointmentProps,
}

export function Appointment({ appointment }: AppointmentButtonProps) {
  const [isEditingAppointment, setIsEditindAppointment] = useState(false);
  
  return (
    <>
      {isEditingAppointment &&
        <AppointmentModal appointment={appointment} isOpen={isEditingAppointment} isEditing onClose={() => { setIsEditindAppointment(false) }} />
      }


    <div className="w-full rounded-xl flex bg-red-300 bg-opacity-30 px-4 py-2 justify-between">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{appointment.type}</p>
        <p>{appointment.pet}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end gap-1">
          <p>{appointment.date}</p>
          {appointment.result &&
            <button className="flex items-center gap-1 text-sm">
              Resultado: 
              <FilePdf size={18} />
            </button>
          }
        </div>
        <button className="rounded-full bg-sky-800 h-fit" onClick={() => setIsEditindAppointment(true)}>
          <PencilSimple className="bg-sky-800 p-1 rounded-full" size={24} color={"#ffffff"} />
        </button>
      </div>
    </div>
    </>
  )
}