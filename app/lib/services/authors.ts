import { db } from "../firebase/server";
import { Author, AuthorData, Role } from "../types";

export async function getAuthors() {
  const authorsSnapshot = await db.collection("authors").get();

  const authors = authorsSnapshot.docs.map((author) => author.data());

  return authors;
}

export async function getAuthorByNick(nick: string) {
  const authorsRef = db.collection("authors");
  const authorSnapshot = await authorsRef.where("nick", "==", nick).get();

  if (authorSnapshot.empty) return;

  const author: Author = authorSnapshot.docs.map((author) => ({
    id: author.id,
    ...(author.data() as AuthorData),
  }))[0];
  return author;
}

export async function getAuthor(uid: string) {
  const authorsRef = db.collection("authors");
  const authorSnapshot = await authorsRef.doc(uid).get();

  if (!authorSnapshot.exists) throw new Error("Author not found");

  const { id } = authorSnapshot;
  const data = authorSnapshot.data() as AuthorData;
  const author: Author = { id, ...data };
  return author;
}

export async function createAuthor(author: Author) {
  const { id, name, nick, image, email, phone, role } = author;
  const authorsRef = db.collection("authors");
  await authorsRef.doc(id).set({ name, nick, image, email, phone, role });
}

export async function updateAuthor({
  id,
  name,
  image,
  email,
  phone,
  role,
}: {
  id: string;
  name?: string;
  email?: string;
  image?: string | null;
  phone?: string | null;
  role?: Role;
}) {
  const authorsRef = db.collection("authors");

  // Filtrar solo los campos definidos
  const fieldsToUpdate: Partial<{
    name: string;
    email: string;
    image: string | null;
    phone: string | null;
    role: Role;
  }> = {};

  if (name !== undefined) fieldsToUpdate.name = name;
  if (email !== undefined) fieldsToUpdate.email = email;
  if (image !== undefined) fieldsToUpdate.image = image;
  if (phone !== undefined) fieldsToUpdate.phone = phone;
  if (role !== undefined) fieldsToUpdate.role = role;

  await authorsRef.doc(id).update(fieldsToUpdate);
}
