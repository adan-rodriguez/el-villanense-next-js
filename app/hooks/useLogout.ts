import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { usePathname, useRouter } from "next/navigation";
import { signout } from "../lib/server-actions";
import { useLoading } from "./useLoading";

export const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { loading, getLoading } = useLoading();

  async function logout() {
    getLoading(true);

    try {
      await signOut(auth);

      await signout();

      if (pathname.startsWith("/dashboard")) {
        router.push("/login");
      }

      getLoading(false);
    } catch (error) {
      alert("No se ha podido cerrar sesión");
      getLoading(false);
    }
  }

  return { loading, logout };
};
