import { auth } from "../firebase/server";

export async function getUser(uid) {
  try {
    const user = await auth.getUser(uid);
    return user;
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}
