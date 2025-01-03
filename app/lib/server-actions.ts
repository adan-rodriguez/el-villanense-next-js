"use server";

import { auth } from "./firebase/server";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const data = {
    displayName: formData.get("name"),
    email: formData.get("email"),
    emailVerified: false, // valor por defecto
    password: formData.get("password"),
    phoneNumber: formData.get("phone") || undefined,
    photoURL: formData.get("photo") || undefined,
    disabled: false, // valor por defecto
  };

  if (!data.displayName) {
    return { error: "El nombre es requerido" };
  }

  if (!data.email) {
    return { error: "El email es requerido" };
  }

  if (!data.password) {
    return { error: "La contraseña es requerida" };
  }

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
    console.log("Usuario creado con éxito:", userRecord);
    return { message: "Usuario creado con éxito" };
  } catch (error) {
    console.error("Error creating new user:", error); // tiene las propiedades code y message
    return {
      error: error.message || "Ocurrío un error. Intente de nuevo mas tarde",
    };
  }
}

export async function updateUser({
  uid,
  formData,
}: {
  uid: string;
  formData: FormData;
}) {
  const data = {
    displayName: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    emailVerified: false, // valor por defecto
    password: formData.get("password") || undefined,
    phoneNumber: formData.get("phone") || undefined,
    photoURL: formData.get("photo") || undefined,
    disabled: false, // valor por defecto
  };

  if (!data.displayName) {
    return { error: "El nombre es requerido" };
  }

  if (!data.email) {
    return { error: "El email es requerido" };
  }

  if (!data.password) {
    return { error: "La contraseña es requerida" };
  }

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
    const userRecord = await auth.updateUser(uid, data);
    console.log("Successfully update new user:", userRecord);
    const {
      displayName,
      email,
      emailVerified,
      phoneNumber,
      photoURL,
      disabled,
    } = userRecord;

    // Error: The Firebase session cookie has been revoked -> me daba ese error despues de actualizar

    const cookieStore = await cookies();
    cookieStore.delete("__session");

    return {
      user: {
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        disabled,
      },
    };
  } catch (error) {
    console.error("Error updating new user:", error); // tiene las propiedades code y message
    return {
      error: error.message || "Ocurrío un error. Intente de nuevo mas tarde",
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
  return response;
}
