import { getAllCampings } from "@/queries";
import { NextResponse } from "next/server";

export const GET = async () => {
  const res = await getAllCampings();
  return NextResponse.json(res);
};
