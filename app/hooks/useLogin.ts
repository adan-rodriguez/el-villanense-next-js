import { useRouter } from "next/navigation";
import { useLoading } from "./useLoading";
import { useErrorMessage } from "./useErrorMessage";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Ingrese un email válido"),
  password: z.string(),
});
export function useLogin() {
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();

  const router = useRouter();

  async function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    getErrorMessage(null);
    getLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString(); // los inputs de tipo email no reflejan en su value los espacios en blanco al inicio y al final
    const password = formData.get("password")?.toString();

    const {
      data: loginData,
      error: validateLoginError,
      success,
    } = loginSchema.safeParse({ email, password });

    if (!success) {
      getErrorMessage(validateLoginError.errors[0].message);
      getLoading(false);
      return;
    }

    await setPersistence(auth, browserLocalPersistence);

    let userCredential;
    try {
      userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
    } catch (error) {
      const { code } = error;
      if (code === "auth/invalid-email") {
        getErrorMessage("Ingrese un email válido");
      } else if (
        code === "auth/user-not-found" ||
        code === "auth/wrong-password"
      ) {
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
