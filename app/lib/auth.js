import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { redirect } from "next/navigation";
import { auth } from "./config-firebase";
import { routes } from "./routes";

export const handleLogin = ({ email, password, setLoginErrorMessage }) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          setLoginErrorMessage(null);
          redirect(routes.dashboard.root);
        })
        .catch((error) => {
          if (
            error.message.includes("user-not-found") ||
            error.message.includes("wrong-password")
          ) {
            setLoginErrorMessage("El email y/o contraseña son incorrectos");
          } else {
            setLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
          }
        });
    })
    .catch(() => {
      setLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
    });
};
