import { useEffect, useState } from "react";
import FloatingButton from "../../component/floating/Floating";
import Modal from "../../component/modal/Modal";
import Post from "../../component/post/Post";
import styles from "./Home.module.css";
import InputForm from "../../component/inputForm/InputForm";
import useHttp from "../../hook/useHttp";
import { addPost, getPosts } from "../../api/post/service";
import type { IPost } from "../../api/post/post.type";
import { useUserInformation } from "../../context/userInformationContext";
import Spinner from "../../component/spinner/Spinner";

export default function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const { data: dataRawPosts, isLoading } = useHttp({ fn: () => getPosts() });
  const { user } = useUserInformation();

  useEffect(() => {
    if (dataRawPosts?.data?.data) {
      setPosts(dataRawPosts.data.data);
    }
  }, [dataRawPosts]);

  const handleAddPost = async (message: string) => {
    const results = await addPost({ message });
    const id = results.data.data.id;
    setPosts((prev) => [
      ...prev,
      {
        id,
        message,
        username: user.username,
        createdAt: new Date().toISOString(),
      },
    ]);
    setOpenModal(false);
  };

  if (isLoading) {
    return (
      <div className={styles.center}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {posts?.map((item, index) => (
          <Post key={index} post={item} />
        ))}
      </div>
      {user && <FloatingButton onClick={() => setOpenModal(true)} />}
      <Modal
        title="Create Post"
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <InputForm
          onCancel={() => setOpenModal(false)}
          onSubmit={(e) => handleAddPost(e)}
          placeholder="Write your new post here"
        />
      </Modal>
    </div>
  );
}
