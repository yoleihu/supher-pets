import axios from "axios"
import { AlertInput } from "../interfaces/Alert";
import { AppointmentInput } from "../interfaces/Appointment";
import { PetInput } from "../interfaces/Pet";
import { RecoverPassword } from "../interfaces/RecoverPassword";
import { BloodCenterRegister, BloodCenterUpdate, GuardianRegister, GuardianUpdate, Login } from "../interfaces/User";

export class SupherClient {
  api = axios.create({
    baseURL: 
    "https://supher-api.herokuapp.com/",
    // "http://localhost:3000" 
    });

  // async defineInterceptors() {
  //   this.api.interceptors.response.use(response => {
  //     return response
  //   }, err => {
  //     return new Promise(async (resolve, reject) => {
  //       const originalReq = err.config
  //       if (err.response.status === 401 && err.config && !err.config._retry) {
  //         originalReq._retry = true
  //         const oldToken = JSON.parse(localStorage.getItem("TOKEN") ?? '')
  //         try {
  //           let res = await this.api.put('/token/refresh', { oldToken })

  //           if (res.status === 200) {

  //             localStorage.setItem("TOKEN", res.data.access_token)
  //             this.api.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`
  //             originalReq.headers.Authorization = `Bearer ${res.data.access_token}`
  //             return this.api(originalReq)
  //           }
  //           resolve(res)
  //         } catch (e) {

  //         }
  //       } else {
  //         reject(err)
  //       }
  //     })
  //   })
  // }

  async registerGuardian(guardian: GuardianRegister) {
    try {
      const response = await this.api.post('/guardian', guardian)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async loginGuardian(guardian: Login) {
    try {
      const response = await this.api.post('/guardian/login', guardian)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async updateGuardian(guardian: GuardianUpdate, id: string) {
    try {
      const result = await this.api.patch(`/guardian/${id}`, guardian)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  async getGuardian(guardian: string) {
    try {
      const response = await this.api.get(`/guardian/${guardian}`);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteGuardian(guardianId: string) {
    try {
      const response = await this.api.delete(`/guardian/${guardianId}`)
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  async registerBloodCenter(bloodCenter: BloodCenterRegister) {
    try {
      const response = await this.api.post('/blood-center', bloodCenter)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async recoverPasswordBloodCenter(recoverPasswordBody: RecoverPassword) {
    try {
      const response = await this.api.post('/blood-center/generate-link', recoverPasswordBody)
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  async loginBloodCenter(bloodCenter: Login) {
    try {
      const response = await this.api.post('/blood-center/login', bloodCenter)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async updateBloodCenter(bloodCenter: BloodCenterUpdate, id: string) {
    try {
      const response = await this.api.patch(`/blood-center/${id}`, bloodCenter)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getBloodCenter(bloodCenter: string) {
    try {
      const response = await this.api.get(`/blood-center/${bloodCenter}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteBloodCenter(bloodCenterId: string) {
    try {
      const response = await this.api.delete(`blood-center/${bloodCenterId}`)
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  async addPet(pet: PetInput) {
    try {
      const response = await this.api.post('/pet', pet)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async updatePet(pet: PetInput, petId: string) {
    try {
      const response = await this.api.patch(`/pet/${petId}`, pet)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
  
  async listPets(guardianId: number) {
    try {
      const result = await this.api.get(`/pet/list/${guardianId}`)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  async getPet(petId: string) {
    try {
      const response = await this.api.get(`/pet/${petId}`)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async deletePet(petId: string) {
    try {
      const response = await this.api.delete(`/pet/${petId}`)
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  async listNearBloodCenter(cep: string) {
    try {
      const response = await this.api.get(`/blood-center/list-nears/${cep}`);
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async createAlert(alert: AlertInput) {
    try {
      const response = await this.api.post('/alert', alert)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async listAlerts(bloodCenterId: number) {
    try {
      const result = await this.api.get(`/alert/list/${bloodCenterId}`)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAlert(alertId: string) {
    try {
      const response = await this.api.delete(`/alert/${alertId}`)
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  async createAppointment(appointment: AppointmentInput) {
    try {
      const response = await this.api.post('/appointment', appointment)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async updateAppointment(appointment: AppointmentInput, appointmentId: string) {
    try {
      const response = await this.api.patch(`/appointment/${appointmentId}`, appointment)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async listAppointments(bloodCenterId: number) {
    try {
      const result = await this.api.get(`/appointment/list/${bloodCenterId}`)
      return result.data
    } catch (error) {
      console.log(error)
    }
  }

  async deleteAppointment(appointmentId: string) {
    try {
      const response = await this.api.delete(`/appointment/${appointmentId}`)
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

  async logout() {
    try {
      const response = await this.api.delete('/token/logout')
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

const supherClient = new SupherClient()
export default supherClient