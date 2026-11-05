import { z } from "zod";
const phonePattern = /^\+251\d{9}$/;
export const useShema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .min(1, "phone is required")
    .regex(phonePattern, "Enter A valid phone number"),
  area: z.string().min(1, "area is required"),
  note: z.string().optional(),
});
