"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
  const { data: session, status } = useSession();

  // If the user is not authenticated, return nothing
  if (status === "loading") return null; // Optional loading state
  if (status === "unauthenticated") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {session?.user?.image ? (
            <AvatarImage src={session.user.image} alt={"User nav"} />
          ) : (
            <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuLabel>{session?.user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
