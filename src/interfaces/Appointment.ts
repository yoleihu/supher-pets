export interface AppointmentInput {
  data: string,
  bloodCenterId: number,
  type: string,
  result?: string | null,
  pet: string,
}

export interface AppointmentOutput extends AppointmentInput {
  id: string
}
