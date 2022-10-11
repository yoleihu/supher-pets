import { useContext } from "react";
import { GuardianStoreContext } from "./GuardianInformationContext";

export interface PetsProps {
  id: string,
  name: string,
  sex: "female" | "male" | "",
  age?: string,
  species: 'dog' | 'cat' | '',
  breed?: string,
  weight?: string,
  bloodType?: string,
  statusToDonation?: "fit" | "unfit" | "unknow",
}

export class GuardianInformationStore {
  pets: Array<PetsProps> = [];

  addPet = (pet: PetsProps) => {
    this.pets.push(pet)
  }
}

export const GuardianStoreProvider = GuardianStoreContext.Provider;
export const useGuardianInformationStore = (): GuardianInformationStore => {
  return useContext(GuardianStoreContext);
}
