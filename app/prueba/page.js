import Image from "next/image";
import Articles from "../components/Articles";
import RevalidateButton from "../components/RevalidateButton";
import { DOMAIN } from "../utils/constants/domain";

export const dynamic = "force-static";

export default async function Prueba() {
  const res = await fetch(`${DOMAIN}/prueba/api`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return (
    <>
      <RevalidateButton>
        <Image
          src="/icons/dashboard/refresh.svg"
          alt="Actualizar"
          width={30}
          height={30}
        />
      </RevalidateButton>
      <Articles articles={data} />
    </>
  );
}
