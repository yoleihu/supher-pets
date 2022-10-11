import { useContext } from "react";
import { BloodCenterStoreContext } from "./BloodCenterInformationContext";

export interface AppointmentProps {
  date: string,
  type: string,
  pet: string,
  result?: boolean,
}

export class BloodCenterInformationStore {
  appointments: Array<AppointmentProps> = [];

  addAppointment = (appointment: AppointmentProps) => {
    this.appointments.push(appointment)
  }
}

export const BloodCenterStoreProvider = BloodCenterStoreContext.Provider;
export const useBloodCenterInformationStore = (): BloodCenterInformationStore => {
  return useContext(BloodCenterStoreContext);
}
