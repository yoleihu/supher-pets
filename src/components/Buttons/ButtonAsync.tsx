import { CircleNotch } from "phosphor-react";

export type ButtonAsyncProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type: string,
  isLoading?: boolean;
};

export const ButtonAsync: React.FC<ButtonAsyncProps> = ({ isLoading, type, ...props }) => {
  return (
    <>
      <button type={type} {...props}>
        {props.children}
        {isLoading &&
          <CircleNotch className="animate-spin" />
        }
      </button>
    </>
  );
};
