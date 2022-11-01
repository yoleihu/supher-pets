import { DateTime } from "luxon";
import { FilePdf, PencilSimple } from "phosphor-react";
import { useState } from "react";
import { AppointmentInput } from "../interfaces/Appointment";
import { AppointmentModal, AppointmentProps } from "./Modals/AppointmentModal";

interface AppointmentButtonProps {
  appointment: AppointmentInput,
}

export function Appointments({ appointment }: AppointmentButtonProps) {
  const [isEditingAppointment, setIsEditindAppointment] = useState(false);

  return (
    <>
      {isEditingAppointment &&
        <AppointmentModal appointment={appointment} isOpen={isEditingAppointment} isEditing onClose={() => { setIsEditindAppointment(false) }} />
      }

      <div className="w-full rounded-xl flex bg-red-300 bg-opacity-30 px-4 py-2 justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-semibold">{appointment.type}</p>
          <p>{appointment.petId}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-end gap-1">
            <p>{DateTime.fromISO(appointment?.data ?? new Date()).toFormat('dd/LL/yyyy')}</p>
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