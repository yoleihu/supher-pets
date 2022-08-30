import InputMask from "react-input-mask";

interface InputMaskeredProps {
  field: any;
  mask: string;
}

export function InputMaskered({ field, mask }: InputMaskeredProps) {
  return (
    <InputMask
      {...field}
      mask={mask}
      maskChar={null}
      className="shadow placeholder-zinc-500 text-black rounded-full w-full px-3 py-1 lg:text-lg focus:outline-amber-400"
    />
  );
}
