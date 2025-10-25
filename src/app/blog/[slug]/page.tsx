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
      <span className="span-icon-text">
        <Link href={"/"} className="span-icon-text">
          <Home />
          <span>
            Hom<span className="text-gray-400/40">[</span>e
            <span className="text-gray-400/40">]</span>
          </span>
        </Link>
        <Link href={"/blog"} className="span-icon-text">
          <Newspaper />
          <span>
            <span className="text-gray-400/40">[</span>B
            <span className="text-gray-400/40">]</span>log
          </span>
        </Link>
      </span>
      <span className="not-prose flex-wrap gap-4 content-start flex">
        <h1 className="decorative-text pr-8">blog /</h1>
        <h1>{post.title}</h1>
        <p className="pt-0 mt-0">{post.date}</p>
      </span>
      <SanitizedBlog content={post.content} />
    </div>
  );
}
