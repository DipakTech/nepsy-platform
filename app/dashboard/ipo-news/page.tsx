import Link from "next/link";
import { cn } from "@/lib/utils";
import PostList from "./post-list";
import { GetNews } from "@/action/share-related-news";
import React from "react";

export function Container(props: {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
  alt?: boolean;
}) {
  return (
    <div
      className={cn(
        "container px-8 mx-auto xl:px-5",
        props.large ? " max-w-screen-xl" : " max-w-screen-lg",
        !props.alt && "py-5 lg:py-8",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}

export interface Post {
  title: string;
  date: string;
  url: string;
  imageUrl: string;
}

export default async function Post() {
  const posts = await GetNews();
  return (
    <>
      {posts && (
        <Container>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-6 xl:grid-cols-3 ">
            {posts.map((post: Post) => (
              <PostList key={Math.random()} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/archive"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
            >
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
