import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import "../globals.css";
import { Home } from "lucide-react";

export const metadata = {
  title: "blog | mintram",
  description: "blog written in markdown.",
};

export default async function PostsPage() {
  const posts = getAllPosts();

  return (
    <div>
      <span>
        <Link href={"/"}>
          <Home /> Home
        </Link>
      </span>
      <h1 className="text-3xl font-bold">Blog</h1>
      <p>
        Blogs, nerdy technical stuff, shitposts, half-baked arguments about
        controversial topics, angry rants, and connecting the dots on conspiracy
        theories, you name it.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:my-16 my-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="no-underline text-inherit block" // ensure link is block so the card fills the column
          >
            <Card className="h-full">
              {post.coverImage && (
                <div className="w-full h-44 md:h-40 overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="object-cover w-full h-full block"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle>
                  <p className="hover:underline">{post.title}</p>
                </CardTitle>
                <CardDescription className="italic text-muted-foreground">
                  {post.date}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
