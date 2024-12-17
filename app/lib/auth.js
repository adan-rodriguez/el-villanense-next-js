import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";
import { auth } from "./firebase/client";

export const login = async ({ e }) => {
  e.preventDefault();
  const $form = e.target;

  // Esto evitará que el navegador almacene los datos de sesión
  auth.setPersistence(browserSessionPersistence);

  const formData = new FormData($form);
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    console.log("Falta email o contraseña");
    return;
  }

  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const idToken = await userCredential.user.getIdToken();

  const response = await fetch("/api/auth/login", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  return response;
};

// export const login = async ({ e }) => {
//   e.preventDefault();
//   const $form = e.target;
//   const $body = document.body;

//   const { email, password } = Object.fromEntries(new FormData($form));

//   // getLoginErrorMessage(null);
//   // getLoading(true);

//   $form.inert = "true";
//   $body.inert = "true";

//   setPersistence(auth, browserSessionPersistence).then(() => {
//     signInWithEmailAndPassword(auth, email, password)
//       .catch((error) => {
//         if (
//           error.message.includes("user-not-found") ||
//           error.message.includes("wrong-password")
//         ) {
//           // getLoginErrorMessage("El email y/o contraseña son incorrectos");
//         } else if (error.message.includes("invalid-email")) {
//           // getLoginErrorMessage("Introduce un email válido");
//         } else if (
//           error.message.includes(
//             "Superó la cantidad de intentos permitidos. Intente de nuevo más tarde"
//           )
//         ) {
//           // getLoginErrorMessage("Introduce un email válido");
//         } else {
//           // getLoginErrorMessage("Ocurrió un error. Inténtalo nuevamente");
//         }
//       })
//       .finally(() => {
//         $form.inert = "";
//         $body.inert = "";
//         // getLoading(false);
//       });
//   });
// };

export const signup = async ({ e, getSignupErrorMessage, getLoading }) => {
  e.preventDefault();
  const $form = e.target;
  const $body = document.body;

  $form.inert = "true";
  $body.inert = "true";

  getSignupErrorMessage(null);
  getLoading(true);

  const email = $form.email.value;
  const password = $form.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Usuario creado con éxito");
    })
    .catch((error) => {
      if (error.message.includes("invalid-email")) {
        getSignupErrorMessage("Introduce un email válido");
      } else if (error.message.includes("weak-password")) {
        getSignupErrorMessage("La contraseña debe tener más de 6 caracteres");
      } else if (error.message.includes("email-already-in-use")) {
        getSignupErrorMessage("El email ya está en uso");
      } else {
        getSignupErrorMessage("Ocurrió un error. Inténtalo nuevamente");
      }
    })
    .finally(() => {
      $form.inert = "";
      $body.inert = "";
      getLoading(false);
    });
};
