import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Introduce tu nombre")
    .max(150, "Introduce un nombre más corto"),
  email: z.string().trim().email("Ingrese un email válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener como mínimo seis caracteres"),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Ingresa un número de teléfono válido en formato E.164. Por ejemplo: +541184267591"
    )
    .optional(),

  role: z.enum(["editor", "superadmin"]),
});

export const updateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .nonempty("Introduce tu nombre")
      .max(150, "Introduce un nombre más corto"),
    email: z.string().trim().email("Ingrese un email válido"),
    password: z.union([
      z.string().min(6, "La contraseña debe tener como mínimo seis caracteres"),
      z.literal(""),
    ]),
    repeatPassword: z.union([
      z.string().min(6, "La contraseña debe tener como mínimo seis caracteres"),
      z.literal(""),
    ]),
    image: z.union([
      z.string().trim().url("Introduce una url de la imagen válida").nullish(),
      z.literal(""),
    ]),
    phone: z.union([
      z
        .string()
        .trim()
        .regex(
          /^\+?[1-9]\d{1,14}$/,
          "Ingresa un número de teléfono válido en formato E.164. Por ejemplo: +541184267591"
        )
        .nullish(),
      z.literal(""),
    ]),
    role: z.enum(["editor", "superadmin"]).nullish(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas no coinciden",
    path: ["repeatPassword"], // Path del campo con error
  });
