// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

// Specify the paths you want to protect
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
