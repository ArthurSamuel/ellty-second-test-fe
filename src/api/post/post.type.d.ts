export interface IComment {
  id: string;
  username: string;
  message: string;
  idPost: number;
  idParent?: string | null;
  createdAt: string;
  subComments?: ISubComment[];
}

export interface ISubComment extends IComment {
  subComments?: ISubComment[];
}

export interface IPost {
  id: number;
  username: string;
  message: string;
  createdAt: string;
}
