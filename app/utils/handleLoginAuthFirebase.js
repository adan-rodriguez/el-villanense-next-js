import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const handleLoginAuthFirebase = (
  email,
  password,
  setLoginErrorMessage
) => {
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        console.log(error);
        setLoginErrorMessage(true);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
