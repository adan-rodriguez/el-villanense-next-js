import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config-firebase";

export const login = async ({ e, getLoginErrorMessage, getLoading }) => {
  e.preventDefault();
  const $form = e.target;
  const $body = document.body;

  const { email, password } = Object.fromEntries(new FormData($form));

  getLoginErrorMessage(null);

  // const emailRegex =
  //   /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  // if (!emailRegex.test(email)) {
  //   getLoginErrorMessage("Introduce un email válido");
  //   return;
  // }

  getLoading(true);

  $form.inert = "true";
  $body.inert = "true";

  setPersistence(auth, browserSessionPersistence).then(() => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        if (
          error.message.includes("user-not-found") ||
          error.message.includes("wrong-password")
        ) {
          getLoginErrorMessage("El email y/o contraseña son incorrectos");
        } else if (error.message.includes("invalid-email")) {
          getLoginErrorMessage("Introduce un email válido");
        } else if (
          error.message.includes(
            "Superó la cantidad de intentos permitidos. Intente de nuevo más tarde"
          )
        ) {
          getLoginErrorMessage("Introduce un email válido");
        } else {
          getLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
        }
      })
      .finally(() => {
        $form.inert = "";
        $body.inert = "";
        getLoading(false);
      });
  });
};

export const logout = () => {
  document.body.inert = "true";
  signOut(auth)
    .then(() => {})
    .catch(() => {
      alert("No se ha podido cerrar sesión");
    })
    .finally((document.body.inert = ""));
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
