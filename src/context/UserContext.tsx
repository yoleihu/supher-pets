import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertInput, AlertOutput } from '../interfaces/Alert';
import { AppointmentInput, AppointmentOutput } from '../interfaces/Appointment';
import { PetOutput, PetInput } from '../interfaces/Pet';
import { BloodCenterOutput, BloodCenterRegister, BloodCenterUpdate, GuardianRegister, GuardianUpdate, Login } from '../interfaces/User';
import supherClient from '../service/SupherClient';

interface AuthGuardianProps {
  children: JSX.Element
}

interface UserContextProps {
  authenticatedGuardian: boolean,
  authenticatedBloodCenter: boolean,
  pets: PetOutput[],
  alerts: AlertOutput[],
  appointments: AppointmentOutput[],
  nearBlodCenters: BloodCenterOutput[],
  signInGuardian: (guardian: Login) => Promise<void>,
  signUpGuardian: (guardian: GuardianRegister) => Promise<void>,
  updateGuardian: (guardian: GuardianUpdate) => Promise<void>,
  addPet: (pet: PetInput) => Promise<void>,
  updatePet: (pet: PetInput, petId: string) => Promise<void>,
  deletePet: (petId: string) => Promise<void>,
  signInBloodCenter: (bloodCenter: Login) => Promise<void>,
  signUpBloodCenter: (bloodCenter: BloodCenterRegister) => Promise<void>,
  updateBloodCenter: (bloodCenter: BloodCenterUpdate) => Promise<void>,
  createAlert: (alert: AlertInput) => Promise<void>,
  deleteAlert: (alertId: string) => Promise<void>,
  createAppointment: (appointment: AppointmentInput) => Promise<void>,
  updateAppointment: (appointment: AppointmentInput, appointmentId: string) => Promise<void>,
  deleteAppointment: (appointmentId: string) => Promise<void>,
  loadNearBloodCenter: (cep: string) => Promise<void>,
  signOut: () => Promise<void>
}

interface UserResponse {
  address?: string,
  cep?: string,
  city?: string,
  district?: string,
  email: string,
  id: number,
  name: string,
  'number'?: string,
  password: string,
  signUpDate: string,
  state?: string,
  telephone: string,
}

interface GuardianResponse extends UserResponse {
  cpf: string,
}

interface BloodCenterResponse extends UserResponse {
  cnpj: string,
}

const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
);

