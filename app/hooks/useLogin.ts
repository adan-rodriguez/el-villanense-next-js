import { useRouter } from "next/navigation";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase/client";

export function useLogin() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();

  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getErrorMessage(null);
    getLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      alert("Falta email o contraseña!");
      return;
    }

    await setPersistence(auth, browserSessionPersistence);

    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const { code } = error;
      if (code === "auth/invalid-email" || code === "auth/wrong-password") {
        getErrorMessage("Email o contraseña incorrectos");
      } else {
        getErrorMessage("Ocurrió un error, intenta de nuevo más tarde");
      }

      getLoading(false);
      return;
    }

    const idToken = await userCredential.user.getIdToken(true);

    const response = await fetch("/api/auth/login", {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      getErrorMessage("Ocurrió un error, intenta de nuevo más tarde");
      getLoading(false);
      return;
    }

    getErrorMessage(null);
    getLoading(false);
    router.push("/dashboard");
  }

  return {
    errorMessage,
    loading,
    login,
  };
}
