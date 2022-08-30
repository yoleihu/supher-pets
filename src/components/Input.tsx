import { Field } from "formik";
import { Eye, EyeSlash } from "phosphor-react";
import { HTMLInputTypeAttribute, useState } from "react";
import { InputMaskered } from "./InputMaskered";

interface InputProps {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  errors?: string | null;
  touched?: boolean | null;
  name: string;
  isPassword?: boolean;
  onTerms?: () => void;
}

export function Input({
  id,
  type,
  name,
  placeholder,
  errors,
  touched,
  onTerms,
  isPassword = false,
}: InputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePassword = () => {
    if (isPassword) {
      return `${passwordVisible ? "text" : "password"}`;
    } else {
      return type;
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between"></div>
      <div
        className={`flex items-center w-full ${type === "checkbox" && "gap-2"}`}
      >
        <Field
          // render={placeholder === ("cpf" || "cnpj") ? ({ field }: any) => (
          //   placeholder === "cpf" ?
          //     <InputMaskered field={field} mask="999.999.999-99" /> :
          //     <InputMaskered field={field} mask="99.999.999/9999-99" />
          // ) : null}
          autocomplete={"off"}
          id={id}
          type={handlePassword()}
          placeholder={placeholder}
          name={name}
          className={`bg-white border-b-[1px] border-zinc-400 placeholder-zinc-400 text-black px-3 py-1 focus:outline-none ${
            type === "checkbox" ? "w-fit accent-sky-800 mt-3" : "w-full"
          }`}
        />
        {id === "terms" && (
          <label className="mt-3">
            Concordo com os{" "}
            <a
              type="button"
              className="text-sky-800 underline"
              onClick={onTerms}
            >
              termos de uso e politica de privacidade
            </a>
          </label>
        )}
        {isPassword ? (
          <button
            type={"button"}
            className="px-3 bg-white h-[2.063rem] border-b-[1px] border-zinc-400"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <EyeSlash /> : <Eye />}
          </button>
        ) : null}
      </div>

      {errors && touched ? (
        <div className="text-red-600 text-xs">{errors}</div>
      ) : null}
    </div>
  );
}
