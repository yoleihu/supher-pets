import { Dialog } from "@headlessui/react";
import { Compass, Envelope, MapPin, Phone, UserList } from "phosphor-react";
import { BloodCenterOutput } from "../../interfaces/User";

interface BloodCenterInfoModalProps {
  bloodCenter: BloodCenterOutput,
  isOpen: boolean,
  onClose: () => void,
}

export function BloodCenterInfoModal({ bloodCenter, isOpen, onClose }: BloodCenterInfoModalProps) {


  return (
    <>
      <Dialog open={isOpen} onClose={onClose} className="flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="font-semibold lg:text-2xl text-lg mb-1">{bloodCenter.name}</Dialog.Title>
              <Dialog.Description className="p-3 text-justify flex flex-col gap-1">
                <p className="flex gap-2 items-center">
                  <UserList />
                  CNPJ: {bloodCenter.cnpj}
                </p>
                <p className="flex gap-2 items-center">
                  <Phone />
                  Telefone: {bloodCenter.telephone}
                </p>
                <p className="flex gap-2 items-center">
                  <Envelope />
                  Email: {bloodCenter.email}
                </p>
                <p className="flex gap-2 items-center">
                  <Compass />
                  CEP: {bloodCenter.cep}
                </p>
                <p className="flex gap-2 items-center">
                  <MapPin />
                  Endereço:
                </p>
                <div className="rounded-3xl bg-zinc-200 px-4 py-2">
                  <p>{bloodCenter.address}</p>
                  <p>Nº: {bloodCenter.number}</p>
                  <p>Bairro: {bloodCenter.district}</p>
                  <p>Cidade: {bloodCenter.city}</p>
                  <p>Estado: {bloodCenter.state}</p>
                </div>
              </Dialog.Description>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  )
}