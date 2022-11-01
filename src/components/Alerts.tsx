import { DateTime } from "luxon"
import { Trash } from "phosphor-react"
import { useState } from "react"
import { AlertOuput } from "../interfaces/Alert"
import { ConfirmDeleteModal } from "./Modals/ConfirmDeleteModal"

interface AlertsProps {
  alert: AlertOuput,
}

export const Alerts = ({ alert }: AlertsProps) => {
  const [deleteAlertModalOpen, setDeleteAlertModalOpen] = useState(false);

  return (
    <>
      {deleteAlertModalOpen &&
        <ConfirmDeleteModal id={alert.id} itemDeleted="alert" isOpen={deleteAlertModalOpen} onClose={() => setDeleteAlertModalOpen(false)} />
      }

      <div className="flex items-center gap-3 w-full">
        {alert.species === "DOG"
          ? <img src="/assets/dog-icon.png" className="h-6" />
          : <img src="/assets/cat-icon.png" className="h-6" />
        }
        <div className="flex flex-col">
          <p>Tipo: {alert.bloodType}</p>
          <p>{DateTime.fromISO(alert.data).setLocale('br').toFormat('D')}</p>
        </div>
        <button onClick={() => setDeleteAlertModalOpen(true)}>
          <Trash color="red" size={20} />
        </button>
      </div>
    </>
  )
}
