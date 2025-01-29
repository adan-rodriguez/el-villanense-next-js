"use server";

import { auth } from "./firebase/server";
import { cookies } from "next/headers";
import { createAuthor, updateAuthor } from "./services/authors";
import { redirect } from "next/navigation";
import { allowedImageFileTypes, slugify } from "./utils";
import { signupSchema } from "./schemas";
import { Role } from "./types";
import { z } from "zod";

export async function signup({
  userData,
  imageFile,
}: {
  userData: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role: Role;
  };
  imageFile: File | null;
}) {
  const {
    data: validatedUserData,
    error: userDataValidationError,
    success: successfulValidation,
  } = signupSchema.safeParse(userData);

  if (!successfulValidation) {
    return {
      error: { message: userDataValidationError.errors[0].message },
      success: false,
    };
  }

  if (imageFile instanceof File) {
    const { type } = imageFile;

    if (!allowedImageFileTypes.includes(type)) {
      return {
        error: { message: `No se acepta una imagen con formato '${type}'` },
        success: false,
      };
    }
  }

  const { name, email, password, phone, role } = validatedUserData;

  try {
    let imageUrl;
    if (imageFile instanceof File) imageUrl = await uploadImage(imageFile);

    const userRecord = await auth.createUser({
      displayName: name,
      email: email,
      emailVerified: false, // valor por defecto
      password: password,
      photoURL: imageUrl,
      phoneNumber: phone,
      disabled: false, // valor por defecto
    });

    const { uid } = userRecord;
    await auth.setCustomUserClaims(uid, { role: role ?? "editor" });

    await createAuthor({
      id: uid,
      nick: slugify(name),
      name,
      email,
      image: imageUrl || null,
      phone: phone || null,
      role: role || "editor",
    });
    console.log("Usuario creado con éxito:", userRecord);
    return { success: true };
  } catch (error) {
    console.error("Error creando usuario:", error); // tiene las propiedades code y message
    const { code } = error;
    if (code === "auth/invalid-email") {
      return {
        error: {
          message: "Ingrese un email válido",
        },
        success: false,
      };
    }

    if (code === "auth/invalid-password") {
      return {
        error: {
          message: "La contraseña es inválida",
        },
        success: false,
      };
    }

    if (code === "auth/email-already-exists") {
      return {
        error: {
          message: "El email ya está en uso",
        },
        success: false,
      };
    }

    if (code === "auth/invalid-phone-number") {
      return {
        error: {
          message: "El número de teléfono es inválido",
        },
        success: false,
      };
    }

    if (code === "auth/phone-number-already-exists") {
      return {
        error: {
          message: "El número de teléfono ya está en uso",
        },
        success: false,
      };
    }

    if (code === "auth/invalid-photo-url") {
      return {
        error: {
          message: "La URL de la foto es inválida",
        },
        success: false,
      };
    }

    return {
      error: {
        message: "Ocurrió un error. Intente de nuevo más tarde",
      },
      success: false,
    };
  }
}

