"use client";
import dynamic from "next/dynamic";
import type { Camping } from "@/typesCamping";
const Map = dynamic(() => import("@/components/maps/Map"), { ssr: false });
const CampingDetailMap = ({ camping }: { camping: Camping }) => {
  return (
    <>
      <Map camping={camping} />
    </>
  );
};
export default CampingDetailMap;
