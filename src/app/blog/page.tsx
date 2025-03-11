import { wisp } from "@/lib/wisp";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function Home() {
    const result = await wisp.getPosts({ limit: 6 });

    return (
        <div>
            <h1 className="text-3xl font-bold">Blogs</h1>
            <div className="grid grid-cols-1 gap-16 lg:gap-28 md:grid-cols-2 md:my-16 my-8">

                {result.posts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                        {post.image && (
                            <Link href={`/blog/${post.slug}`}>
                                <div className="aspect-[16/9] relative w-full">

                                    <Image
                                        alt={post.title}
                                        className="object-cover"
                                        src={post.image}
                                        fill
                                    />
                                </div>
                            </Link>
                        )}
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
                                    <span key={tag.id} className="mr-2">#{tag.name}</span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
