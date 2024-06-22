import * as z from "zod";

import { defaultDateOfBirth, minDateOfBirth } from "../utils/general";

export const operatorSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First Name cannot be empty" })
    .max(200, { message: "First Name cannot be more than 200 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last Name cannot be empty" })
    .max(200, { message: "Last Name cannot be more than 200 characters" }),
  dateOfBirth: z.coerce
    .date()
    .refine((date) => date < defaultDateOfBirth && date >= minDateOfBirth, {
      message: "Date of Birth must be between 18 and 120 years old",
    }),
  gameName: z.string().trim().min(1, { message: "Game Name cannot be empty" }),
  approvalStatus: z.coerce.number(),
});
