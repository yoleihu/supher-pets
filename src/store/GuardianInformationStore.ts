import { useContext } from "react";
import { StoreContext } from "./GuardianInformationContext";

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
  private pets: Array<PetsProps> = [];

  addPet = (pet: PetsProps) => {
    this.pets.push(pet)
  }

  listPets = (): Array<PetsProps> => {
    return this.pets
  }
}

export const StoreProvider = StoreContext.Provider;
export const useGuardianInformationStore = (): GuardianInformationStore => {
  return useContext(StoreContext);
}
