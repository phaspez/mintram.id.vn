"use client";

import { useMemo, useState } from "react";
import TagFilter from "@/components/TagFilter";
import Link from "next/link";

type PostSummary = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  coverImage?: string | null;
};

export default function PostsWithFilter({
  posts,
  tags,
}: {
  posts: PostSummary[];
  tags: string[];
}) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((p) => p.tags.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div>
      <TagFilter tags={tags} selected={selectedTag} onSelect={setSelectedTag} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] md:my-16 my-8 bg-red-900/60 border border-red-900/60">
        {filtered.map((post) => (
          <div
            key={post.slug}
            className="p-4 not-prose bg-background hover:bg-red-900/70 transition-colors"
          >
            <div className="flex justify-between items-center mb-2">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <p>{post.date}</p>
            </div>
            <p className="leading-relaxed line-clamp-4 text-muted-foreground text-sm">
              {post.excerpt}
            </p>
            {post.tags?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-0 border-0 p-0">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs bg-blue-800 text-muted-foreground"
                  >
                    {"#" + t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
