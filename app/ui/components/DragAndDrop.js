import styles from "@/app/ui/styles/DragAndDrop.module.css";

export default function DragAndDrop({
  onDragOver,
  onDrop,
  image = "",
  imageFile,
}) {
  return (
    <div onDragOver={onDragOver} onDrop={onDrop} className={styles.dropzone}>
      <div
        style={{
          backgroundImage: imageFile
            ? `url(${URL.createObjectURL(imageFile)})`
            : image
            ? `url(${image})`
            : "",
        }}
        className={styles.image_preview}
      >
        {!imageFile && !image && (
          <>
            <p>O arrastra la imagen aquí </p>
            <svg width="24" height="24">
              <path
                d="M19 7v3h-2V7h-3V5h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5a2 2 0 00-2 2v12c0 1.1.9 2 2 2h12a2 2 0 002-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"
                fill="gray"
              ></path>
            </svg>
          </>
        )}
      </div>
    </div>
  );
}
