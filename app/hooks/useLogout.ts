import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase/client";
import { usePathname, useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();
  const pathname = usePathname();

  function logout() {
    signOut(auth)
      .then(async () => {
        const response = await fetch("/api/auth/logout", {
          credentials: "include",
        });

        if (pathname.startsWith("/dashboard")) {
          router.push("/login");
        }
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
        alert("No se ha podido cerrar sesión");
      });
  }

  return logout;
};
