"use server";

import { auth } from "./firebase/server";
import { cookies } from "next/headers";
import { createAuthor, updateAuthor } from "./services/authors";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const displayName = formData.get("name");
  const nick = formData.get("nick");
  const email = formData.get("email");
  const password = formData.get("password");
  const phoneNumber = formData.get("phone");
  const photoURL = formData.get("photo");
  const role = formData.get("role");

  if (
    typeof displayName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof phoneNumber !== "string" ||
    typeof photoURL !== "string" ||
    typeof nick !== "string"
  ) {
    return { error: { message: "Ocurrió un error. Inténtalo nuevamente" } };
  }

  if (role !== "editor" && role !== "superadmin" && role !== null) {
    return { error: { message: "Ocurrió un error. Inténtalo nuevamente" } };
  }

  if (displayName === "") {
    return { error: { message: "El nombre es requerido" } };
  }

  if (nick === "") {
    return { error: { message: "El nombre de usuario es requerido" } };
  }

  if (email === "") {
    return { error: { message: "El email es requerido" } };
  }

  if (password === "") {
    return { error: { message: "La contraseña es requerida" } };
  }

  const data = {
    displayName,
    email,
    emailVerified: false, // valor por defecto
    password,
    phoneNumber: phoneNumber || undefined, // si es cadena vacía, se convierte en undefined
    photoURL: photoURL || undefined, // si es cadena vacía, se convierte en undefined
    disabled: false, // valor por defecto
  };

  // function formatPhoneNumber(number) {
  //   // Si el número no incluye el prefijo '+', añadirlo
  //   if (!number.startsWith("+")) {
  //     return `+54${number}`;
  //   }
  //   return number;
  // }

  // const formattedNumber = formatPhoneNumber("3482111111");
  // console.log(formattedNumber); // Output: +543482111111

  try {
    const userRecord = await auth.createUser(data);
    const { uid } = userRecord;
    auth.setCustomUserClaims(uid, { role: role ?? "editor" });
    await createAuthor({
      id: uid,
      nick,
      name: displayName,
      email,
      image: photoURL || null, // si es cadena vacía, se convierte en null
      phone: phoneNumber || null, // si es cadena vacía, se convierte en null
      role: role ?? "editor",
    });
    console.log("Usuario creado con éxito:", userRecord);
    return { error: { message: null } };
  } catch (error) {
    console.error("Error creando usuario:", error); // tiene las propiedades code y message
    const { code } = error;
    if (code === "auth/invalid-email") {
      return {
        error: {
          message: "El email es inválido",
        },
      };
    }

    if (code === "auth/invalid-password") {
      return {
        error: {
          message: "La contraseña es inválida",
        },
      };
    }

    if (code === "auth/email-already-exists") {
      return {
        error: {
          message: "El email ya está en uso",
        },
      };
    }

    if (code === "auth/invalid-phone-number") {
      return {
        error: {
          message: "El número de teléfono es inválido",
        },
      };
    }

    if (code === "auth/phone-number-already-exists") {
      return {
        error: {
          message: "El número de teléfono ya está en uso",
        },
      };
    }

    if (code === "auth/invalid-photo-url") {
      return {
        error: {
          message: "La URL de la foto es inválida",
        },
      };
    }

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function updateUser({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) {
  const displayName = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const repeatedPassword = formData.get("repeat-password");
  const phoneNumber = formData.get("phone");
  const photoURL = formData.get("photo");
  const role = formData.get("role");

  if (
    typeof displayName !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof repeatedPassword !== "string" ||
    typeof phoneNumber !== "string" ||
    typeof photoURL !== "string"
  ) {
    return { error: { message: "Ocurrió un error. Inténtalo nuevamente" } };
  }

  if (role !== "editor" && role !== "superadmin") {
    return { error: { message: "Ocurrió un error. Inténtalo nuevamente" } };
  }

  if (displayName === "") {
    return { error: { message: "El nombre es requerido" } };
  }

  if (email === "") {
    return { error: { message: "El email es requerido" } };
  }

  if (password !== repeatedPassword) {
    return { error: { message: "Las contraseñas no coinciden" } };
  }

  const data = {
    displayName,
    email,
    password: password || undefined, // si es cadena vacía, se convierte en undefined
    emailVerified: false, // valor por defecto
    phoneNumber: phoneNumber || undefined, // si es cadena vacía, se convierte en undefined
    photoURL: photoURL || undefined, // si es cadena vacía, se convierte en undefined
    disabled: false, // valor por defecto
  };

  // function formatPhoneNumber(number) {
  //   // Si el número no incluye el prefijo '+', añadirlo
  //   if (!number.startsWith("+")) {
  //     return `+54${number}`;
  //   }
  //   return number;
  // }

  // const formattedNumber = formatPhoneNumber("3482111111");
  // console.log(formattedNumber); // Output: +543482111111

  try {
    const userRecord = await auth.updateUser(id, data);
    auth.setCustomUserClaims(userRecord.uid, { role: role ?? "editor" });

    await updateAuthor({
      id,
      name: displayName,
      email,
      image: photoURL || null, // si es cadena vacía, se convierte en null
      phone: phoneNumber || null, // si es cadena vacía, se convierte en null
      role: role ?? "editor",
    });
    console.log("Usuario actualizado con éxito:", userRecord);

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("__session")?.value;

    if (!sessionCookie) redirect("/login");

    try {
      await auth.verifySessionCookie(sessionCookie, true);
    } catch (error) {
      console.error(error);
      const { code } = error;
      if (code === "auth/session-cookie-revoked") {
        return {
          error: {
            message: "La cookie de sesión ha sido revocada",
          },
        };
      }

      return {
        error: {
          message: "Error al verificar la sesión",
        },
      };
    }

    return { error: { message: null } };
  } catch (error) {
    console.error("Error actualizando usuario:", error); // tiene las propiedades code y message
    if (code === "auth/invalid-email") {
      return {
        error: {
          message: "El email es inválido",
        },
      };
    }

    if (code === "auth/invalid-password") {
      return {
        error: {
          message: "La contraseña es inválida",
        },
      };
    }

    if (code === "auth/email-already-exists") {
      return {
        error: {
          message: "El email ya está en uso",
        },
      };
    }

    if (code === "auth/invalid-phone-number") {
      return {
        error: {
          message: "El número de teléfono es inválido",
        },
      };
    }

    if (code === "auth/phone-number-already-exists") {
      return {
        error: {
          message: "El número de teléfono ya está en uso",
        },
      };
    }

    if (code === "auth/invalid-photo-url") {
      return {
        error: {
          message: "La URL de la foto es inválida",
        },
      };
    }

    return {
      error: {
        message: "Ocurrío un error. Intente de nuevo mas tarde",
      },
    };
  }
}

export async function uploadImage(formData: FormData) {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_API_KEY}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return await response.json();
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
