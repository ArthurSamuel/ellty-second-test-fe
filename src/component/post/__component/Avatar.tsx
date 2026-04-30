import styles from "../Post.module.css";

export default function Avatar({
  name,
  size = 40,
}: {
  name: string;
  size?: number;
}) {
  const style = { width: size, height: size, fontSize: size * 0.4 };

  return (
    <div
      className={`${styles.avatar} ${styles.avatarPlaceholder}`}
      style={style}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
