import { useState } from "react";
import { ButtonUser } from "../Buttons/ButtonUser";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { RecoverPasswordForm } from "./RecoverPasswordForm";
import { RecoverPasswordModal } from "../Modals/RecoverPasswordModal";
import { TermsModal } from "../Modals/TermsModal";

interface UserFormProps {
  isLogin?: boolean;
  isRegister?: boolean;
  isRecoverPassword?: boolean;
}

export function UserForm({
  isLogin,
  isRegister,
  isRecoverPassword,
}: UserFormProps) {
  const [isGuardian, setIsGuardian] = useState(true);
  const [isBloodCenter, setIsBloodCenter] = useState(false);
  const [isRecoverModalOpen, setIsRecoverModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mx-4 lg:mx-0">
      <div className="max-w-lg lg:w-2/5">
        {(isRegister || isLogin) &&
          <div className="justify-around flex mb-5">
            <ButtonUser isGuardian={isGuardian} label={"Tutor"} onChangeUser={() => { setIsGuardian(true), setIsBloodCenter(false) }} />
            <ButtonUser isBloodCenter={isBloodCenter} label={"Hemocentro"} onChangeUser={() => { setIsGuardian(false), setIsBloodCenter(true) }} />
          </div>
        }

        <div className={`bg-white shadow lg:px-10 lg:py-7 px-6 py-4 h-fit rounded-3xl`}>
          {isRegister &&
            <>
              <RegisterForm isGuardian={isGuardian} onTermsModal={() => setIsTermsModalOpen(true)} />
              {isTermsModalOpen &&
              <TermsModal isOpen={isRegister} onClose={() => setIsTermsModalOpen(false)} />
              }
            </>
          }

          {isLogin &&
            <>
              <LoginForm isGuardian={isGuardian} onForgotPassword={() => setIsRecoverModalOpen(true)} />
              {isRecoverModalOpen &&
                <RecoverPasswordModal isOpen={isRecoverModalOpen} isGuardian={isGuardian} onClose={() => setIsRecoverModalOpen(false)} />
              }
            </>
          }

          {isRecoverPassword &&
            <RecoverPasswordForm />
          }
        </div>
      </div>
      {isLogin ? (
        <div className="text-center mt-3">
          <span>Não possui uma conta?</span>
          <br />
          <a href="/register" className="text-sky-800 underline">
            Cadastre-se
          </a>
        </div>
      ) : isRegister ? (
        <div className="text-center mt-3">
          <span>Já possui uma conta?</span>
          <br />
          <a href="/login" className="text-sky-800 underline">
            Faça Login
          </a>
        </div>
      ) : null}
    </div>
  );
}