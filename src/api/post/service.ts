import Http from "../../core/Http";
import type { HttpBaseResponse } from "../../core/Http.type";
import type { IComment, IPost } from "./post.type";

export const getPosts = async () => {
  const results = await Http.get<HttpBaseResponse<IPost[]>>({
    url: "/post",
  });
  return results;
};

export const getComment = async ({ idPost }: { idPost: number }) => {
  const results = await Http.get<HttpBaseResponse<IComment[]>>({
    url: `/post/comment/${idPost}`,
  });
  return results;
};

export const addComment = async ({
  id,
  idParent,
  idPost,
  message,
}: {
  id: string;
  message: string;
  idPost: number;
  idParent?: string;
}) => {
  const results = await Http.post({
    url: "/post/comment",
    data: {
      id,
      idParent,
      idPost,
      message,
    },
  });
  return results;
};

export const addPost = async ({ message }: { message: string }) => {
  const results = await Http.post<HttpBaseResponse<IPost>>({
    url: "/post",
    data: {
      message,
    },
  });
  return results;
};
