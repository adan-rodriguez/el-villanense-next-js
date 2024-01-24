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
  e.target.inert = "true";
  document.body.inert = "true";

  getLoginErrorMessage(null);
  getLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;

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
        } else {
          getLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
        }
      })
      .finally(() => {
        e.target.inert = "";
        document.body.inert = "";
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
  e.target.inert = "true";
  document.body.inert = "true";

  getSignupErrorMessage(null);
  getLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;

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
      e.target.inert = "";
      document.body.inert = "";
      getLoading(false);
    });
};
