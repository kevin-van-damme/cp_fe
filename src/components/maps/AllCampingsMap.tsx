"use client";
import dynamic from "next/dynamic";
import type { Camping } from "@/typesCamping";
const Map = dynamic(() => import("@/components/maps/MapAll"), { ssr: false });

export default function AllCampingsMap({ campings }: { campings: Camping[] }) {
  return (
    <>
      <Map campings={campings} />
    </>
  );
}
