import { addShareEntry } from "@/action/share/addShareEntry";
import { updateSharesWithAllottedIPOs } from "@/action/share/updateUserShareData";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const result = await addShareEntry({ ...body });
    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
export async function PUT(req: Request) {
  const allottedIPOs = await req.json();
  try {
    const results = await updateSharesWithAllottedIPOs(allottedIPOs);
    return NextResponse.json(results);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
