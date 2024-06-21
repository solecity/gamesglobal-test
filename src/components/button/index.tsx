import { Dispatch, FunctionComponent, ReactNode } from "react";

import styles from "./index.module.css";

interface IButton {
  type: "button" | "submit" | "reset" | undefined;
  variant: "primary" | "secondary";
  label: string;
  action: (e: any) => void;
}

const Button: FunctionComponent<IButton> = ({
  type,
  variant,
  label,
  action,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={action}
    >
      {label}
    </button>
  );
};

export default Button;
