import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import "../globals.css";
import { Home } from "lucide-react";
import PostsWithFilter from "@/components/PostsWithFilter";

export const metadata = {
  title: "blog | mintram",
  description: "my blog and whatever i feel like writing.",
};

export default async function PostsPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div>
      <span>
        <Link href={"/"} className="span-icon-text">
          <Home />{" "}
          <span>
            Hom<span className="text-gray-400/40">[</span>e
            <span className="text-gray-400/40">]</span>
          </span>
        </Link>
      </span>
      <h1 className="text-3xl font-bold decorative-text">blog</h1>
      <p>
        Blogs, nerdy technical stuff, shitposts, half-baked arguments about
        controversial topics, angry rants, and connecting the dots on conspiracy
        theories, you name it.
      </p>

      {/* Client component handles tag selection & filtering */}
      <PostsWithFilter posts={posts} tags={tags} />
    </div>
  );
}