export async function updateName({ id, name }: { id: string; name: string }) {
  const { data, error, success } = z
    .object({
      name: z
        .string()
        .trim()
        .nonempty("Introduce tu nombre")
        .max(150, "Introduce un nombre más corto"),
    })
    .safeParse({
      name,
    });

  if (!success) {
    return { error: { message: error.errors[0].message } };
  }

  try {
    const userRecord = await auth.updateUser(id, { displayName: data.name });

    await updateAuthor({
      id,
      name: data.name,
    });
    console.log("Nombre del usuario actualizado con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando el nombre del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function updateEmail({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  const { data, error, success } = z
    .string()
    .trim()
    .email("Ingrese un email válido")
    .safeParse(email);

  if (!success) {
    return { error: { message: error.errors[0].message } };
  }

  try {
    const userRecord = await auth.updateUser(id, { email: data });

    await updateAuthor({
      id,
      email: data,
    });
    console.log("Email del usuario actualizado con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando el email del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function updatePassword({
  id,
  password,
  repeatedPassword,
}: {
  id: string;
  password: string;
  repeatedPassword: string;
}) {
  const { data, error, success } = z
    .object({
      password: z
        .string()
        .min(6, "La contraseña debe tener como mínimo seis caracteres"),

      repeatedPassword: z
        .string()
        .min(6, "La contraseña debe tener como mínimo seis caracteres"),
    })
    .refine((data) => data.password === data.repeatedPassword, {
      message: "Las contraseñas no coinciden",
      path: ["repeatedPassword"], // Path del campo con error
    })
    .safeParse({ password, repeatedPassword });

  if (!success) {
    return { error: { message: error.errors[0].message } };
  }

  try {
    const userRecord = await auth.updateUser(id, { password: data.password });

    console.log("Contraseña del usuario actualizada con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando la contraseña del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function updateImage({
  id,
  imageFile,
}: {
  id: string;
  imageFile: File;
}) {
  if (typeof id !== "string" || !(imageFile instanceof File)) {
    return {
      error: { message: "Ocurrío un error. Intente de nuevo más tarde" },
    };
  }

  const { type } = imageFile;

  if (!allowedImageFileTypes.includes(type)) {
    return {
      error: { message: `No se acepta una imagen con formato '${type}'` },
    };
  }

  try {
    const imageUrl = await uploadImage(imageFile);
    const userRecord = await auth.updateUser(id, { photoURL: imageUrl });

    await updateAuthor({
      id,
      image: imageUrl,
    });

    console.log("Teléfono del usuario actualizado con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando la imagen del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo más tarde",
      },
    };
  }
}

export async function updatePhone({
  id,
  phone,
}: {
  id: string;
  phone: string;
}) {
  const { data, error, success } = z
    .string()
    .trim()
    .regex(
      /^\+[1-9]\d{1,14}$/,
      "Ingresa un número de teléfono válido en formato E.164. Por ejemplo: +541184267591"
    )
    .safeParse(phone);

  if (!success) {
    return { error: { message: error.errors[0].message } };
  }

  try {
    const userRecord = await auth.updateUser(id, { phoneNumber: data });

    await updateAuthor({
      id,
      phone: data,
    });

    console.log("Teléfono del usuario actualizado con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando el teléfono del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function updateRole({ id, role }: { id: string; role: Role }) {
  const { data, error, success } = z
    .enum(["editor", "superadmin"])
    .safeParse(role);

  if (!success) {
    return { error: { message: error.errors[0].message } };
  }

  try {
    await auth.setCustomUserClaims(id, { role: data || "editor" });

    await updateAuthor({
      id,
      role: data,
    });

    console.log("Rol del usuario actualizado con éxito:");

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando el rol del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo más tarde",
      },
    };
  }
}

export async function deletePhone({ id }: { id: string }) {
  if (typeof id !== "string") {
    return {
      error: { message: "Ocurrío un error. Intente de nuevo más tarde" },
    };
  }

  try {
    const userRecord = await auth.updateUser(id, { phoneNumber: null });

    await updateAuthor({
      id,
      phone: null,
    });

    console.log("Teléfono del usuario eliminado con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error eliminando el teléfono del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function deleteImage({ id }: { id: string }) {
  try {
    const userRecord = await auth.updateUser(id, { photoURL: null });

    await updateAuthor({
      id,
      image: null,
    });

    console.log("Imagen del usuario eliminada con éxito:", userRecord);

    return { error: { message: null } };
  } catch (error) {
    console.error("Error eliminando la imagen del usuario:", error); // tiene las propiedades code y message

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function uploadImage(imageFile: File): Promise<string> {
  let formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "elvillanense");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_KEY}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url;
}

// The .delete method can only be called:
// In a Server Action or Route Handler.
// If it belongs to the same domain from which .set is called. Additionally, the code must be executed on the same protocol (HTTP or HTTPS) as the cookie you want to delete.
export async function deleteCookie(key: string) {
  const cookieStore = await cookies();
  cookieStore.delete(key);
}

export async function signout() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;
  cookieStore.delete("__session");

  if (!sessionCookie) redirect("/login");

  try {
    const { uid } = await auth.verifySessionCookie(sessionCookie, true);
    await auth.revokeRefreshTokens(uid);
  } catch (error) {
    console.error(error);
    redirect("/login");
  }
}

export async function getCustomToken() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("__session")?.value;

  if (!sessionCookie) return;

  try {
    const decodedIdToken = await auth.verifySessionCookie(sessionCookie, true);
    const customToken = await auth.createCustomToken(decodedIdToken.uid);
    return customToken;
  } catch (error) {
    console.error(error);
    throw new Error("Cookie de sesión inválida o expirada.");
  }
}
