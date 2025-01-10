import { auth } from "@/app/lib/firebase/server";
import { UpdateUserForm } from "./UpdateUserForm";

export default async function UserPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const user = await auth.getUser(userId);

  const { uid, displayName, email, phoneNumber, photoURL, customClaims } = user;
  const role = customClaims?.role;

  return (
    <UpdateUserForm
      id={uid}
      name={displayName}
      email={email}
      phone={phoneNumber}
      image={photoURL}
      role={role}
    />
  );
}
