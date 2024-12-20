import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./firebase/client";

export const login = async ({ e }) => {
  e.preventDefault();

  auth.setPersistence(browserSessionPersistence);

  const formData = new FormData(e.target);
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    console.log("Falta email o contraseña");
    return;
  }

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const idToken = await userCredential.user.getIdToken();

  const response = await fetch("/api/auth/login", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response;
};

export const signup = async ({ e, getSignupErrorMessage, getLoading }) => {
  e.preventDefault();
  const $form = e.target;
  const $body = document.body;

  $form.inert = "true";
  $body.inert = "true";

  getSignupErrorMessage(null);
  getLoading(true);

  const email = $form.email.value;
  const password = $form.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Usuario creado con éxito");
    })
    .catch((error) => {
      if (error.message.includes("invalid-email")) {
        getSignupErrorMessage("Introduce un email válido");
      } else if (error.message.includes("weak-password")) {
        getSignupErrorMessage("La contraseña debe tener más de 6 caracteres");
      } else if (error.message.includes("email-already-in-use")) {
        getSignupErrorMessage("El email ya está en uso");
      } else {
        getSignupErrorMessage("Ocurrió un error. Inténtalo nuevamente");
      }
    })
    .finally(() => {
      $form.inert = "";
      $body.inert = "";
      getLoading(false);
    });
};
