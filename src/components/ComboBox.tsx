import { useState } from "react";

export type ComboBoxOption = {
  value: string;
  text: string;
};

export type ComboBoxProps = {
  label?: string;
  name?: string;
  value?: string;
  onChange?(value: string): void;
  onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
  options: ComboBoxOption[];
  className?: string;
  'data-testid'?: string;
  errorMessage?: string;
  disabled?: boolean;
};

export const ComboBox = ({
  onChange,
  onBlur,
  options,
  label,
  ...props
}: ComboBoxProps) => {
  const [grayColor, setGrayColor] = useState('');

  return (
    <>
      <select
        {...props}
        onBlur={() => onBlur}
        value={props.value ?? ''}
        onChange={(e) => {onChange?.(e.currentTarget.value); setGrayColor(e.currentTarget.value)}}
        className={`bg-transparent border-b-[1px] border-zinc-400 px-3 py-1 focus:outline-none w-full ${grayColor === '' ? "text-zinc-400" : "text-black"}`}
      >
        {options.map((option, index) => (
          <option className="text-black" value={option.value} key={index}>
            {option.text}
          </option>
        ))}
      </select>
      {props.errorMessage && (
        <span className="text-red-600 text-xs">
          {props.errorMessage}
        </span>
      )}
    </>
  );
};
