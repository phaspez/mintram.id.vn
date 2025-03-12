import { wisp } from "@/lib/wisp";
import { cache, Suspense, use } from "react";
import { GetPostsResult } from "@wisp-cms/client";
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

export function BlogsLoading() {
  return (
    <div className="grid grid-cols-1 gap-16 lg:gap-8 lg:grid-cols-2 md:my-16 my-8">
      {Array(5).map((val, idx) => (
        <Card key={idx} className="overflow-hidden place-content-center">
          <div className="flex flex-col items-center md:flex-row">
            <Skeleton className="h-[400px] w-[300px]" />
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
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[250px]" />
                <Skeleton className="h-6 w-[250px]" />
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function BlogsError() {
  return <div>Error loading blogs</div>;
}

const fetchPosts = cache(() => {
  return wisp.getPosts({ limit: 6 });
});

export function BlogsContent() {
  const results = use(fetchPosts());

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
    <Suspense fallback={<BlogsLoading />}>
      <BlogsContent />
    </Suspense>
  );
}
