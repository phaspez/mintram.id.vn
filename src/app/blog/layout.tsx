import BlogDecor from "@/components/blog-decor";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <BlogDecor />
      {children}
    </div>
  );
}
