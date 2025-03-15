"use server";

import { wisp } from "@/lib/wisp";
import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import SanitizedBlog from "@/app/blog/[slug]/sanitize-blog";

type BlogPostProps = Promise<{
  slug: string;
}>;

const fetchPost = cache((slug: string) => {
  return wisp.getPost(slug);
});

export async function generateMetadata({
  params,
}: {
  params: BlogPostProps;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await fetchPost(slug);

  if (!result.post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found",
    };
  }

  const { title, content } = result.post;

  const plainTextContent = content.replace(/<[^>]*>/g, "");
  const description = plainTextContent.substring(0, 157) + "...";

  return {
    title: `${title} | mintraminthemiddle`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export default async function BlogPost(props: { params: BlogPostProps }) {
  const { slug } = await props.params;

  const result = await fetchPost(slug);

  if (!result.post) {
    throw Error(
      "Post not found. Please try again later. Make sure your URL is valid",
    );
  }

  const { title, publishedAt, createdAt, content, tags } = result.post;

  return (
    <div className="w-full">
      <div className="mx-2 w-full mb-10 break-words">
        <Link href="/blog">
          <small>Back to Blog</small>
        </Link>
        <h1>{title}</h1>
        <SanitizedBlog content={content} />
        <div className="mt-10 opacity-40 text-sm">
          {tags.map((tag) => (
            <span key={tag.name} className="mr-2">
              #{tag.name}
            </span>
          ))}
        </div>
        <div className="text-sm opacity-40 mt-4">
          {Intl.DateTimeFormat("en-US").format(
            new Date(publishedAt || createdAt),
          )}
        </div>
      </div>
    </div>
  );
}
