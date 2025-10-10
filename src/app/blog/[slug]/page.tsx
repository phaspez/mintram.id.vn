import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import SanitizedBlog from "@/app/blog/[slug]/sanitize-blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, Newspaper } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  // params may be a Promise in Next's PageProps type; accept that and await it below
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post not found" };
  }

  const url = `https://mintram.id.vn/blog/${slug}`;

  return {
    title: "blog | " + post.title,
    description: post.excerpt ?? post.title,
    authors: post ? [{ name: "Mintram" }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? post.title,
      type: "article",
      url,
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: url },
  } as Metadata;
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <span className="flex items-center gap-4">
        <Link href={"/"}>
          <Home /> Home
        </Link>
        <Link href={"/blog"}>
          <Newspaper /> Blog
        </Link>
      </span>
      <div className="flex items-start gap-4">
        <h1>{post.title}</h1>
        <p>{post.date}</p>
      </div>
      <SanitizedBlog content={post.content} />
    </div>
  );
}
