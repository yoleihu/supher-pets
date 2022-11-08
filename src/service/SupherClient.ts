import axios from "axios"
import { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { AlertInput } from "../interfaces/Alert";
import { AppointmentInput } from "../interfaces/Appointment";
import { PetInput } from "../interfaces/Pet";
import { RecoverPassword, updatePassword } from "../interfaces/RecoverPassword";
import {
  BloodCenterRegister,
  BloodCenterUpdate,
  GuardianRegister,
  GuardianUpdate,
  Login,
} from "../interfaces/User";

export class SupherClient {
  api = axios.create({
    baseURL: "https://supher-api.herokuapp.com/",
    // "http://localhost:3000"
  });

  async defineInterceptors() {
    this.api.interceptors.response.use(response => {
      return response
    }, err => {
      return new Promise(async (resolve, reject) => {
        if(err.response.status === 401) {
          localStorage.clear();
          await supherClient.logout();
          window.location.reload()
        }
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
      })
    })
  }

  async registerGuardian(guardian: GuardianRegister) {
    try {
      const response = await this.api.post("/guardian", guardian);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async loginGuardian(guardian: Login) {
    try {
      const response = await this.api.post("/guardian/login", guardian);
      return response.data;
    } catch (error) {
      const { message } = error as Error;
      if (message.includes("401")) {
        toast.error("Email ou senha incorretos");
      } else {
        toast.error("Erro de conexão");
      }
      throw new Error();
    }
  }

  async updateGuardian(guardian: GuardianUpdate, id: string) {
    try {
      const result = await this.api.patch(`/guardian/${id}`, guardian);
      return result.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async getGuardian(guardian: string) {
    try {
      const response = await this.api.get(`/guardian/${guardian}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async getGuardianEmail(guardian: string) {
    try {
      const response = await this.api.get(`/guardian/email/${guardian}`);
      return response.data
    } catch (error) {
      toast.error('Erro de conexão')
      throw new Error()
    }
  }

  async deleteGuardian(guardianId: number) {
    try {
      const response = await this.api.delete(`/guardian/${guardianId}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async registerBloodCenter(bloodCenter: BloodCenterRegister) {
    try {
      const response = await this.api.post("/blood-center", bloodCenter);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async updatePasswordGuardian(
    updatePasswordBody: updatePassword,
    token: string
  ) {
    try {
      const response = await this.api.put(
        `/guardian/pass`,
        updatePasswordBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async updatePasswordBloodCenter(
    updatePasswordBody: updatePassword,
    token: string
  ) {
    try {
      const response = await this.api.put(
        `/bloodCenter/pass`,
        updatePasswordBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async recoverPasswordGuardian(recoverPasswordBody: RecoverPassword) {
    try {
      const response = await this.api.post(
        "/guardian/generate-link",
        recoverPasswordBody
      );
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async recoverPasswordBloodCenter(recoverPasswordBody: RecoverPassword) {
    try {
      const response = await this.api.post(
        "/blood-center/generate-link",
        recoverPasswordBody
      );
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async loginBloodCenter(bloodCenter: Login) {
    try {
      const response = await this.api.post("/blood-center/login", bloodCenter);
      return response.data;
    } catch (error) {
      const { message } = error as Error;
      if (message.includes("401")) {
        toast.error("Email ou senha incorretos");
      } else {
        toast.error("Erro de conexão");
      }
      throw new Error();
    }
  }

  async updateBloodCenter(bloodCenter: BloodCenterUpdate, id: string) {
    try {
      const response = await this.api.patch(`/blood-center/${id}`, bloodCenter);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async getBloodCenter(bloodCenter: string) {
    try {
      const response = await this.api.get(`/blood-center/${bloodCenter}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async getBloodCenterEmail(bloodCenter: string) {
    try {
      const response = await this.api.get(`/blood-center/email/${bloodCenter}`)
      return response.data
    } catch (error) {
      toast.error('Erro de conexão')
      throw new Error()
    }
  }

  async deleteBloodCenter(bloodCenterId: number) {
    try {
      const response = await this.api.delete(`blood-center/${bloodCenterId}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async addPet(pet: PetInput) {
    try {
      const response = await this.api.post("/pet", pet);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async updatePet(pet: PetInput, petId: string) {
    try {
      const response = await this.api.patch(`/pet/${petId}`, pet);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async listPets(guardianId: number) {
    try {
      const result = await this.api.get(`/pet/list/${guardianId}`);
      return result.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async getPet(petId: string) {
    try {
      const response = await this.api.get(`/pet/${petId}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async deletePet(petId: string) {
    try {
      const response = await this.api.delete(`/pet/${petId}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async listNearBloodCenter(cep: string) {
    try {
      const response = await this.api.get(`/blood-center/list-nears/${cep}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async listNearGuardian(cep: string) {
    try {
      const response = await this.api.get(`/guardian/list-nears/${cep}`);
      return response.data
    } catch (error) {
      toast.error('Erro de conexão')
      throw new Error()
    }
  }

  async createAlert(alert: AlertInput) {
    try {
      const response = await this.api.post("/alert", alert);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async listAlerts(bloodCenterId: number) {
    try {
      const result = await this.api.get(`/alert/list/${bloodCenterId}`);
      return result.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async deleteAlert(alertId: string) {
    try {
      const response = await this.api.delete(`/alert/${alertId}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async createAppointment(appointment: AppointmentInput) {
    try {
      const response = await this.api.post("/appointment", appointment);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async updateAppointment(
    appointment: AppointmentInput,
    appointmentId: string
  ) {
    try {
      const response = await this.api.patch(
        `/appointment/${appointmentId}`,
        appointment
      );
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async listAppointments(bloodCenterId: number) {
    try {
      const result = await this.api.get(`/appointment/list/${bloodCenterId}`);
      return result.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async deleteAppointment(appointmentId: string) {
    try {
      const response = await this.api.delete(`/appointment/${appointmentId}`);
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }

  async logout() {
    try {
      const response = await this.api.delete("/token/logout");
      return response.data;
    } catch (error) {
      toast.error("Erro de conexão");
      throw new Error();
    }
  }
}

const supherClient = new SupherClient();
export default supherClient;
