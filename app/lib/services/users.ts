import { auth } from "../firebase/server";

export async function getUser(id: string) {
  const user = await auth.getUser(id);
  return user;
}
