import { useState } from "react";
import { signupSchema } from "../lib/schemas";
import { signup } from "../lib/server-actions";
import { useErrorMessage } from "./useErrorMessage";
import { useLoading } from "./useLoading";
import { Role } from "../lib/types";
import { allowedImageFileTypes } from "../lib/utils";

export function useSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState<string>();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [role, setRole] = useState<Role>("editor");
  const { loading, getLoading } = useLoading();
  const { errorMessage, getErrorMessage } = useErrorMessage();

  async function register({
    name,
    email,
    password,
    imageFile,
    phone,
    role = "editor",
  }: {
    name: string;
    email: string;
    password: string;
    imageFile: File | null;
    phone?: string;
    role: Role;
  }) {
    getLoading(true);
    getErrorMessage(null);

    const {
      data: userData,
      error: userDataValidationError,
      success: successfulValidation,
    } = signupSchema.safeParse({
      name,
      email,
      password,
      phone,
      role,
    });

    if (!successfulValidation) {
      getErrorMessage(userDataValidationError.errors[0].message);
      getLoading(false);
      return;
    }

    if (imageFile instanceof File) {
      const { type } = imageFile;

      if (!allowedImageFileTypes.includes(type)) {
        getLoading(false);
        getErrorMessage(`No se acepta una imagen con formato '${type}'`);
        return;
      }
    }

    const { error, success } = await signup({ userData, imageFile });

    if (!success) {
      getLoading(false);
      getErrorMessage(error?.message);
      return;
    }

    getLoading(false);
    getErrorMessage(null);
    alert("Usuario creado con éxito");
  }

  const getName = (name: string) => setName(name);
  const getEmail = (email: string) => setEmail(email);
  const getPassword = (password: string) => setPassword(password);
  const getPhone = (phone?: string) => setPhone(phone);
  const getImageFile = (file: File | null) => setImageFile(file);
  const getRole = (role: Role) => setRole(role);

  return {
    name,
    getName,
    email,
    getEmail,
    password,
    getPassword,
    phone,
    getPhone,
    imageFile,
    getImageFile,
    role,
    getRole,
    errorMessage,
    loading,
    register,
  };
}
