import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getContract } from "./configureWarpClient";

export default function CreatePostComponent() {
  const [post, updatePost] = useState({
    title: "",
    content: "",
  });
  const router = useRouter();

  //TODO RESTART HEEEEERE !!!!! 🚀🚀🚀

  async function createPost() {
    if (!post.title || !post.content) return;
    post.id = uuid();
    const contract = await getContract();

    try {
      const result = await contract.writeInteraction({
        function: "createPost",
        post,
      });
      console.log("Result: ", result);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-96 mx-auto flex flex-col items-start">
      <input
        className="w-42 p-2 text-lg border-none mb-5"
        value={post.title}
        placeholder="Post title"
        onChange={(e) => updatePost({ ...post, title: e.target.value })}
      />
      <textarea
        className="w-full h-72 mb-5 p-5"
        value={post.content}
        placeholder="Post content"
        onChange={(e) => updatePost({ ...post, content: e.target.value })}
      />

      <button className="w-48 px-0 py-3 " onClick={createPost}>
        Create Post
      </button>
    </div>
  );
}
