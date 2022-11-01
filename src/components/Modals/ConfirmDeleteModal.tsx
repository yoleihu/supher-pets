import { Dialog } from "@headlessui/react";
import { Check, X } from "phosphor-react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import supherClient from "../../service/SupherClient";

interface ConfirmDeleteModalProps {
  id?: string,
  itemDeleted: 'pet' | 'appointment' | 'alert' | 'guardian' | 'bloodCenter',
  isOpen: boolean,
  onClose: () => void,
}

export function ConfirmDeleteModal({ id, itemDeleted, isOpen, onClose }: ConfirmDeleteModalProps) {
  const { deleteAlert, deleteAppointment, deletePet, signOut } = useContext(UserContext)

  const onConfirmDelete = async () => {
    switch (itemDeleted) {
      case 'alert': 
        deleteAlert(id!);
        break;
      case 'appointment':
        deleteAppointment(id!);
        break;
      case 'pet':
        deletePet(id!);
        break;
      default:
        const userId = JSON.parse(localStorage.getItem("USERINFO_ID")!)
        await supherClient.deleteGuardian(userId)
        signOut()
    }
  }

  const handleText = () => {
    if (itemDeleted === 'alert') {
      return 'esse alerta'
    } else if (itemDeleted === 'appointment') {
      return 'essa consulta'
    } else if (itemDeleted === 'pet') {
      return 'seu pet'
    } else {
      return 'sua conta'
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} className="flex min-h-full items-center justify-center p-4 text-center fixed inset-0 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30" />
      <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
        <Dialog.Description className="p-5 text-justify">
          <Dialog.Title className="font-semibold lg:text-2xl text-lg mb-5">{`Tem certeza que deseja excluir ${handleText()}?`}</Dialog.Title>
          <div className="flex gap-4 w-full justify-end">
            <button onClick={onClose} className="flex items-center gap-1 hover:bg-red-100 py-1 px-2 rounded-2xl">
              <X color={'red'} size={20} />
              Não
            </button>
            <button onClick={() => onConfirmDelete()} className="flex items-center gap-1 hover:bg-emerald-100 py-1 px-2 rounded-2xl">
              <Check color={'green'} size={20} />
              Sim
            </button>
          </div>
        </Dialog.Description>
      </Dialog.Panel>
    </Dialog>
  )
}