export interface AlertInput {
  bloodCenterId: number,
  species: 'DOG' | 'CAT' | '',
  bloodType: string,
  data: string,
}

export interface AlertOuput extends AlertInput {
  id: string,
}