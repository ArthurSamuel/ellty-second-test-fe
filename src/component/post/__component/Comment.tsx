import { useState } from "react";
import styles from "../Post.module.css";
import Avatar from "./Avatar";
import { formatDateTime } from "../../../utils/Helper";
import InputForm from "../../inputForm/InputForm";
import type { IComment } from "../../../api/post/post.type";

export default function CommentItem({
  onReply,
  comment,
}: {
  onReply: (idComment: string, content: string) => void;
  comment: IComment;
}) {
  const [showForm, setShowForm] = useState(false);
  const [showChildren, setShowChildren] = useState(true);
  const hasChildren = !!(comment.subComments && comment.subComments.length > 0);

  return (
    <li className={styles.commentItem}>
      <div className={styles.commentBody}>
        <Avatar name={comment.username} size={36} />
        <div className={styles.commentMain}>
          <div className={styles.commentMeta}>
            <span className={styles.commentAuthor}>{comment.username}</span>
            <span className={styles.dot}>·</span>
            <span className={styles.timestamp}>
              {formatDateTime(comment.createdAt)}
            </span>
          </div>
          <p className={styles.commentContent}>{comment.message}</p>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.replyButtonSmall}
              onClick={() => setShowForm((v) => !v)}
            >
              {showForm ? "Cancel" : "Reply"}
            </button>
          </div>

          {showForm && (
            <InputForm
              placeholder={`Reply to ${comment.username}...`}
              onSubmit={(content) => {
                onReply(comment.id, content);
                setShowForm(false);
                setShowChildren(true);
              }}
              onCancel={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
      {hasChildren && showChildren && (
        <ul className={styles.childList}>
          {comment.subComments!.map((child, index) => (
            <CommentItem key={index} comment={child} onReply={onReply} />
          ))}
        </ul>
      )}
    </li>
  );
}
