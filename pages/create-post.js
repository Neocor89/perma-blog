import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getContract } from "../configureWarpClient";

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

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-[650px] px-14 mx-auto flex flex-col items-start">
      <input
        className="text-white outline-none w-72 mt-8 p-2 text-lg border-none mb-5 bg-[#23192B]"
        value={post.title}
        placeholder="Post title"
        onChange={(e) => updatePost({ ...post, title: e.target.value })}
      />
      <textarea
        className="w-full outline-none h-72 mb-5 p-5 bg-[#23192B] text-white"
        value={post.content}
        placeholder="Post content"
        title="Markdow supported"
        onChange={(e) => updatePost({ ...post, content: e.target.value })}
      />

      <button
        className="w-48 px-0 mt-4 font-bold py-3 bg-[#F9874F] rounded-md"
        onClick={createPost}
      >
        Create Post
      </button>
    </div>
  );
}
