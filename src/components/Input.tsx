import { Field } from "formik";
import { Eye, EyeSlash } from "phosphor-react"
import { HTMLInputTypeAttribute, useState } from "react"
import { InputMaskered } from "./InputMaskered";

interface InputProps {
  id: string,
  label: string,
  type: HTMLInputTypeAttribute,
  placeholder?: string,
  errors?: string | null,
  touched?: boolean | null,
  name: string,
  isPassword?: boolean,
  isLogin?: boolean,
  onModal?: () => void
}

export function Input({ id, label, type, name, placeholder, errors, touched, isPassword = false, isLogin = false, onModal }: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePassword = () => {
    if (isPassword) {
      return (`${passwordVisible ? "text" : "password"}`)
    } else {
      return type
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between">
      <label>{label}:</label>
      {(isPassword && isLogin) &&
        <button className="text-red-500 underline" onClick={onModal}>Esqueceu a senha?</button>
      }
      </div>
      <div className="relative flex items-center ">
        <Field
          render={name === ("cpf" || "cnpj") ? ({ field }: any) => (
            name === "cpf" ?
              <InputMaskered field={field} mask="999.999.999-99" /> :
              <InputMaskered field={field} mask="99.999.999/9999-99" />
          ) : null}
          autocomplete={"off"}
          id={id}
          type={handlePassword()}
          placeholder={placeholder}
          name={name}
          className="shadow placeholder-gray-500 text-black rounded-full w-full px-3 py-1 lg:text-lg focus:outline-amber-400 "
        />
        {isPassword ?
          <button type={"button"} className="absolute right-3" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ?
              <EyeSlash /> :
              <Eye />
            }
          </button> :
          null}
      </div>

      {errors && touched ? (
        <div className="text-red-600 text-xs">{errors}</div>
      ) : null}

    </div>
  )
}