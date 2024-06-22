import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Button, Select, TextField } from "../../components";
import { operatorSchema } from "../../validators/forms";
import { defaultDateOfBirth, minDateOfBirth } from "../../utils/general";
import { Operator } from "../../constants/types";

import styles from "./index.module.css";

interface IForm {
  type: string;
  state: boolean;
  selected?: Operator | null;
  setState: Dispatch<SetStateAction<boolean>>;
  setData: Dispatch<SetStateAction<Operator | null>>;
}

const Form: FunctionComponent<IForm> = ({
  type,
  selected,
  setState,
  setData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: format(defaultDateOfBirth, "yyyy-MM-dd"),
      gameName: "",
      approvalStatus: 0,
    },
    resolver: zodResolver(operatorSchema),
  });

  const handleClose = () => {
    setData(null);
    reset({
      firstName: "",
      lastName: "",
      dateOfBirth: format(defaultDateOfBirth, "yyyy-MM-dd"),
      gameName: "",
      approvalStatus: 0,
    });
    setState(false);
  };

  const onSubmit = (payload: any): void => {
    console.log(payload);
    setData({
      ...payload,
      dateOfBirth: format(payload.dateOfBirth, "yyyy-MM-dd"),
    });
    reset({
      firstName: "",
      lastName: "",
      dateOfBirth: format(defaultDateOfBirth, "yyyy-MM-dd"),
      gameName: "",
      approvalStatus: 0,
    });
    setState(false);
  };

  useEffect(() => {
    if (selected) {
      reset({
        firstName: selected.firstName || "",
        lastName: selected.lastName || "",
        dateOfBirth:
          selected.dateOfBirth || format(defaultDateOfBirth, "yyyy-MM-dd"),
        gameName: selected.gameName || "",
        approvalStatus: selected.approvalStatus || 0,
      });
    }
  }, [selected]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        tabIndex={0}
        onClick={() => setState(false)}
      />

      <section className={styles.modal}>
        <h2>{type} Operator</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputWrapper}>
            <TextField
              register={register}
              type="text"
              name="firstName"
              label=" First Name *"
              error={errors.firstName?.message}
            />

            <TextField
              register={register}
              type="text"
              name="lastName"
              label=" Last Name *"
              error={errors.lastName?.message}
            />
          </div>

          <div className={styles.inputWrapper}>
            <TextField
              register={register}
              type="date"
              name="dateOfBirth"
              label="Date of Birth"
              min={format(minDateOfBirth, "yyyy-MM-dd")}
              max={format(defaultDateOfBirth, "yyyy-MM-dd")}
              error={errors.dateOfBirth?.message}
            />
          </div>

          <div className={styles.inputWrapper}>
            <TextField
              register={register}
              type="text"
              name="gameName"
              label="Game Name *"
              error={errors.gameName?.message}
            />
          </div>

          <div className={styles.inputWrapper}>
            <Select register={register} name="approvalStatus" label="Status">
              <>
                <option value="0">Pending</option>
                <option value="1">Approved</option>
              </>
            </Select>
          </div>

          <div className={styles.btnWrapper}>
            <Button
              type="reset"
              label="Cancel"
              variant="secondary"
              action={handleClose}
            />

            <Button
              type="submit"
              variant="primary"
              label="Submit"
              action={(e: any) => handleSubmit(e)}
            ></Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Form;
