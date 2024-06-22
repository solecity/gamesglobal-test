import { useEffect, useState } from "react";
import { format } from "date-fns";

import { Layout, Form, Button } from "../../components";
import { Operator } from "../../constants/types";
import { getApprovalStatus } from "../../utils/general";

import data from "../../data.json";

import styles from "./index.module.css";

export default function Operators() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [operatorID, setOperatorID] = useState<number | null>(null);
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

  const handleForm = (type: string, id?: number) => {
    setOpenModal(!openModal);
    setModalType(type);

    if (!!id) {
      setOperatorID(id);
      setOperator(operators[id - 1]);
    }
  };

  const handleDelete = (i: number) => {
    let arr: Operator[] = [...operators];
    arr.splice(i, 1);
    setOperators(arr);
  };

  const addOne = (operator: Operator) => {
    setOperatorID(null);
    setOperator(null);
    setOperators([...operators, operator]);
  };

  const updateOne = (operatorID: number, operator: Operator) => {
    let arr: Operator[] = [...operators];
    arr[operatorID - 1] = operator;
    setOperators(arr);
  };

  useEffect(() => {
    getOperators();
  }, []);

  useEffect(() => {
    if (!!operator) {
      if (modalType === "add") {
        addOne(operator);
      } else {
        if (!!operatorID) updateOne(operatorID, operator);
      }
    }
  }, [operator]);

  return (
    <Layout>
      <div className={styles.toolbar}>
        <h2>Operators</h2>

        <Button
          type="button"
          variant="primary"
          label="Add"
          action={() => handleForm("add")}
        />
      </div>

      {openModal && (
        <Form
          type={modalType}
          selected={operator}
          state={openModal}
          setState={setOpenModal}
          setData={setOperator}
        />
      )}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Game Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {operators.map((op: Operator, i: number) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{op.firstName}</td>
              <td>{op.lastName}</td>
              <td>{op.dateOfBirth}</td>
              <td>{op.gameName}</td>
              <td>{getApprovalStatus(op.approvalStatus)}</td>
              <td className={styles.actions}>
                <Button
                  type="button"
                  label="Edit"
                  variant="secondary"
                  action={() => handleForm("edit", i + 1)}
                />

                <Button
                  type="button"
                  label="Delete"
                  variant="secondary"
                  action={() => handleDelete(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
