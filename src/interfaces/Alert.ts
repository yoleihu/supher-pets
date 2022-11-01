export interface AlertInput {
  bloodCenterId: number,
  species: 'DOG' | 'CAT' | '',
  bloodType: string,
  data: string,
}

export interface AlertOutput extends AlertInput {
  id: string,
}