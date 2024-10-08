import { createShare } from "@/action/share/createShare";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const result = await createShare(body);
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
// export async function PUT(req: Request) {
//   const allottedIPOs = await req.json();
//   try {
//     const results = await updateSharesWithAllottedIPOs(allottedIPOs);
//     return NextResponse.json(results);
//   } catch (error) {
//     console.log(error);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }
