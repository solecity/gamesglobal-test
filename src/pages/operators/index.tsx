import { useEffect, useState } from "react";
import { Layout, Form, Button } from "../../components";

import data from "../../data.json";

import styles from "./index.module.css";

export type Operator = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gameName: string;
  approvalStatus: number;
};

export default function Operators() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("");

  const getOperators = async () => {
    try {
      const { operators } = await Promise.resolve(data);

      setOperators(operators);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm = (type: string) => {
    setOpenModal(!openModal);
    setModalType(type);
  };

  useEffect(() => {
    getOperators();
  }, []);

  return (
    <Layout>
      <h2>Operators</h2>

      <Button
        type="button"
        variant="primary"
        label="Add"
        action={() => handleForm("add")}
      />

      {openModal && (
        <Form type={modalType} state={openModal} setState={setOpenModal} />
      )}

      <div className={styles.list}>
        {operators.map((op: Operator) => (
          <span>
            {op.firstName} {op.lastName}{" "}
          </span>
        ))}
      </div>
    </Layout>
  );
}