function AuthGuardian({ children }: AuthGuardianProps) {
  const [userGuardian, setUserGuardian] = useState<GuardianResponse | null>(null);
  const [pets, setPets] = useState<PetOutput[]>([]);
  const [userBloodCenter, setUserBloodCenter] = useState<BloodCenterResponse | null>(null);
  const [alerts, setAlerts] = useState<AlertOutput[]>([]);
  const [appointments, setAppointments] = useState<AppointmentOutput[]>([]);
  const [nearBlodCenters, setNearBloodCenters] = useState<BloodCenterOutput[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const loadingStoreData = async () => {
      const storageUserRaw = localStorage.getItem('USERINFO');
      const storageToken = localStorage.getItem('TOKEN');
      const storagePets = localStorage.getItem("PETS");
      const storageNearBloodCenters = localStorage.getItem("NEARBLOODCENTERS");
      const storageAlerts = localStorage.getItem("ALERTS");
      const storageAppointments = localStorage.getItem("APPOINTMENTS");
      
      if (storageToken && storageUserRaw) {
        const storageUser = JSON.parse(storageUserRaw);
        if('cpf' in storageUser) {
          setUserGuardian(storageUser);
          storagePets && setPets(JSON.parse(storagePets));
          storageNearBloodCenters && setNearBloodCenters(JSON.parse(storageNearBloodCenters))
        } else if('cnpj' in storageUser) {
          setUserBloodCenter(storageUser);
          storageAlerts && setAlerts(JSON.parse(storageAlerts));
          storageAppointments && setAppointments(JSON.parse(storageAppointments));
        }
      }
    };
    loadingStoreData()
  }, []);

  const signUpGuardian = async (guardian: GuardianRegister) => {
    await supherClient.registerGuardian(guardian);

    const userLogin = {
      username: guardian.email,
      password: guardian.password,
    }

    await signInGuardian(userLogin)
  }

  const signInGuardian = async (guardian: Login) => {
    const responseLogin = await supherClient.loginGuardian(guardian)
    const accessToken = responseLogin.access_token
    localStorage.setItem("TOKEN", JSON.stringify(accessToken))
    supherClient.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

    const responseList = await supherClient.getGuardian(guardian.username)
    setUserGuardian(responseList)

    localStorage.setItem("USERINFO", JSON.stringify(responseList))
    localStorage.setItem("USERINFO_ID", JSON.stringify(responseList.id))
    
    const responseListPets = await supherClient.listPets(responseList.id)
    setPets(responseListPets)
    localStorage.setItem("PETS", JSON.stringify(responseListPets))

    if (localStorage.getItem("USERINFO_ID")) {
      navigate(`/guardian/${localStorage.getItem("USERINFO_ID")}`)
    }
  }

  const updateGuardian = async (guardian: GuardianUpdate) => {
    const id = localStorage.getItem("USERINFO_ID")
    const responseUpdate = await supherClient.updateGuardian(guardian, id ?? '')
    
    if("id" in responseUpdate) {
      localStorage.setItem("USERINFO", JSON.stringify(responseUpdate))
      setUserGuardian(responseUpdate)
    }
  }

  const addPet = async (pet: PetInput) => {
    const response = await supherClient.addPet(pet);

    setPets([...pets, response])
    localStorage.setItem("PETS", JSON.stringify(pets))
  }

  const updatePet = async (pet: PetInput, petId: string) => {
    await supherClient.updatePet(pet, petId)

    if(userGuardian) {
      const responseList = await supherClient.listPets(userGuardian.id)

      setPets(responseList)
      localStorage.setItem("PETS", JSON.stringify(responseList))
    }
  }

  const deletePet = async (petId: string) => {
    await supherClient.deletePet(petId)

    if(userGuardian) {
      const responseList = await supherClient.listPets(userGuardian.id)

      setPets(responseList)
      localStorage.setItem("PETS", JSON.stringify(responseList))
    }
  }

  const signUpBloodCenter = async (bloodCenter: BloodCenterRegister) => {
    await supherClient.registerBloodCenter(bloodCenter);

    const userLogin = {
      username: bloodCenter.email,
      password: bloodCenter.password,
    }

    await signInBloodCenter(userLogin)
  }

  const signInBloodCenter = async (bloodCenter: Login) => {
    const responseLogin = await supherClient.loginBloodCenter(bloodCenter)
    const accessToken = responseLogin.access_token
    localStorage.setItem("TOKEN", JSON.stringify(accessToken))
    supherClient.api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`

    const responseList = await supherClient.getBloodCenter(bloodCenter.username)
    setUserBloodCenter(responseList)

    localStorage.setItem("USERINFO", JSON.stringify(responseList))
    localStorage.setItem("USERINFO_ID", JSON.stringify(responseList.id))
    
    const responseListAppointments = await supherClient.listAppointments(responseList.id)
    setAppointments(responseListAppointments)
    localStorage.setItem("APPOINTMENTS", JSON.stringify(responseListAppointments))

    const responseListAlerts = await supherClient.listAlerts(responseList.id)
    setAlerts(responseListAlerts)
    localStorage.setItem("ALERTS", JSON.stringify(responseListAlerts))

    if (localStorage.getItem("USERINFO_ID")) {
      navigate(`/blood-center/${localStorage.getItem("USERINFO_ID")}`)
    }
  }

  const updateBloodCenter = async (bloodCenter: BloodCenterUpdate) => {
    const id = localStorage.getItem("USERINFO_ID")
    const responseUpdate = await supherClient.updateBloodCenter(bloodCenter, id ?? '')

    if(responseUpdate) {
      localStorage.setItem("USERINFO", JSON.stringify(responseUpdate))
      setUserBloodCenter(responseUpdate)
    }
  }

  const createAlert = async (alert: AlertInput) => {
    const response = await supherClient.createAlert(alert)

    setAlerts([...alerts, response])
    localStorage.setItem("ALERTS", JSON.stringify(alerts))
  }

  const deleteAlert = async (alertId: string) => {
    await supherClient.deleteAlert(alertId)

    if(userBloodCenter) {
      const responseList = await supherClient.listAlerts(userBloodCenter.id)

      setAlerts(responseList)
      localStorage.setItem("ALERTS", JSON.stringify(responseList))
    }
  }

  const createAppointment = async (appointment: AppointmentInput) => {
    const response = await supherClient.createAppointment(appointment)

    setAppointments([...appointments, response])
    localStorage.setItem("APPOINTMENTS", JSON.stringify(appointments))
  }

  const updateAppointment = async (appointment: AppointmentInput, appointmentId: string) => {
    await supherClient.updateAppointment(appointment, appointmentId)

    if(userBloodCenter) {
      const responseList = await supherClient.listAppointments(userBloodCenter.id)

      setAppointments(responseList)
      localStorage.setItem("APPOINTMENTS", JSON.stringify(responseList))
    }
  }

  const deleteAppointment = async (appointmentId: string) => {
    await supherClient.deleteAppointment(appointmentId)

    if(userBloodCenter) {
      const responseList = await supherClient.listAppointments(userBloodCenter.id)

      setAppointments(responseList)
      localStorage.setItem("APPOINTMENTS", JSON.stringify(responseList))
    }
  }

  const loadNearBloodCenter = async (cep: string) => {
    const response = await supherClient.listNearBloodCenter(cep)

    localStorage.setItem("NEARBLOODCENTERS", JSON.stringify(nearBlodCenters))
    setNearBloodCenters(response)
  }

  const signOut = async () => {
    localStorage.clear();
    await supherClient.logout()
    navigate('/')
    setUserGuardian(null);
    setUserBloodCenter(null);
  }

  return (
    <UserContext.Provider value={{
      authenticatedGuardian: !!userGuardian,
      authenticatedBloodCenter: !!userBloodCenter,
      pets,
      alerts,
      appointments,
      nearBlodCenters,
      signUpGuardian,
      signUpBloodCenter,
      addPet,
      createAlert,
      createAppointment,
      signInGuardian,
      signInBloodCenter,
      updateGuardian,
      updateBloodCenter,
      updatePet,
      updateAppointment,
      deleteAlert,
      deleteAppointment,
      deletePet,
      loadNearBloodCenter,
      signOut
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, AuthGuardian }