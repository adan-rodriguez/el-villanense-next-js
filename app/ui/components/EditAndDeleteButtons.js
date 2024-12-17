import styles from "../styles/EditAndDeleteButtons.module.css";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export default function EditAndDeleteButtons({ articleId, ...props }) {
  return (
    <div className={styles.container} {...props}>
      <EditButton articleId={articleId} />
      <DeleteButton articleId={articleId} />
    </div>
  );
}
