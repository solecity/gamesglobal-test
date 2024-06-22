import { FunctionComponent, ReactNode } from "react";

import styles from "./index.module.css";

interface ITextField {
  register: any;
  type: "text" | "date";
  name: string;
  label: string;
  min?: string;
  max?: string;
  error?: string;
}

const TextField: FunctionComponent<ITextField> = ({
  register,
  name,
  label,
  error,
  ...props
}) => {
  return (
    <label>
      {label}

      <input {...register(name)} {...props} />

      {!!error && <span className={styles.error}>{error}</span>}
    </label>
  );
};

export default TextField;
