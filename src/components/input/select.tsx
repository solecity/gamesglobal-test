import { FunctionComponent, ReactNode } from "react";

import styles from "./index.module.css";

interface ISelect {
  register: any;
  name: string;
  label: string;
  error?: string;
  children: ReactNode;
}

const Select: FunctionComponent<ISelect> = ({
  register,
  name,
  label,
  error,
  children,
}) => {
  return (
    <label>
      {label}

      <select {...register(name)}>{children}</select>

      {!!error && <span>error</span>}
    </label>
  );
};

export default Select;
