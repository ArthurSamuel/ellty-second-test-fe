import { useState } from "react";
import styles from "./InputForm.module.css";

export default function InputForm({
  placeholder,
  onSubmit,
  onCancel,
}: {
  placeholder: string;
  onSubmit: (content: string) => void;
  onCancel: () => void;
}) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setText("");
  };

  return (
    <form className={styles.replyForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.replyTextarea}
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        autoFocus
      />
      <div className={styles.replyFormActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={!text.trim()}
        >
          Post
        </button>
      </div>
    </form>
  );
}
