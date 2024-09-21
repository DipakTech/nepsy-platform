import type { NextRequest } from "next/server";

export const revalidate = 0;
export function GET(request: NextRequest) {
  // const authHeader = request.headers.get("authorization");
  // if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", {
  //     status: 401,
  //   });
  // }

  return Response.json({ success: true });
}
