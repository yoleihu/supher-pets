export interface AppointmentInput {
  data: string,
  bloodCenterId: number,
  type: string,
  result?: string | null,
  petId: number,
}

export interface AppointmentOutput extends AppointmentInput {
  id: string
}
