"use server";

import { wisp } from "@/lib/wisp";
import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import SanitizedBlog from "@/app/blog/[slug]/sanitize-blog";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import { IoChevronBack } from "react-icons/io5";

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

  const { title, content, image, description, tags } = result.post;
  const tagsName = tags.map((tag) => tag.name);
  const plainTextContent = content.replace(/<[^>]*>/g, "");
  const desc = description || plainTextContent.substring(0, 157) + "...";
  const openGraph: OpenGraph = {
    title,
    description: desc,
    type: "article",
    tags: tagsName,
    url: `https://mintram.id.vn/blog/${slug}`,
    images: [
      {
        url: image || "",
        alt: `Cover image for blog post titled ${title}`,
      },
    ],
  };

  return {
    title: `${title} | blog | mintram`,
    description,
    openGraph,
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
        <Link href="/blog" className="flex items-center gap-2 pb-4">
          <IoChevronBack />
          Back to Blog
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
