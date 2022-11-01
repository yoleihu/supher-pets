export interface PetRegister {
  guardianId: string,
  name: string,
  sexOfPet: "FEMALE" | "MALE" | "",
  age?: string,
  species: 'DOG' | 'CAT' | '',
  breed?: string,
  weight?: string,
  bloodType?: string,
  statusToDonation?: "FIT" | "UNFIT" | "UNKNOW" | null,
}

export interface PetOutput extends PetRegister {
  id: string
}
