import { startOfDay, subYears } from "date-fns";

import { APPROVAL_STATUS } from "../constants";

export const getApprovalStatus = (status: number): string => {
  return status === APPROVAL_STATUS.PENDING ? "Pending" : "Approval";
};

const today: Date = new Date(Date.now());

export const defaultDateOfBirth: Date = subYears(today, 18);

export const minDateOfBirth: Date = subYears(today, 120);
