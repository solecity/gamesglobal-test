import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";

import { Button } from "../../components";
import styles from "./index.module.css";

interface IForm {
  type: string;
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
}

const Form: FunctionComponent<IForm> = ({ type, state, setState }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [gameName, setGameName] = useState<string>("");
  const [approvalStatus, setApprovalStatus] = useState<number>(0);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log(firstName, lastName, dateOfBirth, gameName, approvalStatus);
  };

  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth("");
    setDateOfBirth("");
    setGameName("");
    setApprovalStatus(0);
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        tabIndex={0}
        onClick={() => setState(false)}
      />

      <section className={styles.modal}>
        <h2>{type} Operator</h2>

        <form>
          <div className={styles.inputWrapper}>
            <label>
              First Name:
              <input
                type="text"
                value={firstName}
                onChange={(e: any) => setFirstName(e.target.value)}
              />
            </label>

            <label>
              Last Name:
              <input
                type="text"
                value={lastName}
                onChange={(e: any) => setLastName(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label>
              Date of Birth:
              <input
                type="text"
                value={dateOfBirth}
                onChange={(e: any) => setDateOfBirth(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label>
              Game Name:
              <input
                type="text"
                value={gameName}
                onChange={(e: any) => setGameName(e.target.value)}
              />
            </label>
          </div>

          <div className={styles.inputWrapper}>
            <label>
              Status
              <select
                name="approvalStatus"
                value={approvalStatus}
                onChange={(e: any) => setApprovalStatus(e.target.value)}
              >
                <option value="0">Pending</option>
                <option value="1">Approved</option>
              </select>
            </label>
          </div>

          <div className={styles.btnWrapper}>
            <Button
              type="reset"
              label="Cancel"
              variant="secondary"
              action={handleCancel}
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
