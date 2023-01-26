import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { getContract } from "../configureWarpClient";

// ReactMarkdown

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    readState();
  }, []);

  async function readState() {
    const contract = getContract();

    try {
      const data = await (await contract).readState();
      console.log("Data: ", data);
      const posts = Object.values(data.cachedValue.state.posts);
      setPosts(posts);
      console.log("Posts", posts);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-[#222E50] flex flex-col">
      <h1 className="text-4xl mt-8 font-bold text-white text-center font-Oswald">
        Ben Dev PermaBlog
      </h1>
      {posts.map((post, index) => (
        <div key={index} className="py-4 px-0 border-b decoration-[#C5D2FC]">
          <p className="text-lg mb-0">{post.title}</p>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
