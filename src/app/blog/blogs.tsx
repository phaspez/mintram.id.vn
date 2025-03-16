import { wisp } from "@/lib/wisp";
import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import { MdOutlineRefresh } from "react-icons/md";

export function BlogsLoading() {
  return (
    <div className="grid grid-cols-1 gap-16 lg:gap-8 lg:grid-cols-2 md:my-16 my-8">
      {Array(4)
        .fill(0)
        .map((_, idx) => (
          <Card key={idx} className="overflow-hidden place-content-center">
            <div className="flex flex-col items-center md:flex-row">
              <Skeleton className="h-[200px] w-[300px]" />
              <div className="md:w-3/5">
                <CardHeader>
                  <CardTitle>
                    <Skeleton className="h-4 w-[250px]" />
                  </CardTitle>
                  <CardDescription className="italic text-muted-foreground">
                    <Skeleton className="h-4 w-[250px]" />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    <Skeleton className="h-6 w-[250px] p-2" />
                    <Skeleton className="h-6 w-[250px] p-2" />
                    <Skeleton className="h-6 w-[250px] p-2" />
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}

export async function refreshPosts() {
  "use server";
  revalidatePath("/blog");
  return { success: true };
}

async function getPosts() {
  return await wisp.getPosts({ limit: 6 });
}

export async function BlogsContent() {
  const results = await getPosts();

  return (
    <div className="grid grid-cols-1 gap-16 lg:gap-8 lg:grid-cols-2 md:my-16 my-8">
      {results.posts.map((post) => (
        <Card key={post.id} className="overflow-hidden place-content-center">
          <div
            className={`flex flex-col items-center ${post.image ? "md:flex-row" : ""}`}
          >
            {post.image && (
              <div className="md:w-2/5">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative w-full h-full">
                    <Image
                      alt={post.title}
                      className="object-cover"
                      src={post.image}
                      width={500}
                      height={300}
                    />
                  </div>
                </Link>
              </div>
            )}
            <div className={post.image ? "md:w-3/5" : "w-full"}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="italic text-muted-foreground">
                  {(post.publishedAt || post.updatedAt).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
                  {post.description}
                </p>
                <div className="text-sm text-muted-foreground mt-3">
                  {post.tags.map((tag) => (
                    <span key={tag.id} className="mr-2">
                      #{tag.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function Blogs() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog</h1>
        <form
          action={async () => {
            "use server";
            await refreshPosts();
          }}
        >
          <Button type="submit">
            <MdOutlineRefresh />
          </Button>
        </form>
      </div>
      <Suspense fallback={<BlogsLoading />}>
        <BlogsContent />
      </Suspense>
    </>
  );
}
