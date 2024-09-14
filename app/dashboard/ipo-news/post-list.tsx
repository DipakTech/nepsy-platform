import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Post } from "./page";

export default function PostList({
  post,
  aspect,
  minimal,
  preloadImage,
}: //   fontSize = "text-lg",
//   fontWeight = "normal",
{
  post: Post;
  aspect: string;
  minimal?: boolean;
  preloadImage?: boolean;
  //   fontSize?: string;
  //   fontWeight?: string;
}) {
  return (
    <>
      <div
        className={cn(
          "group cursor-pointer ",
          minimal && "grid gap-10 md:grid-cols-2",
        )}
      >
        <div
          className={cn(
            " overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105   dark:bg-gray-800 p-2",
          )}
        >
          <Link
            className={cn(
              "relative block",
              aspect === "landscape"
                ? "aspect-video"
                : aspect === "custom"
                ? "aspect-[5/4]"
                : "aspect-square",
            )}
            href={`${post.url}`}
          >
            <Image
              src={post.imageUrl}
              alt={post.title || "Thumbnail"}
              priority={preloadImage ? true : false}
              className="object-cover transition-all rounded-md"
              fill
              sizes="(max-width: 768px) 30vw, 33vw"
            />
          </Link>

          <div className={cn(minimal && "flex items-center")}>
            <div>
              {/* <CategoryLabel categories={post.categories} nomargin={minimal} /> */}
              <h2
                className={cn(
                  "line-clamp-3 font-medium text-black  tracking-normal dark:text-white",
                )}
              >
                <Link href={`${post.url}`}>
                  <span
                    className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom
                    bg-no-repeat
                    transition-[background-size]
                    duration-500
                    hover:bg-[length:100%_3px]
                    group-hover:bg-[length:100%_10px]
                    dark:from-purple-800 dark:to-purple-900"
                  >
                    {post.title}
                  </span>
                </Link>
              </h2>

              <div className="mt-3 space-x-3 text-gray-500 ml-auto flex items-end justify-end dark:text-gray-400">
                <span className="text-xs text-gray-300 dark:text-gray-600">
                  &bull;
                </span>
                <span className="truncate text-sm mr-auto">{post.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
