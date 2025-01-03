import ContentLoader from "react-content-loader";

export default function SkeletonArticleLink() {
  return (
    <ContentLoader
      speed={2}
      width={290}
      height={306}
      viewBox="0 0 290 306"
      backgroundColor="#e8e8e8"
      foregroundColor="#adadad"
    >
      <rect x="0" y="247" rx="3" ry="3" width="260" height="13" />
      <rect x="0" y="223" rx="3" ry="3" width="260" height="13" />
      <rect x="0" y="269" rx="3" ry="3" width="118" height="7" />
      <rect x="0" y="0" rx="3" ry="3" width="290" height="192" />
      <rect x="0" y="203" rx="3" ry="3" width="123" height="8" />
    </ContentLoader>
  );
}
