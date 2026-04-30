import { useEffect, useState } from "react";
import styles from "./Post.module.css";
import MainPost from "./__component/MainPost";
import { addComment, getComment } from "../../api/post/service";
import useHttp from "../../hook/useHttp";
import type { IComment, IPost } from "../../api/post/post.type";
import { uniqueString } from "../../utils/Helper";
import CommentItem from "./__component/Comment";
import { useUserInformation } from "../../context/userInformationContext";

interface PostProps {
  post: IPost;
}

export default function Post({ post }: PostProps) {
  const { user } = useUserInformation();
  const author = user?.username || "";
  const { data: dataRawComment } = useHttp({
    fn: () => getComment({ idPost: post.id }),
  });
  const [comment, setComment] = useState<IComment[]>([]);

  useEffect(() => {
    if (dataRawComment?.data?.data) {
      setComment(dataRawComment.data.data);
    }
  }, [dataRawComment]);

  const handleAddCommentToDb = ({
    id,
    message,
    idParent,
  }: {
    id: string;
    idParent?: string;
    message: string;
  }) => {
    addComment({ id, idParent, idPost: post.id, message });
  };

  const handleAddTopLevelComment = (message: string) => {
    const newComment = createComment({
      username: author,
      message,
      idPost: post.id,
    });
    setComment((prev) => [...prev, newComment]);
    handleAddCommentToDb({ id: newComment.id, message });
  };

  const handleAddReply = (idParent: string, message: string) => {
    const newComment = createComment({
      username: author,
      message,
      idParent,
      idPost: post.id,
    });
    const newTreeComment = addCommentToTree(comment, idParent, newComment);
    setComment(newTreeComment);
    handleAddCommentToDb({ id: newComment.id, message, idParent });
  };

  const addCommentToTree = (
    comments: IComment[],
    targetId: string,
    newContent: IComment
  ): IComment[] => {
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return {
          ...comment,
          subComments: [...(comment.subComments || []), newContent],
        };
      }
      if (comment?.subComments?.length) {
        return {
          ...comment,
          subComments: addCommentToTree(
            comment.subComments,
            targetId,
            newContent
          ),
        };
      }
      return comment;
    });
  };

  return (
    <article className={styles.postContainer}>
      <MainPost post={post} onReply={handleAddTopLevelComment} />
      <section className={styles.commentsSection}>
        <div>
          {comment?.length === 0 ? (
            <p className={styles.empty}>No comments yet</p>
          ) : (
            <ul className={styles.commentList}>
              {comment?.map((comment, index) => (
                <CommentItem
                  key={index}
                  comment={comment}
                  onReply={handleAddReply}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </article>
  );
}

function createComment({
  idParent,
  idPost,
  message,
  username,
}: {
  username: string;
  message: string;
  idParent?: string | null;
  idPost: number;
}): IComment {
  return {
    id: uniqueString(),
    idPost,
    idParent,
    username,
    message,
    createdAt: new Date().toISOString(),
    subComments: [],
  };
}
