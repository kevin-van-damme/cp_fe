import { NextRequest, NextResponse } from "next/server";
import { getCampingById } from "@/queries";

export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
  try {
    const id = context.params.id;
    if (!id) {
      return NextResponse.json({ error: "Missing camping ID" }, { status: 400 });
    }
    const camping = await getCampingById({ id });
    return NextResponse.json(camping);
  } catch (error) {
    console.error("Error fetching camping:", error);
    return NextResponse.json({ error: "Error fetching camping" }, { status: 500 });
  }
};
