import { RefObject } from "react";
import styles from "@/app/ui/styles/Modal.module.css";

interface ModalProps extends React.DialogHTMLAttributes<HTMLDialogElement> {
  ref: RefObject<HTMLDialogElement | null>;
  text: string;
}

export function ConfirmModal({ ref, text, ...props }: ModalProps) {
  return (
    <dialog ref={ref} {...props} className={styles.dialog}>
      <p>{text}</p>

      <form method="dialog" className={styles.buttons}>
        <button value="accept" className={styles.button}>
          Aceptar
        </button>
        <button autoFocus value="cancel" className={styles.button}>
          Cancelar
        </button>
      </form>
    </dialog>
  );
}
