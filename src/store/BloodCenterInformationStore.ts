import { useContext } from "react";
import { BloodCenterStoreContext } from "./BloodCenterInformationContext";

export interface AppointmentProps {
  date: string,
  type: string,
  pet: string,
  result?: boolean,
}

export interface AlertProps {
  species: "dog" | "cat" | "",
  bloodType: string,
}

export class BloodCenterInformationStore {
  appointments: Array<AppointmentProps> = [];
  alerts: Array<AlertProps> = [];

  addAppointment = (appointment: AppointmentProps) => {
    this.appointments.push(appointment)
  }

  createAlert = (alert: AlertProps) => {
    this.alerts.push(alert)
  }
}

export const BloodCenterStoreProvider = BloodCenterStoreContext.Provider;
export const useBloodCenterInformationStore = (): BloodCenterInformationStore => {
  return useContext(BloodCenterStoreContext);
}
