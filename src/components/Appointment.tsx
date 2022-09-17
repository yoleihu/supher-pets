import { FilePdf, PencilSimple } from "phosphor-react";

export interface AppointmentProps {
  date: string,
  type: string,
  pet: string,
  result?: boolean,
}

export function Appointment({ date, type, pet, result }: AppointmentProps) {
  return (
    <div className="w-full rounded-xl flex bg-red-300 bg-opacity-30 px-4 py-2 justify-between">
      <div className="flex flex-col gap-2">
        <p className="font-semibold">{type}</p>
        <p>{pet}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end gap-1">
          <p>{date}</p>
          {result &&
            <button className="flex items-center gap-1 text-sm">
              Resultado: 
              <FilePdf size={18} />
            </button>
          }
        </div>
        <button className="rounded-full bg-sky-800 h-fit">
          <PencilSimple className="bg-sky-800 p-1 rounded-full" size={24} color={"#ffffff"} />
        </button>
      </div>
    </div>
  )
}