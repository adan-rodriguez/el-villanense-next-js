import styles from "../styles/EditAndDeleteButtons.module.css";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

export function EditAndDeleteButtons({ id }: { id: string }) {
  return (
    <div className={styles.container}>
      <EditButton id={id} />
      <DeleteButton id={id} />
    </div>
  );
}
