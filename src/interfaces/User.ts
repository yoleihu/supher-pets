interface UserBasicData {
  name: string,
  email: string,
  telephone: string,
}

export interface UserUpdate extends UserBasicData {
  address?: string | null,
  cep?: string | null,
  number?: string | null,
  city?: string | null,
  state?: string | null,
  district?: string | null,
}

export interface Login {
  username: string,
  password: string
}

export interface GuardianRegister extends UserBasicData {
  cpf: string,
  password: string
}

export interface BloodCenterRegister extends UserBasicData {
  cnpj: string,
  password: string,
}

export interface BloodCenterOutput extends UserUpdate {
  cnpj: string,
  id: number,
}

export interface GuardianUpdate extends UserUpdate {
  cpf: string,
}

export interface BloodCenterUpdate extends UserUpdate {
  cnpj: string,
}