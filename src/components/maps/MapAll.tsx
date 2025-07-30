"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Camping } from "@/typesCamping";
import "leaflet/dist/leaflet.css";
import "@/components/maps/fixLeafletIcons";
import Image from "next/image";
const MapAll = ({ campings }: { campings: Camping[] }) => {
  return (
    <MapContainer>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {campings.map((camping: Camping) => (
        <Marker key={camping.id} position={[camping.field_camping_map.lat, camping.field_camping_map.lon]}>
          <Popup>
            <Image src={camping.field_camping_image.uri.url} width={300} height={200} sizes="100%" alt={camping.title} className="w-full h-full" />
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default MapAll;
