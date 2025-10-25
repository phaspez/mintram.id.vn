import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = (() => {
  const postsPath = path.join(process.cwd(), "posts");
  const contentPath = path.join(process.cwd(), "content");
  if (fs.existsSync(postsPath)) return postsPath;
  if (fs.existsSync(contentPath)) return contentPath;
  return postsPath; // fallback
})();

function parseTags(raw: any): string[] {
  if (!raw) return [];
  if (Array.isArray(raw))
    return raw
      .map(String)
      .map((t) => t.trim())
      .filter(Boolean);
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  tags: string[];
}

export function getAllPosts(): Omit<Post, "content">[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data?.title ?? "",
        date: data?.date ?? "",
        excerpt: data?.excerpt ?? "",
        coverImage: data?.coverImage ?? null,
        tags: parseTags(data?.tags),
      } as Omit<Post, "content">;
    });

  return posts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date)),
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data?.title ?? "",
    date: data?.date ?? "",
    excerpt: data?.excerpt ?? "",
    content: contentHtml,
    coverImage: data?.coverImage ?? null,
    tags: parseTags(data?.tags),
  } as Post;
}

export function getAllPostSlugs(): { slug: string }[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => ({
      slug: fileName.replace(/\.md$/, ""),
    }));
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
}

export function getPostsByTag(tag: string): Omit<Post, "content">[] {
  const posts = getAllPosts();
  return posts.filter((p) => p.tags.includes(tag));
}
