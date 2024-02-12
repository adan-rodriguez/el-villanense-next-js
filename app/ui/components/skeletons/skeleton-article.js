import ContentLoader from "react-content-loader";
import styles from "@/app/ui/styles/SkeletonArticle.module.css";

export default function SkeletonArticle() {
  return (
    <ContentLoader
      speed={2}
      // width={767}
      //   height={1240}
      //   viewBox="0 0 854 1240"
      backgroundColor="#e8e8e8"
      foregroundColor="#adadad"
      className={styles.container}
    >
      <rect
        x="4"
        y="5"
        rx="0"
        ry="0"
        /*width="585"*/ height="16"
        style={{ width: "100%" }}
      />
      <rect
        x="5"
        y="33"
        rx="0"
        ry="0"
        /*width="292"*/ height="16"
        style={{ width: "50%" }}
      />
      <circle cx="15" cy="65" r="11" />
      <circle cx="46" cy="65" r="11" />
      <circle cx="78" cy="67" r="11" />
      <rect x="101" y="66" rx="0" ry="0" width="125" height="6" />
      <rect x="6" y="79" rx="0" ry="0" width="80" height="5" />
      <rect
        x="6"
        y="91"
        rx="0"
        ry="0"
        /*width="576"*/ height="12"
        style={{ width: "100%" }}
      />
      <rect
        x="6"
        y="116"
        rx="0"
        ry="0"
        /*width="574"*/ height="12"
        style={{ width: "100%" }}
      />
      <circle cx="15" cy="139" r="11" />
      <rect x="39" y="137" rx="0" ry="0" width="107" height="8" />
      <rect
        x="4"
        y="157"
        rx="0"
        ry="0"
        /*width="585" height="300"*/
        style={{ width: "100%" }}
        className={styles.img}
      />
    </ContentLoader>
  );
}
