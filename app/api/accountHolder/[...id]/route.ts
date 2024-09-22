import { deleteAccountHolder } from "@/action/accountHolder/delete-account-holder";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id[0];

    if (!id) {
      return new NextResponse("Missing ID", { status: 400 });
    }

    console.log(id, "id..");
    const result = await deleteAccountHolder(id);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting account holder:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
