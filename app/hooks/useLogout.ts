import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { signout } from "../lib/server-actions";
import { useLoading } from "./useLoading";

export const useLogout = () => {
  const { loading, getLoading } = useLoading();

  async function logout() {
    getLoading(true);

    try {
      await signOut(auth);
      await signout();
      getLoading(false);
    } catch (error) {
      console.error(error);
      getLoading(false);
    }
  }

  return { loading, logout };
};
