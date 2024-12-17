"use server";

import { auth, db } from "./firebase/server";
import { cookies } from "next/headers";
import { getFriendlyUrl, timestampToDatetime } from "./utils";

export async function addAction({ article }) {
  const timestamp = Date.now();
  const newArticle = {
    ...article,
    timestamp,
    ...timestampToDatetime({ timestamp }),
    friendlyUrl: getFriendlyUrl({ string: article.title }),
  };

  const articleId = `${newArticle.friendlyUrl}-${newArticle.timestamp}`;

  try {
    const addArticleResponse = await db
      .collection("articles")
      .doc(articleId)
      .set(newArticle);
    console.log({ addArticleResponse });
    console.log(`Artículo con id '${articleId}' agregado`);
  } catch (error) {
    console.error(error);
  }

  return articleId;
}

export async function editAction({ article }) {
  const { articleId } = article;
  delete article.articleId;

  try {
    const editArticleResponse = await db
      .collection("articles")
      .doc(articleId)
      .set(article, { merge: true });
    console.log({ editArticleResponse });
    console.log(`Artículo con id '${articleId}' editado`);
  } catch (error) {
    console.error(error);
  }

  return articleId;
}

export async function deleteAction({ articleId }) {
  try {
    const deleteResponse = await db
      .collection("articles")
      .doc(articleId)
      .delete();
    console.log({ deleteResponse });
    console.log(`Artículo con id '${articleId}' eliminado`);
  } catch (error) {
    console.error(error);
  }
}

export async function signup(formData) {
  const data = {
    displayName: formData.get("name"),
    email: formData.get("email"),
    emailVerified: false, // valor por defecto
    password: formData.get("password"),
    phoneNumber: formData.get("phone") || undefined,
    photoURL: formData.get("photo") || undefined,
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
    console.log("Successfully created new user:", userRecord);
    return;
  } catch (error) {
    console.error("Error creating new user:", error); // tiene las propiedades code y message
    return { errorMessage: error.message };
  }
}

export async function updateUser({ uid, formData }) {
  const data = {
    displayName: formData.get("name") || undefined,
    email: formData.get("email") || undefined,
    emailVerified: false, // valor por defecto
    password: formData.get("password") || undefined,
    phoneNumber: formData.get("phone") || undefined,
    photoURL: formData.get("photo") || undefined,
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
    return { errorMessage: error.message };
  }
}
