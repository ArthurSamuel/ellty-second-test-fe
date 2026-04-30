import { useState } from "react";
import styles from "../Post.module.css";
import InputForm from "../../inputForm/InputForm";
import Avatar from "./Avatar";
import type { IPost } from "../../../api/post/post.type";
import { formatDateTime } from "../../../utils/Helper";
import { useUserInformation } from "../../../context/userInformationContext";

export default function MainPost({
  post,
  onReply,
}: {
  post: IPost;
  onReply: (content: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const { user } = useUserInformation();
  const author = user?.username;

  return (
    <header className={styles.mainPost}>
      <div className={styles.postHeader}>
        <Avatar name={post.username} size={48} />
        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{post.username}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.timestamp}>
            {formatDateTime(post.createdAt)}
          </span>
        </div>
      </div>
      <p className={styles.postContent}>{post.message}</p>

      {author && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.replyButton}
            onClick={() => {
              setShowForm((v) => !v);
            }}
          >
            {showForm ? "Cancel" : "Reply"}
          </button>
        </div>
      )}

      {showForm && (
        <InputForm
          placeholder="Write a comment..."
          onSubmit={(content) => {
            onReply(content);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </header>
  );
}
