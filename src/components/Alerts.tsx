import { DateTime } from "luxon"
import { Trash } from "phosphor-react"
import { useState } from "react"
import { AlertOutput } from "../interfaces/Alert"
import { ConfirmDeleteModal } from "./Modals/ConfirmDeleteModal"

interface AlertsProps {
  alert: AlertOutput,
}

export const Alerts = ({ alert }: AlertsProps) => {
  const [deleteAlertModalOpen, setDeleteAlertModalOpen] = useState(false);

  return (
    <>
      {deleteAlertModalOpen &&
        <ConfirmDeleteModal id={alert.id} itemDeleted="alert" isOpen={deleteAlertModalOpen} onClose={() => setDeleteAlertModalOpen(false)} />
      }

      <div className="flex items-center justify-between w-full gap-3 lg:mt-2">
          {alert.species === "DOG"
            ? <img src="/assets/dog-icon.png" className="h-6" />
            : <img src="/assets/cat-icon.png" className="h-6" />
          }
            <p>Tipo: {alert.bloodType}</p>
            <p>{DateTime.fromISO(alert.data).setLocale('br').toFormat('D')}</p>
        <button onClick={() => setDeleteAlertModalOpen(true)}>
          <Trash color="red" size={20} />
        </button>
      </div>
    </>
  )
}
