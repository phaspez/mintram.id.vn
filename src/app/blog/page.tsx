import Blogs from "@/app/blog/blogs";

export default async function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Blogs</h1>
      <Blogs />
    </div>
  );
}
