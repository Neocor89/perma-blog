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
      const posts = Object.values(data.cachedValue.state.posts);
      setPosts(posts);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-[#222E50] flex flex-col">
      <h1 className="text-4xl mt-8 mb-16 font-bold text-white text-center font-Oswald">
        Ben Dev PermaBlog
      </h1>
      {posts.map((post, index) => (
        <div key={index} className="mx-auto text-white py-4 px-0">
          <p className="text-xl mb-8 font-bold">{post.title}</p>
          <ReactMarkdown className="text-white mb-10">
            {post.content}
          </ReactMarkdown>
        </div>
      ))}
    </div>
  );
}
