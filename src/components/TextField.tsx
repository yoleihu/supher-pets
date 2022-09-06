import { Eye, EyeSlash } from 'phosphor-react';
import React, { FunctionComponent, ReactNode, useState } from 'react';

export interface TextFieldProps {
  pattern?: string;
  placeholder?: string;
  value?: string | number;
  label?: string;
  type?: 'text' | 'number' | 'password';
  name?: string;
  disabled?: boolean;
  maxValue?: number;
  errorMessage?: string;
  infoMessage?: ReactNode;
  infoMessageColor?: string;
  className?: string;
  'data-testid'?: string;
  onChange?(txt: string): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  autoFocus?: boolean;
  isPassword?: boolean;
}

export const TextField: FunctionComponent<TextFieldProps> = ({ ...props }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePassword = () => {
    if (props.isPassword) {
      return (`${passwordVisible ? "text" : "password"}`)
    } else {
      return props.type
    }
  }

  TextField.defaultProps = {
    type: 'text',
    value: '',
    disabled: false,
    label: '',
    maxValue: undefined,
    errorMessage: '',
    infoMessage: '',
    name: '',
    'data-testid': '',
    isPassword: false
  };

  return (
    <>
      <div className='flex items-center w-full'>
        <input
          name={props.name}
          pattern={props.pattern}
          placeholder={props.placeholder}
          type={handlePassword()}
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange?.(event.target.value);
          }}
          onBlur={(event) => {
            props.onBlur?.(event);
          }}
          disabled={props.disabled}
          max={props.maxValue}
          data-testid={props['data-testid']}
          autoFocus={props.autoFocus}
          className="bg-transparent border-b-[1px] border-zinc-400 placeholder-zinc-400 text-black px-3 py-1 focus:outline-none w-full"
        />
        {props.isPassword ?
          <button type={"button"} className="px-3 bg-white h-[2.063rem] border-b-[1px] border-zinc-400" onClick={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ?
              <EyeSlash /> :
              <Eye />
            }
          </button> :
          null}
      </div>
      {props.errorMessage && (
        <span className="text-red-600 text-xs">
          {props.errorMessage}
        </span>
      )}
    </>
  )
};