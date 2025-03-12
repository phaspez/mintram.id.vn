import { wisp } from "@/lib/wisp";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Suspense } from "react";
import Blogs, { BlogsError, BlogsLoading } from "@/app/blog/blogs";

export default async function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Blogs</h1>
      <Blogs />
    </div>
  );
}
